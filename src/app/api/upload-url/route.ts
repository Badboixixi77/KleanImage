import { NextRequest, NextResponse } from "next/server";
import { UploadFileQuerySchema } from "@/schemas/uploadFile";
import { createServerClient } from "@/lib/supabase/server";
import { checkRateLimit, RATE_LIMITS } from "@/lib/validation/rateLimit";

function sanitiseFilename(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-");
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10);
}

export async function GET(request: NextRequest) {
  // Rate limit
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const rateCheck = checkRateLimit(`upload:${ip}`, RATE_LIMITS.uploadUrl);
  if (!rateCheck.allowed) {
    return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
  }

  // Validate query params
  const { searchParams } = new URL(request.url);
  const parsed = UploadFileQuerySchema.safeParse({
    filename: searchParams.get("filename"),
    mimeType: searchParams.get("mimeType"),
  });
  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_MIME_TYPE", message: parsed.error.issues[0]?.message },
      { status: 400 },
    );
  }

  const { filename } = parsed.data;
  // mimeType is validated above; Supabase Storage infers type from upload headers
  const storagePath = `artwork/${generateId()}/${sanitiseFilename(filename)}`;

  const supabase = createServerClient();
  const { data, error } = await supabase.storage
    .from("artwork")
    .createSignedUploadUrl(storagePath, { upsert: false });

  if (error || !data) {
    console.error("Supabase signed URL error:", error);
    return NextResponse.json(
      { error: "STORAGE_ERROR" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    uploadUrl: data.signedUrl,
    storagePath,
  });
}
