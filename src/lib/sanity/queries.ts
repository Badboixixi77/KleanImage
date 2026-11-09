/**
 * GROQ query definitions for Sanity CMS.
 * All queries used across the site are defined here for easy maintenance.
 */

/** Fetch all active services, ordered by sortOrder */
export const ALL_SERVICES_QUERY = `
  *[_type == "service" && isActive == true] | order(sortOrder asc) {
    _id, name, slug, category, shortDescription, thumbnail, startingPrice,
    turnaround, moq, isActive, sortOrder
  }
`;

/** Fetch a single service by slug */
export const SERVICE_BY_SLUG_QUERY = `
  *[_type == "service" && slug.current == $slug && isActive == true][0] {
    _id, name, slug, category, shortDescription, description,
    thumbnail, gallery, sizes, paperOptions, finishOptions,
    startingPrice, turnaround, moq, seoTitle, seoDescription
  }
`;

/** Fetch all service slugs (for generateStaticParams) */
export const ALL_SERVICE_SLUGS_QUERY = `
  *[_type == "service" && isActive == true] { "slug": slug.current }
`;

/** Fetch up to 6 featured gallery items for the home page */
export const FEATURED_GALLERY_QUERY = `
  *[_type == "galleryItem" && featured == true] | order(sortOrder asc) [0...6] {
    _id, title, image, altText, category
  }
`;

/** Fetch all gallery items */
export const ALL_GALLERY_QUERY = `
  *[_type == "galleryItem"] | order(sortOrder asc) {
    _id, title, image, altText, category, featured
  }
`;

/** Fetch active testimonials */
export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && isActive == true] | order(_createdAt desc) {
    _id, reviewerName, reviewerRole, reviewerPhoto, body, rating
  }
`;

/** Fetch site settings (singleton) */
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    siteName, tagline, phone, whatsapp, email, address, city,
    hoursWeekday, hoursSaturday, instagramUrl, facebookUrl, twitterUrl,
    googleMapsUrl, googleMapsEmbed, ogImage
  }
`;

/** Fetch active FAQs */
export const FAQS_QUERY = `
  *[_type == "faq" && isActive == true] | order(sortOrder asc) {
    _id, question, answer, category
  }
`;
