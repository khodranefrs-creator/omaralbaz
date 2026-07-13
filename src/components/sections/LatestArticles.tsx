import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ArticleCard from "@/components/ui/ArticleCard";
import type { Article } from "@/types";

interface LatestArticlesProps {
  dict: Dictionary;
  locale: Locale;
  articles: Article[];
}

export function LatestArticles({ dict, locale, articles }: LatestArticlesProps) {
  const latestArticles = articles.slice(0, 3);

  return (
    <section className="section-premium bg-warm-50">
      <Container>
        <SectionHeading
          title={dict.home.articlesTitle}
          subtitle={dict.home.articlesSubtitle}
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={locale === "ar" ? article.titleAr : article.title}
              excerpt={locale === "ar" ? article.excerptAr : article.excerpt}
              category={dict.articles[article.category as keyof typeof dict.articles] || article.category}
              date={article.date}
              slug={article.slug}
              locale={locale}
              author={dict.articles.byAuthor}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/articles`}
            className="inline-flex items-center gap-2 text-gold-600 font-medium hover:text-gold-500 transition-smooth"
          >
            <span>{dict.home.articlesTitle}</span>
            <span className="rtl:rotate-180">&#8594;</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
