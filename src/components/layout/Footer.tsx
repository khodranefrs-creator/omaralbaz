import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import {
  SITE_NAME,
  SITE_NAME_AR,
  CONTACT,
  SOCIAL,
  SERVICES,
} from "@/lib/constants";

interface FooterProps {
  dict: Dictionary;
  locale: Locale;
}

const NAV_ITEMS = [
  { key: "home" as const, href: "" },
  { key: "about" as const, href: "about" },
  { key: "services" as const, href: "services" },
  { key: "team" as const, href: "team" },
  { key: "whyChooseUs" as const, href: "why-choose-us" },
  { key: "articles" as const, href: "articles" },
  { key: "contact" as const, href: "contact" },
];

const SOCIAL_LABELS: Record<keyof typeof SOCIAL, Record<Locale, string>> = {
  instagram: { ar: "إنستغرام", en: "Instagram" },
  facebook: { ar: "فيسبوك", en: "Facebook" },
  twitter: { ar: "تويتر", en: "X / Twitter" },
  googleBusiness: { ar: "خرائط جوجل", en: "Google Maps" },
};

export function Footer({ dict, locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900">
      <div className="gold-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className={`text-xl font-bold text-white ${locale === "ar" ? "font-heading-ar" : "font-heading-en"}`}
            >
              {locale === "ar" ? SITE_NAME_AR : SITE_NAME}
            </Link>
            <p className="mt-4 text-warm-300 text-sm leading-relaxed">
              {dict.footer.description}
            </p>
            <div className="flex gap-4 mt-6">
              {Object.entries(SOCIAL).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-400 hover:text-gold-400 transition-colors text-sm"
                >
                  {SOCIAL_LABELS[key as keyof typeof SOCIAL][locale]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-gold-400 font-semibold mb-4 text-sm uppercase tracking-wider">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}/${item.href}`}
                    className="text-warm-300 hover:text-white transition-colors text-sm"
                  >
                    {dict.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gold-400 font-semibold mb-4 text-sm uppercase tracking-wider">
              {dict.footer.servicesTitle}
            </h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${locale}/services/${service.slug}`}
                    className="text-warm-300 hover:text-white transition-colors text-sm"
                  >
                    {
                      (
                        dict.services as unknown as Record<
                          string,
                          { title: string }
                        >
                      )[service.slug]?.title
                    }
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gold-400 font-semibold mb-4 text-sm uppercase tracking-wider">
              {dict.footer.contactTitle}
            </h3>
            <ul className="space-y-3 text-sm text-warm-300">
              <li className="flex items-start gap-2">
                <span className="text-gold-400 mt-0.5 shrink-0">&#9679;</span>
                {CONTACT.address[locale]}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold-400 shrink-0">&#9679;</span>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold-400 shrink-0">&#9679;</span>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-white transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-warm-400 text-sm">
            {dict.footer.copyright.replace("{year}", String(currentYear))}
          </p>
          <div className="flex gap-6 text-sm text-warm-400">
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-white transition-colors"
            >
              {dict.footer.privacyPolicy}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="hover:text-white transition-colors"
            >
              {dict.footer.termsOfUse}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
