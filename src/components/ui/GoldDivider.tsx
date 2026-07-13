import clsx from "clsx";

interface GoldDividerProps {
  className?: string;
  maxWidth?: string;
}

export default function GoldDivider({ className, maxWidth }: GoldDividerProps) {
  return (
    <div className={clsx("w-full px-4 sm:px-6 lg:px-8", className)}>
      <div
        className="mx-auto gold-divider"
        style={maxWidth ? { maxWidth } : undefined}
      />
    </div>
  );
}
