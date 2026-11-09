import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Refund & Reprint Policy",
};

export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-4xl font-extrabold text-brand-dark mb-2">
        Refund &amp; Reprint Policy
      </h1>
      <p className="text-sm text-brand-gray-500 mb-10">
        Last updated: November 2026
      </p>

      <div className="prose prose-sm max-w-none text-brand-gray-700 space-y-8">
        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            1. Our Commitment
          </h2>
          <p>
            At Klean Image, we stand behind the quality of our work. If we make
            a printing error, we will reprint your order at no additional cost
            or issue a refund.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            2. When a Reprint is Offered
          </h2>
          <p>We will reprint your order free of charge if:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              The print quality is significantly below the agreed standard
            </li>
            <li>
              The wrong product, size, or specification was produced due to our
              error
            </li>
            <li>Items are damaged or defective</li>
          </ul>
          <p>
            Claims must be made within <strong>48 hours</strong> of receiving
            your order. Photos or samples of the defective items must be
            provided.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            3. When a Refund is Offered
          </h2>
          <p>A full or partial refund is offered when:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              A reprint cannot be completed in a reasonable timeframe due to our
              operational constraints
            </li>
            <li>
              The order cannot be reprinted due to an unrecoverable error on our
              part
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            4. When Reprints/Refunds Do Not Apply
          </h2>
          <p>
            We are unable to offer reprints or refunds in the following
            situations:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              The error is in the artwork you provided (spelling mistakes, wrong
              colours, low-resolution images)
            </li>
            <li>
              You approved a proof and the final print matches the approved
              proof
            </li>
            <li>
              You change your mind about the design, colour, or product after
              production has started
            </li>
            <li>
              The claim is made more than 48 hours after delivery/collection
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            5. How to Make a Claim
          </h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Contact us within 48 hours of receiving your order</li>
            <li>
              Send photos or samples of the defective items via WhatsApp:{" "}
              {siteConfig.whatsapp}
            </li>
            <li>Quote your order reference number (e.g. KI-2026-0001)</li>
            <li>Our team will assess your claim within 24 business hours</li>
          </ol>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-brand-dark">
            6. Contact
          </h2>
          <p>
            For all claims and enquiries, WhatsApp us at{" "}
            <strong>{siteConfig.whatsapp}</strong> or visit us at{" "}
            {siteConfig.address}.
          </p>
        </section>
      </div>
    </div>
  );
}
