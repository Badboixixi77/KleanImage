/**
 * Feature flags — Phase 2 Paystack and customer accounts are hidden behind
 * NEXT_PUBLIC_FEATURE_PAYSTACK until Phase 2 implementation begins.
 * Set to "true" in .env to enable.
 */
export const FEATURE_PAYSTACK =
  process.env.NEXT_PUBLIC_FEATURE_PAYSTACK === "true";
