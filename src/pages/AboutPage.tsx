import React from "react";
import { Link } from "react-router-dom";

// Icons used in the About page
const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ZapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  </svg>
);

const HeartHandshakeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
    <path d="m18 15-2-2" />
    <path d="m15 18-2-2" />
  </svg>
);

const StoreIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
    <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
  </svg>
);

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const MessageSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
    <path d="M4 17v2" />
    <path d="M5 18H3" />
  </svg>
);

const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function AboutPage() {
  return (
    <div className="pt-24 px-4 pb-24 md:pb-12 max-w-6xl mx-auto min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[18px] border border-[#222226] bg-[radial-gradient(90%_70%_at_18%_0%,rgba(255,0,0,0.1),transparent_55%),radial-gradient(70%_60%_at_100%_100%,rgba(237,69,156,0.08),transparent_60%),rgba(17,17,19,0.5)]">
        <div 
          className="absolute inset-0 bg-[length:44px_44px] [mask-image:radial-gradient(100%_100%_at_50%_0%,#000_40%,transparent_85%)]" 
          style={{ backgroundImage: 'linear-gradient(rgba(249,249,251,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(249,249,251,0.035) 1px, transparent 1px)' }}
        />
        <span className="absolute right-[-4%] top-1/2 -translate-y-1/2 text-[clamp(280px,38vw,560px)] font-semibold leading-none text-white/[0.04] pointer-events-none select-none">
          @
        </span>
        
        <div className="relative z-10 px-6 py-14 md:px-14 md:py-20">
          <span className="inline-flex items-center gap-2 rounded-[8px] border border-[#222226] bg-[rgba(9,9,11,0.5)] px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#93939f]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff0000]" />
            ABOUT — who we are
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] text-white md:text-6xl font-medium tracking-tight">
            We built the market rare drops <span className="text-[#ff0000]">deserved</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#93939f] md:text-lg">
            larpings.com is the marketplace for rare, short and OG drops and services across Instagram, TikTok, X, Snapchat and Telegram — instant crypto checkout, protected transfers and real humans on support.
          </p>
          
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/marketplace" className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-white px-[22px] py-3 text-[14px] font-medium text-[#0e0e11] shadow-[0_1px_rgba(255,255,255,0.4)_inset,0_8px_24px_-12px_rgba(0,0,0,0.8)] transition-all hover:-translate-y-px hover:shadow-[0_1px_rgba(255,255,255,0.4)_inset,0_14px_34px_-12px_rgba(255,0,0,0.45)]">
              <StoreIcon className="h-4 w-4" /> Browse the marketplace <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link to="/support" className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#222226] bg-transparent px-5 py-3 text-[14px] font-medium text-white transition-all hover:border-[#ff0000]/55 hover:bg-[#ff0000]/10">
              <MessageSquareIcon className="h-4 w-4" /> Talk to us
            </Link>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#222226] bg-[rgba(9,9,11,0.4)] px-3 py-1.5 text-xs font-medium text-[#b7b7c2]">
              <ShieldCheckIcon className="h-3.5 w-3.5 text-[#ff0000]" />Protected transfers
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#222226] bg-[rgba(9,9,11,0.4)] px-3 py-1.5 text-xs font-medium text-[#b7b7c2]">
              <ZapIcon className="h-3.5 w-3.5 text-[#ff0000]" />Instant crypto checkout
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#222226] bg-[rgba(9,9,11,0.4)] px-3 py-1.5 text-xs font-medium text-[#b7b7c2]">
              <HeartHandshakeIcon className="h-3.5 w-3.5 text-[#ff0000]" />Real human support
            </span>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="mt-24 grid gap-10 md:grid-cols-[280px_1fr] md:gap-16">
        <div>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#93939f]">Our story</span>
          <h2 className="mt-4 text-3xl leading-tight text-white md:text-4xl font-medium tracking-tight">
            Reputation is everything. <span className="text-[#ff0000]">Secure yours</span>.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-relaxed text-[#93939f] md:text-lg">
          <p>
            Short, clean drops are the street addresses of the internet. But internet clout doesn't stop at just usernames. Custom fansigns, verified accounts, and premium boosting services are the new status symbols. For years the only way to get these goods was a stranger in your DMs, a wallet screenshot and a prayer.
          </p>
          <p>
            larpings.com exists to replace that with an actual market: real listings with real prices, checkout on a secure hosted payment page, transfers tracked step by step, and a seller who only gets paid after you confirm the goods are yours. The rules are the same for a $10 server boost and a $45,000 grail.
          </p>
          <p>
            We are a small team of people who have bought, sold and lost rares the old way. We built the marketplace we wished existed — for usernames, fansigns, and services — then opened it to everyone.
          </p>
        </div>
      </section>

      {/* How we operate */}
      <section className="mt-24">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#93939f]">How we operate</span>
          <h2 className="mt-4 text-3xl leading-tight text-white md:text-4xl font-medium tracking-tight">
            One marketplace, <span className="text-[#ff0000]">two ways to win</span>.
          </h2>
        </div>
        
        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col rounded-[14px] border border-[#222226] bg-[#111113] p-6 md:p-8 transition-transform hover:-translate-y-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#ff0000]/30 bg-[#ff0000]/10">
              <StoreIcon className="h-4 w-4 text-[#ff0000]" />
            </div>
            <h3 className="mt-5 text-xl text-white font-medium">The marketplace</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#93939f]">Self-serve, end to end. Find a name, own it minutes later.</p>
            <ol className="mt-6 flex-1 space-y-3.5 list-none pl-0">
              <li className="flex items-start gap-3.5">
                <span className="mt-0.5 shrink-0 rounded-[8px] border border-[#222226] bg-[#1d1d20] px-2 py-1 font-mono text-[11px] font-medium text-[#ff0000]">01</span>
                <span className="text-sm leading-relaxed text-[#b7b7c2]">Browse rare, short and OG names across five platforms.</span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="mt-0.5 shrink-0 rounded-[8px] border border-[#222226] bg-[#1d1d20] px-2 py-1 font-mono text-[11px] font-medium text-[#ff0000]">02</span>
                <span className="text-sm leading-relaxed text-[#b7b7c2]">Check out instantly with crypto on a secure hosted payment page.</span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="mt-0.5 shrink-0 rounded-[8px] border border-[#222226] bg-[#1d1d20] px-2 py-1 font-mono text-[11px] font-medium text-[#ff0000]">03</span>
                <span className="text-sm leading-relaxed text-[#b7b7c2]">The goods are transferred to you under protection, tracked in-app.</span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="mt-0.5 shrink-0 rounded-[8px] border border-[#222226] bg-[#1d1d20] px-2 py-1 font-mono text-[11px] font-medium text-[#ff0000]">04</span>
                <span className="text-sm leading-relaxed text-[#b7b7c2]">You confirm receipt — only then is the seller credited.</span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="mt-0.5 shrink-0 rounded-[8px] border border-[#222226] bg-[#1d1d20] px-2 py-1 font-mono text-[11px] font-medium text-[#ff0000]">05</span>
                <span className="text-sm leading-relaxed text-[#b7b7c2]">The seller gets paid. Everyone sleeps fine.</span>
              </li>
            </ol>
            <Link to="/marketplace" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#ff0000] transition-opacity hover:opacity-80">
              Browse live listings <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
          
          <div className="flex flex-col rounded-[14px] border border-[#222226] bg-[#111113] p-6 md:p-8 transition-transform hover:-translate-y-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#ff0000]/30 bg-[#ff0000]/10">
              <SparklesIcon className="h-4 w-4 text-[#ff0000]" />
            </div>
            <h3 className="mt-5 text-xl text-white font-medium">Concierge services</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#93939f]">Done for you, quoted per case. When the name you want is not for sale — or an account needs expert hands — our team takes over.</p>
            <ul className="mt-6 flex-1 space-y-3.5 list-none pl-0">
              <li className="flex items-start gap-3.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff0000]" />
                <span className="text-sm leading-relaxed text-[#b7b7c2]">Grail claims for names that never hit the market</span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff0000]" />
                <span className="text-sm leading-relaxed text-[#b7b7c2]">Verification and badge work</span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff0000]" />
                <span className="text-sm leading-relaxed text-[#b7b7c2]">Unbans, removals and account recovery</span>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff0000]" />
                <span className="text-sm leading-relaxed text-[#b7b7c2]">A trusted middleman on request, for full peace of mind</span>
              </li>
            </ul>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#ff0000] transition-opacity hover:opacity-80">
              Explore services <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats By the numbers */}
      <section className="mt-24 rounded-[14px] border border-[#222226] bg-[#111113] px-6 py-10 md:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          <div>
            <div className="text-3xl text-white md:text-4xl font-medium tracking-tight">5</div>
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] mt-2 text-[#93939f]">platforms covered</div>
          </div>
          <div>
            <div className="text-3xl text-white md:text-4xl font-medium tracking-tight">24/7</div>
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] mt-2 text-[#93939f]">human support</div>
          </div>
          <div>
            <div className="text-3xl text-white md:text-4xl font-medium tracking-tight">3-day</div>
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] mt-2 text-[#93939f]">seller protection window</div>
          </div>
          <div>
            <div className="text-3xl text-white md:text-4xl font-medium tracking-tight">1%</div>
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] mt-2 text-[#93939f]">0% platform fee</div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mt-24">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#93939f]">What we stand for</span>
          <h2 className="mt-4 text-3xl leading-tight text-white md:text-4xl font-medium tracking-tight">
            Values that survive <span className="text-[#ff0000]">contact with money</span>.
          </h2>
        </div>
        
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-6">
          <div className="rounded-[14px] border border-[#222226] bg-[#111113] p-6 transition-colors hover:border-[#ff0000]/40 md:p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#ff0000]/30 bg-[#ff0000]/10">
              <ShieldCheckIcon className="h-4 w-4 text-[#ff0000]" />
            </div>
            <h3 className="mt-5 text-lg text-white font-medium">Safety</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#93939f]">Listings are reserved while you pay, transfers are tracked order by order, and sellers only see money after you confirm. Protection is built into the flow, not bolted on.</p>
          </div>
          <div className="rounded-[14px] border border-[#222226] bg-[#111113] p-6 transition-colors hover:border-[#ff0000]/40 md:p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#ff0000]/30 bg-[#ff0000]/10">
              <ZapIcon className="h-4 w-4 text-[#ff0000]" />
            </div>
            <h3 className="mt-5 text-lg text-white font-medium">Speed</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#93939f]">Instant crypto checkout, no back-and-forth negotiations by DM. Most items move to their new owner within hours of payment.</p>
          </div>
          <div className="rounded-[14px] border border-[#222226] bg-[#111113] p-6 transition-colors hover:border-[#ff0000]/40 md:p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#ff0000]/30 bg-[#ff0000]/10">
              <EyeIcon className="h-4 w-4 text-[#ff0000]" />
            </div>
            <h3 className="mt-5 text-lg text-white font-medium">Transparency</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#93939f]">Zero platform fees for standard peer-to-peer deals. Public sold archive. Order states you can watch in real time. If something is held or pending, you can see exactly why.</p>
          </div>
          <div className="rounded-[14px] border border-[#222226] bg-[#111113] p-6 transition-colors hover:border-[#ff0000]/40 md:p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#ff0000]/30 bg-[#ff0000]/10">
              <HeartHandshakeIcon className="h-4 w-4 text-[#ff0000]" />
            </div>
            <h3 className="mt-5 text-lg text-white font-medium">Real human support</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[#93939f]">No ticket black holes. Real people read every message, resolve disputes and answer questions around the clock.</p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="relative mt-24 overflow-hidden rounded-[14px] border border-[#222226] bg-[#111113] px-6 py-12 text-center md:px-12 md:py-16">
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(60% 80% at 50% 0%, rgba(255,0,0,0.12), transparent 65%)' }} />
        <div className="relative z-10">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#93939f]">Join in</span>
          <h2 className="mx-auto mt-4 max-w-xl text-2xl font-semibold leading-[1.16] tracking-tight text-white md:text-4xl">
            Your next name is <span className="inline-block"><span className="inline bg-clip-text text-transparent bg-gradient-to-r from-[#ff0000] to-[#ff4d4d]">already listed.</span></span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#93939f]">
            Browse the live marketplace, or write to us — a real human replies within 24 hours.
          </p>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/marketplace" className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#ff0000] px-[22px] py-3 text-[14px] font-medium text-white shadow-[0_1px_rgba(255,255,255,0.18)_inset,0_10px_30px_-12px_rgba(255,0,0,0.55)] transition-all hover:-translate-y-px hover:bg-[#cc0000] hover:shadow-[0_1px_rgba(255,255,255,0.18)_inset,0_16px_40px_-12px_rgba(255,0,0,0.65)]">
              <StoreIcon className="h-4 w-4" /> Browse the marketplace <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#222226] bg-transparent px-5 py-3 text-[14px] font-medium text-white transition-all hover:border-[#ff0000]/55 hover:bg-[#ff0000]/10">
              Contact us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
