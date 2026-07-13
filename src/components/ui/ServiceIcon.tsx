import clsx from "clsx";
import type { ReactNode } from "react";

interface ServiceIconProps {
  type:
    | "corporate"
    | "contracts"
    | "consultancy"
    | "dispute"
    | "advisory"
    | "all";
  className?: string;
}

export default function ServiceIcon({ type, className }: ServiceIconProps) {
  const base = "w-10 h-10 stroke-[1.5] fill-none";

  const icons: Record<string, ReactNode> = {
    corporate: (
      <svg viewBox="0 0 40 40" className={clsx(base, className)}>
        <rect x="6" y="16" width="28" height="20" rx="2" />
        <path d="M14 16V12a6 6 0 0 1 12 0v4" />
        <path d="M6 26h28" />
        <path d="M18 26v4" />
        <path d="M22 26v4" />
      </svg>
    ),
    contracts: (
      <svg viewBox="0 0 40 40" className={clsx(base, className)}>
        <path d="M10 6h16l8 8v22a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
        <path d="M26 6v8h8" />
        <path d="M14 22h12" />
        <path d="M14 28h8" />
        <path d="M14 18h4" />
      </svg>
    ),
    consultancy: (
      <svg viewBox="0 0 40 40" className={clsx(base, className)}>
        <circle cx="20" cy="18" r="12" />
        <path d="M20 10v8l5 3" />
        <path d="M8 34l4-6" />
        <path d="M32 34l-4-6" />
        <path d="M16 36h8" />
      </svg>
    ),
    dispute: (
      <svg viewBox="0 0 40 40" className={clsx(base, className)}>
        <path d="M20 4L4 14v4h32v-4L20 4z" />
        <path d="M12 18v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V18" />
        <path d="M20 18v10" />
        <path d="M16 22h8" />
      </svg>
    ),
    advisory: (
      <svg viewBox="0 0 40 40" className={clsx(base, className)}>
        <path d="M20 4l14 8v8c0 10-6 16-14 20C12 28 6 22 6 12V12L20 4z" />
        <path d="M14 20l4 4 8-8" />
      </svg>
    ),
    all: (
      <svg viewBox="0 0 40 40" className={clsx(base, className)}>
        <circle cx="20" cy="20" r="14" />
        <path d="M20 14v12" />
        <path d="M14 20h12" />
      </svg>
    ),
  };

  return icons[type] ?? null;
}
