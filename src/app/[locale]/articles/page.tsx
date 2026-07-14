import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Article } from "@/types";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ArticlesFilter from "@/components/sections/ArticlesFilter";

const articles: Article[] = [
  {
    id: "1",
    slug: "saudi-companies-law-amendments",
    title: "Recent Amendments to Saudi Companies Law",
    titleAr: "أحدث التعديلات على نظام الشركات السعودي",
    excerpt: "An overview of the key changes introduced by the recent amendments to the Saudi Companies Law and their impact on business operations.",
    excerptAr: "نظرة عامة على التغييرات الرئيسية التي أدخلتها التعديلات الأخيرة على نظام الشركات السعودي وتأثيرها على الأعمال التجارية.",
    category: "corporate",
    date: "2025-01-15",
  },
  {
    id: "2",
    slug: "commercial-contract-key-considerations",
    title: "Key Considerations for Commercial Contracts",
    titleAr: "الاعتبارات الرئيسية للعقود التجارية",
    excerpt: "Essential elements every business should consider when drafting, reviewing, or negotiating commercial contracts in Saudi Arabia.",
    excerptAr: "العناصر الأساسية التي يجب على كل شركة مراعاتها عند صياغة أو مراجعة أو التفاوض على العقود التجارية في المملكة العربية السعودية.",
    category: "contracts",
    date: "2025-01-10",
  },
  {
    id: "3",
    slug: "investment-regulations-ksa",
    title: "Investment Regulations in KSA",
    titleAr: "أنظمة الاستثمار في المملكة العربية السعودية",
    excerpt: "A comprehensive guide to understanding the investment regulatory framework and opportunities in the Kingdom of Saudi Arabia.",
    excerptAr: "دليل شامل لفهم الإطار التنظيمي للاستثمار والفرص في المملكة العربية السعودية.",
    category: "advisory",
    date: "2025-01-05",
  },
  {
    id: "4",
    slug: "dispute-resolution-methods",
    title: "Alternative Dispute Resolution in Saudi Arabia",
    titleAr: "طرق حل النزاعات البديلة في المملكة العربية السعودية",
    excerpt: "Understanding arbitration, mediation, and other alternative dispute resolution mechanisms available under Saudi law.",
    excerptAr: "فهم التحكيم والوساطة وآليات حل النزاعات البديلة الأخرى المتاحة بموجب القانون السعودي.",
    category: "disputes",
    date: "2024-12-20",
  },
  {
    id: "5",
    slug: "corporate-governance-best-practices",
    title: "Corporate Governance Best Practices",
    titleAr: "أفضل ممارسات حوكمة الشركات",
    excerpt: "Building effective governance structures that enhance transparency, accountability, and long-term value for organizations.",
    excerptAr: "بناء هياكل حوكمة فعّالة تعزز الشفافية والمساءلة والقيمة طويلة الأمد للمنظمات.",
    category: "corporate",
    date: "2024-12-15",
  },
  {
    id: "6",
    slug: "legal-consultancy-business-value",
    title: "The Value of Legal Consultancy for Business",
    titleAr: "قيمة الاستشارة القانونية للأعمال",
    excerpt: "How professional legal advice helps businesses mitigate risks, seize opportunities, and achieve sustainable growth.",
    excerptAr: "كيف تساعد الاستشارة القانونية المحترفة الشركات على الحد من المخاطر واغتنام الفرص وتحقيق النمو المستدام.",
    category: "consulting",
    date: "2024-12-10",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const dict = await getDictionary(locale);

  return {
    title: dict.articles.title,
    description: dict.articles.subtitle,
    alternates: {
      canonical: `/articles`,
      languages: {
        ar: `/ar/articles`,
        en: `/en/articles`,
      },
    },
  };
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <>
      <section className="bg-navy-900 py-20">
        <Container>
          <SectionHeading
            title={dict.articles.title}
            subtitle={dict.articles.subtitle}
            light
          />
        </Container>
      </section>

      <ArticlesFilter articles={articles} locale={locale} dict={dict} />
    </>
  );
}
