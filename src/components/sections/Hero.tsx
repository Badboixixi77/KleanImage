import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp/buildMessage";
import { MessageCircle, ArrowRight } from "lucide-react";

export function Hero() {
  const whatsappUrl = buildWhatsAppUrl({ type: "default" });

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark to-[#2d1a2e] text-white">
      {/* Background CMYK accent circles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-brand-magenta/20 blur-3xl" />
        <div className="absolute top-1/2 -left-20 h-64 w-64 rounded-full bg-brand-cyan/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-48 w-48 rounded-full bg-brand-yellow/10 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-magenta/30 bg-brand-magenta/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-magenta">
            Printing Press · Shomolu, Lagos
          </p>

          {/* Headline */}
          <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Your Vision,{" "}
            <span className="text-brand-magenta">Printed Perfectly</span>
          </h1>

          {/* Subline */}
          <p className="mt-6 text-lg text-brand-gray-200 leading-relaxed max-w-xl">
            From business cards to full-scale branding — Klean Image delivers
            quality prints with fast turnaround right here in Lagos.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="xl">
              <Link href="/quote">
                Get a Free Quote
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-dark">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-gray-200">
            {["Fast Turnaround", "Quality Guaranteed", "Competitive Pricing", "Lagos-Based"].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-magenta" aria-hidden="true" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
