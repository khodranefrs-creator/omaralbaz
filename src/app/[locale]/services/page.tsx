import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GoldDivider from "@/components/ui/GoldDivider";
import Button from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

const SERVICE_SLUGS = ["corporate", "contracts", "consultancy", "dispute", "advisory"] as const;

type ServiceSlug = (typeof SERVICE_SLUGS)[number];

interface ServiceOverviewData {
  title: string;
  shortDesc: string;
  description: string;
}

function getServicesOverview(dict: Awaited<ReturnType<typeof getDictionary>>): Array<{ slug: ServiceSlug; service: ServiceOverviewData }> {
  const services = dict.services as unknown as Record<string, ServiceOverviewData>;
  return SERVICE_SLUGS.map((slug) => ({
    slug,
    service: services[slug],
  }));
}

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
    title: dict.services.title,
    description: dict.services.subtitle,
    alternates: {
      canonical: `/services`,
      languages: {
        ar: `/ar/services`,
        en: `/en/services`,
      },
    },
  };
}

function ServiceBlock({
  slug,
  service,
  locale,
  learnMoreLabel,
  index,
}: {
  slug: ServiceSlug;
  service: { title: string; shortDesc: string; description: string };
  locale: string;
  learnMoreLabel: string;
  index: number;
}) {
  return (
    <section className={index % 2 === 0 ? "bg-white py-16" : "bg-warm-50 py-16"}>
      <Container>
        <div className="max-w-3xl">
          <h3 className="font-heading-ar text-3xl font-semibold text-navy-900 mb-4">
            {service.title}
          </h3>
          <p className="text-lg text-warm-600 leading-relaxed mb-3">
            {service.shortDesc}
          </p>
          <p className="text-warm-600 leading-relaxed mb-8">
            {service.description}
          </p>
          <Button variant="outline" href={`/${locale}/services/${slug}`}>
            {learnMoreLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  const services = getServicesOverview(dict);

  return (
    <>
      <section className="bg-navy-900 py-20">
        <Container>
          <SectionHeading
            title={dict.services.title}
            subtitle={dict.services.subtitle}
            light
          />
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <p className="text-lg text-warm-600 leading-relaxed max-w-3xl mx-auto text-center">
            {dict.services.overview}
          </p>
        </Container>
      </section>

      {services.map(({ slug, service }, index) => (
        <div key={slug}>
          <ServiceBlock
            slug={slug}
            service={service}
            locale={locale}
            learnMoreLabel={dict.common.learnMore}
            index={index}
          />
          {index < services.length - 1 && (
            <div className="py-4">
              <GoldDivider maxWidth="6rem" />
            </div>
          )}
        </div>
      ))}

      <CTASection dict={dict} locale={locale} />
    </>
  );
}
