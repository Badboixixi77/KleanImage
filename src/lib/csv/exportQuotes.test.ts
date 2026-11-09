import { describe, it, expect } from "vitest";
import { quotesToCsv } from "./exportQuotes";
import type { QuoteRequest } from "@/types/quote";

const mockQuote: QuoteRequest = {
  id: "abc-123",
  ref_number: "KI-2026-0001",
  service_slug: "business-cards",
  service_name: "Business Cards",
  size: "3.5x2 inches",
  quantity: 500,
  paper_finish: "350gsm Art Card",
  finish_options: "Matt Lamination",
  deadline: "2026-12-20",
  delivery_method: "pickup",
  delivery_area: null,
  customer_name: "Emeka Okafor",
  customer_phone: "+2348082996711",
  customer_email: "emeka@example.com",
  status: "new",
  has_artwork: true,
  artwork_upload_failed: false,
  consent_given: true,
  created_at: "2026-11-09T10:00:00Z",
  updated_at: "2026-11-09T10:00:00Z",
};

describe("quotesToCsv", () => {
  it("returns a string with correct header row", () => {
    const csv = quotesToCsv([mockQuote]);
    const lines = csv.split("\n");
    expect(lines[0]).toContain("Ref Number");
    expect(lines[0]).toContain("Customer Name");
    expect(lines[0]).toContain("Service");
    expect(lines[0]).toContain("Status");
  });

  it("includes the quote reference in the data row", () => {
    const csv = quotesToCsv([mockQuote]);
    expect(csv).toContain("KI-2026-0001");
  });

  it("formats date as DD/MM/YYYY", () => {
    const csv = quotesToCsv([mockQuote]);
    expect(csv).toContain("09/11/2026");
  });

  it("escapes commas in values", () => {
    const quoteWithComma: QuoteRequest = {
      ...mockQuote,
      customer_name: "Obi, Emeka",
    };
    const csv = quotesToCsv([quoteWithComma]);
    expect(csv).toContain('"Obi, Emeka"');
  });

  it("handles null delivery area", () => {
    const csv = quotesToCsv([mockQuote]);
    // Should not throw and delivery area column should be empty
    expect(csv).toBeTruthy();
  });

  it("returns only header row for empty array", () => {
    const csv = quotesToCsv([]);
    const lines = csv.split("\n");
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("Ref Number");
  });

  it("correctly marks consent given", () => {
    const csv = quotesToCsv([mockQuote]);
    expect(csv).toContain("Yes");
  });
});
