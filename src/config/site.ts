export const siteConfig = {
  name: "Klean Image Creative Printing Solutions",
  shortName: "Klean Image",
  tagline: "Creative • Printing • Solutions",
  description:
    "Professional printing services in Lagos, Nigeria. Business cards, flyers, banners, branded merchandise, packaging, and more. Fast turnaround, quality guaranteed.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kleanimage.com.ng",
  address: "43, Shipeolu Street, Shomolu, Lagos, Nigeria",
  phone: "TODO_OWNER_TO_PROVIDE", // TODO: owner to provide phone number
  whatsapp: "+2348082996711",
  email: "TODO_OWNER_TO_PROVIDE@gmail.com", // TODO: owner to provide email
  hours: {
    weekday: "Monday – Friday: 8:00 am – 6:00 pm",
    saturday: "Saturday: 9:00 am – 4:00 pm",
    sunday: "Sunday: Closed",
  },
  social: {
    instagram: "#", // TODO: owner to provide Instagram URL
    facebook: "#", // TODO: owner to provide Facebook URL
    twitter: "#", // TODO: owner to provide X/Twitter URL
  },
  googleMaps: {
    embedSrc: "", // TODO: owner to provide Google Maps embed src after claiming Business Profile
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=43+Shipeolu+Street+Shomolu+Lagos+Nigeria",
  },
} as const;

export type SiteConfig = typeof siteConfig;
