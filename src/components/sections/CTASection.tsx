import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface CTASectionProps {
  dict: Dictionary;
  locale: Locale;
}

export function CTASection({ dict, locale }: CTASectionProps) {
  return (
    <section className="bg-navy-900 py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading-ar text-3xl md:text-4xl font-semibold text-white tracking-tight">
            {dict.home.ctaTitle}
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-warm-300 max-w-2xl mx-auto">
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
  );
}
