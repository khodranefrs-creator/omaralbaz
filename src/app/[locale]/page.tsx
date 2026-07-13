import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Article } from "@/types";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhoWeServe } from "@/components/sections/WhoWeServe";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyChooseUsTeaser } from "@/components/sections/WhyChooseUsTeaser";
import { LatestArticles } from "@/components/sections/LatestArticles";
import { CTASection } from "@/components/sections/CTASection";

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
];

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <>
      <Hero dict={dict} locale={locale} />
      <TrustBar dict={dict} />
      <WhoWeServe dict={dict} />
      <ServicesOverview dict={dict} locale={locale} />
      <WhyChooseUsTeaser dict={dict} locale={locale} />
      <LatestArticles dict={dict} locale={locale} articles={articles} />
      <CTASection dict={dict} locale={locale} />
    </>
  );
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const dict = await getDictionary(locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}
