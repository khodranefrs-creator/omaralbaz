import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import Link from "next/link";

interface HeroProps {
  dict: Dictionary;
  locale: Locale;
}

export function Hero({ dict, locale }: HeroProps) {
  return (
    <section className="relative bg-navy-950 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(20,60,90,0.6)_0%,transparent_60%)]" />

      {/* Luxury ambient glow — gold radial, ~3% opacity */}
      <div
        className="hero-glow"
        style={{
          width: "800px",
          height: "800px",
          top: "-20%",
          right: "-10%",
          background: "radial-gradient(circle, var(--color-gold-400) 0%, transparent 70%)",
        }}
      />
      <div
        className="hero-glow"
        style={{
          width: "600px",
          height: "600px",
          bottom: "-30%",
          left: "-5%",
          background: "radial-gradient(circle, var(--color-gold-300) 0%, transparent 70%)",
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 lg:py-48">
        <div className="max-w-3xl">
          <p className="text-gold-400 font-medium tracking-wide text-sm uppercase mb-6">
            {dict.hero.tagline}
          </p>

          <h1 className="font-heading-ar text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.15]">
            {dict.hero.headline}
          </h1>

          <p className="text-lg md:text-xl text-warm-300 leading-relaxed mb-12 max-w-2xl">
            {dict.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-navy-950 font-semibold hover:bg-gold-400 active:bg-gold-600 focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 transition-smooth text-lg"
            >
              {dict.hero.cta}
            </Link>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-warm-400/30 text-white font-semibold hover:border-gold-400 hover:text-gold-400 focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 transition-smooth text-lg"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>

          <p className="text-warm-400 text-sm">{dict.hero.trustMicro}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
    </section>
  );
}
