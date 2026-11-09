import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Klean Image Creative Printing Solutions — how we collect, use, and protect your personal data under the Nigeria Data Protection Act (NDPA) 2023.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-4xl font-extrabold text-brand-dark mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-brand-gray-500 mb-10">
        Last updated: November 2026
      </p>

      <div className="prose prose-sm max-w-none text-brand-gray-700 space-y-8">
        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            1. Who We Are
          </h2>
          <p>
            This Privacy Policy applies to{" "}
            <strong>Klean Image Creative Printing Solutions</strong>, located at{" "}
            {siteConfig.address} (&ldquo;Klean Image&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
            {/* TODO: Add CAC registration number when provided by owner */}
          </p>
          <p>
            We are committed to protecting your personal data and complying with
            the
            <strong> Nigeria Data Protection Act (NDPA) 2023</strong> and the
            Nigeria Data Protection Regulation (NDPR).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            2. Data We Collect
          </h2>
          <p>
            When you submit a quote request, we collect only the minimum data
            required:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Full name</strong> — to address you and process your order
            </li>
            <li>
              <strong>Phone number</strong> — to contact you via call or
              WhatsApp
            </li>
            <li>
              <strong>Email address</strong> (optional) — to send order
              confirmations
            </li>
            <li>
              <strong>Artwork files</strong> (optional) — uploaded files needed
              to produce your print job
            </li>
            <li>
              <strong>IP address</strong> — for security and fraud prevention
              only
            </li>
          </ul>
          <p>
            We do <strong>not</strong> collect payment card details on this
            website.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            3. How We Use Your Data
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To prepare and respond to your quote request</li>
            <li>
              To contact you about your order via WhatsApp, call, or email
            </li>
            <li>To send an order confirmation email (if email was provided)</li>
            <li>To improve our services through anonymised analytics</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            4. Data Retention
          </h2>
          <p>
            Quote request records are retained for <strong>2 years</strong> for
            business record purposes. Uploaded artwork files are retained for a
            maximum of <strong>90 days</strong> after a quote is marked as
            &ldquo;Delivered&rdquo; or &ldquo;Cancelled&rdquo;, after which they
            are permanently deleted.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            5. Third-Party Processors
          </h2>
          <p>
            We use the following third-party services to operate this website.
            Each is bound by appropriate data processing agreements:
          </p>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-brand-gray-200">
                <th className="text-left py-2 pr-4 font-semibold text-brand-dark">
                  Service
                </th>
                <th className="text-left py-2 font-semibold text-brand-dark">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gray-100">
              {[
                [
                  "Supabase",
                  "Database storage and file storage for quote requests and artwork",
                ],
                [
                  "Resend",
                  "Transactional email (order confirmations and notifications)",
                ],
                ["Vercel", "Website hosting and delivery"],
                ["Cloudflare", "DNS, security, and bot protection (Turnstile)"],
                ["Sentry", "Error tracking (no PII included in error reports)"],
                [
                  "Plausible Analytics",
                  "Anonymous website analytics — no cookies, no personal data",
                ],
                [
                  "Sanity",
                  "Content management system (no visitor data processed)",
                ],
              ].map(([name, purpose]) => (
                <tr key={name}>
                  <td className="py-2 pr-4 font-medium text-brand-dark">
                    {name}
                  </td>
                  <td className="py-2 text-brand-gray-600">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            6. Your Rights Under the NDPA 2023
          </h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>
              Request deletion of your data (&ldquo;right to be
              forgotten&rdquo;)
            </li>
            <li>Object to processing of your data</li>
            <li>Data portability (receive your data in a structured format)</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at:{" "}
            {/* TODO: Replace with real email when owner provides it */}
            <strong>
              {siteConfig.email.startsWith("TODO")
                ? "[owner to provide email address]"
                : siteConfig.email}
            </strong>{" "}
            or via WhatsApp at {siteConfig.whatsapp}.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            7. Cookies and Analytics
          </h2>
          <p>
            This website uses <strong>Plausible Analytics</strong>, a
            privacy-first analytics tool that does not use cookies and does not
            collect any personally identifiable information. No cookie consent
            banner is required.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            8. Contact
          </h2>
          <p>
            For any privacy concerns or data requests, contact Klean Image
            Creative Printing Solutions at {siteConfig.address}, WhatsApp:{" "}
            {siteConfig.whatsapp}.
          </p>
        </section>
      </div>
    </div>
  );
}
