import type { ReactNode } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

interface WhoWeServeProps {
  dict: Dictionary;
  locale: Locale;
}

interface Sector {
  title: string;
  desc: string;
  icon: ReactNode;
}

export function WhoWeServe({ dict, locale }: WhoWeServeProps) {
  const sectors: Sector[] = [
    {
      title: dict.whoWeServe.corporations.title,
      desc: dict.whoWeServe.corporations.desc,
      icon: (
        <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-[1.5] fill-none text-gold-500">
          <rect x="6" y="16" width="28" height="20" rx="2" />
          <path d="M14 16V12a6 6 0 0 1 12 0v4" />
          <path d="M18 26v4M22 26v4" />
        </svg>
      ),
    },
    {
      title: dict.whoWeServe.investors.title,
      desc: dict.whoWeServe.investors.desc,
      icon: (
        <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-[1.5] fill-none text-gold-500">
          <path d="M20 4l14 8v8c0 10-6 16-14 20C12 28 6 22 6 12V12L20 4z" />
          <path d="M14 20l4 4 8-8" />
        </svg>
      ),
    },
    {
      title: dict.whoWeServe.individuals.title,
      desc: dict.whoWeServe.individuals.desc,
      icon: (
        <svg viewBox="0 0 40 40" className="w-10 h-10 stroke-[1.5] fill-none text-gold-500">
          <circle cx="20" cy="14" r="6" />
          <path d="M8 36c0-6.627 5.373-12 12-12s12 5.373 12 12" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-navy-950">
      <Container>
        <SectionHeading
          title={dict.whoWeServe.title}
          subtitle={dict.whoWeServe.subtitle}
          align="center"
          light
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {sectors.map((sector, idx) => (
            <div
              key={idx}
              className="group border border-warm-800/40 p-10 text-center hover:border-gold-500/50 transition-smooth"
            >
              <div className="flex justify-center mb-6 group-hover:scale-110 transition-smooth">
                {sector.icon}
              </div>
              <h3 className="font-heading-ar text-xl font-semibold text-white mb-4">
                {sector.title}
              </h3>
              <p className="text-warm-400 text-sm leading-relaxed">
                {sector.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
