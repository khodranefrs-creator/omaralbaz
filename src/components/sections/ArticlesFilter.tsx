"use client";

import { useState } from "react";
import type { Article } from "@/types";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Container from "@/components/ui/Container";
import ArticleCard from "@/components/ui/ArticleCard";

interface ArticlesFilterProps {
  articles: Article[];
  locale: Locale;
  dict: Dictionary;
}

const FILTER_KEYS = ["all", "corporate", "contracts", "consulting", "disputes"] as const;

type FilterKey = (typeof FILTER_KEYS)[number];

export default function ArticlesFilter({
  articles,
  locale,
  dict,
}: ArticlesFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filtered =
    activeFilter === "all"
      ? articles
      : articles.filter((a) => a.category === activeFilter);

  return (
    <section className="bg-warm-50 py-16">
      <Container>
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {FILTER_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-5 py-2.5 text-sm font-medium rounded-sm transition-smooth ${
                activeFilter === key
                  ? "bg-gold-400 text-white"
                  : "bg-white text-warm-700 border border-warm-200 hover:border-gold-400 hover:text-gold-600"
              }`}
            >
              {dict.articles[key]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <ArticleCard
              key={article.id}
              title={locale === "ar" ? article.titleAr : article.title}
              excerpt={locale === "ar" ? article.excerptAr : article.excerpt}
              category={dict.articles[article.category as keyof typeof dict.articles] || article.category}
              date={article.date}
              slug={article.slug}
              locale={locale}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-warm-500 text-lg py-12">
            {dict.common.error}
          </p>
        )}
      </Container>
    </section>
  );
}
