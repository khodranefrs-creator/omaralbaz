import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ArticleCard from "@/components/ui/ArticleCard";
import Button from "@/components/ui/Button";

interface LatestArticlesProps {
  dict: Dictionary;
  locale: Locale;
}

const sampleArticles = {
  en: [
    {
      title: "Recent Amendments to Saudi Companies Law",
      excerpt: "An overview of the latest amendments to the Saudi Companies Law and their impact on corporate governance and business operations in the Kingdom.",
      category: "Corporate",
      date: "2025-01-15",
      slug: "saudi-companies-law-amendments",
    },
    {
      title: "Key Considerations for Commercial Contracts",
      excerpt: "Essential factors to consider when drafting and reviewing commercial contracts in the Saudi market to protect your business interests.",
      category: "Contracts",
      date: "2025-01-10",
      slug: "commercial-contract-key-considerations",
    },
    {
      title: "Investment Regulations in KSA",
      excerpt: "A comprehensive guide to the investment regulatory framework in the Kingdom of Saudi Arabia for local and foreign investors.",
      category: "Advisory",
      date: "2025-01-05",
      slug: "investment-regulations-ksa",
    },
  ],
  ar: [
    {
      title: "أحدث التعديلات على نظام الشركات السعودي",
      excerpt: "ملخص عن أحدث التعديلات على نظام الشركات السعودي وأثرها على الحوكمةorporate والعمل التجاري في المملكة.",
      category: "الشركات",
      date: "2025-01-15",
      slug: "saudi-companies-law-amendments",
    },
    {
      title: "الاعتبارات الرئيسية للعقود التجارية",
      excerpt: "عناصر أساسية للخص عند صياغة أو مراجعة العقود التجارية في السوق السعودي لحماية مصالحك التجارية.",
      category: "العقود",
      date: "2025-01-10",
      slug: "commercial-contract-key-considerations",
    },
    {
      title: "أنظمة الاستثمار في المملكة العربية السعودية",
      excerpt: "دليل شامل للاستثمار التنظيمي في المملكة العربية السعودية للمستثمرين المحليين والأجانب.",
      category: "الاستشارات",
      date: "2025-01-05",
      slug: "investment-regulations-ksa",
    },
  ],
};

export default function LatestArticles({ dict, locale }: LatestArticlesProps) {
  const articles = sampleArticles[locale] ?? sampleArticles.en;

  return (
    <section className="bg-white py-20">
      <Container>
        <SectionHeading
          title={dict.home.articlesTitle}
          subtitle={dict.home.articlesSubtitle}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              excerpt={article.excerpt}
              category={article.category}
              date={article.date}
              slug={article.slug}
              locale={locale}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="md" href={`/${locale}/articles`}>
            {dict.common.viewAll}
          </Button>
        </div>
      </Container>
    </section>
  );
}
