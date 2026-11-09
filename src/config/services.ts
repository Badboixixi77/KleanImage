/**
 * Static service slug → name map.
 * Used as a fallback when Sanity is unavailable, and for seeding the quote
 * form service selector before CMS data loads.
 */
export const SERVICE_CATALOGUE = [
  { slug: "business-cards", name: "Business Cards", category: "Print" },
  { slug: "flyers-leaflets", name: "Flyers & Leaflets", category: "Print" },
  { slug: "banners-flex", name: "Banners & Flex", category: "Large Format" },
  { slug: "stickers-labels", name: "Stickers & Labels", category: "Print" },
  {
    slug: "branded-t-shirts",
    name: "Branded T-Shirts",
    category: "Branded Merchandise",
  },
  {
    slug: "branded-caps",
    name: "Branded Caps",
    category: "Branded Merchandise",
  },
  {
    slug: "branded-mugs",
    name: "Branded Mugs",
    category: "Branded Merchandise",
  },
  { slug: "calendars", name: "Calendars", category: "Print" },
  {
    slug: "wedding-event-materials",
    name: "Wedding & Event Materials",
    category: "Events",
  },
  { slug: "packaging", name: "Packaging", category: "Packaging" },
  { slug: "id-cards", name: "ID Cards", category: "Print" },
  {
    slug: "brand-design",
    name: "Brand Design",
    category: "Design Services",
  },
  { slug: "box-branding", name: "Box Branding", category: "Packaging" },
  {
    slug: "amazing-souvenirs",
    name: "Amazing Souvenirs",
    category: "Branded Merchandise",
  },
  {
    slug: "business-branding",
    name: "Business Branding",
    category: "Design Services",
  },
] as const;

export type ServiceSlug = (typeof SERVICE_CATALOGUE)[number]["slug"];
export type ServiceCategory = (typeof SERVICE_CATALOGUE)[number]["category"];

export const SERVICE_CATEGORIES = [
  "Print",
  "Large Format",
  "Branded Merchandise",
  "Packaging",
  "Design Services",
  "Events",
] as const;
