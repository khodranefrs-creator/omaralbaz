import Link from "next/link";
import clsx from "clsx";
import type { Locale } from "@/i18n/config";
import type { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  locale: Locale;
  icon?: ReactNode;
}

export default function ServiceCard({
  title,
  description,
  href,
  locale,
  icon,
}: ServiceCardProps) {
  return (
    <Link
      href={`/${locale}${href}`}
      className={clsx(
        "group relative block p-8 border border-warm-200 bg-white overflow-hidden",
        "hover-lift hover:border-gold-400 transition-smooth"
      )}
    >
      {/* Gold top accent — thin, expands on hover */}
      <div className="absolute top-0 left-0 w-16 h-[2px] bg-gold-500 group-hover:w-full transition-all duration-300" />

      {/* Gold bottom accent — subtle */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-400/0 to-transparent group-hover:via-gold-400/30 transition-all duration-300" />

      {icon && (
        <div className="mb-6 text-gold-600 group-hover:text-gold-500 transition-smooth duration-200">
          {icon}
        </div>
      )}

      <h3 className="font-heading-ar text-xl font-semibold text-navy-900 mb-3 leading-snug">
        {title}
      </h3>

      <p className="text-warm-600 leading-relaxed mb-6 text-sm">
        {description}
      </p>

      <span className="inline-flex items-center gap-2 text-sm font-medium text-gold-600 group-hover:text-gold-500 transition-smooth">
        <span className="link-underline">
          <span className="rtl:rotate-180 inline-block">&#8594;</span>
        </span>
      </span>
    </Link>
  );
}
