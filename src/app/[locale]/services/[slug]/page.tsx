import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GoldDivider from "@/components/ui/GoldDivider";
import Button from "@/components/ui/Button";

interface ServiceData {
  title: string;
  description: string;
  whenTitle: string;
  whenItems: string[];
  methodTitle: string;
  method: string;
}

function getServiceData(dict: Awaited<ReturnType<typeof getDictionary>>, slug: string): ServiceData | undefined {
  const slugMap: Record<string, string> = {
    "corporate-law": "corporate",
    "dispute-resolution": "dispute",
  };
  const dictKey = slugMap[slug] ?? slug;
  const services = dict.services as unknown as Record<string, ServiceData>;
  return services[dictKey];
}

export function generateStaticParams() {
  return [
    { slug: "corporate-law" },
    { slug: "contracts" },
    { slug: "consultancy" },
    { slug: "dispute-resolution" },
    { slug: "advisory" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const dict = await getDictionary(locale);
  const serviceData = getServiceData(dict, slug);

  if (!serviceData) {
    return {};
  }

  return {
    title: serviceData.title,
    description: serviceData.description,
    alternates: {
      canonical: `/services/${slug}`,
      languages: {
        ar: `/ar/services/${slug}`,
        en: `/en/services/${slug}`,
      },
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const serviceData = getServiceData(dict, slug);

  if (!serviceData) {
    notFound();
  }

  return (
    <>
      <section className="bg-navy-900 py-20">
        <Container>
          <SectionHeading
            title={serviceData.title}
            light
          />
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="max-w-4xl">
            <p className="text-xl text-warm-700 leading-relaxed">
              {serviceData.description}
            </p>
          </div>
        </Container>
      </section>

      <GoldDivider maxWidth="6rem" className="py-4" />

      <section className="bg-warm-50 py-16">
        <Container>
          <div className="max-w-4xl">
            <h2 className="font-heading-ar text-2xl md:text-3xl font-semibold text-navy-900 mb-8">
              {serviceData.whenTitle}
            </h2>
            <ul className="space-y-4">
              {serviceData.whenItems.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-400" />
                  <span className="text-warm-700 leading-relaxed text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="max-w-4xl">
            <h2 className="font-heading-ar text-2xl md:text-3xl font-semibold text-navy-900 mb-6">
              {serviceData.methodTitle}
            </h2>
            <p className="text-warm-600 leading-relaxed text-lg">
              {serviceData.method}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-navy-900 py-20">
        <Container>
          <div className="text-center">
            <Button variant="primary" size="lg" href={`/${locale}/contact`}>
              {dict.services.cta}
            </Button>
            <div className="mt-6">
              <Button variant="ghost" href={`/${locale}/services`}>
                {dict.common.backToServices}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
