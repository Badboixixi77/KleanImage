import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClipboardList, MessageSquare, Package } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Tell us what you need",
    description:
      "Fill out our quick quote form with your product type, size, quantity, and deadline. Or simply send us a message on WhatsApp.",
    colour: "text-brand-magenta",
    bg: "bg-brand-magenta/10",
  },
  {
    icon: MessageSquare,
    step: "02",
    title: "We prepare your quote",
    description:
      "Our team reviews your request and sends you a detailed price quote — usually within a few hours during business hours.",
    colour: "text-brand-cyan",
    bg: "bg-brand-cyan/10",
  },
  {
    icon: Package,
    step: "03",
    title: "We print and deliver",
    description:
      "Once you confirm, we get to work. Pick up from our Shomolu shop or arrange delivery to your location across Lagos.",
    colour: "text-brand-yellow",
    bg: "bg-brand-yellow/10",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-brand-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-extrabold text-brand-dark sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-brand-gray-500 max-w-xl mx-auto">
            Getting your prints is simple — just three easy steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 sm:grid-cols-3 relative">
          {/* Connector line (desktop) */}
          <div
            aria-hidden="true"
            className="hidden sm:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-brand-gray-200"
          />

          {STEPS.map((step) => (
            <div key={step.step} className="relative flex flex-col items-center text-center">
              <div className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full ${step.bg} mb-6`}>
                <step.icon className={`h-8 w-8 ${step.colour}`} aria-hidden="true" />
                <span className={`absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-dark text-[10px] font-bold text-white`}>
                  {step.step}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-brand-dark mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-brand-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/quote">Start Your Order</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
