import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 align-middle block">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

// Platform icons inline
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 align-middle block" aria-hidden="true">
    <defs>
      <radialGradient id="ig-home" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#FDF497" />
        <stop offset="9%" stopColor="#FDF497" />
        <stop offset="45%" stopColor="#FD5949" />
        <stop offset="60%" stopColor="#D6249F" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" fill="url(#ig-home)" />
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

const SnapchatIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 align-middle block" aria-hidden="true">
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015z" fill="#b7b7c2" stroke="#ff0000" strokeWidth="0.6" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 align-middle block" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#1b1b20" stroke="#ff0000" strokeWidth="0.7" />
    <path d="M16.906 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="#b7b7c2" />
  </svg>
);

export default function HomePage() {
  const [listings, setListings] = useState<any[]>([]);
  const [liveDropsCount, setLiveDropsCount] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from('listings')
      .select('id, handle, price, platform, category')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(12)
      .then(({ data }) => setListings(data ?? []));

    supabase
      .from('listings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
      .then(({ count }) => setLiveDropsCount(count ?? 0));
  }, []);

  return (
    <div className="bg-zinc-950 text-[#f9f9fb] font-[Poppins,ui-sans-serif,system-ui,sans-serif]">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center overflow-hidden">
        {/* Background image and gradient layers */}
        <div 
          className="absolute inset-0 bg-zinc-950 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle at 50% 40%, rgba(9,9,11,0.1) 0%, rgba(9,9,11,0.4) 50%, rgba(9,9,11,0.85) 100%)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-zinc-950 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(to top, rgb(9,9,11) 10%, rgba(0,0,0,0) 100%)" }}
        />
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto pt-36 px-4 pb-20 grow">
          {/* Live badge */}
          <span className="bg-[#111113] text-[#b7b7c2] font-mono font-medium text-[11px] tracking-[1.76px] uppercase flex items-center gap-2 px-3.5 py-2 rounded-[8px] border border-[#222226]">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 bg-[#ff0000] rounded-full opacity-40 scale-[2] animate-ping" />
              <span className="relative bg-[#ff0000] rounded-full w-1.5 h-1.5" />
            </span>
            The marketplace for grails & services — {liveDropsCount !== null ? liveDropsCount : "..."} live drops
          </span>

          <h1 className="mt-6 text-5xl font-semibold leading-none tracking-[-2.16px]" style={{ textShadow: "rgba(9,9,11,0.9) 0px 2px 30px, rgba(9,9,11,0.7) 0px 1px 6px" }}>
            Your life is boring.<br />
            <span className="inline-block mt-3">
              <span
                className="text-white italic shadow-[rgba(255,0,0,0.55)_0px_8px_30px_-10px] px-[14px] py-[3px] rounded-[10px] box-decoration-clone"
                style={{ backgroundImage: "linear-gradient(97deg, #ff0000, #cc0000)", textShadow: "none" }}
              >
                LARP @ better one.
              </span>
            </span>
          </h1>

          <p className="mt-5 text-[rgba(249,249,251,0.9)] text-lg leading-7 font-medium max-w-xl" style={{ textShadow: "rgba(9,9,11,0.95) 0px 1px 18px" }}>
            Rare drops, fansigns, and exclusive services — instant crypto checkout, protected transfer.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/marketplace"
              className="bg-[#ff0000] text-white font-medium text-sm flex items-center gap-2 px-[22px] py-3.5 rounded-[10px] shadow-[rgba(255,255,255,0.18)_0px_1px_0px_0px_inset,rgba(255,0,0,0.55)_0px_10px_30px_-12px] hover:-translate-y-px hover:bg-[#cc0000] active:translate-y-0 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /><path d="M22 7v3a2 2 0 0 1-2 2 2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" /></svg>
              Browse the marketplace
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
            <Link
              to="/sell"
              className="bg-[#161618] font-medium text-sm flex items-center gap-2 px-[22px] py-3.5 rounded-[10px] border border-dashed border-[rgba(255,255,255,0.38)] hover:-translate-y-px hover:border-[rgba(255,255,255,0.85)] hover:bg-[#1d1d20] transition-all"
            >
              <svg className="w-4 h-4 text-[#ff0000]" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" /><circle cx="7.5" cy="7.5" r=".5" fill="#ff0000" /></svg>
              Flip your rares
            </Link>
          </div>

          {/* Platform pills */}
          <nav aria-label="Browse by platform" className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              { to: "/marketplace?platform=instagram", icon: <InstagramIcon />, label: "Instagram drops" },
              { to: "/marketplace?platform=tiktok", icon: <TikTokIcon />, label: "TikTok drops" },
              { to: "/marketplace?platform=twitter", icon: <XIcon />, label: "X drops" },
              { to: "/marketplace?platform=snapchat", icon: <SnapchatIcon />, label: "Snapchat drops" },
              { to: "/marketplace?platform=telegram", icon: <TelegramIcon />, label: "Telegram drops" },
              { to: "/marketplace?platform=discord", icon: <DiscordIcon />, label: "Discord drops" },
            ].map(({ to, icon, label }) => (
              <Link key={label} to={to} className="bg-[rgba(255,255,255,0.03)] backdrop-blur-xl shadow-[rgba(255,255,255,0.05)_0px_1px_0px_0px_inset] text-[#f9f9fb] text-[13px] font-medium flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.08)] transition-all">
                {icon}{label}
              </Link>
            ))}
          </nav>


        </div>
      </section>

      {/* Scrolling ticker */}
      <section className="py-10">
        <p className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase text-center mb-6">Live catalog</p>
        {listings.length > 0 ? (
        <div className="relative overflow-hidden">
          <div className="absolute left-0 inset-y-0 w-24 z-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgb(9,9,11), rgba(0,0,0,0))" }} />
          <div className="absolute right-0 inset-y-0 w-24 z-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(to left, rgb(9,9,11), rgba(0,0,0,0))" }} />
          <div className="flex gap-3 overflow-x-hidden select-none" aria-hidden="true">
            {[...listings, ...listings].map((l, i) => (
              <span key={i} className="bg-[#111113] flex-none flex items-center gap-2.5 px-3.5 py-2 rounded-[8px] border border-[#222226]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ed459c] flex-none" />
                <span className="font-medium text-sm whitespace-nowrap">@{l.handle}</span>
                <span className="text-[#93939f] font-mono text-[12px] whitespace-nowrap">${Number(l.price).toLocaleString()}</span>
              </span>
            ))}
          </div>
        </div>
        ) : (
          <p className="text-center text-[#93939f] text-sm">No listings yet — be the first to sell!</p>
        )}
      </section>



      {/* How it works */}
      <section className="bg-[#0d0d0f] px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#ff0000] font-mono font-medium text-[11px] tracking-[1.76px] uppercase mb-3">The process</p>
            <h2 className="text-4xl font-medium tracking-[-1.08px]">How It Works</h2>
            <p className="text-[#93939f] text-lg leading-7 max-w-2xl mx-auto">Cop or flip your premium goods in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: "01", title: "Browse & Select", desc: "Find your perfect grail or list your own sauce for sale on the larpings.com marketplace." },
              { num: "02", title: "Secure Payment", desc: "Pay with crypto at checkout — funds are held safely until both parties confirm the trade." },
              { num: "03", title: "Facilitation", desc: "We facilitate the transfer between buyer and seller within 24-48 hours." },
              { num: "04", title: "Activation", desc: "Your new premium loot is active and ready to use. Sellers get paid in crypto." },
            ].map(({ num, title, desc }) => (
              <div key={num} className="bg-[#111113] p-6 rounded-[14px] border border-[#222226]">
                <div className="flex justify-between items-center">
                  <span className="text-[#ff0000] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">{num}</span>
                  <span className="bg-[rgba(255,0,0,0.1)] w-9 h-9 flex justify-center items-center rounded-[10px]">
                    <svg className="w-4 h-4 text-[#ff0000]" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-medium tracking-[-0.54px]">{title}</h3>
                <p className="mt-2 text-[#93939f] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured drops */}
      <section className="px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-end gap-4 mb-10">
            <div>
              <p className="text-[#ff0000] font-mono font-medium text-[11px] tracking-[1.76px] uppercase mb-3">Live inventory</p>
              <h2 className="text-4xl font-medium tracking-[-1.08px]">Featured grails</h2>
            </div>
            <Link to="/marketplace" className="text-sm font-medium flex items-center gap-2 px-5 py-3 rounded-[10px] border border-[#222226] hover:border-[#444] transition-colors whitespace-nowrap">
              View all
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {listings.slice(0, 8).length === 0 ? (
              <div className="col-span-4 text-center py-12 text-[#93939f]">
                <p className="text-base font-medium">No listings yet</p>
                <Link to="/sell" className="mt-3 inline-flex items-center gap-1.5 text-sm text-[#ff0000] font-medium">Be the first to sell →</Link>
              </div>
            ) : listings.slice(0, 8).map((l) => (
              <Link key={l.id} to={`/listing/${l.handle}`} className="bg-[#111113] p-5 rounded-[14px] border border-[#222226] group hover:border-[#333338] transition-colors block">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">{l.platform}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ed459c]" />
                </div>
                <p className="text-2xl font-medium mb-4 truncate">@{l.handle}</p>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm">${Number(l.price).toLocaleString()}</span>
                  <span className="text-[#93939f] text-xs font-medium flex items-center gap-1 group-hover:text-white transition-colors">
                    View
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d0d0f] border-t border-[#222226] px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-semibold tracking-[-1px] mb-4">Ready to cop your grail?</h2>
          <p className="text-[#93939f] text-lg mb-8">Browse 1,000+ premium drops available today. Crypto checkout, instant transfer.</p>
          <Link to="/marketplace" className="inline-flex items-center gap-2 bg-[#ff0000] text-white font-medium px-8 py-4 rounded-[10px] text-base hover:-translate-y-px hover:bg-[#cc0000] transition-all shadow-[rgba(255,0,0,0.4)_0px_10px_30px_-12px]">
            Browse the marketplace
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
