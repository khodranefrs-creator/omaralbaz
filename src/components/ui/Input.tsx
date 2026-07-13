"use client";

import { useId } from "react";
import clsx from "clsx";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  dir?: "ltr" | "rtl";
}

export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  error,
  dir,
}: InputProps) {
  const id = useId();

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-navy-800 mb-2"
      >
        {label}
        {required && <span className="text-gold-500 me-1">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        dir={dir}
        className={clsx(
          "w-full rounded-sm border px-4 py-3 text-base",
          "bg-white text-warm-900 placeholder:text-warm-400",
          "transition-smooth outline-none",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400"
            : "border-warm-300 focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
        )}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
