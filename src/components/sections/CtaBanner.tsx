import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp/buildMessage";
import { MessageCircle, FileText } from "lucide-react";

export function CtaBanner() {
  const whatsappUrl = buildWhatsAppUrl({ type: "default" });

  return (
    <section className="bg-brand-magenta py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
          Ready to Bring Your Vision to Life?
        </h2>
        <p className="mt-4 text-lg text-white/80">
          Get a free quote today — or chat with us on WhatsApp for instant help.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="xl" className="bg-white text-brand-magenta hover:bg-brand-gray-100">
            <Link href="/quote">
              <FileText className="h-5 w-5" aria-hidden="true" />
              Request a Quote
            </Link>
          </Button>
          <Button asChild size="xl" variant="whatsapp">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
