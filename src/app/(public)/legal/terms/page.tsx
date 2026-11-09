import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-4xl font-extrabold text-brand-dark mb-2">
        Terms and Conditions
      </h1>
      <p className="text-sm text-brand-gray-500 mb-10">
        Last updated: November 2026
      </p>

      <div className="prose prose-sm max-w-none text-brand-gray-700 space-y-8">
        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            1. Scope of Service
          </h2>
          <p>
            These Terms govern your use of the Klean Image website
            (kleanimage.com.ng) and the services offered by{" "}
            <strong>Klean Image Creative Printing Solutions</strong>, located at{" "}
            {siteConfig.address}, Lagos, Nigeria.
          </p>
          <p>
            By submitting a quote request or placing an order, you agree to
            these Terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            2. Orders and Quotes
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              A submitted quote request is not a confirmed order. An order is
              only confirmed when you have accepted the quote and made the
              agreed deposit or full payment.
            </li>
            <li>
              Prices quoted are valid for <strong>7 days</strong> unless
              otherwise stated.
            </li>
            <li>
              Klean Image reserves the right to decline any order at its
              discretion.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            3. Payment Terms
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>All prices are quoted in Nigerian Naira (₦).</li>
            <li>
              A deposit (typically 50–100%) is required before production
              begins. The exact amount will be confirmed in your quote.
            </li>
            <li>
              Online payment via Paystack will be available in a future update.
              Currently, payment is made in person or via bank transfer.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            4. Artwork and Intellectual Property
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              You confirm that you own or have the right to use all artwork,
              logos, and images you submit to Klean Image.
            </li>
            <li>
              Klean Image will not reproduce your artwork for any purpose other
              than fulfilling your order, except with your explicit permission
              (e.g. for our portfolio).
            </li>
            <li>
              Klean Image retains the right to display completed work in our
              portfolio unless you request otherwise in writing.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            5. Delivery and Turnaround
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Turnaround times are estimates and begin after artwork and payment
              confirmation are received.
            </li>
            <li>
              Klean Image is not liable for delays caused by factors outside our
              control (e.g. courier delays, public holidays).
            </li>
            <li>
              Delivery is available within Lagos. Delivery fees are charged
              separately and confirmed in the quote.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            6. Limitation of Liability
          </h2>
          <p>
            Klean Image&apos;s liability for any claim arising from an order
            shall not exceed the amount paid by you for that order. We are not
            liable for any indirect, consequential, or incidental damages.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            7. Governing Law
          </h2>
          <p>
            These Terms are governed by the laws of the{" "}
            <strong>Federal Republic of Nigeria</strong>. Any disputes shall be
            resolved in the courts of Lagos State, Nigeria.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            8. Contact
          </h2>
          <p>
            For questions about these Terms, contact us at {siteConfig.address}{" "}
            or WhatsApp: {siteConfig.whatsapp}.
          </p>
        </section>
      </div>
    </div>
  );
}
