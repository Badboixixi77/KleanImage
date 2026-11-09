import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description:
    "Request a free printing quote from Klean Image in Lagos. Tell us what you need and we'll get back to you quickly.",
};

interface QuotePageProps {
  searchParams: Promise<{ service?: string }>;
}

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const { service } = await searchParams;

  return (
    <div className="bg-brand-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-brand-dark text-white py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
            Get a <span className="text-brand-magenta">Free Quote</span>
          </h1>
          <p className="mt-3 text-brand-gray-200">
            Fill in the details below and we&apos;ll respond as quickly as
            possible.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <QuoteForm preselectedService={service} />
        </div>
      </section>
    </div>
  );
}
