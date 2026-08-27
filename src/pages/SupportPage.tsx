import React from "react";
import { Link } from "react-router-dom";

// Standard SVG Icons to replace the 33 imported icons
const ChatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h5" />
    <path d="M17.5 17.5 16 16.3V14" />
    <circle cx="16" cy="16" r="6" />
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const BadgeCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const LifeBuoyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <path d="m4.93 4.93 4.24 4.24" />
    <path d="m14.83 9.17 4.24-4.24" />
    <path d="m14.83 14.83 4.24 4.24" />
    <path d="m9.17 14.83-4.24 4.24" />
  </svg>
);

const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const GavelIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8" />
    <path d="m16 16 6-6" />
    <path d="m8 8 6-6" />
    <path d="m9 7 8 8" />
    <path d="m21 11-8-8" />
  </svg>
);

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

export default function SupportPage() {
  return (
    <div className="w-full max-w-[1152px] mx-auto pt-4 px-4 font-[Poppins,ui-sans-serif,system-ui,sans-serif]">
      {/* Hero Section */}
      <section 
        style={{
          backgroundImage: 'radial-gradient(90% 70% at 18% 0%, rgba(255, 0, 0, 0.1), rgba(0, 0, 0, 0) 55%), radial-gradient(70% 60% at 100% 100%, rgba(255, 77, 77, 0.08), rgba(0, 0, 0, 0) 60%), none'
        }} 
        className="bg-[rgba(17,17,19,0.5)] relative overflow-hidden isolate rounded-[18px] border border-[#222226]"
      >
        <div 
          aria-hidden="true" 
          style={{
            backgroundImage: 'linear-gradient(rgba(249, 249, 251, 0.035) 1px, rgba(0, 0, 0, 0) 1px), linear-gradient(90deg, rgba(249, 249, 251, 0.035) 1px, rgba(0, 0, 0, 0) 1px)'
          }} 
          className="absolute bg-[44px_44px,44px_44px] [mask-image:radial-gradient(100%_100%_at_50%_0%,rgb(0,0,0)_40%,rgba(0,0,0,0)_85%)] inset-0"
        />
        <span 
          aria-hidden="true" 
          className="text-[rgba(249,249,251,0.04)] leading-none font-semibold text-[547.2px] absolute right-[-4%] block translate-x-0 -translate-y-2/4 pointer-events-none select-none top-2/4"
        >
          ?
        </span>
        
        <div className="relative z-10 px-6 py-14 md:px-12 md:py-16">
          <span className="bg-[rgba(9,9,11,0.5)] text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase inline-flex items-center gap-2 px-3 py-1.5 rounded-[8px] border border-[#222226]">
            <span className="bg-[#ff0000] w-1.5 h-1.5 block rounded-full" />
            CONTACT — a chat away
          </span>
          <h1 className="leading-none font-medium text-4xl md:text-[60px] tracking-[-1.8px] max-w-screen-md mt-6 mb-0">
            Have questions? <span className="text-[#ff0000]">Let's talk.</span>
          </h1>
          <p className="text-[#93939f] leading-[28px] text-[16px] md:text-[18px] max-w-[672px] mt-5 mb-0">
            Support is a live chat with @Guardian, our admin — pre-purchase questions, selling, orders, anything. Open the chat and a real human answers, 7 days a week.
          </p>
          
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link to="/messages" className="bg-white text-[#0e0e11] leading-none font-medium text-[14px] flex justify-center items-center gap-2 shadow-[rgba(255,255,255,0.4)_0px_1px_0px_0px_inset,rgba(0,0,0,0.8)_0px_8px_24px_-12px] px-[22px] py-3 rounded-[10px] hover:shadow-[0_1px_#fff6_inset,0_14px_34px_-12px_rgba(255,0,0,0.45)] hover:-translate-y-px transition-all">
              <ChatIcon className="w-4 h-4" /> Chat with @Guardian
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-8">
            <span className="bg-[rgba(9,9,11,0.4)] text-[#b7b7c2] leading-[16px] font-medium text-[12px] flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-[#222226]">
              <ChatIcon className="text-[#ff0000] w-3.5 h-3.5" /> Live chat support
            </span>
            <span className="bg-[rgba(9,9,11,0.4)] text-[#b7b7c2] leading-[16px] font-medium text-[12px] flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-[#222226]">
              <ClockIcon className="text-[#ff0000] w-3.5 h-3.5" /> Fast, human replies
            </span>
            <span className="bg-[rgba(9,9,11,0.4)] text-[#b7b7c2] leading-[16px] font-medium text-[12px] flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-[#222226]">
              <CalendarIcon className="text-[#ff0000] w-3.5 h-3.5" /> 7 days a week
            </span>
          </div>
        </div>
      </section>

      {/* 3 Columns Section */}
      <section aria-label="Ways to reach us" className="mt-14">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {/* Live chat */}
          <div className="bg-[#111113] flex flex-col p-6 rounded-[14px] border border-[#222226]">
            <div className="bg-[#ff0000]/10 w-10 h-10 flex justify-center items-center rounded-[10px] border border-[#ff0000]/30">
              <ChatIcon className="text-[#ff0000] w-4 h-4" />
            </div>
            <h2 className="leading-[28px] font-medium text-[18px] tracking-[-0.54px] mt-5 mb-0">Live chat — support</h2>
            <p className="text-[#93939f] leading-relaxed text-[14px] grow mt-2 mb-0">
              The fastest way, and the only queue we have: message @Guardian, the admin, right in the site chat. Same inbox as your orders.
            </p>
            <Link to="/messages" className="bg-[#ff0000] text-white leading-none font-medium text-[14px] flex justify-center items-center gap-2 shadow-[0_1px_rgba(255,255,255,0.18)_inset,0_10px_30px_-12px_rgba(255,0,0,0.55)] mt-4 px-4 py-2.5 rounded-[10px] hover:bg-[#cc0000] hover:shadow-[0_1px_#ffffff2e_inset,0_16px_40px_-12px_rgba(255,0,0,0.65)] hover:-translate-y-px transition-all">
              <ChatIcon className="w-4 h-4" /> Chat with @Guardian
            </Link>
          </div>

          {/* Business & press */}
          <div className="bg-[#111113] flex flex-col p-6 rounded-[14px] border border-[#222226]">
            <div className="bg-[#ff0000]/10 w-10 h-10 flex justify-center items-center rounded-[10px] border border-[#ff0000]/30">
              <MailIcon className="text-[#ff0000] w-4 h-4" />
            </div>
            <h2 className="leading-[28px] font-medium text-[18px] tracking-[-0.54px] mt-5 mb-0">Business & press</h2>
            <p className="text-[#93939f] leading-relaxed text-[14px] grow mt-2 mb-0">
              Partnerships, press, legal notices — anything that isn't user support goes to our inbox.
            </p>
            <a href="mailto:hello@larpings.com" className="text-[#ff0000] hover:text-[#cc0000] leading-[20px] font-medium text-[14px] flex items-center gap-2 mt-4 transition-colors">
              hello@larpings.com
            </a>
          </div>

          {/* Around the clock */}
          <div className="bg-[#111113] flex flex-col p-6 rounded-[14px] border border-[#222226]">
            <div className="bg-[#ff0000]/10 w-10 h-10 flex justify-center items-center rounded-[10px] border border-[#ff0000]/30">
              <ClockIcon className="text-[#ff0000] w-4 h-4" />
            </div>
            <h2 className="leading-[28px] font-medium text-[18px] tracking-[-0.54px] mt-5 mb-0">Around the clock</h2>
            <p className="text-[#93939f] leading-relaxed text-[14px] grow mt-2 mb-0">
              7 days a week. Grails don't keep office hours, and neither do we.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section aria-labelledby="faq" className="mt-24">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5">
            <LifeBuoyIcon className="text-[#ff0000] w-4 h-4" />
            <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">
              Straight answers
            </span>
          </div>
          <h2 id="faq" className="mt-4 text-3xl leading-tight md:text-4xl font-medium">
            Frequently asked, <span className="text-[#ff0000]">honestly answered</span>.
          </h2>
        </div>
        
        <div className="mt-10 space-y-3">
          <details className="group rounded-[12px] border border-[#222226] bg-[#111113] hover:border-[#ff0000]/40 transition-colors">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-[#f9f9fb] [&::-webkit-details-marker]:hidden md:px-6 md:text-base">
              How do I pay?
              <PlusIcon className="w-4 h-4 shrink-0 text-[#93939f] transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-[#93939f] md:px-6 m-0">
              With cryptocurrency, through our hosted checkout — BTC, SOL, USDT and more. You pick a listing, hit buy, and are redirected to a secure invoice page. Pay it and you're sent straight back to your order. We never touch your private keys.
            </p>
          </details>
          <details className="group rounded-[12px] border border-[#222226] bg-[#111113] hover:border-[#ff0000]/40 transition-colors">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-[#f9f9fb] [&::-webkit-details-marker]:hidden md:px-6 md:text-base">
              How fast is delivery?
              <PlusIcon className="w-4 h-4 shrink-0 text-[#93939f] transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-[#93939f] md:px-6 m-0">
              Usually minutes. The moment your payment confirms, the seller is notified and your order moves through visible states — paid, delivering, delivered — on your orders page. Most transfers finish the same day, often within minutes.
            </p>
          </details>
          <details className="group rounded-[12px] border border-[#222226] bg-[#111113] hover:border-[#ff0000]/40 transition-colors">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-[#f9f9fb] [&::-webkit-details-marker]:hidden md:px-6 md:text-base">
              When does the seller get paid?
              <PlusIcon className="w-4 h-4 shrink-0 text-[#93939f] transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-[#93939f] md:px-6 m-0">
              Only after you confirm delivery. Your payment is held by the platform; when you press confirm on the order, the sale amount minus our flat 9% fee is credited to the seller. Until then, the order can still be disputed and refunded.
            </p>
          </details>
          <details className="group rounded-[12px] border border-[#222226] bg-[#111113] hover:border-[#ff0000]/40 transition-colors">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-[#f9f9fb] [&::-webkit-details-marker]:hidden md:px-6 md:text-base">
              Something's wrong with my order. What do I do?
              <PlusIcon className="w-4 h-4 shrink-0 text-[#93939f] transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-[#93939f] md:px-6 m-0">
              Don't confirm delivery. Open a dispute straight from the order page — our team reviews the evidence and makes the call. If it's resolved in your favor, you're refunded as store credit on your larpings.com balance.
            </p>
          </details>
          <details className="group rounded-[12px] border border-[#222226] bg-[#111113] hover:border-[#ff0000]/40 transition-colors">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-[#f9f9fb] [&::-webkit-details-marker]:hidden md:px-6 md:text-base">
              What does selling cost?
              <PlusIcon className="w-4 h-4 shrink-0 text-[#93939f] transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-[#93939f] md:px-6 m-0">
              A flat 9% of the sale price, taken when the order completes. Listing is free — you only pay when you actually sell.
            </p>
          </details>
          <details className="group rounded-[12px] border border-[#222226] bg-[#111113] hover:border-[#ff0000]/40 transition-colors">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-[#f9f9fb] [&::-webkit-details-marker]:hidden md:px-6 md:text-base">
              How do seller payouts work?
              <PlusIcon className="w-4 h-4 shrink-0 text-[#93939f] transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-[#93939f] md:px-6 m-0">
              After a sale completes, earnings are held for 3 days as a fraud-protection window, then become withdrawable. You're paid in the same crypto your buyer used at checkout, to the receiving address you saved for that coin in the dashboard (all accepted coins must be saved before your first request). Double-check every address — a wrong address is the seller's responsibility.
            </p>
          </details>
          <details className="group rounded-[12px] border border-[#222226] bg-[#111113] hover:border-[#ff0000]/40 transition-colors">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-[#f9f9fb] [&::-webkit-details-marker]:hidden md:px-6 md:text-base">
              Do I need an account or a wallet?
              <PlusIcon className="w-4 h-4 shrink-0 text-[#93939f] transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-[#93939f] md:px-6 m-0">
              Just an email address. Sign in with a 6-digit code we send you — that's the whole account. No crypto wallet is needed to sign up: when you buy, you pay the hosted invoice from any wallet or exchange you already use.
            </p>
          </details>
          <details className="group rounded-[12px] border border-[#222226] bg-[#111113] hover:border-[#ff0000]/40 transition-colors">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-[#f9f9fb] [&::-webkit-details-marker]:hidden md:px-6 md:text-base">
              Can I get a refund?
              <PlusIcon className="w-4 h-4 shrink-0 text-[#93939f] transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-[#93939f] md:px-6 m-0">
              Refunds go through disputes: if our team resolves a dispute in your favor, the amount is returned as store credit on your balance, spendable on any listing. If a payment expires or is cancelled before completing, the listing is simply released and no money moves.
            </p>
          </details>
          <details className="group rounded-[12px] border border-[#222226] bg-[#111113] hover:border-[#ff0000]/40 transition-colors">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-[#f9f9fb] [&::-webkit-details-marker]:hidden md:px-6 md:text-base">
              Is larpings.com legit?
              <PlusIcon className="w-4 h-4 shrink-0 text-[#93939f] transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-[#93939f] md:px-6 m-0">
              Fair question — this market has a rough reputation, which is exactly why everything here is structural: hosted checkout, the listing reserved while you pay, tracked delivery, the seller paid only after you confirm, a 3-day hold on earnings and human dispute resolution. Our Legit page walks through every protection.
            </p>
          </details>
          <details className="group rounded-[12px] border border-[#222226] bg-[#111113] hover:border-[#ff0000]/40 transition-colors">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-[#f9f9fb] [&::-webkit-details-marker]:hidden md:px-6 md:text-base">
              How do I reach a human?
              <PlusIcon className="w-4 h-4 shrink-0 text-[#93939f] transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-[#93939f] md:px-6 m-0">
              Message @Guardian — the admin — right here in the site chat. Hit "Chat with @Guardian" below, sign in with your email if you haven't, and the conversation opens instantly in your Messages, next to your deals. Replies are usually fast; the thread stays there forever.
            </p>
          </details>
        </div>
      </section>

      {/* Open the support chat Section */}
      <section aria-label="Open the support chat" className="mt-24 mb-24">
        <div className="grid gap-8 lg:gap-14 grid-cols-1 lg:grid-cols-3">
          
          {/* Chat Window Mockup */}
          <div className="bg-[#111113] lg:col-span-2 p-6 md:p-8 rounded-[14px] border border-[#222226]">
            <div className="bg-[rgba(24,24,27,0.5)] flex items-center gap-3.5 px-4 py-3.5 rounded-[12px] border border-[#222226]">
              <div className="relative">
                <div className="bg-[#ff0000]/15 text-[#ff0000] leading-[24px] font-semibold w-11 h-11 flex justify-center items-center rounded-full">
                  G
                </div>
                <span aria-hidden="true" className="bg-emerald-400 w-3 h-3 absolute right-[-2px] bottom-[-2px] block rounded-full border-2 border-[#111113]" />
              </div>
              <div className="min-w-0 grow">
                <div className="flex items-center gap-1.5">
                  <span className="leading-[20px] font-semibold text-[14px] block truncate">@Guardian</span>
                  <span className="bg-[#ff0000]/15 text-[#ff0000] font-semibold text-[10px] tracking-[0.25px] uppercase flex items-center gap-1 px-1.5 py-0.5 rounded-full">
                    <BadgeCheckIcon className="w-3 h-3" /> Admin
                  </span>
                </div>
                <p className="text-[#93939f] leading-[16px] text-[12px] truncate mt-0.5 mb-0">
                  Marketplace support — usually replies fast
                </p>
              </div>
            </div>
            
            <div className="mt-5">
              <div className="bg-[rgba(24,24,27,0.6)] text-[#b7b7c2] leading-relaxed text-[14px] max-w-[85%] px-3.5 py-2.5 rounded-t-[14px] rounded-br-[14px] rounded-bl-[4px] border border-[#222226]">
                Hey! What can I help you with? Orders, payouts, listings, pre-purchase questions — send it over. 👋
              </div>
            </div>
            
            <button className="bg-[#ff0000] text-white leading-none font-medium text-[14px] w-full inline-flex justify-center items-center gap-2 shadow-[0_1px_rgba(255,255,255,0.18)_inset,0_10px_30px_-12px_rgba(255,0,0,0.55)] mt-6 px-[22px] py-3 rounded-[10px] hover:bg-[#cc0000] hover:shadow-[0_1px_#ffffff2e_inset,0_16px_40px_-12px_rgba(255,0,0,0.65)] hover:-translate-y-px transition-all">
              <ChatIcon className="w-4 h-4" /> Chat with @Guardian
            </button>
            
            <ul className="mt-6 mb-0 pl-0 space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="text-[#ff0000] w-4 h-4 shrink-0 mt-0.5" />
                <span className="text-[#b7b7c2] leading-relaxed text-[14px] block">
                  Sign in with your email and the conversation opens instantly.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="text-[#ff0000] w-4 h-4 shrink-0 mt-0.5" />
                <span className="text-[#b7b7c2] leading-relaxed text-[14px] block">
                  @Guardian carries the ADMIN tag in chat, so you always know it's really us.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircleIcon className="text-[#ff0000] w-4 h-4 shrink-0 mt-0.5" />
                <span className="text-[#b7b7c2] leading-relaxed text-[14px] block">
                  The thread stays in your Messages forever — no ticket numbers to lose.
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Answers Sidebar */}
          <aside>
            <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">
              Before you write
            </span>
            <h2 className="leading-tight font-medium text-[24px] tracking-[-0.72px] mt-4 mb-0">
              The fastest answers are <span className="text-[#ff0000]">already here</span>.
            </h2>
            
            <div className="mt-6 space-y-3">
              <Link to="/support" className="bg-[rgba(24,24,27,0.5)] flex items-start gap-3 px-4 py-3.5 rounded-[12px] border border-[#222226] hover:border-[#ff0000]/40 transition-colors group">
                <LifeBuoyIcon className="text-[#ff0000] w-4 h-4 shrink-0 mt-0.5" />
                <span className="block grow">
                  <span className="leading-[20px] font-medium text-[14px] block group-hover:text-white transition-colors">Quick answers in the support FAQ</span>
                  <span className="text-[#93939f] leading-relaxed text-[12px] block mt-1">Payments, delivery times, fees and payouts — most questions are answered there.</span>
                </span>
                <ArrowRightIcon className="text-[#93939f] w-3.5 h-3.5 shrink-0 mt-0.5 group-hover:text-[#ff0000] group-hover:translate-x-1 transition-all" />
              </Link>
              
              <Link to="/legit" className="bg-[rgba(24,24,27,0.5)] flex items-start gap-3 px-4 py-3.5 rounded-[12px] border border-[#222226] hover:border-[#ff0000]/40 transition-colors group">
                <ShieldCheckIcon className="text-[#ff0000] w-4 h-4 shrink-0 mt-0.5" />
                <span className="block grow">
                  <span className="leading-[20px] font-medium text-[14px] block group-hover:text-white transition-colors">Wondering if we're legit?</span>
                  <span className="text-[#93939f] leading-relaxed text-[12px] block mt-1">See exactly how your money is protected, step by step.</span>
                </span>
                <ArrowRightIcon className="text-[#93939f] w-3.5 h-3.5 shrink-0 mt-0.5 group-hover:text-[#ff0000] group-hover:translate-x-1 transition-all" />
              </Link>
              
              <Link to="/orders" className="bg-[rgba(24,24,27,0.5)] flex items-start gap-3 px-4 py-3.5 rounded-[12px] border border-[#222226] hover:border-[#ff0000]/40 transition-colors group">
                <GavelIcon className="text-[#ff0000] w-4 h-4 shrink-0 mt-0.5" />
                <span className="block grow">
                  <span className="leading-[20px] font-medium text-[14px] block group-hover:text-white transition-colors">Problem with an order?</span>
                  <span className="text-[#93939f] leading-relaxed text-[12px] block mt-1">Open a dispute right from the order page — it's the fastest route to a resolution.</span>
                </span>
                <ArrowRightIcon className="text-[#93939f] w-3.5 h-3.5 shrink-0 mt-0.5 group-hover:text-[#ff0000] group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </aside>
          
        </div>
      </section>
    </div>
  );
}
