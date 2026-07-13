import clsx from "clsx";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "mb-12",
        align === "center" ? "text-center" : "text-start"
      )}
    >
      <h2
        className={clsx(
          "font-heading-ar text-3xl md:text-4xl font-semibold tracking-tight",
          light ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      <div
        className={clsx(
          "mt-4 h-0.5 w-12 bg-gold-400",
          align === "center" && "mx-auto"
        )}
      />
      {subtitle && (
        <p
          className={clsx(
            "mt-5 text-lg max-w-2xl leading-relaxed",
            align === "center" && "mx-auto",
            light ? "text-warm-300" : "text-warm-600"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
