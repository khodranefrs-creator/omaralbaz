import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface CTASectionProps {
  dict: Dictionary;
  locale: Locale;
}

export function CTASection({ dict, locale }: CTASectionProps) {
  const trustItems = dict.home.trustItems;

  return (
    <section className="bg-navy-900 py-20 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading-ar text-3xl md:text-4xl font-semibold text-white tracking-tight">
            {dict.home.ctaTitle}
          </h2>

          <div className="mt-4 h-0.5 w-12 bg-gold-500 mx-auto" />

          <p className="mt-6 text-lg leading-relaxed text-warm-300 max-w-2xl mx-auto">
            {dict.home.ctaSubtitle}
          </p>

          <div className="mt-10">
            <Button variant="primary" size="lg" href={`/${locale}/contact`}>
              {dict.home.ctaButton}
            </Button>
          </div>

          {trustItems && trustItems.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {trustItems.map((item: string, i: number) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-xs text-warm-400"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="w-3.5 h-3.5 text-gold-500 fill-none stroke-current stroke-[2]"
                  >
                    <path d="M3 8.5l3.5 3.5L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
