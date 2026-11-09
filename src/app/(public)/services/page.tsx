import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Printer,
  Megaphone,
  Shirt,
  Package,
  Palette,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  SERVICE_CATALOGUE,
  SERVICE_CATEGORIES,
  type ServiceCategory,
} from "@/config/services";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Klean Image's full range of printing and branding services in Lagos — business cards, banners, branded merchandise, packaging, design, and more.",
};

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Print: Printer,
  "Large Format": Megaphone,
  "Branded Merchandise": Shirt,
  Packaging: Package,
  "Design Services": Palette,
  Events: Star,
};

export default function ServicesPage() {
  const grouped = SERVICE_CATEGORIES.map((cat) => ({
    category: cat as ServiceCategory,
    services: SERVICE_CATALOGUE.filter((s) => s.category === cat),
  })).filter((g) => g.services.length > 0);

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark text-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
            Our <span className="text-brand-magenta">Services</span>
          </h1>
          <p className="mt-4 max-w-2xl text-brand-gray-200">
            Everything you need for print, branding, and design — all under one
            roof in Shomolu, Lagos.
          </p>
        </div>
      </section>

      {/* Service categories */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {grouped.map(({ category, services }) => {
            const Icon = CATEGORY_ICONS[category] ?? Printer;
            return (
              <div key={category}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-magenta/10">
                    <Icon
                      className="h-5 w-5 text-brand-magenta"
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-brand-dark">
                    {category}
                  </h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="group"
                    >
                      <Card className="h-full transition-all hover:shadow-md hover:border-brand-magenta/40">
                        <CardContent className="pt-6">
                          <h3 className="font-display font-bold text-brand-dark mb-2">
                            {service.name}
                          </h3>
                          <p className="text-sm text-brand-gray-500 mb-4">
                            Professional {service.name.toLowerCase()} printing
                            services.
                            {/* TODO: Add real descriptions via Sanity CMS in TASK-07 */}
                          </p>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-magenta group-hover:gap-2 transition-all">
                            Learn more & get a quote
                            <ArrowRight
                              className="h-3 w-3"
                              aria-hidden="true"
                            />
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
