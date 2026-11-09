/**
 * Customer confirmation email sent after a successful quote submission.
 * Uses react-email components for reliable cross-client rendering.
 */
import * as React from "react";

interface QuoteConfirmationEmailProps {
  customerName: string;
  refNumber: string;
  serviceName: string;
  quantity: number;
  deadline: string;
  whatsappUrl: string;
}

export function QuoteConfirmationEmail({
  customerName,
  refNumber,
  serviceName,
  quantity,
  deadline,
  whatsappUrl,
}: QuoteConfirmationEmailProps) {
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
      {/* Header */}
      <div
        style={{
          backgroundColor: "#E91E8C",
          padding: "24px 32px",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <h1
          style={{ color: "#fff", margin: 0, fontSize: 24, fontWeight: 800 }}
        >
          KLEAN IMAGE
        </h1>
        <p style={{ color: "#fff", margin: "4px 0 0", fontSize: 13 }}>
          Creative • Printing • Solutions
        </p>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "24px 32px",
          border: "1px solid #E5E7EB",
          borderTop: "none",
          borderRadius: "0 0 8px 8px",
        }}
      >
        <h2 style={{ color: "#1A1A1A", fontSize: 18, marginTop: 0 }}>
          Hi {customerName}, we received your quote request!
        </h2>

        <p style={{ color: "#374151", lineHeight: 1.6 }}>
          Thank you for choosing Klean Image. We&apos;ll review your request and
          get back to you as soon as possible — usually within a few hours
          during business hours.
        </p>

        {/* Quote summary */}
        <div
          style={{
            backgroundColor: "#F9FAFB",
            borderRadius: 8,
            padding: "16px 20px",
            margin: "20px 0",
          }}
        >
          <h3 style={{ margin: "0 0 12px", color: "#1A1A1A", fontSize: 15 }}>
            Your Request Summary
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    padding: "6px 0",
                    color: "#6B7280",
                    width: "40%",
                    fontSize: 14,
                  }}
                >
                  Reference
                </td>
                <td
                  style={{
                    padding: "6px 0",
                    color: "#1A1A1A",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {refNumber}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "#6B7280", fontSize: 14 }}>
                  Service
                </td>
                <td style={{ padding: "6px 0", color: "#1A1A1A", fontSize: 14 }}>
                  {serviceName}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "#6B7280", fontSize: 14 }}>
                  Quantity
                </td>
                <td style={{ padding: "6px 0", color: "#1A1A1A", fontSize: 14 }}>
                  {quantity}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "#6B7280", fontSize: 14 }}>
                  Deadline
                </td>
                <td style={{ padding: "6px 0", color: "#1A1A1A", fontSize: 14 }}>
                  {deadline}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ color: "#374151", lineHeight: 1.6 }}>
          Want a faster response? Chat with us directly on WhatsApp — just tap
          the button below.
        </p>

        <a
          href={whatsappUrl}
          style={{
            display: "inline-block",
            backgroundColor: "#25D366",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          Continue on WhatsApp
        </a>

        <hr style={{ margin: "24px 0", borderColor: "#E5E7EB" }} />

        <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.6 }}>
          <strong>Klean Image Creative Printing Solutions</strong>
          <br />
          43, Shipeolu Street, Shomolu, Lagos, Nigeria
          <br />
          WhatsApp: +234 808 299 6711
          <br />
          Mon–Fri: 8:00am–6:00pm | Sat: 9:00am–4:00pm
        </p>
      </div>
    </div>
  );
}
