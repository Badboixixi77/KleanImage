import { siteConfig } from "@/config/site";

interface DefaultContext {
  type: "default";
}

interface ServiceContext {
  type: "service";
  serviceName: string;
}

interface QuoteSummaryContext {
  type: "quote_summary";
  refNumber: string;
  customerName: string;
  serviceName: string;
  quantity: number;
  size: string | null;
  finish: string | null;
  deadline: string;
  deliveryMethod: "pickup" | "delivery";
  deliveryArea?: string | null;
}

export type WhatsAppContext =
  | DefaultContext
  | ServiceContext
  | QuoteSummaryContext;

/**
 * Builds a wa.me URL with a prefilled message.
 * The phone number is sourced from siteConfig to ensure it never goes stale.
 */
export function buildWhatsAppUrl(context: WhatsAppContext = { type: "default" }): string {
  const phone = siteConfig.whatsapp.replace(/\D/g, ""); // strip non-digits
  const message = buildMessage(context);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildMessage(context: WhatsAppContext = { type: "default" }): string {
  switch (context.type) {
    case "service":
      return `Hello Klean Image, I'm interested in ${context.serviceName} printing. Please can you share more details and pricing?`;

    case "quote_summary": {
      const lines = [
        `Hello Klean Image, I just submitted a quote request on your website.`,
        ``,
        `Reference: ${context.refNumber}`,
        `Name: ${context.customerName}`,
        `Service: ${context.serviceName}`,
        `Quantity: ${context.quantity}`,
        context.size ? `Size: ${context.size}` : null,
        context.finish ? `Finish: ${context.finish}` : null,
        `Deadline: ${context.deadline}`,
        `Delivery: ${context.deliveryMethod === "pickup" ? "Pickup from shop" : `Delivery to ${context.deliveryArea ?? "provided address"}`}`,
        ``,
        `Please confirm receipt. Thank you!`,
      ];
      return lines.filter((l) => l !== null).join("\n");
    }

    case "default":
    default:
      return `Hello Klean Image, I'd like to enquire about your printing services.`;
  }
}
