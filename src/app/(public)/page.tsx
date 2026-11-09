import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `${siteConfig.shortName} — Creative Printing Solutions in Lagos`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.shortName} — Creative Printing Solutions in Lagos`,
    description: siteConfig.description,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <HowItWorks />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
