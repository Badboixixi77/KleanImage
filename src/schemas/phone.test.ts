import { describe, it, expect } from "vitest";
import { normaliseNigerianPhone } from "./phone";
import { NigerianPhoneSchema } from "./phone";

describe("normaliseNigerianPhone", () => {
  // Valid formats
  it("normalises +234 E.164 format", () => {
    expect(normaliseNigerianPhone("+2348082996711")).toBe("+2348082996711");
  });
  it("normalises 080x format", () => {
    expect(normaliseNigerianPhone("08082996711")).toBe("+2348082996711");
  });
  it("normalises 070x format", () => {
    expect(normaliseNigerianPhone("07082996711")).toBe("+2347082996711");
  });
  it("normalises 081x format", () => {
    expect(normaliseNigerianPhone("08182996711")).toBe("+2348182996711");
  });
  it("normalises 090x format", () => {
    expect(normaliseNigerianPhone("09082996711")).toBe("+2349082996711");
  });
  it("normalises 091x format", () => {
    expect(normaliseNigerianPhone("09182996711")).toBe("+2349182996711");
  });
  it("strips spaces and dashes", () => {
    expect(normaliseNigerianPhone("0808 299 6711")).toBe("+2348082996711");
    expect(normaliseNigerianPhone("0808-299-6711")).toBe("+2348082996711");
  });
  it("handles 234 prefix without +", () => {
    expect(normaliseNigerianPhone("2348082996711")).toBe("+2348082996711");
  });

  // Invalid formats
  it("rejects UK numbers", () => {
    expect(normaliseNigerianPhone("+447911123456")).toBeNull();
  });
  it("rejects too short numbers", () => {
    expect(normaliseNigerianPhone("1234")).toBeNull();
  });
  it("rejects empty string", () => {
    expect(normaliseNigerianPhone("")).toBeNull();
  });
  it("rejects invalid Nigerian prefix (060x)", () => {
    expect(normaliseNigerianPhone("06082996711")).toBeNull();
  });
});

describe("NigerianPhoneSchema (Zod)", () => {
  it("transforms valid number to E.164", () => {
    const result = NigerianPhoneSchema.safeParse("08082996711");
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toBe("+2348082996711");
  });

  it("fails on invalid number", () => {
    const result = NigerianPhoneSchema.safeParse("12345");
    expect(result.success).toBe(false);
  });

  it("fails on empty string", () => {
    const result = NigerianPhoneSchema.safeParse("");
    expect(result.success).toBe(false);
  });
});
