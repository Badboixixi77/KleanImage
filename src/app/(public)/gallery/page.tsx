import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SERVICE_CATEGORIES } from "@/config/services";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View our portfolio of print work — business cards, banners, branded merchandise, packaging, and more from Klean Image in Lagos.",
};

// Gallery page requires client-side filtering; main content is a Client Component
// Server component wrapper handles metadata and static shell

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark text-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
            Our <span className="text-brand-magenta">Work</span>
          </h1>
          <p className="mt-4 max-w-2xl text-brand-gray-200">
            A selection of projects we&apos;ve printed for businesses, churches,
            schools, and events across Lagos.
          </p>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filter pills */}
          <div
            className="flex flex-wrap gap-2 mb-10"
            role="list"
            aria-label="Gallery filters"
          >
            {["All", ...SERVICE_CATEGORIES].map((cat) => (
              <span
                key={cat}
                role="listitem"
                className="rounded-full border border-brand-gray-200 px-4 py-1.5 text-sm font-medium text-brand-gray-700 first:bg-brand-magenta first:text-white first:border-brand-magenta cursor-pointer hover:border-brand-magenta hover:text-brand-magenta transition-colors"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Placeholder grid — replaced with real images in TASK-35 */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-xl bg-brand-gray-100"
                aria-label={`Gallery placeholder ${i + 1} — TODO: replace with real work photo`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <div className="h-8 w-8 rounded-full bg-brand-magenta/20 mb-2 flex items-center justify-center">
                    <span className="text-brand-magenta text-xs font-bold">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-xs text-brand-gray-500">
                    TODO: Real photo
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-brand-gray-500">
            {/* TODO TASK-35: Replace placeholders with real portfolio photos from Sanity CMS */}
            More work photos coming soon.
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
