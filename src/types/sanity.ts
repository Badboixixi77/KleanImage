/**
 * TypeScript types for Sanity CMS document shapes.
 * These are hand-written; use `sanity typegen` to generate from schema once
 * the Sanity project is initialised.
 */

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityBlock {
  _type: "block";
  _key: string;
  style: string;
  children: Array<{ _type: "span"; _key: string; text: string; marks: string[] }>;
}

export type ServiceCategory =
  | "Print"
  | "Large Format"
  | "Branded Merchandise"
  | "Packaging"
  | "Design Services"
  | "Events";

export interface SanityService {
  _id: string;
  _type: "service";
  name: string;
  slug: SanitySlug;
  category: ServiceCategory;
  shortDescription: string;
  description: SanityBlock[];
  thumbnail: SanityImage;
  gallery: SanityImage[];
  sizes: string[];
  paperOptions: string[];
  finishOptions: string[];
  startingPrice: number | null;
  turnaround: string;
  moq: number | null;
  isActive: boolean;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface SanityGalleryItem {
  _id: string;
  _type: "galleryItem";
  title: string;
  image: SanityImage;
  altText: string;
  category: ServiceCategory;
  featured: boolean;
  sortOrder: number;
}

export interface SanityTestimonial {
  _id: string;
  _type: "testimonial";
  reviewerName: string;
  reviewerRole: string;
  reviewerPhoto: SanityImage | null;
  body: string;
  rating: number;
  isActive: boolean;
}

export interface SanityFaq {
  _id: string;
  _type: "faq";
  question: string;
  answer: SanityBlock[];
  category: string;
  sortOrder: number;
  isActive: boolean;
}

export interface SanitySiteSettings {
  _id: string;
  _type: "siteSettings";
  siteName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  hoursWeekday: string;
  hoursSaturday: string;
  instagramUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  googleMapsUrl: string;
  googleMapsEmbed: string;
  ogImage: SanityImage;
}
