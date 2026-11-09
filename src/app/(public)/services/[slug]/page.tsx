import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MessageCircle,
  FileText,
  Clock,
  Package,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICE_CATALOGUE } from "@/config/services";
import { buildWhatsAppUrl } from "@/lib/whatsapp/buildMessage";
import { CtaBanner } from "@/components/sections/CtaBanner";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICE_CATALOGUE.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_CATALOGUE.find((s) => s.slug === slug);
  if (!service) return { title: "Service not found" };
  return {
    title: `${service.name} Printing in Lagos`,
    description: `Professional ${service.name} printing services in Lagos by Klean Image. Quality prints, fast turnaround. Get a free quote today.`,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICE_CATALOGUE.find((s) => s.slug === slug);
  if (!service) notFound();

  const whatsappUrl = buildWhatsAppUrl({
    type: "service",
    serviceName: service.name,
  });

  const quoteUrl = `/quote?service=${service.slug}`;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-brand-gray-50 border-b border-brand-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-brand-gray-500"
          >
            <Link href="/" className="hover:text-brand-magenta">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/services" className="hover:text-brand-magenta">
              Services
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-brand-dark font-medium" aria-current="page">
              {service.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-brand-dark text-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm text-brand-gray-200 hover:text-brand-magenta mb-6"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All Services
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-magenta/20 px-3 py-1 text-xs font-semibold text-brand-magenta mb-4">
            {service.category}
          </div>
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-4 max-w-xl text-brand-gray-200">
            Professional {service.name.toLowerCase()} printing services in
            Lagos. Quality guaranteed, fast turnaround.
            {/* TODO: Replace with real description from Sanity CMS (TASK-07) */}
          </p>
        </div>
      </section>

      {/* Details */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Specs cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-brand-gray-200 p-5">
                <Clock
                  className="h-5 w-5 text-brand-magenta mb-2"
                  aria-hidden="true"
                />
                <p className="text-xs text-brand-gray-500 font-medium uppercase tracking-wide">
                  Turnaround
                </p>
                <p className="mt-1 font-semibold text-brand-dark">
                  {/* TODO: Populate from Sanity CMS */}
                  2–5 business days
                </p>
              </div>
              <div className="rounded-xl border border-brand-gray-200 p-5">
                <Package
                  className="h-5 w-5 text-brand-cyan mb-2"
                  aria-hidden="true"
                />
                <p className="text-xs text-brand-gray-500 font-medium uppercase tracking-wide">
                  Min. Order
                </p>
                <p className="mt-1 font-semibold text-brand-dark">
                  {/* TODO: Populate from Sanity CMS */}
                  50 units
                </p>
              </div>
              <div className="rounded-xl border border-brand-gray-200 p-5">
                <Layers
                  className="h-5 w-5 text-brand-yellow mb-2"
                  aria-hidden="true"
                />
                <p className="text-xs text-brand-gray-500 font-medium uppercase tracking-wide">
                  Starting from
                </p>
                <p className="mt-1 font-semibold text-brand-dark">
                  {/* TODO: Populate price from Sanity CMS */}
                  Request Quote
                </p>
              </div>
            </div>

            {/* Description placeholder */}
            <div className="prose prose-sm max-w-none text-brand-gray-700">
              <h2 className="font-display text-xl font-bold text-brand-dark">
                About this service
              </h2>
              <p>
                {/* TODO: Replace with Sanity rich text content (TASK-07) */}
                Klean Image offers professional {service.name.toLowerCase()}{" "}
                printing services for businesses, churches, schools, and
                individuals across Lagos. We use high-quality materials and
                modern printing equipment to deliver results you can be proud
                of.
              </p>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-2xl border border-brand-gray-200 bg-brand-gray-50 p-6">
              <h3 className="font-display text-lg font-bold text-brand-dark mb-2">
                Interested in {service.name}?
              </h3>
              <p className="text-sm text-brand-gray-500 mb-6">
                Fill out our quick quote form or chat with us on WhatsApp for
                pricing and availability.
              </p>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg" className="w-full">
                  <Link href={quoteUrl}>
                    <FileText className="h-4 w-4" aria-hidden="true" />
                    Get a Quote for This
                  </Link>
                </Button>
                <Button asChild size="lg" variant="whatsapp" className="w-full">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
