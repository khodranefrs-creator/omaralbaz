import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ServicesOverview from "@/components/sections/ServicesOverview";
import WhyChooseUsTeaser from "@/components/sections/WhyChooseUsTeaser";
import LatestArticles from "@/components/sections/LatestArticles";
import CTASection from "@/components/sections/CTASection";

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
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function HomePage({
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
      <Hero dict={dict} locale={locale} />
      <TrustBar dict={dict} />
      <ServicesOverview dict={dict} locale={locale} />
      <WhyChooseUsTeaser dict={dict} locale={locale} />
      <LatestArticles dict={dict} locale={locale} />
      <CTASection dict={dict} locale={locale} />
    </>
  );
}
