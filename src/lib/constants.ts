export const SITE_URL = "https://omaralbaz.com";

export const CONTACT = {
  email: "lawyeromarelbaz1@gmail.com",
  phone: "+966566273277",
  whatsapp: "+966566273277",
  address: {
    ar: "الرياض، المملكة العربية السعودية",
    en: "Riyadh, Kingdom of Saudi Arabia",
  },
  coordinates: {
    lat: 24.6838536,
    lng: 46.5852665,
  },
} as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/omaralbaz85/",
  facebook: "https://www.facebook.com/profile.php?id=61581574510432",
  twitter: "https://x.com/MktbMr2375",
  googleBusiness: "https://www.google.com/maps/place/%D9%85%D9%83%D8%AA%D8%A8+%D8%B9%D9%85%D8%B1+%D8%A7%D9%84%D8%A8%D8%A7%D8%B2+%D9%84%D9%84%D9%85%D8%AD%D8%A7%D9%85%D8%A7%D8%A9+%D9%88%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A7%D8%AA+%D8%A7%D9%84%D9%82%D8%A7%D9%86%D9%88%D9%86%D9%8A%D8%A9%E2%80%AD/@24.6838536,46.5852665,17z/",
} as const;

export const SERVICES = [
  {
    slug: "corporate-law",
    icon: "building",
  },
  {
    slug: "contracts",
    icon: "document",
  },
  {
    slug: "consultancy",
    icon: "scale",
  },
  {
    slug: "dispute-resolution",
    icon: "gavel",
  },
  {
    slug: "advisory",
    icon: "chart",
  },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];
