export const SITE_NAME = "Omar Al Baz Law Office";
export const SITE_NAME_AR = "مكتب عمر الباز للمحاماة والاستشارات القانونية";
export const SITE_URL = "https://omaralbaz.com";

export const CONTACT = {
  email: "lawyeromarelbaz1@gmail.com",
  phone: "+966500000000",
  whatsapp: "+966500000000",
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
  instagram: "https://instagram.com/omaralbaz85",
  facebook: "https://facebook.com/share/17EppTv4DRX",
  twitter: "https://x.com/MktbMr2375",
  googleBusiness: "https://maps.google.com/?q=24.6838536,46.5852665",
} as const;

export const SERVICES = [
  {
    slug: "corporate",
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
    slug: "dispute",
    icon: "gavel",
  },
  {
    slug: "advisory",
    icon: "chart",
  },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];
