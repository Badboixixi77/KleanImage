import React from "react";
import Link from "next/link";
import { ArrowRight, Printer, Megaphone, Shirt, Package, Palette, IdCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICE_CATALOGUE } from "@/config/services";

// Map service categories to icons
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Print: Printer,
  "Large Format": Megaphone,
  "Branded Merchandise": Shirt,
  Packaging: Package,
  "Design Services": Palette,
  Events: IdCard,
};

// Show the first 6 distinct categories on the home page
const HOME_SERVICES = [
  { slug: "business-cards", name: "Business Cards", category: "Print", description: "Professional cards that make lasting first impressions." },
  { slug: "banners-flex", name: "Banners & Flex", category: "Large Format", description: "High-impact outdoor and indoor banners for events and promos." },
  { slug: "branded-t-shirts", name: "Branded Merch", category: "Branded Merchandise", description: "T-shirts, caps, mugs, and souvenirs with your brand." },
  { slug: "box-branding", name: "Box Branding", category: "Packaging", description: "Custom-printed packaging boxes that elevate your product." },
  { slug: "brand-design", name: "Brand Design", category: "Design Services", description: "Logo and visual identity design that sets you apart." },
  { slug: "flyers-leaflets", name: "Flyers & Leaflets", category: "Print", description: "Eye-catching flyers for events, promotions, and campaigns." },
];

export function ServicesOverview() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-extrabold text-brand-dark sm:text-4xl">
            What We Do
          </h2>
          <p className="mt-3 text-brand-gray-500 max-w-xl mx-auto">
            From single-page flyers to full brand packages — we handle print
            and design for businesses, churches, schools, and events across Lagos.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_SERVICES.map((service) => {
            const Icon = CATEGORY_ICONS[service.category] ?? Printer;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group"
              >
                <Card className="h-full transition-shadow hover:shadow-md hover:border-brand-magenta/30">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-magenta/10">
                      <Icon className="h-6 w-6 text-brand-magenta" aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-bold text-brand-dark mb-1">
                      {service.name}
                    </h3>
                    <p className="text-sm text-brand-gray-500 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-magenta group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-magenta hover:underline"
          >
            View all {SERVICE_CATALOGUE.length} services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
