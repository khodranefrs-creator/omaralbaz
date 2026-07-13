import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

interface WhyChooseUsTeaserProps {
  dict: Dictionary;
  locale: Locale;
}

const reasons = [
  { num: "1", titleKey: "reason1Title" as const, descKey: "reason1Desc" as const },
  { num: "2", titleKey: "reason2Title" as const, descKey: "reason2Desc" as const },
  { num: "3", titleKey: "reason3Title" as const, descKey: "reason3Desc" as const },
  { num: "4", titleKey: "reason4Title" as const, descKey: "reason4Desc" as const },
  { num: "5", titleKey: "reason5Title" as const, descKey: "reason5Desc" as const },
  { num: "6", titleKey: "reason6Title" as const, descKey: "reason6Desc" as const },
];

export function WhyChooseUsTeaser({ dict, locale }: WhyChooseUsTeaserProps) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <Container>
        <SectionHeading
          title={dict.whyChooseUs.title}
          subtitle={dict.whyChooseUs.subtitle}
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {reasons.map((reason) => (
            <div key={reason.num} className="group">
              <div className="flex items-start gap-5">
                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gold-500 text-gold-600 font-heading-en text-sm font-semibold transition-smooth group-hover:bg-gold-500 group-hover:text-navy-950">
                  {reason.num}
                </span>
                <div>
                  <h3 className="font-heading-ar text-lg font-semibold text-navy-900 mb-2">
                    {dict.whyChooseUs[reason.titleKey]}
                  </h3>
                  <p className="text-warm-600 text-sm leading-relaxed">
                    {dict.whyChooseUs[reason.descKey]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href={`/${locale}/why-choose-us`}
            className="inline-flex items-center gap-2 text-gold-600 font-medium hover:text-gold-500 transition-smooth"
          >
            <span className="rtl:rotate-180">&#8594;</span>
            <span>{dict.whyChooseUs.methodTitle}</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
