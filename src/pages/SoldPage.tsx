import React, { useState } from "react";
import { Link } from "react-router-dom";

// Platform icons
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 align-middle block" aria-hidden="true">
    <defs>
      <radialGradient id="ig-sold" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#FDF497" />
        <stop offset="9%" stopColor="#FDF497" />
        <stop offset="45%" stopColor="#FD5949" />
        <stop offset="60%" stopColor="#D6249F" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" fill="url(#ig-sold)" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 align-middle block" aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#25f4ee" transform="translate(-0.6, -0.35)" />
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#fe2c55" transform="translate(0.6, 0.35)" />
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#fff" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 align-middle block" aria-hidden="true">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" fill="#f9f9fb" />
  </svg>
);

// Data
const hallOfFame = [
  { handle: "a•••a", category: "username", price: "$45,000", time: "1 month ago", platform: "instagram", color: "#ed459c" },
  { handle: "s•••e", category: "fansign", price: "$32,000", time: "9 months ago", platform: "instagram", color: "#ed459c" },
  { handle: "s•••e", category: "username", price: "$28,500", time: "5 months ago", platform: "instagram", color: "#ed459c" },
];

const soldHandles = [
  { handle: "T•••t", category: "fansign", price: "$10", time: "1 day ago", platform: "instagram", color: "#ed459c" },
  { handle: "r•••e", category: "username", price: "$3,200", time: "1 week ago", platform: "instagram", color: "#ed459c" },
  { handle: "d•••t", category: "account", price: "$5,400", time: "3 weeks ago", platform: "tiktok", color: "#1fe0f9" },
  { handle: "o•••x", category: "service", price: "$2,100", time: "4 weeks ago", platform: "telegram", color: "#2aa0f4" },
  { handle: "g•••t", category: "username", price: "$19,000", time: "2 months ago", platform: "instagram", color: "#ed459c" },
  { handle: "l•••n", category: "account", price: "$950", time: "2 months ago", platform: "snapchat", color: "#fbcf23" },
  { handle: "s•••c", category: "username", price: "$7,800", time: "3 months ago", platform: "twitter", color: "#d3d9de" },
  { handle: "m•••e", category: "service", price: "$1,500", time: "3 months ago", platform: "tiktok", color: "#1fe0f9" },
  { handle: "v•••t", category: "fansign", price: "$6,200", time: "4 months ago", platform: "telegram", color: "#2aa0f4" },
  { handle: "h•••e", category: "username", price: "$12,500", time: "4 months ago", platform: "instagram", color: "#ed459c" },
  { handle: "p•••l", category: "username", price: "$3,900", time: "4 months ago", platform: "twitter", color: "#d3d9de" },
  { handle: "e•••s", category: "account", price: "$640", time: "5 months ago", platform: "snapchat", color: "#fbcf23" },
];

const filterOptions = [
  { id: "all", label: "All platforms", count: 26 },
  { id: "instagram", label: "Instagram", color: "#ed459c", count: 9 },
  { id: "tiktok", label: "TikTok", color: "#1fe0f9", count: 5 },
  { id: "twitter", label: "X / Twitter", color: "#d3d9de", count: 4 },
  { id: "snapchat", label: "Snapchat", color: "#fbcf23", count: 4 },
  { id: "telegram", label: "Telegram", color: "#2aa0f4", count: 4 },
];

export default function SoldPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pt-4 pb-20 font-[Poppins,ui-sans-serif,system-ui,sans-serif]">
      
      {/* Custom Styles for Lumen Cards directly from HTML reference */}
      <style dangerouslySetInnerHTML={{__html: `
        @property --lumen-angle { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
        @keyframes lumen-spin { to { --lumen-angle: 360deg; } }
        .lumen-card {
          position: relative;
          isolation: isolate;
          border-radius: 26px;
          background: #111113;
          transition: transform 0.35s cubic-bezier(0.22, 0.61, 0.25, 1), box-shadow 0.35s ease;
        }
        .lumen-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.25px;
          background: conic-gradient(from var(--lumen-angle), rgba(255,0,0,0.15) 0deg, #ff0000 70deg, #cc0000 130deg, rgba(255,0,0,0.15) 210deg, rgba(255,0,0,0.15) 360deg);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.35;
          transition: opacity 0.4s ease;
          z-index: -1;
        }
        .lumen-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 50px -18px rgba(255,0,0,0.55);
        }
        .lumen-card:hover::before {
          opacity: 1;
          animation: lumen-spin 3.2s linear infinite;
        }
        .lumen-sheen {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.06) 48%, transparent 62%);
          transform: translate(-120%);
          transition: transform 0.7s cubic-bezier(0.22, 0.61, 0.25, 1);
          pointer-events: none;
        }
        .lumen-card:hover .lumen-sheen {
          transform: translate(120%);
        }
      `}} />

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[18px] border border-[#222226] bg-[rgba(17,17,19,0.5)]">
        {/* Abstract hero background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_18%_0%,rgba(255,0,0,0.1),transparent_55%),radial-gradient(70%_60%_at_100%_100%,rgba(204,0,0,0.08),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(249,249,251,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(249,249,251,0.035) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(100% 100% at 50% 0%, #000 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(100% 100% at 50% 0%, #000 40%, transparent 85%)"
        }} />
        <span className="absolute -right-[4%] top-1/2 -translate-y-1/2 text-[clamp(280px,38vw,560px)] leading-none font-semibold text-[rgba(249,249,251,0.04)] pointer-events-none select-none">
          $
        </span>
        
        <div className="relative z-10 px-6 py-14 md:px-14 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-[8px] border border-[#222226] bg-[rgba(9,9,11,0.5)] px-3 py-1.5 font-mono text-[11px] font-medium tracking-[1.76px] uppercase text-[#93939f]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff0000]" />
            SOLD ARCHIVE — proof of sales
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-semibold text-[#f9f9fb] md:text-6xl tracking-[-1.08px]">
            Every grail that <span className="text-[#ff0000]">found a new owner</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#93939f] md:text-lg">
            A running record of names that changed hands on larpings.com. Prices are real, transfers were protected — most items are partially hidden to protect buyer privacy.
          </p>
          
          <div className="mt-10 grid w-fit grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-4 md:gap-x-14">
            <div>
              <div className="text-2xl font-semibold text-[#f9f9fb] md:text-3xl tracking-tight">1,226+</div>
              <div className="font-mono mt-1.5 text-[11px] tracking-[1.76px] uppercase text-[#93939f]">grails sold</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-[#f9f9fb] md:text-3xl tracking-tight">$45K</div>
              <div className="font-mono mt-1.5 text-[11px] tracking-[1.76px] uppercase text-[#93939f]">highest sale</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-[#f9f9fb] md:text-3xl tracking-tight">5</div>
              <div className="font-mono mt-1.5 text-[11px] tracking-[1.76px] uppercase text-[#93939f]">platforms</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-[#f9f9fb] md:text-3xl tracking-tight">12 mo</div>
              <div className="font-mono mt-1.5 text-[11px] tracking-[1.76px] uppercase text-[#93939f]">of sales history</div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#222226] bg-[rgba(9,9,11,0.4)] px-3 py-1.5 text-xs font-medium text-[#b7b7c2]">
              <svg className="w-3.5 h-3.5 text-[#ff0000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>
              Every sale used protected transfer
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#222226] bg-[rgba(9,9,11,0.4)] px-3 py-1.5 text-xs font-medium text-[#b7b7c2]">
              <svg className="w-3.5 h-3.5 text-[#ff0000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /><path d="m2 2 20 20" /></svg>
              Items masked for buyer privacy
            </span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label="Filter sales by platform">
        {filterOptions.map((f) => {
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`inline-flex items-center gap-2 rounded-[8px] border px-3.5 py-2 text-[13px] font-medium transition-colors ${
                isActive 
                  ? "border-[#ff0000] bg-[rgba(255,0,0,0.1)] text-[#f9f9fb]" 
                  : "border-[#222226] bg-[rgba(17,17,19,0.6)] text-[#b7b7c2] hover:border-[rgba(255,0,0,0.4)] hover:text-[#f9f9fb]"
              }`}
            >
              {f.color && <span className="w-1.5 h-1.5 rounded-full" style={{ background: f.color }} />}
              {f.label}
              <span className="font-mono text-[11px] text-[#93939f]">{f.count}</span>
            </button>
          );
        })}
      </div>

      {/* Hall of fame */}
      <section className="mt-14" aria-labelledby="hall-of-fame">
        <div className="flex items-center gap-2.5">
          <svg className="w-4 h-4 text-[#ff0000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
          <h2 id="hall-of-fame" className="font-mono text-[11px] tracking-[1.76px] uppercase font-medium text-[#93939f]">Hall of fame — biggest sales</h2>
        </div>
        
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hallOfFame.map((item, i) => (
            <div key={i} className="lumen-card p-6">
              <span className="lumen-sheen" />
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[1.76px] uppercase text-[#93939f]">#{i+1} all-time</span>
                <span className="font-mono text-[11px] tracking-[1.76px] uppercase rounded-[8px] border border-[rgba(255,0,0,0.3)] bg-[rgba(255,0,0,0.1)] px-2 py-1 text-[#ff0000]">Sold</span>
              </div>
              <p className="mt-5 truncate text-3xl font-medium tracking-tight text-[#f9f9fb]">{['username', 'account'].includes(item.category) ? '@' : '$'}{item.handle}</p>
              <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#93939f]">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                <span className="capitalize">{item.platform}</span>
              </div>
              <div className="mt-6 flex items-end justify-between gap-3">
                <span className="font-mono text-2xl font-semibold text-[#f9f9fb]">{item.price}</span>
                <span className="text-xs text-[#93939f]">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sold Grid */}
      <section className="mt-14" aria-label="Sold items">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 xl:grid-cols-4">
          {soldHandles.map((item, i) => (
            <article key={i} className="rounded-[12px] border border-[#222226] bg-[#111113] p-4 transition-colors hover:border-[rgba(255,0,0,0.4)] md:p-5">
              <div className="flex items-start justify-between gap-2">
                <p className="truncate text-base font-medium text-[#f9f9fb] md:text-lg">{['username', 'account'].includes(item.category) ? '@' : '$'}{item.handle}</p>
                <span className="font-mono text-[10px] tracking-[1px] uppercase shrink-0 rounded-[8px] border border-[rgba(255,0,0,0.3)] bg-[rgba(255,0,0,0.1)] px-1.5 py-0.5 text-[#ff0000]">Sold</span>
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#93939f]">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
                <span className="capitalize">{item.platform === "twitter" ? "X / Twitter" : item.platform}</span>
              </div>
              <div className="mt-5 flex items-end justify-between gap-2">
                <span className="font-mono text-base font-medium text-[#f9f9fb] md:text-lg">{item.price}</span>
                <span className="text-[11px] text-[#93939f]">{item.time}</span>
              </div>
            </article>
          ))}
        </div>
        
        <p className="mt-6 flex items-center gap-2 text-xs text-[#93939f]">
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /><path d="m2 2 20 20" /></svg>
          Items shown as @x•••x or $x•••x are partially hidden for privacy. Prices and dates are unedited.
        </p>
      </section>

      {/* Bottom CTA */}
      <section className="relative mt-20 overflow-hidden rounded-[14px] border border-[#222226] bg-[#111113] px-6 py-12 text-center md:px-12 md:py-16">
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 80% at 50% 0%, rgba(255,0,0,0.12), transparent 65%)" }} />
        <div className="relative z-10">
          <span className="font-mono text-[11px] tracking-[1.76px] uppercase font-medium text-[#93939f]">Your name is next</span>
          <h2 className="mx-auto mt-4 max-w-xl text-2xl font-semibold leading-[1.16] tracking-tight text-[#f9f9fb] md:text-4xl">
            The next entry in this archive could be <span className="inline-block bg-gradient-to-r from-[#ff0000] to-[#cc0000] text-transparent bg-clip-text px-1">your @.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#93939f]">
            Browse live listings with instant crypto checkout and protected transfer — or list a rare name of your own.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/marketplace" className="bg-[#ff0000] text-white font-medium text-sm flex items-center gap-2 px-[22px] py-3.5 rounded-[10px] shadow-[rgba(255,255,255,0.18)_0px_1px_0px_0px_inset,rgba(255,0,0,0.55)_0px_10px_30px_-12px] hover:-translate-y-px hover:bg-[#cc0000] transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" /></svg>
              Browse the marketplace
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
            <Link to="/sell" className="bg-transparent text-[#f9f9fb] font-medium text-sm flex items-center gap-2 px-[22px] py-3.5 rounded-[10px] border border-[#222226] hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,0,0,0.4)] transition-colors">
              Flip your rares
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
