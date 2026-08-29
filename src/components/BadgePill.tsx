type BadgePillProps = {
  badgeType: string;
  compact?: boolean;
};

const labels: Record<string, string> = {
  dexter: "DEXTER",
  verified_seller: "verified seller",
  trusted_seller: "trusted seller",
  top_seller: "top seller",
  early_adopter: "early adopter",
  og: "og",
};

const VerifiedIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="#2575ff" stroke="white" strokeWidth="1.5" aria-hidden="true">
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" fill="none" />
  </svg>
);

export default function BadgePill({ badgeType, compact = false }: BadgePillProps) {
  const type = badgeType.toLowerCase();
  const label = labels[type] ?? type.replaceAll("_", " ");
  const isDexter = type === "dexter";
  const isVerified = type === "verified_seller";

  return (
    <span
      title={label}
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium leading-none transition-colors ${
        compact ? "px-2 py-1 text-[10px]" : "px-2.5 py-1.5 text-xs"
      } ${
        isDexter
          ? "border-[#ff0000]/70 bg-[#ff0000]/10 text-[#ff5555] shadow-[0_0_12px_rgba(255,0,0,0.14)]"
          : isVerified
            ? "border-[#2575ff]/60 bg-[#2575ff]/10 text-[#8db7ff]"
            : "border-[#333338] bg-[#151519] text-[#b7b7c2] hover:border-[#555560]"
      }`}
    >
      {isDexter && <img src="/dexter-badge.png" alt="" className={compact ? "h-4 w-4 rounded-full object-cover" : "h-5 w-5 rounded-full object-cover"} />}
      {isVerified && <VerifiedIcon />}
      <span>{label}</span>
    </span>
  );
}
