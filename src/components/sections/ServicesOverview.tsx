import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";

interface ServicesOverviewProps {
  dict: Dictionary;
  locale: Locale;
}

const services = [
  { slug: "corporate", icon: "\u2696" },
  { slug: "contracts", icon: "\u{1F4C4}" },
  { slug: "consultancy", icon: "\u{1F4AC}" },
  { slug: "dispute", icon: "\u2694" },
  { slug: "advisory", icon: "\u{1F3AF}" },
] as const;

export default function ServicesOverview({ dict, locale }: ServicesOverviewProps) {
  return (
    <section className="bg-warm-50 py-20">
      <Container>
        <SectionHeading
          title={dict.home.servicesTitle}
          subtitle={dict.home.servicesSubtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const serviceData = dict.services[service.slug];
            return (
              <ServiceCard
                key={service.slug}
                slug={service.slug}
                titleKey={serviceData.title}
                descriptionKey={serviceData.shortDesc}
                icon={service.icon}
                locale={locale}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
