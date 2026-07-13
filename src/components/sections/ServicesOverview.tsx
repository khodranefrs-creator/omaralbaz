import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import ServiceIcon from "@/components/ui/ServiceIcon";
import type { ReactNode } from "react";

interface ServicesOverviewProps {
  dict: Dictionary;
  locale: Locale;
}

const serviceData: Array<{
  key: string;
  dictKey: "corporate" | "contracts" | "consultancy" | "dispute" | "advisory";
  href: string;
  iconType: React.ComponentProps<typeof ServiceIcon>["type"];
}> = [
  { key: "corporate", dictKey: "corporate", href: "/services/corporate-law", iconType: "corporate" },
  { key: "contracts", dictKey: "contracts", href: "/services/contracts", iconType: "contracts" },
  { key: "consultancy", dictKey: "consultancy", href: "/services/consultancy", iconType: "consultancy" },
  { key: "dispute", dictKey: "dispute", href: "/services/dispute-resolution", iconType: "dispute" },
  { key: "advisory", dictKey: "advisory", href: "/services/advisory", iconType: "advisory" },
];

export function ServicesOverview({ dict, locale }: ServicesOverviewProps) {
  return (
    <section className="py-24 md:py-32 bg-warm-50">
      <Container>
        <SectionHeading
          title={dict.services.title}
          subtitle={dict.services.subtitle}
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((service) => (
            <ServiceCard
              key={service.key}
              title={dict.services[service.dictKey].title}
              description={dict.services[service.dictKey].shortDesc}
              href={service.href}
              locale={locale}
              icon={<ServiceIcon type={service.iconType} />}
            />
          ))}

          <ServiceCard
            title={dict.services.allServices}
            description={dict.services.allServicesDesc}
            href="/services"
            locale={locale}
            icon={<ServiceIcon type="all" />}
          />
        </div>
      </Container>
    </section>
  );
}
