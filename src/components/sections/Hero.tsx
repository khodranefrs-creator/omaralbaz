import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import GoldDivider from "@/components/ui/GoldDivider";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface HeroProps {
  dict: Dictionary;
  locale: Locale;
}

export default function Hero({ dict, locale }: HeroProps) {
  return (
    <section className="bg-white py-20 md:py-28">
      <GoldDivider />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-10 mb-6 text-sm font-semibold uppercase tracking-widest text-gold-600">
            {dict.hero.tagline}
          </p>

          <h1 className="font-heading-ar text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-navy-900">
            {dict.meta.title}
          </h1>

          <p className="mt-8 text-lg md:text-xl leading-relaxed text-warm-600 max-w-3xl mx-auto">
            {dict.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" size="lg" href={`/${locale}/contact`}>
              {dict.hero.cta}
            </Button>
            <Button variant="outline" size="lg" href={`/${locale}/services`}>
              {dict.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </Container>

      <div className="mt-20">
        <GoldDivider />
      </div>
    </section>
  );
}
