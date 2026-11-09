import { Resend } from "resend";

/**
 * Resend client — server-side only.
 * Lazily initialised so the build doesn't fail when RESEND_API_KEY is absent
 * (e.g. in CI or local dev before .env.local is created).
 */

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY ?? "re_placeholder";
    _resend = new Resend(key);
  }
  return _resend;
}

// Convenience alias for direct use
export const resend = {
  emails: {
    send: (...args: Parameters<Resend["emails"]["send"]>) =>
      getResend().emails.send(...args),
  },
};

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "quotes@kleanimage.com.ng";

export const OWNER_EMAIL =
  process.env.OWNER_EMAIL ?? "TODO_OWNER_EMAIL@example.com";
