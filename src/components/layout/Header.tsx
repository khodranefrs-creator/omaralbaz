"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Container from "@/components/ui/Container";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

interface HeaderProps {
  dict: Dictionary;
  locale: Locale;
}

const navigation = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "team", href: "/team" },
  { key: "articles", href: "/articles" },
  { key: "contact", href: "/contact" },
] as const;

const serviceLinks = [
  { key: "corporate", href: "/services/corporate-law" },
  { key: "contracts", href: "/services/contracts" },
  { key: "consultancy", href: "/services/consultancy" },
  { key: "dispute", href: "/services/dispute-resolution" },
  { key: "advisory", href: "/services/advisory" },
] as const;

export function Header({ dict, locale }: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const otherLocale: Locale = locale === "ar" ? "en" : "ar";
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <header
      className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-smooth"
    >
      <Container>
        <div className="flex items-center justify-between h-24">
          <Link href={`/${locale}`} className="flex-shrink-0">
            <Image
              src="/images/omarlogo.png"
              alt="Omar Al Baz Law Office & Legal Consultancy"
              width={240}
              height={72}
              className="h-14 w-auto"
              priority
              fetchPriority="high"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const fullHref = `/${locale}${item.href}`;
              const isActive = pathname === fullHref || (item.href !== "/" && pathname.startsWith(fullHref));

              if (item.key === "services") {
                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link
                      href={fullHref}
                      className={clsx(
                        "px-4 py-2 text-sm font-medium transition-smooth",
                        isActive
                          ? "text-gold-600"
                          : "text-warm-700 hover:text-gold-600"
                      )}
                    >
                      {dict.nav.services}
                    </Link>

                    {isServicesOpen && (
                      <div className="absolute top-full left-0 w-64 bg-white border border-warm-200 shadow-lg py-2 z-50">
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.key}
                            href={`/${locale}${service.href}`}
                            className="block px-4 py-2.5 text-sm text-warm-700 hover:bg-warm-50 hover:text-gold-600 transition-smooth"
                          >
                            {dict.services[service.key].title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.key}
                  href={fullHref}
                  className={clsx(
                    "px-4 py-2 text-sm font-medium transition-smooth",
                    isActive
                      ? "text-gold-600"
                      : "text-warm-700 hover:text-gold-600"
                  )}
                >
                  {dict.nav[item.key]}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center px-5 py-2.5 bg-gold-500 text-navy-950 text-sm font-semibold hover:bg-gold-400 transition-smooth"
            >
              {dict.nav.bookConsultation}
            </Link>

            <Link
              href={switchPath}
              className="relative flex items-center gap-1.5 px-3 py-2 border border-warm-200 text-sm font-medium text-warm-700 hover:border-gold-400 hover:text-gold-600 transition-smooth"
              title={
                otherLocale === "ar"
                  ? "التبديل إلى العربية"
                  : "Switch to English"
              }
            >
              <svg
                viewBox="0 0 20 20"
                className="w-4 h-4 stroke-current fill-none stroke-[1.5]"
              >
                <circle cx="10" cy="10" r="8" />
                <path d="M2 10h16" />
                <path d="M10 2c2.5 2.5 3 5 3 8s-.5 5.5-3 8" />
                <path d="M10 2c-2.5 2.5-3 5-3 8s.5 5.5 3 8" />
              </svg>
              <span>{otherLocale === "ar" ? "عربي" : "EN"}</span>
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-warm-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {isOpen && (
        <div className="lg:hidden border-t border-warm-200 bg-white">
          <Container>
            <div className="py-4 space-y-1">
              {navigation.map((item) => {
                const fullHref = `/${locale}${item.href}`;
                const isActive = pathname === fullHref;

                return (
                  <Link
                    key={item.key}
                    href={fullHref}
                    className={clsx(
                      "block px-4 py-3 text-sm font-medium transition-smooth",
                      isActive
                        ? "text-gold-600 bg-gold-50"
                        : "text-warm-700 hover:bg-warm-50"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {dict.nav[item.key]}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-warm-200 space-y-2">
                <Link
                  href={`/${locale}/contact`}
                  className="block text-center px-4 py-3 bg-gold-500 text-navy-950 text-sm font-semibold hover:bg-gold-400 transition-smooth"
                  onClick={() => setIsOpen(false)}
                >
                  {dict.nav.bookConsultation}
                </Link>

                <Link
                  href={switchPath}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-warm-200 text-sm font-medium text-warm-700 hover:border-gold-400 hover:text-gold-600 transition-smooth"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    viewBox="0 0 20 20"
                    className="w-4 h-4 stroke-current fill-none stroke-[1.5]"
                  >
                    <circle cx="10" cy="10" r="8" />
                    <path d="M2 10h16" />
                    <path d="M10 2c2.5 2.5 3 5 3 8s-.5 5.5-3 8" />
                    <path d="M10 2c-2.5 2.5-3 5-3 8s.5 5.5 3 8" />
                  </svg>
                  <span>
                    {otherLocale === "ar"
                      ? "التبديل إلى العربية"
                      : "Switch to English"}
                  </span>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
