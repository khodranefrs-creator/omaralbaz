import Link from "next/link";
import { type ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold-500 text-white hover:bg-gold-400 active:bg-gold-600 focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 shadow-sm hover:shadow-md active:shadow-none",
  secondary:
    "bg-navy-900 text-white hover:bg-navy-800 active:bg-navy-700 focus-visible:ring-2 focus-visible:ring-navy-400 focus-visible:ring-offset-2 shadow-sm hover:shadow-md active:shadow-none",
  outline:
    "border border-gold-400 text-gold-600 hover:bg-gold-50 active:bg-gold-100 focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2",
  ghost:
    "text-warm-700 hover:text-gold-600 active:text-gold-700 hover:bg-warm-50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  href,
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center font-medium tracking-wide transition-smooth duration-200",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
