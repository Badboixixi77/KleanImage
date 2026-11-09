import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

const SERVICES_LINKS = [
  { label: "Business Cards", href: "/services/business-cards" },
  { label: "Flyers & Leaflets", href: "/services/flyers-leaflets" },
  { label: "Banners & Flex", href: "/services/banners-flex" },
  { label: "Branded T-Shirts", href: "/services/branded-t-shirts" },
  { label: "Brand Design", href: "/services/brand-design" },
  { label: "Box Branding", href: "/services/box-branding" },
  { label: "View all services →", href: "/services" },
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Get a Quote", href: "/quote" },
];

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/logo.svg"
              alt="Klean Image Creative Printing Solutions"
              width={150}
              height={48}
              className="h-12 w-auto brightness-0 invert mb-4"
            />
            <p className="text-sm text-brand-gray-200 leading-relaxed mb-4">
              Professional printing solutions in Lagos, Nigeria. Quality prints,
              fast turnaround, competitive prices.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Klean Image on Instagram"
                className="rounded-full bg-white/10 p-2 hover:bg-brand-magenta transition-colors"
              >
                {/* Instagram icon */}
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Klean Image on Facebook"
                className="rounded-full bg-white/10 p-2 hover:bg-brand-magenta transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Klean Image on X (Twitter)"
                className="rounded-full bg-white/10 p-2 hover:bg-brand-magenta transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gray-200 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-gray-200 hover:text-brand-magenta transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gray-200 mb-4">
              Our Services
            </h3>
            <ul className="space-y-2">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-gray-200 hover:text-brand-magenta transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-gray-200 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-brand-gray-200">
                <MapPin
                  className="h-4 w-4 text-brand-magenta mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{siteConfig.address}</span>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-brand-gray-200 hover:text-brand-magenta transition-colors"
                >
                  <MessageCircle
                    className="h-4 w-4 text-[#25D366] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{siteConfig.whatsapp}</span>
                </a>
              </li>
              {siteConfig.phone !== "TODO_OWNER_TO_PROVIDE" && (
                <li>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center gap-2 text-sm text-brand-gray-200 hover:text-brand-magenta transition-colors"
                  >
                    <Phone
                      className="h-4 w-4 text-brand-cyan shrink-0"
                      aria-hidden="true"
                    />
                    <span>{siteConfig.phone}</span>
                  </a>
                </li>
              )}
              {!siteConfig.email.startsWith("TODO") && (
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-2 text-sm text-brand-gray-200 hover:text-brand-magenta transition-colors"
                  >
                    <Mail
                      className="h-4 w-4 text-brand-cyan shrink-0"
                      aria-hidden="true"
                    />
                    <span>{siteConfig.email}</span>
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2 text-sm text-brand-gray-200">
                <Clock
                  className="h-4 w-4 text-brand-cyan mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <div>{siteConfig.hours.weekday}</div>
                  <div>{siteConfig.hours.saturday}</div>
                  <div>{siteConfig.hours.sunday}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brand-gray-500">
          <p>
            © {new Date().getFullYear()} Klean Image Creative Printing
            Solutions. All rights reserved.
          </p>
          <nav className="flex gap-4" aria-label="Legal">
            <Link
              href="/legal/privacy"
              className="hover:text-brand-magenta transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms"
              className="hover:text-brand-magenta transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/legal/refund-policy"
              className="hover:text-brand-magenta transition-colors"
            >
              Refund Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
