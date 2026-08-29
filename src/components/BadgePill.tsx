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

const BadgeIcon = ({ type }: { type: string }) => {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "h-3.5 w-3.5 shrink-0", "aria-hidden": true };
  if (type === "top_seller") return <svg {...common}><path d="m11.56 3.27-3.1 5.6a1 1 0 0 1-1.52.3L2.82 5.5a.5.5 0 0 0-.8.52l2.84 10.25a1 1 0 0 0 .96.73h12.36a1 1 0 0 0 .96-.73L21.98 6.02a.5.5 0 0 0-.8-.52l-4.28 3.66a1 1 0 0 1-1.52-.3l-2.95-5.6a.5.5 0 0 0-.88 0Z" /><path d="M5 21h14" /></svg>;
  if (type === "trusted_seller") return <svg {...common}><path d="M12 3 4.5 6v5c0 4.7 3.1 8.6 7.5 10 4.4-1.4 7.5-5.3 7.5-10V6z" /><path d="m8.5 12 2.2 2.2 4.8-4.8" /></svg>;
  if (type === "og" || type === "early_adopter") return <svg {...common}><path d="M4 8h16l-1.5 11h-13z" /><path d="m4 8 2-4h12l2 4M9 12h6" /></svg>;
  if (/sales/.test(type)) return <svg {...common}><path d="M13 2 4 13h6l-1 9 9-11h-6z" /></svg>;
  return null;
};

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
      {!isDexter && !isVerified && <BadgeIcon type={type} />}
      <span>{label}</span>
    </span>
  );
}
