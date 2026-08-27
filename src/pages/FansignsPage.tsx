import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

// ── Inline icons ──────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);
const FilterIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const GridIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
);
const ListIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M21 9H3" /><path d="M21 15H3" />
  </svg>
);
const ChevronDown = () => (
  <svg className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#93939f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const StarIcon = () => (
  <svg className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
);
const VerifiedIcon = () => (
  <svg className="w-3.5 h-3.5 fill-[#ff0000] stroke-white shrink-0" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Verified">
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const ArrowIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);
const ClockIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const TagIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
    <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
  </svg>
);

// Platform brand icons
const IgIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3">
    <defs>
      <radialGradient id="ig-mp" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#FDF497" /><stop offset="9%" stopColor="#FDF497" />
        <stop offset="45%" stopColor="#FD5949" /><stop offset="60%" stopColor="#D6249F" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" fill="url(#ig-mp)" />
  </svg>
);
const TtIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#25f4ee" transform="translate(-0.6,-0.35)" />
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#fe2c55" transform="translate(0.6,0.35)" />
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#fff" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" fill="#f9f9fb" />
  </svg>
);
const SnapIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3">
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015z" fill="#fffc00" stroke="#0a0a0f" strokeWidth="0.6" />
  </svg>
);
const TgIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3">
    <circle cx="12" cy="12" r="12" fill="#26a5e4" />
    <path d="M16.906 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="#fff" />
  </svg>
);
const YtIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#ff0000" />
    <path d="M9.545 15.568V8.432L15.818 12z" fill="#fff" />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────
const PLATFORMS = [
  { id: "all", label: "All platforms", dot: "#ff0000", count: 1102 },
  { id: "instagram", label: "Instagram", dot: "#ed459c", count: 1070, Icon: IgIcon },
  { id: "tiktok", label: "TikTok", dot: "#1fe0f9", count: 14, Icon: TtIcon },
  { id: "twitter", label: "X / Twitter", dot: "#d3d9de", count: 8, Icon: XIcon },
  { id: "snapchat", label: "Snapchat", dot: "#fbcf23", count: 5, Icon: SnapIcon },
  { id: "telegram", label: "Telegram", dot: "#26a5e4", count: 3, Icon: TgIcon },
  { id: "youtube", label: "YouTube", dot: "#ff0000", count: 2, Icon: YtIcon },
];

const MOCK_LISTINGS = [
  { id: 1, handle: "ghost", category: "username", platform: "instagram", price: 1200, seller: "seller_x", verified: true, rating: 4.9, reviews: 38, followers: "12.4k", timeAgo: "2h ago", hot: true },
  { id: 2, handle: "zen", category: "username", platform: "instagram", price: 850, seller: "handle_broker", verified: true, rating: 4.7, reviews: 22, followers: "8.1k", timeAgo: "4h ago", hot: false },
  { id: 3, handle: "luxe", category: "account", platform: "tiktok", price: 3400, seller: "username_king", verified: true, rating: 5.0, reviews: 61, followers: "890k", timeAgo: "1h ago", hot: true },
  { id: 4, handle: "arc", category: "username", platform: "twitter", price: 500, seller: "og_handles", verified: false, rating: 4.2, reviews: 9, followers: "—", timeAgo: "6h ago", hot: false },
  { id: 5, handle: "void", category: "fansign", platform: "instagram", price: 2100, seller: "seller_x", verified: true, rating: 4.8, reviews: 44, followers: "34.2k", timeAgo: "3h ago", hot: true },
  { id: 6, handle: "snap_og", category: "account", platform: "snapchat", price: 400, seller: "snap_dealer", verified: false, rating: 4.0, reviews: 6, followers: "—", timeAgo: "8h ago", hot: false },
  { id: 7, handle: "pulse", category: "service", platform: "instagram", price: 750, seller: "handle_broker", verified: true, rating: 4.6, reviews: 18, followers: "6.7k", timeAgo: "5h ago", hot: false },
  { id: 8, handle: "nova", category: "username", platform: "instagram", price: 1800, seller: "og_handles", verified: true, rating: 4.9, reviews: 52, followers: "21.8k", timeAgo: "1d ago", hot: true },
  { id: 9, handle: "drift", category: "service", platform: "telegram", price: 290, seller: "tg_broker", verified: false, rating: 3.9, reviews: 4, followers: "—", timeAgo: "12h ago", hot: false },
  { id: 10, handle: "apex", category: "fansign", platform: "instagram", price: 5500, seller: "username_king", verified: true, rating: 5.0, reviews: 89, followers: "102k", timeAgo: "2d ago", hot: true },
  { id: 11, handle: "luma", category: "account", platform: "youtube", price: 900, seller: "yt_handles", verified: true, rating: 4.5, reviews: 11, followers: "45k subs", timeAgo: "3d ago", hot: false },
  { id: 12, handle: "ink", category: "username", platform: "instagram", price: 380, seller: "seller_x", verified: false, rating: 4.1, reviews: 7, followers: "1.2k", timeAgo: "10h ago", hot: false },
];

const PlatformIcon = ({ platform }: { platform: string }) => {
  const map: Record<string, React.ReactNode> = {
    instagram: <IgIcon />, tiktok: <TtIcon />, twitter: <XIcon />,
    snapchat: <SnapIcon />, telegram: <TgIcon />, youtube: <YtIcon />,
  };
  return map[platform] ?? null;
};

const platformDot = (p: string) => PLATFORMS.find(x => x.id === p)?.dot ?? "#ff0000";

// ── Card ──────────────────────────────────────────────────────────────────
function ListingCard({ item, grid }: { item: typeof MOCK_LISTINGS[0]; grid: boolean }) {
  const dot = platformDot(item.platform);
  if (grid) {
    return (
      <Link to={`/listing/${item.handle}`} className="bg-[#111113] border border-[#222226] rounded-[14px] p-5 flex flex-col gap-3 hover:border-[#333338] hover:-translate-y-0.5 transition-all group">
        {/* Platform + hot badge */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[1.4px] text-[#93939f]">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dot }} />
            {item.platform}
          </span>
          {item.hot && (
            <span className="text-[10px] font-mono font-medium uppercase tracking-widest text-[#ff0000] bg-[rgba(255,0,0,0.08)] border border-[rgba(255,0,0,0.2)] px-1.5 py-0.5 rounded-[5px]">hot</span>
          )}
        </div>
        {/* Handle */}
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-semibold tracking-tight">{['username', 'account'].includes(item.category) ? '@' : '$'}{item.handle}</span>
            {item.verified && <VerifiedIcon />}
          </div>
          <div className="text-[#93939f] text-xs mt-0.5 flex items-center gap-1">
            <PlatformIcon platform={item.platform} />
            {item.followers !== "—" && <span>{item.followers} followers</span>}
          </div>
        </div>
        {/* Stats row */}
        <div className="flex items-center gap-3 text-[#93939f] text-xs mt-auto">
          <span className="flex items-center gap-1"><StarIcon /> {item.rating} ({item.reviews})</span>
          <span className="flex items-center gap-1 ml-auto"><ClockIcon /> {item.timeAgo}</span>
        </div>
        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-[#222226]">
          <span className="font-mono text-lg font-semibold">${item.price.toLocaleString()}</span>
          <span className="text-[#ff0000] flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all">
            View <ArrowIcon />
          </span>
        </div>
      </Link>
    );
  }

  // List view
  return (
    <Link to={`/listing/${item.handle}`} className="bg-[#111113] border border-[#222226] rounded-[12px] px-5 py-4 flex items-center gap-4 hover:border-[#333338] transition-colors group">
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold tracking-tight">{['username', 'account'].includes(item.category) ? '@' : '$'}{item.handle}</span>
          {item.verified && <VerifiedIcon />}
          <span className="ml-1.5 flex items-center gap-1 text-[10px] font-mono uppercase tracking-[1.4px] text-[#93939f]">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dot }} />
            {item.platform}
          </span>
        </div>
        <div className="text-xs text-[#93939f] flex items-center gap-3">
          <span className="flex items-center gap-1"><StarIcon /> {item.rating} ({item.reviews})</span>
          {item.followers !== "—" && <span>{item.followers} followers</span>}
          <span className="flex items-center gap-1 ml-auto text-[#666]"><ClockIcon /> {item.timeAgo}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <span className="font-mono font-semibold">${item.price.toLocaleString()}</span>
        <span className="text-[#ff0000] flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all">
          View <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function FansignsPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState(searchParams.get("platform") ?? "all");
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [quickView, setQuickView] = useState("all");

  const filtered = useMemo(() => {
    let list = MOCK_LISTINGS.filter(l => l.category === "fansign");
    if (platform !== "all") list = list.filter(l => l.platform === platform);
    if (search.trim()) list = list.filter(l => l.handle.toLowerCase().includes(search.toLowerCase()));
    if (quickView === "hot") list = list.filter(l => l.hot);
    if (quickView === "recent") list = [...list].sort((a, b) => a.id - b.id);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name-asc") list = [...list].sort((a, b) => a.handle.localeCompare(b.handle));
    return list;
  }, [platform, search, sort, quickView]);

  return (
    <div className="bg-zinc-950 text-[#f9f9fb] font-[Poppins,ui-sans-serif,system-ui,sans-serif]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-10 pb-0">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(60% 50% at 50% 0%, rgba(255,0,0,0.08), rgba(0,0,0,0) 62%)" }}
        />
        <div className="max-w-screen-xl relative mx-auto px-4">
          <div
            className="bg-[rgba(17,17,19,0.5)] relative overflow-hidden isolate rounded-[18px] border border-[#222226]"
            style={{ backgroundImage: "radial-gradient(90% 70% at 18% 0%, rgba(255,0,0,0.08), rgba(0,0,0,0) 55%), radial-gradient(70% 60% at 100% 100%, rgba(255,80,80,0.06), rgba(0,0,0,0) 60%)" }}
          >
            {/* Grid overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 [mask-image:radial-gradient(100%_100%_at_50%_0%,rgb(0,0,0)_40%,rgba(0,0,0,0)_85%)]"
              style={{ backgroundImage: "linear-gradient(rgba(249,249,251,0.035) 1px,rgba(0,0,0,0) 1px),linear-gradient(90deg,rgba(249,249,251,0.035) 1px,rgba(0,0,0,0) 1px)", backgroundSize: "44px 44px" }}
            />
            {/* @ watermark */}
            <span aria-hidden="true" className="text-[rgba(249,249,251,0.04)] leading-none font-semibold text-[547px] absolute right-[-4%] top-1/2 -translate-y-1/2 select-none pointer-events-none">@</span>

            <div className="relative z-10 px-8 md:px-12 py-14">
              {/* Badge */}
              <span className="bg-[rgba(9,9,11,0.5)] text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase inline-flex items-center gap-2 px-3 py-1.5 rounded-[8px] border border-[#222226]">
                <span className="w-1.5 h-1.5 bg-[#ff0000] rounded-full animate-pulse" />
                Fansigns — real proofs
              </span>

              <h1 className="leading-none font-medium text-[42px] md:text-[60px] tracking-[-1.8px] max-w-[672px] mt-5">
                Custom fansigns <span className="text-[#ff0000]">for sale.</span>
              </h1>

              {/* Search */}
              <div className="max-w-[576px] mt-7">
                <div className="bg-[rgba(9,9,11,0.7)] flex items-center gap-2 backdrop-blur-sm rounded-[12px] border border-[#222226] px-4">
                  <span className="text-[#93939f]"><SearchIcon /></span>
                  <input
                    placeholder='Search a name — try "ghost", "zen", 3 letters…'
                    aria-label="Search drops"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="bg-transparent text-sm w-full h-12 outline-none placeholder-[#555]"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-14 gap-y-5 w-fit mt-9">
                {[
                  { val: "1,102", label: "Live listings" },
                  { val: "+522", label: "New this week" },
                  { val: "$40,000", label: "Top ask" },
                  { val: "$39", label: "Floor price" },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <div className="font-mono text-[30px] leading-9">{val}</div>
                    <div className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky toolbar ── */}
      <div className="bg-[rgba(9,9,11,0.9)] sticky z-30 top-0 backdrop-blur-md border-y border-[#222226] mt-8">
        <div className="max-w-screen-xl flex items-center gap-2 mx-auto px-4 py-2.5">
          <span className="text-[#93939f] font-mono text-[11px] tracking-[1.76px] uppercase hidden sm:block mr-auto">
            {filtered.length.toLocaleString()} results
          </span>
          <div className="grow sm:grow-0" />

          {/* Sort */}
          <div className="relative shrink-0">
            <select
              aria-label="Sort listings"
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="bg-[#111113] text-[#b7b7c2] text-xs font-medium h-9 rounded-[10px] border border-[#222226] appearance-none pl-3 pr-8 outline-none cursor-pointer"
            >
              <option value="newest">Newest first</option>
              <option value="price-asc">Price: low → high</option>
              <option value="price-desc">Price: high → low</option>
              <option value="name-asc">Name: A → Z</option>
            </select>
            <ChevronDown />
          </div>

          {/* Filters pill */}
          <button className="text-[#b7b7c2] text-xs font-medium h-9 flex items-center gap-1.5 px-3 rounded-[10px] border border-[#222226] hover:border-[#444] transition-colors">
            <FilterIcon /> Filters
          </button>

          {/* View toggle */}
          <div className="flex items-center border border-[#222226] rounded-[10px] p-0.5">
            <button
              aria-label="Grid view"
              onClick={() => setView("grid")}
              className={`w-8 h-8 flex justify-center items-center rounded-[8px] transition-colors ${view === "grid" ? "bg-zinc-800 text-white" : "text-[#93939f]"}`}
            >
              <GridIcon />
            </button>
            <button
              aria-label="List view"
              onClick={() => setView("list")}
              className={`w-8 h-8 flex justify-center items-center rounded-[8px] transition-colors ${view === "list" ? "bg-zinc-800 text-white" : "text-[#93939f]"}`}
            >
              <ListIcon />
            </button>
          </div>
        </div>
      </div>

      {/* ── Body: Sidebar + Grid ── */}
      <main className="max-w-screen-xl mx-auto pt-8 pb-24 px-4">
        <div className="flex gap-8">

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block w-52 shrink-0 sticky top-24 self-start">
            {/* Quick views */}
            <div>
              <p className="text-[#93939f] font-mono text-[11px] tracking-[1.76px] uppercase mb-2.5 px-3">Quick views</p>
              {[
                { id: "all", label: "All drops", Icon: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg> },
                { id: "hot", label: "Good deals", Icon: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg> },
                { id: "recent", label: "Recently added", Icon: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg> },
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setQuickView(id)}
                  className={`w-full flex items-center gap-2.5 text-sm font-medium px-3 py-2 rounded-[10px] transition-colors ${quickView === id ? "bg-zinc-800 text-white" : "text-[#93939f] hover:text-white"}`}
                >
                  <span className={quickView === id ? "text-[#ff0000]" : ""}><Icon /></span>
                  {label}
                  {quickView === id && (
                    <svg className="w-3.5 h-3.5 ml-auto text-[#ff0000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  )}
                </button>
              ))}
            </div>

            {/* Platforms */}
            <div className="mt-7">
              <p className="text-[#93939f] font-mono text-[11px] tracking-[1.76px] uppercase mb-2.5 px-3">Platforms</p>
              {PLATFORMS.map(({ id, label, dot, count }) => (
                <button
                  key={id}
                  onClick={() => setPlatform(id)}
                  className={`w-full flex items-center gap-2.5 text-sm font-medium px-3 py-2 rounded-[10px] transition-colors ${platform === id ? "bg-zinc-800 text-white" : "text-[#93939f] hover:text-white"}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dot }} />
                  {label}
                  <span className="ml-auto font-mono text-xs text-[#93939f]">{count > 0 ? count : "—"}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* ── Grid / List ── */}
          <div className="flex-1 min-w-0">
            {/* Mobile platform tabs */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
              {PLATFORMS.map(({ id, label, dot }) => (
                <button
                  key={id}
                  onClick={() => setPlatform(id)}
                  className={`flex shrink-0 items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-[8px] border transition-colors ${platform === id ? "bg-[rgba(255,0,0,0.1)] text-[#ff0000] border-[rgba(255,0,0,0.4)]" : "text-[#93939f] border-[#222226]"}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: dot }} />
                  {label}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24 text-[#93939f]">
                <p className="text-lg font-medium">No listings found</p>
                <p className="text-sm mt-2">Try a different search or platform filter.</p>
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map(item => <ListingCard key={item.id} item={item} grid />)}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {filtered.map(item => <ListingCard key={item.id} item={item} grid={false} />)}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
