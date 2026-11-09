import { NextRequest, NextResponse } from "next/server";
import { QuoteRequestSchema } from "@/schemas/quote";
import { createServerClient } from "@/lib/supabase/server";
import { checkRateLimit, RATE_LIMITS } from "@/lib/validation/rateLimit";
import { buildWhatsAppUrl } from "@/lib/whatsapp/buildMessage";
import { resend, FROM_EMAIL, OWNER_EMAIL } from "@/lib/email/resend";

async function verifyTurnstile(token: string): Promise<boolean> {
  // In development, allow bypass token
  if (process.env.NODE_ENV === "development" && token === "dev-bypass") {
    return true;
  }
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      },
    );
    const data = await res.json() as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

async function logEmail(
  supabase: ReturnType<typeof createServerClient>,
  params: {
    quoteId: string;
    recipient: string;
    template: string;
    status: string;
    resendId?: string;
    error?: string;
  },
) {
  await supabase.from("email_log").insert({
    quote_id: params.quoteId,
    recipient: params.recipient,
    template: params.template,
    status: params.status,
    resend_id: params.resendId ?? null,
    error_message: params.error ?? null,
  });
}

export async function POST(request: NextRequest) {
  // ── Rate limiting ─────────────────────────────────────────────────────────
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const rateCheck = checkRateLimit(
    `quotes:${ip}`,
    RATE_LIMITS.quoteSubmission,
  );
  if (!rateCheck.allowed) {
    return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "VALIDATION_ERROR" }, { status: 400 });
  }

  // ── Honeypot check ────────────────────────────────────────────────────────
  const raw = body as Record<string, unknown>;
  if (raw._honey !== "") {
    return NextResponse.json(
      { error: "HONEYPOT_TRIGGERED" },
      { status: 400 },
    );
  }

  // ── Turnstile verification ────────────────────────────────────────────────
  const turnstileOk = await verifyTurnstile(String(raw.turnstileToken ?? ""));
  if (!turnstileOk) {
    return NextResponse.json({ error: "TURNSTILE_FAILED" }, { status: 400 });
  }

  // ── Zod validation ────────────────────────────────────────────────────────
  const parsed = QuoteRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "VALIDATION_ERROR", errors: parsed.error.issues },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // ── Supabase insert (with retry) ──────────────────────────────────────────
  const supabase = createServerClient();
  let quoteId: string | null = null;
  let refNumber: string | null = null;
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    const { data: inserted, error } = await supabase
      .from("quote_requests")
      .insert({
        service_slug: data.serviceSlug,
        service_name: data.serviceName,
        size: data.size ?? null,
        quantity: data.quantity,
        paper_finish: data.paperFinish ?? null,
        finish_options: data.finishOptions ?? null,
        deadline: data.deadline,
        delivery_method: data.deliveryMethod,
        delivery_area: data.deliveryArea ?? null,
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        customer_email:
          data.customerEmail && data.customerEmail !== ""
            ? data.customerEmail
            : null,
        has_artwork: !!data.artworkStoragePath,
        consent_given: data.consentGiven,
        ip_address: ip === "unknown" ? null : ip,
      })
      .select("id, ref_number")
      .single();

    if (!error && inserted) {
      quoteId = inserted.id as string;
      refNumber = inserted.ref_number as string;
      break;
    }
    lastError = error;
    if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 1000));
  }

  if (!quoteId || !refNumber) {
    console.error("DB insert failed after 3 retries:", lastError);
    return NextResponse.json({ error: "DB_ERROR" }, { status: 500 });
  }

  // ── Insert status history ─────────────────────────────────────────────────
  await supabase.from("quote_status_history").insert({
    quote_id: quoteId,
    from_status: null,
    to_status: "new",
  });

  // ── Insert artwork file record ────────────────────────────────────────────
  if (data.artworkStoragePath) {
    await supabase.from("quote_files").insert({
      quote_id: quoteId,
      storage_path: data.artworkStoragePath,
      original_name: data.artworkStoragePath.split("/").pop() ?? "artwork",
      mime_type: "application/octet-stream",
      size_bytes: 0, // Size not available without server-side upload
    });
  }

  // ── Build WhatsApp URL ────────────────────────────────────────────────────
  const whatsappUrl = buildWhatsAppUrl({
    type: "quote_summary",
    refNumber,
    customerName: data.customerName,
    serviceName: data.serviceName,
    quantity: data.quantity,
    size: data.size ?? null,
    finish: data.finishOptions ?? null,
    deadline: new Date(data.deadline).toLocaleDateString("en-GB"),
    deliveryMethod: data.deliveryMethod,
    deliveryArea: data.deliveryArea ?? null,
  });

  // ── Send emails (non-blocking) ────────────────────────────────────────────
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const dashboardUrl = `${siteUrl}/admin/quotes/${quoteId}`;

  const whatsappReplyUrl = `https://wa.me/${data.customerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${data.customerName}, regarding your quote request ${refNumber}:`)}`;

  const emailPromises = [];

  // Customer confirmation
  if (data.customerEmail && data.customerEmail !== "") {
    emailPromises.push(
      resend.emails
        .send({
          from: FROM_EMAIL,
          to: data.customerEmail,
          subject: `Quote Request Received — ${refNumber} | Klean Image`,
          html: buildConfirmationHtml({
            customerName: data.customerName,
            refNumber,
            serviceName: data.serviceName,
            quantity: data.quantity,
            deadline: new Date(data.deadline).toLocaleDateString("en-GB"),
            whatsappUrl,
          }),
        })
        .then(async (res) => {
          await logEmail(supabase, {
            quoteId: quoteId!,
            recipient: data.customerEmail!,
            template: "quote_confirmation",
            status: "sent",
            resendId: res.data?.id,
          });
        })
        .catch(async (err: unknown) => {
          await logEmail(supabase, {
            quoteId: quoteId!,
            recipient: data.customerEmail!,
            template: "quote_confirmation",
            status: "failed",
            error: String(err),
          });
        }),
    );
  }

  // Owner notification
  if (OWNER_EMAIL && !OWNER_EMAIL.startsWith("TODO")) {
    emailPromises.push(
      resend.emails
        .send({
          from: FROM_EMAIL,
          to: OWNER_EMAIL,
          subject: `New Quote Request — ${refNumber} (${data.serviceName})`,
          html: buildNotificationHtml({
            refNumber,
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            customerEmail: data.customerEmail ?? null,
            serviceName: data.serviceName,
            quantity: data.quantity,
            size: data.size ?? null,
            paperFinish: data.paperFinish ?? null,
            finishOptions: data.finishOptions ?? null,
            deadline: new Date(data.deadline).toLocaleDateString("en-GB"),
            deliveryMethod: data.deliveryMethod,
            deliveryArea: data.deliveryArea ?? null,
            hasArtwork: !!data.artworkStoragePath,
            dashboardUrl,
            whatsappReplyUrl,
          }),
        })
        .then(async (res) => {
          await logEmail(supabase, {
            quoteId: quoteId!,
            recipient: OWNER_EMAIL,
            template: "quote_notification",
            status: "sent",
            resendId: res.data?.id,
          });
        })
        .catch(async (err: unknown) => {
          await logEmail(supabase, {
            quoteId: quoteId!,
            recipient: OWNER_EMAIL,
            template: "quote_notification",
            status: "failed",
            error: String(err),
          });
        }),
    );
  }

  // Fire and forget — don't await
  Promise.allSettled(emailPromises).catch(console.error);

  return NextResponse.json({ quoteId, refNumber, whatsappUrl }, { status: 201 });
}

export async function GET(request: NextRequest) {
  // TODO TASK-28: Admin list quotes — requires auth check
  void request; // used for future implementation
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}

// ── Email HTML builders (plain HTML strings — no react-dom/server needed) ────

function buildConfirmationHtml(p: {
  customerName: string;
  refNumber: string;
  serviceName: string;
  quantity: number;
  deadline: string;
  whatsappUrl: string;
}): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#fff">
  <div style="background:#E91E8C;padding:24px 32px;border-radius:8px 8px 0 0">
    <h1 style="color:#fff;margin:0;font-size:24px;font-weight:800">KLEAN IMAGE</h1>
    <p style="color:#fff;margin:4px 0 0;font-size:13px">Creative • Printing • Solutions</p>
  </div>
  <div style="padding:24px 32px;border:1px solid #E5E7EB;border-top:none;border-radius:0 0 8px 8px">
    <h2 style="color:#1A1A1A;font-size:18px;margin-top:0">Hi ${p.customerName}, we received your quote request!</h2>
    <p style="color:#374151;line-height:1.6">Thank you for choosing Klean Image. We'll review your request and get back to you as soon as possible.</p>
    <div style="background:#F9FAFB;border-radius:8px;padding:16px 20px;margin:20px 0">
      <h3 style="margin:0 0 12px;color:#1A1A1A;font-size:15px">Your Request Summary</h3>
      <p style="margin:4px 0;font-size:14px"><strong>Reference:</strong> ${p.refNumber}</p>
      <p style="margin:4px 0;font-size:14px"><strong>Service:</strong> ${p.serviceName}</p>
      <p style="margin:4px 0;font-size:14px"><strong>Quantity:</strong> ${p.quantity}</p>
      <p style="margin:4px 0;font-size:14px"><strong>Deadline:</strong> ${p.deadline}</p>
    </div>
    <a href="${p.whatsappUrl}" style="display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px">Continue on WhatsApp</a>
    <hr style="margin:24px 0;border-color:#E5E7EB">
    <p style="color:#6B7280;font-size:13px">Klean Image Creative Printing Solutions<br>43, Shipeolu Street, Shomolu, Lagos<br>WhatsApp: +234 808 299 6711</p>
  </div>
</body></html>`;
}

function buildNotificationHtml(p: {
  refNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  serviceName: string;
  quantity: number;
  size: string | null;
  paperFinish: string | null;
  finishOptions: string | null;
  deadline: string;
  deliveryMethod: string;
  deliveryArea: string | null;
  hasArtwork: boolean;
  dashboardUrl: string;
  whatsappReplyUrl: string;
}): string {
  const rows = [
    ["Reference", p.refNumber],
    ["Customer", p.customerName],
    ["Phone", p.customerPhone],
    ["Email", p.customerEmail ?? "Not provided"],
    ["Service", p.serviceName],
    ["Quantity", String(p.quantity)],
    ["Size", p.size ?? "Not specified"],
    ["Paper / Finish", p.paperFinish ?? "Not specified"],
    ["Finish Options", p.finishOptions ?? "Not specified"],
    ["Deadline", p.deadline],
    ["Delivery", p.deliveryMethod === "pickup" ? "Pickup from shop" : `Delivery to ${p.deliveryArea ?? "—"}`],
    ["Artwork", p.hasArtwork ? "Yes" : "No"],
  ];
  const rowsHtml = rows.map(([l, v]) => `<tr style="border-bottom:1px solid #F3F4F6"><td style="padding:8px 0;color:#6B7280;width:40%;font-size:13px">${l}</td><td style="padding:8px 0;color:#1A1A1A;font-size:13px">${v}</td></tr>`).join("");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#fff">
  <div style="background:#1A1A1A;padding:20px 32px;border-radius:8px 8px 0 0">
    <h1 style="color:#E91E8C;margin:0;font-size:20px">🖨 New Quote Request — ${p.refNumber}</h1>
  </div>
  <div style="padding:24px 32px;border:1px solid #E5E7EB;border-top:none;border-radius:0 0 8px 8px">
    <p style="color:#374151;margin-top:0">A new quote request has been submitted.</p>
    <table style="width:100%;border-collapse:collapse"><tbody>${rowsHtml}</tbody></table>
    <div style="margin-top:24px">
      <a href="${p.dashboardUrl}" style="display:inline-block;background:#E91E8C;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:700;font-size:14px;margin-right:12px">View in Dashboard</a>
      <a href="${p.whatsappReplyUrl}" style="display:inline-block;background:#25D366;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:700;font-size:14px">Reply on WhatsApp</a>
    </div>
  </div>
</body></html>`;
}
