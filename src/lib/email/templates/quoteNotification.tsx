/**
 * Owner notification email sent when a new quote request is submitted.
 */
import * as React from "react";

interface QuoteNotificationEmailProps {
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
  deliveryMethod: "pickup" | "delivery";
  deliveryArea: string | null;
  hasArtwork: boolean;
  dashboardUrl: string;
  whatsappReplyUrl: string;
}

export function QuoteNotificationEmail({
  refNumber,
  customerName,
  customerPhone,
  customerEmail,
  serviceName,
  quantity,
  size,
  paperFinish,
  finishOptions,
  deadline,
  deliveryMethod,
  deliveryArea,
  hasArtwork,
  dashboardUrl,
  whatsappReplyUrl,
}: QuoteNotificationEmailProps) {
  const rows: Array<[string, string]> = [
    ["Reference", refNumber],
    ["Customer", customerName],
    ["Phone", customerPhone],
    ["Email", customerEmail ?? "Not provided"],
    ["Service", serviceName],
    ["Quantity", String(quantity)],
    ["Size", size ?? "Not specified"],
    ["Paper / Finish", paperFinish ?? "Not specified"],
    ["Finish Options", finishOptions ?? "Not specified"],
    ["Deadline", deadline],
    [
      "Delivery",
      deliveryMethod === "pickup"
        ? "Pickup from shop"
        : `Delivery to ${deliveryArea ?? "unspecified area"}`,
    ],
    ["Artwork uploaded", hasArtwork ? "Yes" : "No"],
  ];

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: 600,
        margin: "0 auto",
        padding: 24,
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          backgroundColor: "#1A1A1A",
          padding: "20px 32px",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <h1 style={{ color: "#E91E8C", margin: 0, fontSize: 20 }}>
          🖨 New Quote Request — {refNumber}
        </h1>
      </div>

      <div
        style={{
          padding: "24px 32px",
          border: "1px solid #E5E7EB",
          borderTop: "none",
          borderRadius: "0 0 8px 8px",
        }}
      >
        <p style={{ color: "#374151", marginTop: 0 }}>
          A new quote request has been submitted on the Klean Image website.
        </p>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label} style={{ borderBottom: "1px solid #F3F4F6" }}>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#6B7280",
                    width: "40%",
                    fontSize: 13,
                    verticalAlign: "top",
                  }}
                >
                  {label}
                </td>
                <td
                  style={{
                    padding: "8px 0",
                    color: "#1A1A1A",
                    fontSize: 13,
                    fontWeight: label === "Reference" ? 700 : 400,
                  }}
                >
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          <a
            href={dashboardUrl}
            style={{
              display: "inline-block",
              backgroundColor: "#E91E8C",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: 6,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 14,
              marginRight: 12,
            }}
          >
            View in Dashboard
          </a>
          <a
            href={whatsappReplyUrl}
            style={{
              display: "inline-block",
              backgroundColor: "#25D366",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: 6,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Reply on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
