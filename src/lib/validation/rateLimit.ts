/**
 * Simple in-memory rate limiter for API routes.
 *
 * NOTE: This is a per-instance limiter. For production on Vercel (serverless),
 * replace with Upstash Redis rate limiting (@upstash/ratelimit) to share state
 * across function instances. This implementation is suitable for development
 * and single-instance deployments.
 *
 * TODO: Replace with Upstash Redis before going to production at scale.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitRecord>();

interface RateLimitOptions {
  /** Maximum number of requests allowed within the window */
  limit: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(
  key: string,
  options: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  const record = store.get(key);

  if (!record || now > record.resetAt) {
    // First request or window expired — reset
    const newRecord: RateLimitRecord = {
      count: 1,
      resetAt: now + options.windowMs,
    };
    store.set(key, newRecord);
    return {
      allowed: true,
      remaining: options.limit - 1,
      resetAt: newRecord.resetAt,
    };
  }

  if (record.count >= options.limit) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: options.limit - record.count,
    resetAt: record.resetAt,
  };
}

/** Rate limit presets */
export const RATE_LIMITS = {
  quoteSubmission: { limit: 10, windowMs: 60 * 60 * 1000 }, // 10/hour
  uploadUrl: { limit: 5, windowMs: 60 * 60 * 1000 }, // 5/hour
} as const;
