import { describe, it, expect } from "vitest";
import { buildMessage, buildWhatsAppUrl } from "./buildMessage";

describe("buildMessage", () => {
  it("returns default greeting when no context provided", () => {
    const msg = buildMessage({ type: "default" });
    expect(msg).toContain("Hello Klean Image");
    expect(msg).toContain("printing services");
  });

  it("returns service-specific message for service context", () => {
    const msg = buildMessage({
      type: "service",
      serviceName: "Business Cards",
    });
    expect(msg).toContain("Business Cards");
    expect(msg).toContain("Hello Klean Image");
  });

  it("returns quote summary message with all key fields", () => {
    const msg = buildMessage({
      type: "quote_summary",
      refNumber: "KI-2026-0001",
      customerName: "Emeka Okafor",
      serviceName: "Flyers & Leaflets",
      quantity: 500,
      size: "A5",
      finish: "Gloss",
      deadline: "20/12/2026",
      deliveryMethod: "delivery",
      deliveryArea: "Victoria Island",
    });
    expect(msg).toContain("KI-2026-0001");
    expect(msg).toContain("Emeka Okafor");
    expect(msg).toContain("Flyers & Leaflets");
    expect(msg).toContain("500");
    expect(msg).toContain("Victoria Island");
  });

  it("handles null size and finish gracefully in quote summary", () => {
    const msg = buildMessage({
      type: "quote_summary",
      refNumber: "KI-2026-0002",
      customerName: "Amaka Nwosu",
      serviceName: "Business Cards",
      quantity: 100,
      size: null,
      finish: null,
      deadline: "15/12/2026",
      deliveryMethod: "pickup",
    });
    expect(msg).toContain("KI-2026-0002");
    expect(msg).toContain("Pickup from shop");
    // Null fields should not appear as "null" in the message
    expect(msg).not.toContain("null");
  });

  it("uses default message when called with no args", () => {
    const msg = buildMessage();
    expect(msg).toContain("Hello Klean Image");
  });
});

describe("buildWhatsAppUrl", () => {
  it("returns a valid wa.me URL", () => {
    const url = buildWhatsAppUrl({ type: "default" });
    expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
  });

  it("includes the Klean Image WhatsApp number", () => {
    const url = buildWhatsAppUrl({ type: "default" });
    expect(url).toContain("2348082996711");
  });

  it("encodes special characters in the message", () => {
    const url = buildWhatsAppUrl({
      type: "service",
      serviceName: "Banners & Flex",
    });
    // & must be encoded
    expect(url).toContain("%26");
  });
});
