import Link from "next/link";
import clsx from "clsx";
import type { Locale } from "@/i18n/config";

interface ServiceCardProps {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  locale: Locale;
}

export default function ServiceCard({
  slug,
  titleKey,
  descriptionKey,
  icon,
  locale,
}: ServiceCardProps) {
  return (
    <Link
      href={`/${locale}/services/${slug}`}
      className={clsx(
        "group block border border-warm-200 bg-white p-8",
        "hover:border-gold-400 hover:shadow-lg transition-smooth"
      )}
    >
      <div
        className={clsx(
          "mb-6 flex h-14 w-14 items-center justify-center",
          "bg-navy-50 text-navy-900 rounded-sm text-xl font-semibold"
        )}
      >
        {icon}
      </div>

      <h3 className="font-heading-ar text-xl font-semibold text-navy-900 mb-3">
        {titleKey}
      </h3>

      <p className="text-warm-600 leading-relaxed mb-6">
        {descriptionKey}
      </p>

      <span
        className={clsx(
          "inline-flex items-center gap-2 text-sm font-medium text-gold-600",
          "group-hover:text-gold-500 transition-smooth"
        )}
      >
        <span className="rtl:rotate-180">&#8594;</span>
      </span>
    </Link>
  );
}
