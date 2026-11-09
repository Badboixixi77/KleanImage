import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Award, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Klean Image Creative Printing Solutions — our story, our team, and our commitment to quality printing in Lagos, Nigeria.",
};

const VALUES = [
  {
    icon: Award,
    title: "Quality First",
    description:
      "We never compromise on print quality. Every job is checked before it leaves our shop.",
    color: "text-brand-magenta",
    bg: "bg-brand-magenta/10",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "We understand your deadlines. Most standard jobs are ready within 2–5 business days.",
    color: "text-brand-cyan",
    bg: "bg-brand-cyan/10",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description:
      "We work closely with every client — from small businesses to large events — to get it right.",
    color: "text-brand-yellow",
    bg: "bg-brand-yellow/10",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark text-white py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
            About <span className="text-brand-magenta">Klean Image</span>
          </h1>
          <p className="mt-4 max-w-2xl text-brand-gray-200">
            Creative • Printing • Solutions — based in the heart of Shomolu,
            Lagos.
          </p>
        </div>
      </section>

      {/* Company story */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold text-brand-dark mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-brand-gray-700 leading-relaxed">
              <p>
                Klean Image Creative Printing Solutions is a full-service
                printing press located at {siteConfig.address}. We provide
                high-quality print and branding services to businesses,
                churches, schools, and event planners across Lagos.
              </p>
              <p>
                {/* TODO: Owner to provide the full company story and founding year */}
                From humble beginnings in Shomolu, we have grown into a trusted
                name for everything from business cards and flyers to
                large-format banners and branded merchandise.
              </p>
              <p>
                Our CMYK printing expertise combined with our commitment to
                customer satisfaction makes us the go-to printing partner for
                clients who demand quality without compromise.
              </p>
            </div>
            <div className="mt-8">
              <Button asChild>
                <Link href="/quote">Get a Quote</Link>
              </Button>
            </div>
          </div>

          {/* Placeholder image */}
          <div className="rounded-2xl bg-brand-gray-100 aspect-[4/3] flex items-center justify-center">
            <p className="text-sm text-brand-gray-500 text-center p-8">
              {/* TODO TASK-35: Replace with real shop / team photo */}
              Shop / team photo coming soon
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-gray-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-extrabold text-brand-dark text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${value.bg} mb-4`}
                >
                  <value.icon
                    className={`h-7 w-7 ${value.color}`}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-display font-bold text-brand-dark mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-brand-gray-500">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team — placeholder */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-extrabold text-brand-dark text-center mb-4">
            Meet the Team
          </h2>
          <p className="text-center text-brand-gray-500 mb-12">
            {/* TODO TASK-35: Owner to provide team member names, roles, and photos */}
            Team profiles coming soon.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-brand-gray-200 p-6 flex flex-col items-center text-center"
              >
                <div className="h-20 w-20 rounded-full bg-brand-gray-100 mb-4 flex items-center justify-center">
                  <Users
                    className="h-8 w-8 text-brand-gray-500"
                    aria-hidden="true"
                  />
                </div>
                <p className="font-semibold text-brand-dark">Team Member {i}</p>
                <p className="text-sm text-brand-gray-500">TODO: Role</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-brand-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <MapPin
            className="h-8 w-8 text-brand-magenta mx-auto mb-4"
            aria-hidden="true"
          />
          <h2 className="font-display text-2xl font-bold text-brand-dark mb-2">
            Find Us
          </h2>
          <p className="text-brand-gray-700">{siteConfig.address}</p>
          <a
            href={siteConfig.googleMaps.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-magenta hover:underline"
          >
            Get Directions →
          </a>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
