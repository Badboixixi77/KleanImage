import { z } from "zod";

/**
 * Validates Nigerian phone numbers and normalises to E.164 format.
 *
 * Accepted formats:
 *   +2348082996711   → +2348082996711
 *   08082996711      → +2348082996711
 *   8082996711       → +2348082996711
 *   +234 808 299 6711 → +2348082996711
 *
 * Valid Nigerian network prefixes: 070, 080, 081, 090, 091
 */

const NIGERIAN_PREFIXES = ["70", "80", "81", "90", "91"];

export function normaliseNigerianPhone(raw: string): string | null {
  // Strip all non-digit characters
  const digits = raw.replace(/\D/g, "");

  let local: string;

  if (digits.startsWith("234") && digits.length === 13) {
    // Already +234 format without the +
    local = digits.slice(3);
  } else if (digits.startsWith("0") && digits.length === 11) {
    // 080XXXXXXXX
    local = digits.slice(1);
  } else if (digits.length === 10) {
    // 80XXXXXXXX (no leading 0)
    local = digits;
  } else {
    return null;
  }

  // Validate the 10-digit local number
  if (local.length !== 10) return null;

  const prefix = local.slice(0, 2);
  if (!NIGERIAN_PREFIXES.includes(prefix)) return null;

  return `+234${local}`;
}

export const NigerianPhoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .transform((val, ctx) => {
    const normalised = normaliseNigerianPhone(val);
    if (!normalised) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Please enter a valid Nigerian phone number (e.g. 0808 299 6711)",
      });
      return z.NEVER;
    }
    return normalised;
  });
