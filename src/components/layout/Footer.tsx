import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import GoldDivider from "@/components/ui/GoldDivider";
import { CONTACT, SOCIAL, SERVICES } from "@/lib/constants";

interface FooterProps {
  dict: Dictionary;
  locale: Locale;
}

const socialLinks = [
  { name: "Instagram", url: SOCIAL.instagram },
  { name: "Facebook", url: SOCIAL.facebook },
  { name: "Twitter", url: SOCIAL.twitter },
];

const dictKeyMap: Record<string, string> = {
  "corporate-law": "corporate",
  "dispute-resolution": "dispute",
};

export function Footer({ dict, locale }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-warm-300">
      <GoldDivider />

      <Container>
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="inline-block mb-6">
              <Image
                src="/images/omarlogo.png"
                alt="Omar Al Baz Law Office & Legal Consultancy"
                width={300}
                height={90}
                className="h-16 w-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-sm text-warm-400 leading-relaxed mt-4">
              {dict.footer.description}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-warm-400 hover:text-gold-400 transition-smooth link-underline"
                >
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/team`}
                  className="text-warm-400 hover:text-gold-400 transition-smooth link-underline"
                >
                  {dict.nav.team}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/why-choose-us`}
                  className="text-warm-400 hover:text-gold-400 transition-smooth link-underline"
                >
                  {dict.nav.whyChooseUs}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/articles`}
                  className="text-warm-400 hover:text-gold-400 transition-smooth link-underline"
                >
                  {dict.nav.articles}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              {dict.footer.servicesTitle}
            </h3>
            <ul className="space-y-3 text-sm">
              {SERVICES.map((service) => {
                const dictKey = dictKeyMap[service.slug] ?? service.slug;
                const svc = dict.services as unknown as Record<
                  string,
                  { title: string }
                >;
                return (
                  <li key={service.slug}>
                    <Link
                      href={`/${locale}/services/${service.slug}`}
                      className="text-warm-400 hover:text-gold-400 transition-smooth link-underline"
                    >
                      {svc[dictKey]?.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              {dict.footer.contactTitle}
            </h3>
            <address className="not-italic space-y-4 text-sm">
              <p className="flex items-start gap-3">
                <svg
                  viewBox="0 0 20 20"
                  className="w-4 h-4 mt-0.5 flex-shrink-0 stroke-gold-500 fill-none stroke-[1.5]"
                  aria-hidden="true"
                >
                  <path d="M10 2C6.13 2 3 5.13 3 9c0 5.25 7 9 7 9s7-3.75 7-9c0-3.87-3.13-7-7-7z" />
                  <circle cx="10" cy="9" r="2.5" />
                </svg>
                <span className="text-warm-400">{CONTACT.address[locale]}</span>
              </p>
              <p className="flex items-start gap-3">
                <svg
                  viewBox="0 0 20 20"
                  className="w-4 h-4 mt-0.5 flex-shrink-0 stroke-gold-500 fill-none stroke-[1.5]"
                  aria-hidden="true"
                >
                  <path d="M2 4l7 5 7-5" />
                  <rect x="2" y="4" width="16" height="12" rx="2" />
                </svg>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-warm-400 hover:text-gold-400 transition-smooth link-underline"
                >
                  {CONTACT.email}
                </a>
              </p>
              <p className="flex items-start gap-3">
                <svg
                  viewBox="0 0 20 20"
                  className="w-4 h-4 mt-0.5 flex-shrink-0 stroke-gold-500 fill-none stroke-[1.5]"
                  aria-hidden="true"
                >
                  <path d="M3 5a2 2 0 0 1 2-2h2.28a1 1 0 0 1 .9.55l1.1 2.2a1 1 0 0 1-.2 1.1L7.8 8.4a11.05 11.05 0 0 0 4.8 4.8l1.55-1.28a1 1 0 0 1 1.1-.2l2.2 1.1a1 1 0 0 1 .55.9V15a2 2 0 0 1-2 2A13 13 0 0 1 3 5z" />
                </svg>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-warm-400 hover:text-gold-400 transition-smooth link-underline"
                  dir="ltr"
                >
                  {CONTACT.phone}
                </a>
              </p>
            </address>

            <div className="mt-6 flex gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center border border-warm-700 text-warm-400 hover:border-gold-500 hover:text-gold-400 transition-smooth duration-200"
                  aria-label={item.name}
                >
                  {item.name === "Instagram" && (
                    <svg
                      viewBox="0 0 20 20"
                      className="w-4 h-4 stroke-current fill-none stroke-[1.5]"
                      aria-hidden="true"
                    >
                      <rect x="2" y="2" width="16" height="16" rx="5" />
                      <circle cx="10" cy="10" r="4" />
                      <circle
                        cx="14.5"
                        cy="5.5"
                        r="1"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  )}
                  {item.name === "Facebook" && (
                    <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M18 10a8 8 0 1 0-9.25 7.9v-5.59H6.9V10h1.85V8.22c0-1.83 1.09-2.84 2.76-2.84.8 0 1.64.14 1.64.14v1.81h-.92c-.91 0-1.2.57-1.2 1.15V10h2.03l-.33 2.31h-1.7v5.59A8 8 0 0 0 18 10z" />
                    </svg>
                  )}
                  {item.name === "Twitter" && (
                    <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M11.92 8.46L17.68 2h-1.36l-4.98 5.56L7.44 2H2.5l6.14 8.64L2.5 18h1.36l5.37-6.01L12.56 18H17.5l-6.39-8.94zm-1.87 2.07l-.62-.86L4.32 3.16h2.12l3.96 5.5.62.86 5.1 7.07h-2.11l-4.04-5.57z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-warm-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warm-500">
          <p>{dict.footer.copyright.replace("{year}", String(year))}</p>
          <div className="flex gap-6">
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-gold-400 transition-smooth link-underline"
            >
              {dict.footer.privacyPolicy}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="hover:text-gold-400 transition-smooth link-underline"
            >
              {dict.footer.termsOfUse}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
