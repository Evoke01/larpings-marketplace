import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

// ── Icons ──────────────────────────────────────────────────────────────
const IgIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <defs>
      <radialGradient id="ig-grad-nav" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#FDF497" /><stop offset="9%" stopColor="#FDF497" />
        <stop offset="45%" stopColor="#FD5949" /><stop offset="60%" stopColor="#D6249F" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" fill="url(#ig-grad-nav)" />
  </svg>
);
const TtIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#25f4ee" transform="translate(-0.6,-0.35)" />
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#fe2c55" transform="translate(0.6,0.35)" />
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#fff" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" fill="#f9f9fb" />
  </svg>
);
const SnapIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015z" fill="#b7b7c2" stroke="#ff0000" strokeWidth="0.6" />
  </svg>
);
const TgIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <circle cx="12" cy="12" r="12" fill="#1b1b20" stroke="#ff0000" strokeWidth="0.7" />
    <path d="M16.906 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" fill="#b7b7c2" />
  </svg>
);
const YtIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#ff0000" />
    <path d="M9.545 15.568V8.432L15.818 12z" fill="#fff" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4 text-[#93939f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export default function ShopMenu({ onClose }: { onClose: () => void }) {
  const [counts, setCounts] = useState<Record<string, number>>({
    all: 0, instagram: 0, tiktok: 0, twitter: 0, snapchat: 0, telegram: 0, youtube: 0, discord: 0
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const { data } = await supabase.from('listings').select('platform').eq('status', 'active');
      if (data) {
        const c: Record<string, number> = { all: data.length, instagram: 0, tiktok: 0, twitter: 0, snapchat: 0, telegram: 0, youtube: 0, discord: 0 };
        data.forEach(item => {
          let p = (item.platform || '').toLowerCase();
          if (p.includes('instagram')) p = 'instagram';
          else if (p.includes('tiktok')) p = 'tiktok';
          else if (p.includes('twitter') || p === 'x') p = 'twitter';
          else if (p.includes('snapchat')) p = 'snapchat';
          else if (p.includes('telegram')) p = 'telegram';
          else if (p.includes('youtube')) p = 'youtube';
          else if (p.includes('discord')) p = 'discord';
          
          if (c[p] !== undefined) c[p]++;
        });
        setCounts(c);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="absolute top-full left-0 md:-left-12 lg:-left-24 xl:-left-40 mt-2 w-[700px] max-w-[95vw] bg-[#111113] border border-[#222226] rounded-[16px] shadow-2xl z-50 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-8 p-6">
        {/* ── Left Column: Platforms ── */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">Shop by platform</span>
            <span className="bg-[rgba(52,211,153,0.1)] text-emerald-400 font-mono font-medium text-[11px] tracking-[1.76px] uppercase px-2 py-1 rounded-[8px] border border-[rgba(52,211,153,0.3)]">
              Daily drops
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* IG */}
            <Link onClick={onClose} to="/marketplace?platform=instagram" className="bg-[rgba(24,24,27,0.55)] border border-transparent hover:border-[rgba(237,69,156,0.3)] flex items-center gap-3 p-3.5 rounded-[12px] hover:-translate-y-0.5 transition-all group">
              <span className="bg-[rgba(237,69,156,0.14)] w-10 h-10 flex shrink-0 justify-center items-center rounded-[10px]">
                <IgIcon />
              </span>
              <span className="min-w-0 block">
                <span className="font-medium text-sm block">Instagram</span>
                <span className="text-[#93939f] font-mono text-[11px] tracking-widest uppercase block mt-0.5">{counts.instagram.toLocaleString()} names</span>
              </span>
            </Link>

            {/* TikTok */}
            <Link onClick={onClose} to="/marketplace?platform=tiktok" className="bg-[rgba(24,24,27,0.55)] border border-transparent hover:border-[rgba(31,224,249,0.3)] flex items-center gap-3 p-3.5 rounded-[12px] hover:-translate-y-0.5 transition-all group">
              <span className="bg-[rgba(31,224,249,0.14)] w-10 h-10 flex shrink-0 justify-center items-center rounded-[10px]">
                <TtIcon />
              </span>
              <span className="min-w-0 block">
                <span className="font-medium text-sm block">TikTok</span>
                <span className="text-[#93939f] font-mono text-[11px] tracking-widest uppercase block mt-0.5">{counts.tiktok.toLocaleString()} names</span>
              </span>
            </Link>

            {/* Twitter */}
            <Link onClick={onClose} to="/marketplace?platform=twitter" className="bg-[rgba(24,24,27,0.55)] border border-transparent hover:border-[#666] flex items-center gap-3 p-3.5 rounded-[12px] hover:-translate-y-0.5 transition-all group">
              <span className="bg-[rgba(211,217,222,0.14)] w-10 h-10 flex shrink-0 justify-center items-center rounded-[10px]">
                <XIcon />
              </span>
              <span className="min-w-0 block">
                <span className="font-medium text-sm block">X / Twitter</span>
                <span className="text-[#93939f] font-mono text-[11px] tracking-widest uppercase block mt-0.5">{counts.twitter.toLocaleString()} names</span>
              </span>
            </Link>

            {/* Snapchat */}
            <Link onClick={onClose} to="/marketplace?platform=snapchat" className="bg-[rgba(24,24,27,0.55)] border border-transparent hover:border-[rgba(251,207,35,0.3)] flex items-center gap-3 p-3.5 rounded-[12px] hover:-translate-y-0.5 transition-all group">
              <span className="bg-[rgba(251,207,35,0.14)] w-10 h-10 flex shrink-0 justify-center items-center rounded-[10px]">
                <SnapIcon />
              </span>
              <span className="min-w-0 block">
                <span className="font-medium text-sm block">Snapchat</span>
                <span className="text-[#93939f] font-mono text-[11px] tracking-widest uppercase block mt-0.5">{counts.snapchat.toLocaleString()} names</span>
              </span>
            </Link>

            {/* Telegram */}
            <Link onClick={onClose} to="/marketplace?platform=telegram" className="bg-[rgba(24,24,27,0.55)] border border-transparent hover:border-[rgba(42,160,244,0.3)] flex items-center gap-3 p-3.5 rounded-[12px] hover:-translate-y-0.5 transition-all group">
              <span className="bg-[rgba(42,160,244,0.14)] w-10 h-10 flex shrink-0 justify-center items-center rounded-[10px]">
                <TgIcon />
              </span>
              <span className="min-w-0 block">
                <span className="font-medium text-sm block">Telegram</span>
                <span className="text-[#93939f] font-mono text-[11px] tracking-widest uppercase block mt-0.5">{counts.telegram.toLocaleString()} names</span>
              </span>
            </Link>

            {/* YouTube */}
            <Link onClick={onClose} to="/marketplace?platform=youtube" className="bg-[rgba(24,24,27,0.55)] border border-transparent hover:border-[rgba(255,61,61,0.3)] flex items-center gap-3 p-3.5 rounded-[12px] hover:-translate-y-0.5 transition-all group">
              <span className="bg-[rgba(255,61,61,0.14)] w-10 h-10 flex shrink-0 justify-center items-center rounded-[10px]">
                <YtIcon />
              </span>
              <span className="min-w-0 block">
                <span className="font-medium text-sm block">YouTube</span>
                <span className="text-[#93939f] font-mono text-[11px] tracking-widest uppercase block mt-0.5">{counts.youtube.toLocaleString()} names</span>
              </span>
            </Link>

            {/* Discord */}
            <Link onClick={onClose} to="/marketplace?platform=discord" className="bg-[rgba(24,24,27,0.55)] border border-transparent hover:border-[rgba(88,101,242,0.3)] flex items-center gap-3 p-3.5 rounded-[12px] hover:-translate-y-0.5 transition-all group">
              <span className="bg-[rgba(88,101,242,0.14)] text-[#5865F2] w-10 h-10 flex shrink-0 justify-center items-center rounded-[10px]">
                <DiscordIcon />
              </span>
              <span className="min-w-0 block">
                <span className="font-medium text-sm block">Discord</span>
                <span className="text-[#93939f] font-mono text-[11px] tracking-widest uppercase block mt-0.5">{counts.discord.toLocaleString()} names</span>
              </span>
            </Link>

            {/* All platforms */}
            <Link onClick={onClose} to="/marketplace" className="col-span-2 bg-[rgba(24,24,27,0.55)] border border-[#222226] hover:border-[#ff0000] flex justify-between items-center px-4 py-3.5 rounded-[12px] hover:-translate-y-0.5 transition-all group">
              <span className="font-medium text-sm">
                All platforms
                <span className="text-[#93939f] font-mono text-[11px] tracking-widest uppercase ml-2">{counts.all.toLocaleString()} names</span>
              </span>
              <span className="text-[#93939f] group-hover:text-[#ff0000] transition-colors"><ArrowIcon /></span>
            </Link>
          </div>
        </div>

        {/* ── Right Column: More Links ── */}
        <div className="flex flex-col">
          <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase mb-4">More</span>
          
          <div className="flex flex-col grow gap-1">
            <Link onClick={onClose} to="/sold" className="text-[#b7b7c2] font-medium text-sm flex justify-between items-center px-3 py-2 rounded-[10px] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors">
              Sold archive
              <span className="text-[#93939f] font-mono text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded-[6px] border border-[#222226]">Proof</span>
            </Link>
            <Link onClick={onClose} to="/legit" className="text-[#b7b7c2] font-medium text-sm flex justify-between items-center px-3 py-2 rounded-[10px] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors">
              Are we legit?
              <span className="text-[#93939f] font-mono text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded-[6px] border border-[#222226]">Trust</span>
            </Link>
            <Link onClick={onClose} to="/legit" className="text-[#b7b7c2] font-medium text-sm flex justify-between items-center px-3 py-2 rounded-[10px] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors">
              How transfers work
            </Link>
            <Link onClick={onClose} to="/ranks" className="text-[#b7b7c2] font-medium text-sm flex justify-between items-center px-3 py-2 rounded-[10px] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors">
              Top sellers
              <span className="text-[#93939f] font-mono text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded-[6px] border border-[#222226]">New</span>
            </Link>
            <Link onClick={onClose} to="/blog" className="text-[#b7b7c2] font-medium text-sm flex justify-between items-center px-3 py-2 rounded-[10px] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors">
              Blog
            </Link>
            <Link onClick={onClose} to="/guides" className="text-[#b7b7c2] font-medium text-sm flex justify-between items-center px-3 py-2 rounded-[10px] hover:bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors">
              Guides
            </Link>
          </div>

          {/* Promo Card (replaced blue with our red theme) */}
          <Link onClick={onClose} to="/marketplace?platform=instagram" className="mt-4 bg-[rgba(24,24,27,0.55)] border border-[#222226] hover:border-[rgba(255,0,0,0.4)] flex justify-between items-center p-4 rounded-[12px] hover:-translate-y-0.5 transition-all group">
            <div>
              <span className="text-[#ff0000] font-mono font-medium text-[11px] tracking-[1.76px] uppercase block">New drop</span>
              <span className="font-medium text-sm block mt-0.5">Fresh Instagram names</span>
            </div>
            <span className="bg-[rgba(237,69,156,0.15)] w-9 h-9 flex shrink-0 justify-center items-center rounded-[10px]">
              <IgIcon />
            </span>
          </Link>
        </div>

      </div>
    </div>
  );
}
