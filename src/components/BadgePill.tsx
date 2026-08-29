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
  sales_10: "10 sales",
  sales_30: "30 sales",
  sales_50: "50 sales",
  sales_100: "100 sales",
  sales_500: "500 sales",
  sales_1000: "1000 sales",
};

const VerifiedIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="#2575ff" stroke="white" strokeWidth="1.5" aria-hidden="true">
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" fill="none" />
  </svg>
);

const BadgeIcon = ({ type }: { type: string }) => {
  const tone = type === "top_seller"
    ? "text-amber-300"
    : type === "trusted_seller"
      ? "text-[#a7a7b3]"
      : type === "og" || type === "early_adopter"
        ? "text-emerald-300"
        : type === "sales_30"
          ? "text-orange-300"
          : type === "sales_50"
            ? "text-cyan-300"
            : type === "sales_100" || type === "sales_500"
              ? "text-violet-300"
              : /sales/.test(type)
                ? "text-yellow-300"
                : "text-[#a7a7b3]";
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: `h-3.5 w-3.5 shrink-0 ${tone}`, "aria-hidden": true };
  if (type === "top_seller") return <svg {...common}><path d="m11.56 3.27-3.1 5.6a1 1 0 0 1-1.52.3L2.82 5.5a.5.5 0 0 0-.8.52l2.84 10.25a1 1 0 0 0 .96.73h12.36a1 1 0 0 0 .96-.73L21.98 6.02a.5.5 0 0 0-.8-.52l-4.28 3.66a1 1 0 0 1-1.52-.3l-2.95-5.6a.5.5 0 0 0-.88 0Z" /><path d="M5 21h14" /></svg>;
  if (type === "trusted_seller") return <svg {...common}><path d="M12 3 4.5 6v5c0 4.7 3.1 8.6 7.5 10 4.4-1.4 7.5-5.3 7.5-10V6z" /><path d="m8.5 12 2.2 2.2 4.8-4.8" /></svg>;
  if (type === "og" || type === "early_adopter") return <svg {...common}><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" /><path d="M11 12 5.12 2.2" /><path d="m13 12 5.88-9.8" /><path d="M8 7h8" /><circle cx="12" cy="17" r="5" /><path d="M12 18v-2h-.5" /></svg>;
  if (type === "sales_30") return <svg {...common}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>;
  if (type === "sales_50") return <svg {...common}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>;
  if (type === "sales_100") return <svg {...common}><path d="M6 3h12l4 6-10 13L2 9Z" /><path d="M11 3 8 9l4 13 4-13-3-6M2 9h20" /></svg>;
  if (type === "sales_500") return <svg {...common}><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" /></svg>;
  if (/sales/.test(type)) return <svg {...common}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>;
  return null;
};

const iconMarkClass = (type: string) => {
  if (type === "verified_seller") return "border-[#3978ff]/35 bg-[#1f62ff]/20";
  if (type === "og" || type === "early_adopter") return "border-emerald-400/30 bg-emerald-400/10";
  if (type === "top_seller") return "border-amber-400/35 bg-amber-400/10";
  if (type === "sales_30") return "border-orange-400/35 bg-orange-400/10";
  if (type === "sales_50") return "border-cyan-400/35 bg-cyan-400/10";
  if (type === "sales_100" || type === "sales_500") return "border-violet-400/35 bg-violet-400/10";
  if (/sales/.test(type)) return "border-yellow-400/35 bg-yellow-400/10";
  return "border-white/[0.09] bg-white/[0.035]";
};

export default function BadgePill({ badgeType, compact = false }: BadgePillProps) {
  const type = badgeType.toLowerCase();
  const label = labels[type] ?? type.replaceAll("_", " ");
  const isDexter = type === "dexter";
  const isVerified = type === "verified_seller";

  return (
    <span
      title={label}
      className={`inline-flex items-center gap-1.5 rounded-full border border-[#2b2b33] bg-[#141416] font-[Poppins,ui-sans-serif,system-ui,sans-serif] font-medium leading-none text-[#d1d1d9] transition-[border-color,background-color] hover:border-[#474752] hover:bg-[#19191c] ${
        compact ? "min-h-7 px-2.5 py-1 text-[11px]" : "min-h-8 px-3 py-1.5 text-[12px]"
      }`}
    >
      {isDexter ? (
        <span className={`dexter-mark flex shrink-0 items-center justify-center rounded-full border border-[#ff2a2a]/60 bg-[#160b0d] ${compact ? "h-4 w-4" : "h-5 w-5"}`}>
          <img src="/dexter-badge.svg" alt="" className="dexter-logo h-full w-full rounded-full object-cover" />
        </span>
      ) : (
        <span className={`flex shrink-0 items-center justify-center rounded-md border ${iconMarkClass(type)} ${compact ? "h-4 w-4" : "h-[18px] w-[18px]"}`}>
          {isVerified ? <VerifiedIcon /> : <BadgeIcon type={type} />}
        </span>
      )}
      <span className={isDexter ? "text-[#ff5b5b]" : ""}>{label}</span>
    </span>
  );
}
