import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import TeamCard from "@/components/ui/TeamCard";
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
    title: dict.team.title,
    description: dict.team.subtitle,
    alternates: {
      canonical: `/team`,
      languages: {
        ar: `/ar/team`,
        en: `/en/team`,
      },
    },
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

      <CTASection dict={dict} locale={locale} />
    </>
  );
}
