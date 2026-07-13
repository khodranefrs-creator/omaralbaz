import clsx from "clsx";

interface TextAreaProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
}

export default function TextArea({
  label,
  name,
  placeholder,
  required = false,
  error,
  rows = 5,
}: TextAreaProps) {
  const id = `textarea-${name}`;

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-navy-800 mb-2"
      >
        {label}
        {required && <span className="text-gold-700 me-1">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={clsx(
          "w-full rounded-sm border px-4 py-3 text-base resize-y",
          "bg-white text-warm-900 placeholder:text-warm-400",
          "transition-smooth outline-none",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400"
            : "border-warm-300 focus:border-gold-600 focus:ring-1 focus:ring-gold-600"
        )}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
