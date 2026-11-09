import type { Metadata } from "next";
import { MapPin, Phone, MessageCircle, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp/buildMessage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Klean Image Creative Printing Solutions in Shomolu, Lagos. Call, WhatsApp, or visit us at 43 Shipeolu Street.",
};

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl({ type: "default" });

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark text-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
            Contact <span className="text-brand-magenta">Us</span>
          </h1>
          <p className="mt-4 max-w-2xl text-brand-gray-200">
            Visit our shop, call us, or send a WhatsApp message — we&apos;re
            here to help.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2">
          {/* Contact details */}
          <div className="space-y-8">
            <h2 className="font-display text-2xl font-bold text-brand-dark">
              Get in Touch
            </h2>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-magenta/10">
                <MapPin
                  className="h-5 w-5 text-brand-magenta"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className="font-semibold text-brand-dark">Our Shop</p>
                <p className="text-brand-gray-700">{siteConfig.address}</p>
                <a
                  href={siteConfig.googleMaps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-sm font-medium text-brand-magenta hover:underline"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Business hours */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-cyan/10">
                <Clock className="h-5 w-5 text-brand-cyan" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-brand-dark">Business Hours</p>
                <p className="text-brand-gray-700">
                  {siteConfig.hours.weekday}
                </p>
                <p className="text-brand-gray-700">
                  {siteConfig.hours.saturday}
                </p>
                <p className="text-brand-gray-500 text-sm">
                  {siteConfig.hours.sunday}
                </p>
              </div>
            </div>

            {/* WhatsApp — primary CTA */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10">
                <MessageCircle
                  className="h-5 w-5 text-[#25D366]"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className="font-semibold text-brand-dark">WhatsApp</p>
                <p className="text-brand-gray-700">{siteConfig.whatsapp}</p>
                <Button asChild size="sm" variant="whatsapp" className="mt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Send a Message
                  </a>
                </Button>
              </div>
            </div>

            {/* Phone */}
            {siteConfig.phone !== "TODO_OWNER_TO_PROVIDE" && (
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-magenta/10">
                  <Phone
                    className="h-5 w-5 text-brand-magenta"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="font-semibold text-brand-dark">Phone</p>
                  <Button asChild size="sm" variant="outline" className="mt-1">
                    <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
                  </Button>
                </div>
              </div>
            )}

            {/* Email */}
            {!siteConfig.email.startsWith("TODO") && (
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-cyan/10">
                  <Mail
                    className="h-5 w-5 text-brand-cyan"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="font-semibold text-brand-dark">Email</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-brand-cyan hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            )}

            {/* Mobile CTA buttons (large, for easy tapping) */}
            <div className="flex flex-col gap-3 pt-4 sm:hidden">
              <Button asChild size="xl" variant="whatsapp" className="w-full">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              </Button>
              {siteConfig.phone !== "TODO_OWNER_TO_PROVIDE" && (
                <Button asChild size="xl" variant="outline" className="w-full">
                  <a href={`tel:${siteConfig.phone}`}>
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    Call Us
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-brand-dark">
              Find Us on the Map
            </h2>
            <div className="overflow-hidden rounded-2xl border border-brand-gray-200 aspect-[4/3] bg-brand-gray-100">
              {/* TODO: Replace with real Google Maps embed once owner provides API key / embed src */}
              {/* <iframe
                src={siteConfig.googleMaps.embedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Klean Image location on Google Maps"
              /> */}
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <MapPin
                  className="h-12 w-12 text-brand-magenta mb-4"
                  aria-hidden="true"
                />
                <p className="font-semibold text-brand-dark">
                  {siteConfig.address}
                </p>
                <a
                  href={siteConfig.googleMaps.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 rounded-lg bg-brand-magenta px-4 py-2 text-sm font-semibold text-white hover:bg-brand-magenta/90 transition-colors"
                >
                  Open in Google Maps →
                </a>
                <p className="mt-4 text-xs text-brand-gray-500">
                  {/* TODO: Embed real map once Google Maps API key is provided */}
                  Map embed coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
