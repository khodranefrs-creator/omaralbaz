import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface WhyChooseUsTeaserProps {
  dict: Dictionary;
  locale: Locale;
}

const highlights = [1, 2, 3] as const;

export default function WhyChooseUsTeaser({ dict, locale }: WhyChooseUsTeaserProps) {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-heading-ar text-3xl md:text-4xl font-semibold text-navy-900 tracking-tight">
              {dict.home.whyTitle}
            </h2>
            <div className="mt-4 h-0.5 w-12 bg-gold-400" />
            <p className="mt-5 text-lg leading-relaxed text-warm-600 max-w-lg">
              {dict.home.whySubtitle}
            </p>
            <div className="mt-8">
              <Button variant="primary" size="md" href={`/${locale}/why-choose-us`}>
                {dict.common.learnMore}
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {highlights.map((i) => (
              <div
                key={i}
                className="border border-warm-200 bg-warm-50 p-6 transition-smooth hover:border-gold-400"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-gold-400 text-sm font-bold text-white">
                    {i}
                  </span>
                  <h3 className="font-heading-ar text-lg font-semibold text-navy-900">
                    {dict.whyChooseUs[`reason${i}Title` as keyof typeof dict.whyChooseUs]}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
