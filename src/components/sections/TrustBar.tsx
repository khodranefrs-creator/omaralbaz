import type { Dictionary } from "@/i18n/get-dictionary";
import Container from "@/components/ui/Container";

interface TrustBarProps {
  dict: Dictionary;
}

const items = [
  { valueKey: "experienceValue", labelKey: "experience" },
  { valueKey: "casesValue", labelKey: "cases" },
  { valueKey: "industriesValue", labelKey: "industries" },
  { valueKey: "satisfactionValue", labelKey: "satisfaction" },
] as const;

export default function TrustBar({ dict }: TrustBarProps) {
  return (
    <section className="bg-navy-900 py-12">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((item) => (
            <div key={item.labelKey} className="text-center">
              <p className="text-3xl font-bold text-gold-400">
                {dict.trustBar[item.valueKey]}
              </p>
              <p className="mt-2 text-sm text-warm-300">
                {dict.trustBar[item.labelKey]}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
