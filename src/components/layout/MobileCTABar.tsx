"use client";
import React from "react";
import Link from "next/link";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp/buildMessage";

export function MobileCTABar() {
  const whatsappUrl = buildWhatsAppUrl({ type: "default" });

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex border-t border-brand-gray-200 bg-white shadow-lg"
      aria-label="Quick contact actions"
    >
      {/* Call */}
      <a
        href={`tel:${siteConfig.phone}`}
        className="flex flex-1 flex-col items-center justify-center gap-1 py-3 text-brand-gray-700 hover:text-brand-cyan transition-colors min-h-[56px]"
        aria-label="Call Klean Image"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        <span className="text-[10px] font-medium">Call</span>
      </a>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col items-center justify-center gap-1 py-3 text-brand-gray-700 hover:text-[#25D366] transition-colors min-h-[56px]"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span className="text-[10px] font-medium">WhatsApp</span>
      </a>

      {/* Get Quote */}
      <Link
        href="/quote"
        className="flex flex-1 flex-col items-center justify-center gap-1 bg-brand-magenta py-3 text-white hover:bg-brand-magenta/90 transition-colors min-h-[56px]"
        aria-label="Get a quote"
      >
        <FileText className="h-5 w-5" aria-hidden="true" />
        <span className="text-[10px] font-medium">Get Quote</span>
      </Link>
    </nav>
  );
}
