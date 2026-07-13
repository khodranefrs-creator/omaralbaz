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
        "group relative block p-8 border border-warm-200 bg-white",
        "hover:border-gold-400 hover:shadow-lg transition-smooth"
      )}
    >
      <div className="absolute top-0 left-0 w-12 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full" />

      {icon && (
        <div className="mb-5 text-gold-600 group-hover:text-gold-500 transition-smooth">
          {icon}
        </div>
      )}

      <h3 className="font-heading-ar text-xl font-semibold text-navy-900 mb-3">
        {title}
      </h3>

      <p className="text-warm-600 leading-relaxed mb-6 text-sm">
        {description}
      </p>

      <span className="inline-flex items-center gap-2 text-sm font-medium text-gold-600 group-hover:text-gold-500 transition-smooth">
        <span className="rtl:rotate-180">&#8594;</span>
      </span>
    </Link>
  );
}
