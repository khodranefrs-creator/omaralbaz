import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

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
    title: dict.about.title,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  const values = [
    { title: dict.about.value1Title, desc: dict.about.value1Desc },
    { title: dict.about.value2Title, desc: dict.about.value2Desc },
    { title: dict.about.value3Title, desc: dict.about.value3Desc },
    { title: dict.about.value4Title, desc: dict.about.value4Desc },
  ];

  return (
    <>
      <section className="bg-navy-900 py-20">
        <Container>
          <SectionHeading
            title={dict.about.title}
            subtitle={dict.about.subtitle}
            light
          />
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <SectionHeading
            title={dict.about.storyTitle}
            align="left"
          />
          <div className="max-w-3xl space-y-6">
            <p className="text-warm-600 leading-relaxed text-lg">
              {dict.about.storyP1}
            </p>
            <p className="text-warm-600 leading-relaxed text-lg">
              {dict.about.storyP2}
            </p>
            <p className="text-warm-600 leading-relaxed text-lg">
              {dict.about.storyP3}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-warm-50 py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-warm-200 p-10">
              <h3 className="font-heading-ar text-2xl font-semibold text-navy-900 mb-4">
                {dict.about.visionTitle}
              </h3>
              <div className="h-0.5 w-10 bg-gold-400 mb-6" />
              <p className="text-warm-600 leading-relaxed text-lg">
                {dict.about.vision}
              </p>
            </div>
            <div className="bg-white border border-warm-200 p-10">
              <h3 className="font-heading-ar text-2xl font-semibold text-navy-900 mb-4">
                {dict.about.missionTitle}
              </h3>
              <div className="h-0.5 w-10 bg-gold-400 mb-6" />
              <p className="text-warm-600 leading-relaxed text-lg">
                {dict.about.mission}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <SectionHeading title={dict.about.valuesTitle} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="border-t-2 border-t-gold-400 bg-white border border-warm-200 p-8"
              >
                <h4 className="font-heading-ar text-xl font-semibold text-navy-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-warm-600 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-900 py-20">
        <Container>
          <div className="text-center">
            <h2 className="font-heading-ar text-3xl md:text-4xl font-semibold text-white mb-4">
              {dict.home.ctaTitle}
            </h2>
            <div className="mt-4 h-0.5 w-12 bg-gold-400 mx-auto" />
            <p className="mt-5 text-lg text-warm-300 max-w-2xl mx-auto leading-relaxed">
              {dict.home.ctaSubtitle}
            </p>
            <div className="mt-8">
              <Button variant="primary" size="lg" href={`/${locale}/contact`}>
                {dict.home.ctaButton}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
