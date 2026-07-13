"use client";

import { useId } from "react";
import clsx from "clsx";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  options: SelectOption[];
  required?: boolean;
  error?: string;
  placeholder?: string;
}

export default function Select({
  label,
  name,
  options,
  required = false,
  error,
  placeholder,
}: SelectProps) {
  const id = useId();

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-navy-800 mb-2"
      >
        {label}
        {required && <span className="text-gold-700 me-1">*</span>}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        className={clsx(
          "w-full rounded-sm border px-4 py-3 text-base appearance-none",
          "bg-white text-warm-900",
          "transition-smooth outline-none",
          "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%238a877e%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-no-repeat bg-[right_0.75rem_center] rtl:bg-[left_0.75rem_center]",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400"
            : "border-warm-300 focus:border-gold-600 focus:ring-1 focus:ring-gold-600"
        )}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
