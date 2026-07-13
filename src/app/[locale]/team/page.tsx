import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TeamCard from "@/components/ui/TeamCard";
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
    title: dict.team.title,
  };
}

export default async function TeamPage({
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
            title={dict.team.title}
            subtitle={dict.team.subtitle}
            light
          />
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <div className="max-w-xl mx-auto">
            <TeamCard
              name={dict.team.omar.name}
              role={dict.team.omar.role}
              specialization={dict.team.omar.specialization}
              bio={dict.team.omar.bio}
            />
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
