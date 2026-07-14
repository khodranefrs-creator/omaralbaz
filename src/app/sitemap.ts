import type { MetadataRoute } from "next";
import { SITE_URL, SERVICES } from "@/lib/constants";
import { locales } from "@/i18n/config";

const pages = ["", "about", "services", "team", "why-choose-us", "articles", "contact", "privacy", "terms"];

const articleSlugs = [
  "saudi-companies-law-amendments",
  "commercial-contract-key-considerations",
  "investment-regulations-ksa",
  "dispute-resolution-methods",
  "corporate-governance-best-practices",
  "legal-consultancy-business-value",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${SITE_URL}/${locale}${page ? `/${page}` : ""}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              `${SITE_URL}/${l}${page ? `/${page}` : ""}`,
            ])
          ),
        },
      });
    }

    for (const service of SERVICES) {
      entries.push({
        url: `${SITE_URL}/${locale}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              `${SITE_URL}/${l}/services/${service.slug}`,
            ])
          ),
        },
      });
    }

    for (const slug of articleSlugs) {
      entries.push({
        url: `${SITE_URL}/${locale}/articles/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [
              l,
              `${SITE_URL}/${l}/articles/${slug}`,
            ])
          ),
        },
      });
    }
  }

  return entries;
}
