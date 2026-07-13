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
  author?: string;
}

export default function ArticleCard({
  title,
  excerpt,
  category,
  date,
  slug,
  locale,
  author,
}: ArticleCardProps) {
  return (
    <Link
      href={`/${locale}/articles/${slug}`}
      className={clsx(
        "group block border border-warm-200 bg-white overflow-hidden",
        "hover-lift hover:border-gold-400 transition-smooth"
      )}
    >
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={clsx(
              "inline-block px-3 py-1 text-xs font-medium rounded-sm",
              "bg-gold-50 text-gold-700"
            )}
          >
            {category}
          </span>
          <span className="w-px h-3 bg-warm-300" />
          <time className="text-xs text-warm-500">{date}</time>
        </div>

        <h3 className="font-heading-ar text-xl font-semibold text-navy-900 mb-3 leading-snug group-hover:text-gold-700 transition-smooth duration-200">
          {title}
        </h3>

        <p className="text-warm-600 leading-relaxed mb-6 line-clamp-3 text-sm">
          {excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-warm-100">
          {author && (
            <span className="text-xs text-warm-500 italic">{author}</span>
          )}
          <span
            className={clsx(
              "inline-flex items-center gap-1 text-sm font-medium text-gold-600",
              "group-hover:text-gold-500 transition-smooth duration-200",
              !author && "ms-auto"
            )}
          >
            <span className="rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1">&#8594;</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
