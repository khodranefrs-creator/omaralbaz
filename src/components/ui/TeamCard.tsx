import clsx from "clsx";

interface TeamCardProps {
  name: string;
  role: string;
  specialization: string;
  bio: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TeamCard({
  name,
  role,
  specialization,
  bio,
}: TeamCardProps) {
  return (
    <div
      className={clsx(
        "border border-warm-200 bg-white p-8 transition-smooth",
        "hover:border-gold-400 hover:shadow-lg"
      )}
    >
      <div
        className={clsx(
          "mb-6 flex h-20 w-20 items-center justify-center rounded-full",
          "bg-navy-900 text-gold-400 text-xl font-semibold font-heading-ar"
        )}
      >
        {getInitials(name)}
      </div>

      <h3 className="font-heading-ar text-xl font-semibold text-navy-900 mb-1">
        {name}
      </h3>

      <p className="text-sm font-medium text-gold-600 mb-1">{role}</p>

      <p className="text-sm text-warm-500 mb-4">{specialization}</p>

      <p className="text-warm-600 leading-relaxed text-sm">{bio}</p>
    </div>
  );
}
