import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";

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
    title: dict.whyChooseUs.title,
    description: dict.whyChooseUs.subtitle,
    alternates: {
      canonical: `/why-choose-us`,
      languages: {
        ar: `/ar/why-choose-us`,
        en: `/en/why-choose-us`,
      },
    },
  };
}

export default async function WhyChooseUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  const reasons = [
    { num: "01", title: dict.whyChooseUs.reason1Title, desc: dict.whyChooseUs.reason1Desc },
    { num: "02", title: dict.whyChooseUs.reason2Title, desc: dict.whyChooseUs.reason2Desc },
    { num: "03", title: dict.whyChooseUs.reason3Title, desc: dict.whyChooseUs.reason3Desc },
    { num: "04", title: dict.whyChooseUs.reason4Title, desc: dict.whyChooseUs.reason4Desc },
    { num: "05", title: dict.whyChooseUs.reason5Title, desc: dict.whyChooseUs.reason5Desc },
    { num: "06", title: dict.whyChooseUs.reason6Title, desc: dict.whyChooseUs.reason6Desc },
  ];

  const steps = [
    { num: "1", title: dict.whyChooseUs.step1Title, desc: dict.whyChooseUs.step1Desc },
    { num: "2", title: dict.whyChooseUs.step2Title, desc: dict.whyChooseUs.step2Desc },
    { num: "3", title: dict.whyChooseUs.step3Title, desc: dict.whyChooseUs.step3Desc },
    { num: "4", title: dict.whyChooseUs.step4Title, desc: dict.whyChooseUs.step4Desc },
  ];

  return (
    <>
      <section className="bg-navy-900 py-20">
        <Container>
          <SectionHeading
            title={dict.whyChooseUs.title}
            subtitle={dict.whyChooseUs.subtitle}
            light
            level={1}
          />
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason) => (
              <div
                key={reason.num}
                className="border border-warm-200 p-8 hover:border-gold-600 transition-colors"
              >
                <span className="text-gold-700 font-heading-en text-sm font-semibold tracking-wider">
                  {reason.num}
                </span>
                <h3 className="font-heading-ar text-xl font-semibold text-navy-900 mt-3 mb-3">
                  {reason.title}
                </h3>
                <p className="text-warm-600 leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-warm-50 py-20">
        <Container>
          <SectionHeading
            title={dict.whyChooseUs.methodTitle}
          />
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gold-200" />
            {steps.map((step) => (
              <div key={step.num} className="relative text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold-400 text-white text-xl font-semibold font-heading-en relative z-10">
                  {step.num}
                </div>
                <h4 className="font-heading-ar text-lg font-semibold text-navy-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-warm-600 leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection dict={dict} locale={locale} />
    </>
  );
}
