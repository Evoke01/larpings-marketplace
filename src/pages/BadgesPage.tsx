import React from "react";
import { Link } from "react-router-dom";

// Icons for the badges
const BadgeGuideIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const TopSellerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
    <path d="M5 21h14" />
  </svg>
);

const Sales10Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  </svg>
);

const Sales30Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const Sales50Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const Sales100Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 3h12l4 6-10 13L2 9Z" />
    <path d="M11 3 8 9l4 13 4-13-3-6" />
    <path d="M2 9h20" />
  </svg>
);

const Sales500Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
  </svg>
);

const Sales1000Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const GodSellerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
  </svg>
);

const OGUserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
    <path d="M11 12 5.12 2.2" />
    <path d="m13 12 5.88-9.8" />
    <path d="M8 7h8" />
    <circle cx="12" cy="17" r="5" />
    <path d="M12 18v-2h-.5" />
  </svg>
);

const AdminIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

export default function BadgesPage() {
  return (
    <div className="w-full max-w-[1152px] mx-auto pt-16 px-4 font-[Poppins,ui-sans-serif,system-ui,sans-serif]">
      {/* Header Section */}
      <div className="text-center flex flex-col items-center">
        <span className="bg-[#111113] text-[#b7b7c2] font-mono font-medium text-[11px] tracking-[1.76px] uppercase flex items-center gap-2 px-3.5 py-2 rounded-[8px] border border-[#222226]">
          <BadgeGuideIcon className="w-3.5 h-3.5 text-[#ff0000] fill-[#ff0000]/20" /> BADGE GUIDE
        </span>
        
        <h1 className="leading-tight font-semibold text-4xl md:text-[48px] tracking-[-2.16px] mt-6 mb-0">
          Every badge on the market.<br />
          <span className="inline-block mt-3">
            <span style={{ backgroundImage: 'linear-gradient(97deg, #ff0000, #ff4d4d)' }} className="text-white shadow-[0_8px_30px_-10px_rgba(255,0,0,0.55)] px-[13.44px] py-[2.88px] rounded-[10px]">
              Earned, never bought blind.
            </span>
          </span>
        </h1>
        
        <p className="text-[#93939f] leading-relaxed max-w-[576px] mt-5 mb-0 mx-auto">
          Badges are computed from real data — confirmed sales, verification reviews, live rankings and account age. Here's what each one means and exactly how a seller gets it.
        </p>
      </div>

      {/* Badges Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
        
        {/* Verified */}
        <div className="bg-[#111113] h-full flex flex-col p-6 rounded-[14px] border border-[#222226] hover:border-[#222226]/80 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-[#1f62ff] text-white w-16 h-16 flex shrink-0 justify-center items-center rounded-[14px] border border-[#1f62ff]/50 shadow-[0_0_15px_rgba(31,98,255,0.3)]">
              <BadgeGuideIcon className="w-8 h-8 fill-white stroke-[#1f62ff]" />
            </div>
            <h2 className="leading-[28px] font-medium text-[18px] tracking-[-0.54px] my-0">Verified</h2>
          </div>
          <p className="text-[#93939f] leading-relaxed text-[14px] grow mt-4 mb-0">
            The blue filled seal. Our team verified this seller's identity and track record — the strongest trust signal on larpings.com.
          </p>
          <div className="mt-4 pt-3.5 border-t border-[#222226]">
            <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">How to earn</span>
            <p className="text-[#b7b7c2] leading-relaxed text-[12px] mt-1.5 mb-0">Complete the one-time verification review from the Get Verified page.</p>
          </div>
        </div>

        {/* Top Seller */}
        <div className="bg-[#111113] h-full flex flex-col p-6 rounded-[14px] border border-[#222226] hover:border-[#222226]/80 transition-colors">
          <div className="flex items-center gap-4">
            <div style={{backgroundImage: 'linear-gradient(135deg, rgba(251, 191, 36, 0.18), rgba(217, 119, 6, 0.1))'}} className="text-amber-300 w-16 h-16 flex shrink-0 justify-center items-center rounded-[14px] border border-amber-300/60 shadow-[0_0_15px_rgba(251,191,36,0.15)]">
              <TopSellerIcon className="w-8 h-8" />
            </div>
            <h2 className="leading-[28px] font-medium text-[18px] tracking-[-0.54px] my-0">Top Seller</h2>
          </div>
          <p className="text-[#93939f] leading-relaxed text-[14px] grow mt-4 mb-0">
            One of the 10 highest-selling accounts on the platform right now. Recomputed live from the ranks.
          </p>
          <div className="mt-4 pt-3.5 border-t border-[#222226]">
            <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">How to earn</span>
            <p className="text-[#b7b7c2] leading-relaxed text-[12px] mt-1.5 mb-0">Climb into the top 10 of the Top sellers ranking.</p>
          </div>
        </div>

        {/* 10 Sales */}
        <div className="bg-[#111113] h-full flex flex-col p-6 rounded-[14px] border border-[#222226] hover:border-[#222226]/80 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400/10 text-yellow-300 w-16 h-16 flex shrink-0 justify-center items-center rounded-[14px] border border-yellow-400/40">
              <Sales10Icon className="w-8 h-8" />
            </div>
            <h2 className="leading-[28px] font-medium text-[18px] tracking-[-0.54px] my-0">10 Sales</h2>
          </div>
          <p className="text-[#93939f] leading-relaxed text-[14px] grow mt-4 mb-0">
            First milestone — ten successful, buyer-confirmed sales.
          </p>
          <div className="mt-4 pt-3.5 border-t border-[#222226]">
            <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">How to earn</span>
            <p className="text-[#b7b7c2] leading-relaxed text-[12px] mt-1.5 mb-0">Complete 10 sales.</p>
          </div>
        </div>

        {/* 30 Sales */}
        <div className="bg-[#111113] h-full flex flex-col p-6 rounded-[14px] border border-[#222226] hover:border-[#222226]/80 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-orange-400/10 text-orange-300 w-16 h-16 flex shrink-0 justify-center items-center rounded-[14px] border border-orange-400/40">
              <Sales30Icon className="w-8 h-8" />
            </div>
            <h2 className="leading-[28px] font-medium text-[18px] tracking-[-0.54px] my-0">30 Sales</h2>
          </div>
          <p className="text-[#93939f] leading-relaxed text-[14px] grow mt-4 mb-0">
            On a streak — thirty confirmed sales and counting.
          </p>
          <div className="mt-4 pt-3.5 border-t border-[#222226]">
            <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">How to earn</span>
            <p className="text-[#b7b7c2] leading-relaxed text-[12px] mt-1.5 mb-0">Complete 30 sales.</p>
          </div>
        </div>

        {/* 50 Sales */}
        <div className="bg-[#111113] h-full flex flex-col p-6 rounded-[14px] border border-[#222226] hover:border-[#222226]/80 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-sky-400/10 text-sky-300 w-16 h-16 flex shrink-0 justify-center items-center rounded-[14px] border border-sky-400/40">
              <Sales50Icon className="w-8 h-8" />
            </div>
            <h2 className="leading-[28px] font-medium text-[18px] tracking-[-0.54px] my-0">50 Sales</h2>
          </div>
          <p className="text-[#93939f] leading-relaxed text-[14px] grow mt-4 mb-0">
            Fifty confirmed sales — an established storefront.
          </p>
          <div className="mt-4 pt-3.5 border-t border-[#222226]">
            <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">How to earn</span>
            <p className="text-[#b7b7c2] leading-relaxed text-[12px] mt-1.5 mb-0">Complete 50 sales.</p>
          </div>
        </div>

        {/* 100 Sales */}
        <div className="bg-[#111113] h-full flex flex-col p-6 rounded-[14px] border border-[#222226] hover:border-[#222226]/80 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-violet-400/10 text-violet-300 w-16 h-16 flex shrink-0 justify-center items-center rounded-[14px] border border-violet-400/40">
              <Sales100Icon className="w-8 h-8" />
            </div>
            <h2 className="leading-[28px] font-medium text-[18px] tracking-[-0.54px] my-0">100 Sales</h2>
          </div>
          <p className="text-[#93939f] leading-relaxed text-[14px] grow mt-4 mb-0">
            Triple digits. One hundred buyers walked away happy.
          </p>
          <div className="mt-4 pt-3.5 border-t border-[#222226]">
            <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">How to earn</span>
            <p className="text-[#b7b7c2] leading-relaxed text-[12px] mt-1.5 mb-0">Complete 100 sales.</p>
          </div>
        </div>

        {/* 500 Sales */}
        <div className="bg-[#111113] h-full flex flex-col p-6 rounded-[14px] border border-[#222226] hover:border-[#222226]/80 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-fuchsia-400/10 text-fuchsia-300 w-16 h-16 flex shrink-0 justify-center items-center rounded-[14px] border border-fuchsia-400/40">
              <Sales500Icon className="w-8 h-8" />
            </div>
            <h2 className="leading-[28px] font-medium text-[18px] tracking-[-0.54px] my-0">500 Sales</h2>
          </div>
          <p className="text-[#93939f] leading-relaxed text-[14px] grow mt-4 mb-0">
            Five hundred confirmed sales — elite territory.
          </p>
          <div className="mt-4 pt-3.5 border-t border-[#222226]">
            <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">How to earn</span>
            <p className="text-[#b7b7c2] leading-relaxed text-[12px] mt-1.5 mb-0">Complete 500 sales.</p>
          </div>
        </div>

        {/* 1000 Sales */}
        <div className="bg-[#111113] h-full flex flex-col p-6 rounded-[14px] border border-[#222226] hover:border-[#222226]/80 transition-colors">
          <div className="flex items-center gap-4">
            <div style={{backgroundImage: 'linear-gradient(135deg, rgba(252, 211, 77, 0.2), rgba(180, 83, 9, 0.12))'}} className="text-amber-200 w-16 h-16 flex shrink-0 justify-center items-center rounded-[14px] border border-amber-200/50 shadow-[0_0_18px_rgba(251,191,36,0.15)]">
              <Sales1000Icon className="w-8 h-8" />
            </div>
            <h2 className="leading-[28px] font-medium text-[18px] tracking-[-0.54px] my-0">1000 Sales</h2>
          </div>
          <p className="text-[#93939f] leading-relaxed text-[14px] grow mt-4 mb-0">
            One thousand sales. A pillar of the marketplace.
          </p>
          <div className="mt-4 pt-3.5 border-t border-[#222226]">
            <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">How to earn</span>
            <p className="text-[#b7b7c2] leading-relaxed text-[12px] mt-1.5 mb-0">Complete 1000 sales.</p>
          </div>
        </div>

        {/* God Seller */}
        <div className="bg-[#111113] h-full flex flex-col p-6 rounded-[14px] border border-[#222226] hover:border-[#222226]/80 transition-colors">
          <div className="flex items-center gap-4">
            <div style={{backgroundImage: 'linear-gradient(120deg, #ff0000, #ff4d4d 35%, #ff9999 70%, #ffcccc)'}} className="text-white w-16 h-16 flex shrink-0 justify-center items-center rounded-[14px] shadow-[0_0_22px_rgba(255,0,0,0.35)]">
              <GodSellerIcon className="w-8 h-8" />
            </div>
            <h2 className="leading-[28px] font-medium text-[18px] tracking-[-0.54px] my-0">God Seller</h2>
          </div>
          <p className="text-[#93939f] leading-relaxed text-[14px] grow mt-4 mb-0">
            Beyond milestones — 2,000+ confirmed sales. Only a handful will ever wear this.
          </p>
          <div className="mt-4 pt-3.5 border-t border-[#222226]">
            <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">How to earn</span>
            <p className="text-[#b7b7c2] leading-relaxed text-[12px] mt-1.5 mb-0">Complete 2,000 sales.</p>
          </div>
        </div>

        {/* OG User */}
        <div className="bg-[#111113] h-full flex flex-col p-6 rounded-[14px] border border-[#222226] hover:border-[#222226]/80 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-400/10 text-emerald-300 w-16 h-16 flex shrink-0 justify-center items-center rounded-[14px] border border-emerald-400/40">
              <OGUserIcon className="w-8 h-8" />
            </div>
            <h2 className="leading-[28px] font-medium text-[18px] tracking-[-0.54px] my-0">OG User</h2>
          </div>
          <p className="text-[#93939f] leading-relaxed text-[14px] grow mt-4 mb-0">
            Joined larpings.com in its earliest days. Respect.
          </p>
          <div className="mt-4 pt-3.5 border-t border-[#222226]">
            <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">How to earn</span>
            <p className="text-[#b7b7c2] leading-relaxed text-[12px] mt-1.5 mb-0">Only accounts created during our first months carry this — it can't be earned anymore.</p>
          </div>
        </div>

        {/* Admin */}
        <div className="bg-[#111113] h-full flex flex-col p-6 rounded-[14px] border border-[#222226] hover:border-[#222226]/80 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-red-400/15 text-red-400 w-16 h-16 flex shrink-0 justify-center items-center rounded-[14px] border border-red-400/50">
              <AdminIcon className="w-8 h-8" />
            </div>
            <h2 className="leading-[28px] font-medium text-[18px] tracking-[-0.54px] my-0">
              <span className="text-red-400 font-mono text-[14px] tracking-[2.24px] uppercase">ADMIN</span>
            </h2>
          </div>
          <p className="text-[#93939f] leading-relaxed text-[14px] grow mt-4 mb-0">
            Official larpings.com staff. Admins moderate the marketplace, review disputes and never DM you first asking for money.
          </p>
          <div className="mt-4 pt-3.5 border-t border-[#222226]">
            <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">How to earn</span>
            <p className="text-[#b7b7c2] leading-relaxed text-[12px] mt-1.5 mb-0">Staff only.</p>
          </div>
          <div className="bg-red-500/10 flex items-start gap-2.5 mt-3.5 px-3 py-2.5 rounded-[10px] border border-red-500/30">
            <InfoIcon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="text-[#b7b7c2] leading-relaxed text-[12px] my-0">
              Staff will <span className="text-white font-medium">never DM you first</span> asking for money, a deposit or an off-platform payment. Anyone doing that is an impersonator — report them.
            </p>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-14 mb-14">
        <Link 
          to="/ranks" 
          className="bg-[#ff0000] text-white font-medium text-[14px] flex justify-center items-center gap-2 shadow-[0_1px_rgba(255,255,255,0.18)_inset,0_10px_30px_-12px_rgba(255,0,0,0.55)] px-[22px] py-3 rounded-[10px] hover:bg-[#cc0000] hover:shadow-[0_1px_#ffffff2e_inset,0_16px_40px_-12px_rgba(255,0,0,0.65)] hover:-translate-y-px active:translate-y-0 transition-all w-full sm:w-auto"
        >
          See the Top sellers 
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
        <Link 
          to="/get-verified" 
          className="font-medium text-[14px] flex justify-center items-center gap-2 px-5 py-3 rounded-[10px] border border-[#222226] hover:bg-[#1d1d20] transition-colors w-full sm:w-auto"
        >
          <BadgeGuideIcon className="w-4 h-4 fill-[#ff0000] stroke-white" /> 
          Get verified
        </Link>
      </div>

    </div>
  );
}
