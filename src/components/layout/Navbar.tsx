"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          aria-label="Klean Image — Home"
        >
          {/* TODO: Replace logo.svg with logo.png once owner uploads the real PNG */}
          <Image
            src="/logo.svg"
            alt="Klean Image Creative Printing Solutions"
            width={160}
            height={50}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-brand-magenta",
                pathname === link.href
                  ? "text-brand-magenta font-semibold"
                  : "text-brand-gray-700",
              )}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button asChild size="default">
            <Link href="/quote">Get a Quote</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden rounded-md p-2 text-brand-gray-700 hover:bg-brand-gray-100"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-brand-gray-200 bg-white px-4 pb-4"
        >
          <nav
            className="flex flex-col gap-1 pt-2"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-base font-medium transition-colors",
                  pathname === link.href
                    ? "bg-brand-magenta/10 text-brand-magenta font-semibold"
                    : "text-brand-gray-700 hover:bg-brand-gray-50",
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/quote" onClick={() => setMobileOpen(false)}>
                  Get a Free Quote
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
