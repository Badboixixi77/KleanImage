import React from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  _id: string;
  reviewerName: string;
  reviewerRole: string;
  body: string;
  rating: number;
}

// Seed/placeholder testimonials — replace with real CMS data in TASK-35
const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    _id: "1",
    reviewerName: "Chukwuemeka Obi",
    reviewerRole: "CEO, Obi Ventures",
    body: "Klean Image printed our event banners overnight and the quality was exceptional. Will definitely be coming back for all our printing needs.",
    rating: 5,
  },
  {
    _id: "2",
    reviewerName: "Adaeze Nwosu",
    reviewerRole: "Event Planner",
    body: "Fast delivery, beautiful prints, and very professional service. They handled our wedding invitations and stationery perfectly.",
    rating: 5,
  },
  {
    _id: "3",
    reviewerName: "Pastor Biodun Adeyemi",
    reviewerRole: "Lead Pastor, Grace Chapel",
    body: "We order our flyers and banners from Klean Image regularly. Always on time, always quality. Highly recommended.",
    rating: 5,
  },
];

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export function Testimonials({ testimonials = PLACEHOLDER_TESTIMONIALS }: TestimonialsProps) {
  return (
    <section className="bg-brand-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-extrabold text-brand-dark sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-brand-gray-500">
            Trusted by businesses, churches, schools, and event planners across Lagos.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t._id} className="flex flex-col">
              <CardContent className="pt-6 flex flex-col flex-1">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < t.rating ? "fill-brand-yellow text-brand-yellow" : "text-brand-gray-200"}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                {/* Quote */}
                <blockquote className="flex-1 text-sm text-brand-gray-700 leading-relaxed mb-4">
                  &ldquo;{t.body}&rdquo;
                </blockquote>
                {/* Reviewer */}
                <div className="flex items-center gap-3 pt-4 border-t border-brand-gray-100">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-magenta font-display font-bold text-sm text-white">
                    {t.reviewerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-dark">{t.reviewerName}</p>
                    <p className="text-xs text-brand-gray-500">{t.reviewerRole}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
