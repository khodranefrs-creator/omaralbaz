import Link from "next/link";
import clsx from "clsx";
import type { Locale } from "@/i18n/config";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  slug: string;
  locale: Locale;
}

export default function ArticleCard({
  title,
  excerpt,
  category,
  date,
  slug,
  locale,
}: ArticleCardProps) {
  return (
    <Link
      href={`/${locale}/articles/${slug}`}
      className={clsx(
        "group block border border-warm-200 bg-white p-8",
        "hover:border-gold-400 hover:shadow-lg transition-smooth"
      )}
    >
      <span
        className={clsx(
          "inline-block mb-4 px-3 py-1 text-xs font-medium rounded-sm",
          "bg-gold-50 text-gold-700"
        )}
      >
        {category}
      </span>

      <h3 className="font-heading-ar text-xl font-semibold text-navy-900 mb-3 leading-snug">
        {title}
      </h3>

      <p className="text-warm-600 leading-relaxed mb-6 line-clamp-3">
        {excerpt}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-warm-100">
        <time className="text-sm text-warm-500">{date}</time>
        <span
          className={clsx(
            "inline-flex items-center gap-1 text-sm font-medium text-gold-600",
            "group-hover:text-gold-500 transition-smooth"
          )}
        >
          <span className="rtl:rotate-180">&#8594;</span>
        </span>
      </div>
    </Link>
  );
}
