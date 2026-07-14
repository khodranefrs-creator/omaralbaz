import type { Dictionary } from "@/i18n/get-dictionary";
import Container from "@/components/ui/Container";

interface TrustBarProps {
  dict: Dictionary;
}

const items = [
  { valueKey: "experienceValue", labelKey: "experience", descKey: "experienceDesc" },
  { valueKey: "casesValue", labelKey: "cases", descKey: "casesDesc" },
  { valueKey: "industriesValue", labelKey: "industries", descKey: "industriesDesc" },
  { valueKey: "satisfactionValue", labelKey: "satisfaction", descKey: "satisfactionDesc" },
] as const;

export function TrustBar({ dict }: TrustBarProps) {
  return (
    <section className="bg-navy-900 py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {items.map((item) => (
            <div key={item.labelKey} className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold-400 leading-none tracking-tight">
                {dict.trustBar[item.valueKey]}
              </p>
              <p className="mt-3 text-sm font-medium text-warm-200 uppercase tracking-wide">
                {dict.trustBar[item.labelKey]}
              </p>
              <p className="mt-1.5 text-xs text-warm-400 leading-relaxed">
                {dict.trustBar[item.descKey]}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
