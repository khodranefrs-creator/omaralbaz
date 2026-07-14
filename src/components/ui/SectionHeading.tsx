import clsx from "clsx";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
  level?: 1 | 2;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  light = false,
  level = 2,
}: SectionHeadingProps) {
  const Tag = level === 1 ? "h1" : "h2";

  return (
    <div
      className={clsx(
        "mb-14",
        align === "center" ? "text-center" : "text-start"
      )}
    >
      <Tag
        className={clsx(
          "font-heading-ar text-3xl md:text-4xl font-semibold tracking-tight leading-tight",
          light ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </Tag>
      <div
        className={clsx(
          "mt-5 h-[2px] w-12 bg-gradient-to-r from-gold-500 to-gold-300",
          align === "center" && "mx-auto"
        )}
      />
      {subtitle && (
        <p
          className={clsx(
            "mt-6 text-lg max-w-2xl leading-relaxed",
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
