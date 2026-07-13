"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { SITE_NAME, SITE_NAME_AR, SERVICES } from "@/lib/constants";

interface HeaderProps {
  dict: Dictionary;
  locale: Locale;
}

const NAV_ITEMS = [
  { key: "home" as const, href: "" },
  { key: "about" as const, href: "about" },
  { key: "services" as const, href: "services", hasDropdown: true },
  { key: "team" as const, href: "team" },
  { key: "whyChooseUs" as const, href: "why-choose-us" },
  { key: "articles" as const, href: "articles" },
  { key: "contact" as const, href: "contact" },
];

function getServiceTitle(
  services: Dictionary["services"],
  slug: string
): string {
  const entry = (services as Record<string, unknown>)[slug];
  if (
    entry &&
    typeof entry === "object" &&
    "title" in entry &&
    typeof (entry as { title: unknown }).title === "string"
  ) {
    return (entry as { title: string }).title;
  }
  return "";
}

export function Header({ dict, locale }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const otherLocale = locale === "ar" ? "en" : "ar";
  const remainingPath = pathname
    ? pathname.replace(`/${locale}`, "") || ""
    : "";

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? "shadow-md" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 shrink-0"
          >
            <span
              className={`text-lg sm:text-xl font-bold text-navy-900 ${locale === "ar" ? "font-heading-ar" : "font-heading-en"}`}
            >
              {locale === "ar" ? SITE_NAME_AR : SITE_NAME}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const label = dict.nav[item.key];
              if (item.hasDropdown) {
                return (
                  <div key={item.key} className="relative group">
                    <Link
                      href={`/${locale}/${item.href}`}
                      className="flex items-center gap-1 text-sm font-medium text-warm-700 hover:text-gold-600 transition-colors py-2"
                    >
                      {label}
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Link>
                    <div className="absolute top-full start-0 mt-1 w-60 bg-white rounded-lg shadow-lg border border-warm-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {SERVICES.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/${locale}/services/${service.slug}`}
                          className="block px-4 py-2.5 text-sm text-warm-700 hover:bg-gold-50 hover:text-gold-700 transition-colors"
                        >
                          {getServiceTitle(dict.services, service.slug)}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.key}
                  href={`/${locale}/${item.href}`}
                  className="text-sm font-medium text-warm-700 hover:text-gold-600 transition-colors py-2"
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={`/${locale}/contact`}
              className="px-5 py-2.5 bg-gold-400 text-white text-sm font-medium rounded-sm hover:bg-gold-500 active:bg-gold-600 transition-colors"
            >
              {dict.nav.bookConsultation}
            </Link>
            <Link
              href={`/${otherLocale}${remainingPath}`}
              className="px-3 py-2 text-sm font-medium text-warm-600 hover:text-gold-600 transition-colors border border-warm-300 rounded-sm"
            >
              {otherLocale === "ar" ? "عربي" : "EN"}
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-warm-700 hover:text-gold-600 transition-colors"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="gold-divider" />

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden overflow-y-auto">
          <div className="flex items-center justify-between h-20 px-4 sm:px-6">
            <Link
              href={`/${locale}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-bold text-navy-900"
            >
              {locale === "ar" ? SITE_NAME_AR : SITE_NAME}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-warm-700 hover:text-gold-600 transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="gold-divider" />

          <nav className="px-4 sm:px-6 py-6 space-y-1">
            {NAV_ITEMS.map((item) => {
              const label = dict.nav[item.key];
              return (
                <div key={item.key}>
                  <Link
                    href={`/${locale}/${item.href}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 text-lg font-medium text-warm-800 hover:text-gold-600 transition-colors"
                  >
                    {label}
                  </Link>
                  {item.hasDropdown && (
                    <div className="ps-4 space-y-1">
                      {SERVICES.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/${locale}/services/${service.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2 text-sm text-warm-600 hover:text-gold-600 transition-colors"
                        >
                          {getServiceTitle(dict.services, service.slug)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="px-4 sm:px-6 py-6 space-y-3 border-t border-warm-200">
            <Link
              href={`/${locale}/contact`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center px-6 py-3 bg-gold-400 text-white font-medium rounded-sm hover:bg-gold-500 transition-colors"
            >
              {dict.nav.bookConsultation}
            </Link>
            <Link
              href={`/${otherLocale}${remainingPath}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center px-6 py-3 border border-warm-300 text-warm-700 font-medium rounded-sm hover:text-gold-600 hover:border-gold-400 transition-colors"
            >
              {otherLocale === "ar" ? "العربية" : "English"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
