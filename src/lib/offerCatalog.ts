export type OfferCategory = "username" | "account" | "fansign" | "service";

export const SERVICE_CATALOG = {
  "Digital products": {
    "Gaming": ["Game accounts", "In-game items", "Gift cards", "Top ups"],
    "Software & apps": ["AI & tools", "Design tools", "Productivity apps", "Activation links"],
    "Retail": ["Digital goods", "Subscriptions", "Coupons & codes"],
    "Payment & stable coins": ["Crypto vouchers", "Stablecoin services"],
    "Telco": ["Mobile top ups", "Data packages"],
  },
  "Rent-time services": {
    "Social growth": ["Platform engagement", "Content promotion", "Community management"],
    "Creative": ["Logo & branding", "Video editing", "Music production", "Design"],
    "Development": ["Websites", "Bots & automation", "API integrations"],
    "Consulting": ["Strategy", "Account setup", "Marketplace support"],
  },
} as const;

export const OFFER_CATEGORIES: Array<{ id: OfferCategory; label: string }> = [
  { id: "username", label: "Username" },
  { id: "account", label: "Account" },
  { id: "fansign", label: "Fansign" },
  { id: "service", label: "Service" },
];

export const SERVICE_TYPES = Object.keys(SERVICE_CATALOG) as Array<keyof typeof SERVICE_CATALOG>;

export function serviceGroups(type: keyof typeof SERVICE_CATALOG) {
  return Object.keys(SERVICE_CATALOG[type]) as Array<keyof (typeof SERVICE_CATALOG)[typeof type]>;
}

export function serviceOptions(type: keyof typeof SERVICE_CATALOG, group: string) {
  const options = SERVICE_CATALOG[type] as Record<string, readonly string[]>;
  return options[group] ?? [];
}

export function displayOffer(item: { category?: string; handle?: string; details?: Record<string, any> | null }) {
  const category = item.category?.toLowerCase();
  if (category === "fansign") return item.details?.recipient || item.handle || "Fansign";
  if (category === "service") return item.details?.service_name || item.handle || "Service";
  return item.handle || "Listing";
}
