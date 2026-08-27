import React from "react";
import { Link } from "react-router-dom";

// Icons needed for the listing page
const IgIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden caret-[#f9f9fb]" {...props}>
    <defs className="inline caret-[#f9f9fb]"></defs>
  </svg>
);
const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="align-middle w-3 h-3 block overflow-x-hidden overflow-y-hidden fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]" {...props}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" className="w-[18px] h-[11px] inline fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" className="inline fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]"></path>
  </svg>
);
const ShieldIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden shrink-0 fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]" {...props}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" className="inline fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]"></path><path d="m9 12 2 2 4-4" className="inline fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]"></path>
  </svg>
);
const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden shrink-0 fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]" {...props}>
    <circle cx="12" cy="12" r="10" className="inline fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]"></circle><polyline points="12 6 12 12 16 14" className="inline fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]"></polyline>
  </svg>
);
const VerifiedIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" aria-label="Verified" className="align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden shrink-0 fill-current stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]" {...props}>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" className="inline fill-current stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]"></path><path d="m9 12 2 2 4-4" className="inline fill-current stroke-white stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]"></path>
  </svg>
);
const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="align-middle w-3 h-3 block overflow-x-hidden overflow-y-hidden fill-current stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]" {...props}>
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" className="inline fill-current stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]"></path>
  </svg>
);
const TopSellerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="align-middle w-3 h-3 block overflow-x-hidden overflow-y-hidden fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]" {...props}>
    <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" className="inline fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]"></path><path d="M5 21h14" className="inline fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]"></path>
  </svg>
);
const ContactIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="text-center align-middle w-4 h-4 block overflow-x-hidden overflow-y-hidden fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]" {...props}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" className="inline fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]"></path>
  </svg>
);
const ProfileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2px" strokeLinecap="round" strokeLinejoin="round" className="text-center align-middle w-3.5 h-3.5 block overflow-x-hidden overflow-y-hidden fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" className="inline fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]"></path><circle cx="12" cy="7" r="4" className="inline fill-none stroke-current stroke-[2px] [stroke-linecap:round] [stroke-linejoin:round]"></circle>
  </svg>
);

export default function ListingPage() {
  return (
    <div className="pt-24 px-4 pb-24 md:pb-12 max-w-[1152px] mx-auto min-h-screen">
      <nav aria-label="Breadcrumb" className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase flex flex-wrap items-center gap-2 mb-6">
        <Link to="/marketplace" className="hover:text-white transition-colors">Drops</Link>
        <span>/</span>
        <Link to="/marketplace?platform=instagram" className="hover:text-white transition-colors">Instagram</Link>
        <span>/</span>
        <span className="text-white">@cka</span>
      </nav>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
        
        {/* Left Column: Hero, Stats, Escrow Info */}
        <div>
          {/* Hero Card (Red Theme) */}
          <div 
            style={{
              backgroundImage: 'radial-gradient(90% 70% at 18% 0%, rgba(255, 0, 0, 0.1), rgba(0, 0, 0, 0) 55%), radial-gradient(70% 60% at 100% 100%, rgba(237, 69, 156, 0.08), rgba(0, 0, 0, 0) 60%), none'
            }} 
            className="bg-[rgba(17,17,19,0.5)] relative overflow-hidden rounded-[18px] border border-[#222226]"
          >
            <div 
              style={{
                backgroundImage: 'linear-gradient(rgba(249, 249, 251, 0.035) 1px, rgba(0, 0, 0, 0) 1px), linear-gradient(90deg, rgba(249, 249, 251, 0.035) 1px, rgba(0, 0, 0, 0) 1px)'
              }} 
              className="absolute bg-[44px_44px,44px_44px] [mask-image:radial-gradient(100%_100%_at_50%_0%,rgb(0,0,0)_40%,rgba(0,0,0,0)_85%)] inset-0"
            />
            
            <span className="text-[rgba(249,249,251,0.04)] leading-none font-semibold text-[300px] md:text-[540px] absolute right-[-4%] top-1/2 -translate-y-1/2 pointer-events-none select-none">
              @
            </span>
            
            <div className="aspect-[16/10] relative z-10 flex flex-col p-6">
              <div className="flex justify-between items-center">
                <img src="https://placehold.co/1837x494" alt="larpings.com" width="110" height="24" className="h-5 w-auto opacity-80 mix-blend-screen" />
                <span className="bg-[rgba(52,211,153,0.1)] text-emerald-400 font-mono font-medium text-[11px] tracking-[1.76px] uppercase flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] border border-[rgba(52,211,153,0.35)]">
                  <span className="bg-emerald-400 w-1.5 h-1.5 rounded-full" /> 
                  1 of 1 — unique
                </span>
              </div>
              
              <div className="flex flex-col grow justify-center items-center">
                <div className="leading-none text-[60px] md:text-[80px] text-center whitespace-nowrap overflow-hidden px-2">
                  <span className="text-[#93939f]">@</span>
                  <span className="font-medium text-white">cka</span>
                </div>
                
                <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
                  <span className="bg-[rgba(9,9,11,0.6)] font-medium text-[12px] flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-[#222226]">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
                      <defs>
                        <radialGradient id="ig-grad-hero" cx="30%" cy="107%" r="150%">
                          <stop offset="0%" stopColor="#FDF497" /><stop offset="9%" stopColor="#FDF497" />
                          <stop offset="45%" stopColor="#FD5949" /><stop offset="60%" stopColor="#D6249F" />
                          <stop offset="90%" stopColor="#285AEB" />
                        </radialGradient>
                      </defs>
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" fill="url(#ig-grad-hero)" />
                    </svg>
                    Instagram
                  </span>
                  <span className="bg-[rgba(9,9,11,0.6)] text-[#b7b7c2] font-medium text-[12px] px-3 py-1.5 rounded-[8px] border border-[#222226]">
                    3-letter
                  </span>
                  <span className="bg-[rgba(9,9,11,0.6)] text-[#b7b7c2] font-medium text-[12px] capitalize px-3 py-1.5 rounded-[8px] border border-[#222226]">
                    Item
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid gap-6 grid-cols-3 mt-6">
            <div>
              <div className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">Platform</div>
              <div className="font-mono text-[14px] capitalize mt-1.5">Instagram</div>
            </div>
            <div>
              <div className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">Length</div>
              <div className="font-mono text-[14px] mt-1.5">3 characters</div>
            </div>
            <div>
              <div className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">Category</div>
              <div className="font-mono text-[14px] capitalize mt-1.5">Category</div>
            </div>
          </div>
          
          {/* Transfer Info */}
          <div className="bg-[#111113] mt-6 p-6 rounded-[14px] border border-[#222226]">
            <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">How the protected transfer works</span>
            <ol className="list-none mb-0 pl-0 mt-4 space-y-3.5">
              <li className="text-[#b7b7c2] text-[14px] flex items-start gap-3">
                <span className="text-[#ff0000] font-mono font-medium text-[11px] tracking-[1.76px] uppercase mt-0.5">01</span>
                Pick your coin and pay on the secure hosted checkout.
              </li>
              <li className="text-[#b7b7c2] text-[14px] flex items-start gap-3">
                <span className="text-[#ff0000] font-mono font-medium text-[11px] tracking-[1.76px] uppercase mt-0.5">02</span>
                The listing is locked to you while the seller hands the goods over.
              </li>
              <li className="text-[#b7b7c2] text-[14px] flex items-start gap-3">
                <span className="text-[#ff0000] font-mono font-medium text-[11px] tracking-[1.76px] uppercase mt-0.5">03</span>
                You confirm it's yours — only then the seller gets paid.
              </li>
            </ol>
          </div>
        </div>
        
        {/* Right Column: Sticky Sidebar */}
        <div className="lg:sticky lg:self-start lg:top-24">
          <div className="bg-[#111113] p-6 rounded-[18px] border border-[#222226]">
            <div className="text-emerald-400 font-mono font-medium text-[11px] tracking-[1.76px] uppercase inline-flex items-center gap-2">
              <span className="w-2 h-2 relative flex">
                <span className="bg-emerald-400 w-full h-full absolute opacity-[0.4] rounded-full animate-ping" />
                <span className="bg-emerald-400 w-2 h-2 relative rounded-full" />
              </span>
              Available — reserves instantly
            </div>
            
            <div className="flex justify-between items-end gap-4 mt-5">
              <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase pb-2">Price</span>
              <div className="text-right">
                <div className="leading-none font-mono text-[48px]">$1,600</div>
                <div className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase mt-2">All-in · no fees on top</div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase mb-2.5">Pay with</div>
              
              <div className="grid grid-cols-5 gap-2">
                {/* Simplified the crypto buttons for cleanliness */}
                {['BTC', 'ETH', 'USDT', 'USDC', 'SOL', 'TON', 'TRX', 'BNB', 'DAI'].map(coin => (
                  <button key={coin} type="button" title={coin} className="bg-[rgba(9,9,11,0.5)] flex flex-col items-center gap-1.5 px-0 py-2.5 rounded-[10px] border border-[#222226] hover:border-[#ff0000] hover:bg-[#ff0000]/5 transition-colors">
                    <div className="w-7 h-7 bg-zinc-800 rounded-full flex items-center justify-center text-[10px] text-white">
                      {coin.slice(0,3)}
                    </div>
                    <span className="text-[#93939f] font-mono text-[10px] text-center block">{coin}</span>
                  </button>
                ))}
                
                <button type="button" title="Polygon" className="bg-[rgba(9,9,11,0.5)] flex flex-col items-center gap-1.5 px-0 py-2.5 rounded-[10px] border border-[#222226] hover:border-[#ff0000] hover:bg-[#ff0000]/5 transition-colors">
                  <span className="bg-[#8247e5] text-white font-semibold text-[9px] w-7 h-7 flex justify-center items-center rounded-full">POL</span>
                  <span className="text-[#93939f] font-mono text-[10px] text-center block">POL</span>
                </button>
              </div>
            </div>
            
            <div className="mt-5">
              <button disabled className="bg-zinc-900 text-[#93939f] font-medium text-[15px] w-full px-5 py-3.5 rounded-[10px] border border-[#222226] cursor-not-allowed">
                Choose a coin to continue
              </button>
              <p className="text-[#93939f] text-[11px] flex justify-center items-center gap-1.5 mt-3">
                <LockIcon /> Reserving locks this name to you for 45 minutes while you pay
              </p>
              
              <div className="bg-[rgba(9,9,11,0.4)] mt-3 p-3.5 rounded-[12px] border border-[#222226]">
                <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">How the escrow works</span>
                <div className="mt-4">
                  {/* Progress steps */}
                  <div className="flex items-center">
                    <div className="flex grow items-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="bg-zinc-950 w-4 h-4 relative z-[1] flex shrink-0 justify-center items-center rounded-full border-2 border-[#ff0000]">
                          <span className="bg-[#ff0000]/40 absolute w-full h-full scale-[2] rounded-full animate-pulse" />
                          <span className="bg-[#ff0000] w-1.5 h-1.5 rounded-full" />
                        </span>
                        <span className="font-mono font-medium text-[9px] tracking-[0.72px] uppercase">Paid</span>
                      </div>
                      <div className="bg-[#222226] h-px grow mb-4 mx-2" />
                    </div>
                    
                    <div className="flex grow items-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="bg-zinc-900 w-4 h-4 z-[1] flex shrink-0 justify-center items-center rounded-full border border-[#222226]">
                          <span className="bg-[rgba(147,147,159,0.4)] w-1 h-1 rounded-full" />
                        </span>
                        <span className="text-[#93939f]/60 font-mono font-medium text-[9px] tracking-[0.72px] uppercase">Deliver</span>
                      </div>
                      <div className="bg-[#222226] h-px grow mb-4 mx-2" />
                    </div>
                    
                    <div className="flex grow items-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="bg-zinc-900 w-4 h-4 z-[1] flex shrink-0 justify-center items-center rounded-full border border-[#222226]">
                          <span className="bg-[rgba(147,147,159,0.4)] w-1 h-1 rounded-full" />
                        </span>
                        <span className="text-[#93939f]/60 font-mono font-medium text-[9px] tracking-[0.72px] uppercase">Confirm</span>
                      </div>
                      <div className="bg-[#222226] h-px grow mb-4 mx-2" />
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="bg-zinc-900 w-4 h-4 z-[1] flex shrink-0 justify-center items-center rounded-full border border-[#222226]">
                          <span className="bg-[rgba(147,147,159,0.4)] w-1 h-1 rounded-full" />
                        </span>
                        <span className="text-[#93939f]/60 font-mono font-medium text-[9px] tracking-[0.72px] uppercase">Released</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid gap-2 mt-6">
              <div className="bg-[rgba(9,9,11,0.4)] text-[#b7b7c2] font-medium text-[12px] flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] border border-[#222226]">
                <ShieldIcon className="text-[#ff0000] w-4 h-4 shrink-0 stroke-[#ff0000]" /> Buyer protection on every order
              </div>
              <div className="bg-[rgba(9,9,11,0.4)] text-[#b7b7c2] font-medium text-[12px] flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] border border-[#222226]">
                <ClockIcon className="text-[#ff0000] w-4 h-4 shrink-0 stroke-[#ff0000]" /> Most transfers complete in minutes
              </div>
            </div>
          </div>
          
          <div className="bg-[#111113] mt-4 p-5 rounded-[14px] border border-[#222226]">
            <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">Seller</span>
            <div className="flex items-center gap-3 mt-3">
              <img src="https://placehold.co/64x64" alt="@weak" className="w-10 h-10 object-cover rounded-full" />
              <div className="min-w-0 grow">
                <p className="font-medium text-[14px] flex items-center gap-1 mb-0.5">
                  @weak
                  <VerifiedIcon className="text-[#ff0000] w-4 h-4 fill-[#ff0000]" />
                </p>
                <div className="text-[#93939f] text-[12px] flex items-center gap-2">
                  <span className="flex items-center gap-0.5"><StarIcon className="text-amber-400" /> 4.9</span>
                  <span>138 sales</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              <span title="Verified" className="bg-[#ff0000] text-white font-medium text-[10px] flex items-center gap-1 px-2 py-0.5 rounded-full border border-[#ff0000]/50">
                <VerifiedIcon className="w-3 h-3 text-white fill-white stroke-[#ff0000]" />Verified
              </span>
              <span className="bg-amber-500/20 text-amber-300 font-medium text-[10px] flex items-center gap-1 px-2 py-0.5 rounded-full border border-amber-500/40">
                <TopSellerIcon />Top Seller
              </span>
            </div>
            
            <button className="bg-[#ff0000] text-white font-medium text-[12px] w-full inline-flex justify-center items-center gap-2 mt-4 px-[22px] py-2.5 rounded-[10px] hover:bg-[#cc0000] transition-colors shadow-[0_10px_30px_-12px_rgba(255,0,0,0.5)]">
              <ContactIcon /> Contact the seller
            </button>
            <div className="flex gap-2 mt-2">
              <button className="bg-transparent text-[#b7b7c2] font-medium text-[12px] flex grow justify-center items-center gap-1.5 px-3 py-2 rounded-[10px] border border-[#222226] hover:bg-white/5 transition-colors">
                <ProfileIcon /> Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
