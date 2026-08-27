import React from "react";
import { Link } from "react-router-dom";

export default function LegitPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-[Poppins,ui-sans-serif,system-ui,sans-serif]">
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 pt-4">
          <section className="hero-frame mkt-enter">
            <div className="hero-grid" aria-hidden="true"></div>
            <span className="at-watermark" aria-hidden="true">✓</span>
            <div className="relative z-10 px-6 py-14 md:px-14 md:py-20">
              <span className="mono-label inline-flex items-center gap-2 rounded-[8px] border border-border bg-background/50 px-3 py-1.5 text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#ff0000" }}></span>
                TRUST — read this first
              </span>
              <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] text-foreground md:text-6xl tracking-tight">
                Are we legit? <span className="text-[#ff0000]">Fair question.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                This industry runs on DMs, screenshots and hope — so skepticism is the correct default. Here is exactly what stands between your money and a bad outcome, in plain words. Every claim on this page describes how the product actually works.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/sold" className="btn-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-history h-4 w-4"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l4 2"></path></svg> 
                  See real past sales 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-3.5 w-3.5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </Link>
                <Link to="/contact" className="btn-outline-dim">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square h-4 w-4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> 
                  Ask us anything
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-border bg-background/40 px-3 py-1.5 text-xs font-medium text-secondary-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock h-3.5 w-3.5 text-[#ff0000]"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  Hosted secure checkout
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-border bg-background/40 px-3 py-1.5 text-xs font-medium text-secondary-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package-check h-3.5 w-3.5 text-[#ff0000]"><path d="m16 16 2 2 4-4"></path><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path><path d="m7.5 4.27 9 5.15"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" x2="12" y1="22" y2="12"></line></svg>
                  Tracked delivery
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-border bg-background/40 px-3 py-1.5 text-xs font-medium text-secondary-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-coins h-3.5 w-3.5 text-[#ff0000]"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"></path><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"></path><path d="m2 16 6 6"></path><circle cx="16" cy="9" r="2.9"></circle><circle cx="6" cy="5" r="3"></circle></svg>
                  Seller paid after you confirm
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-border bg-background/40 px-3 py-1.5 text-xs font-medium text-secondary-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gavel h-3.5 w-3.5 text-[#ff0000]"><path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"></path><path d="m16 16 6-6"></path><path d="m8 8 6-6"></path><path d="m9 7 8 8"></path><path d="m21 11-8-8"></path></svg>
                  Human dispute resolution
                </span>
              </div>
            </div>
          </section>

          <section className="mt-24" aria-labelledby="protections">
            <div className="mkt-enter max-w-2xl" style={{ animationDelay: "80ms" }}>
              <span className="mono-label text-muted-foreground">The mechanics</span>
              <h2 id="protections" className="mt-4 text-3xl leading-tight text-foreground md:text-4xl tracking-tight">
                What protects your money, <span className="text-[#ff0000]">step by step</span>.
              </h2>
            </div>
            
            <ol className="mt-12 space-y-0">
              <li className="mkt-enter relative grid grid-cols-[44px_1fr] gap-x-5 pb-10 last:pb-0 md:gap-x-8" style={{ animationDelay: "160ms" }}>
                <span className="absolute left-[21px] top-11 h-[calc(100%-44px)] w-px bg-border" aria-hidden="true"></span>
                <span className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#ff0000]/30 bg-[#ff0000]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock h-4 w-4 text-[#ff0000]"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                <div className="pt-0.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="mono-label text-[#ff0000]">Step 1</span>
                    <h3 className="text-lg text-foreground md:text-xl font-medium">You pay on a secure hosted invoice — never to a stranger's wallet</h3>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    Checkout happens on a hosted payment page run by our processor. We never see or store your card details or crypto private keys, and every payment is cryptographically verified server-side before an order counts as paid.
                  </p>
                </div>
              </li>
              
              <li className="mkt-enter relative grid grid-cols-[44px_1fr] gap-x-5 pb-10 last:pb-0 md:gap-x-8" style={{ animationDelay: "240ms" }}>
                <span className="absolute left-[21px] top-11 h-[calc(100%-44px)] w-px bg-border" aria-hidden="true"></span>
                <span className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#ff0000]/30 bg-[#ff0000]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check h-4 w-4 text-[#ff0000]"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
                </span>
                <div className="pt-0.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="mono-label text-[#ff0000]">Step 2</span>
                    <h3 className="text-lg text-foreground md:text-xl font-medium">The listing is locked to you while you pay</h3>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    The moment you start checkout, the listing is reserved — nobody can buy it out from under you. If the payment expires or you cancel, the reservation is released automatically and no money moves.
                  </p>
                </div>
              </li>
              
              <li className="mkt-enter relative grid grid-cols-[44px_1fr] gap-x-5 pb-10 last:pb-0 md:gap-x-8" style={{ animationDelay: "320ms" }}>
                <span className="absolute left-[21px] top-11 h-[calc(100%-44px)] w-px bg-border" aria-hidden="true"></span>
                <span className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#ff0000]/30 bg-[#ff0000]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package-check h-4 w-4 text-[#ff0000]"><path d="m16 16 2 2 4-4"></path><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path><path d="m7.5 4.27 9 5.15"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" x2="12" y1="22" y2="12"></line></svg>
                </span>
                <div className="pt-0.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="mono-label text-[#ff0000]">Step 3</span>
                    <h3 className="text-lg text-foreground md:text-xl font-medium">Delivery is tracked in-app, state by state</h3>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    Every order moves through visible states: paid, delivering, delivered, completed. You watch the transfer progress from your orders page — no "trust me bro" updates over DM.
                  </p>
                </div>
              </li>
              
              <li className="mkt-enter relative grid grid-cols-[44px_1fr] gap-x-5 pb-10 last:pb-0 md:gap-x-8" style={{ animationDelay: "400ms" }}>
                <span className="absolute left-[21px] top-11 h-[calc(100%-44px)] w-px bg-border" aria-hidden="true"></span>
                <span className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#ff0000]/30 bg-[#ff0000]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-coins h-4 w-4 text-[#ff0000]"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"></path><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"></path><path d="m2 16 6 6"></path><circle cx="16" cy="9" r="2.9"></circle><circle cx="6" cy="5" r="3"></circle></svg>
                </span>
                <div className="pt-0.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="mono-label text-[#ff0000]">Step 4</span>
                    <h3 className="text-lg text-foreground md:text-xl font-medium">The seller is paid only after YOU confirm</h3>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    Sellers are not credited when you pay — they are credited when you confirm you received the handle. Until you press that button, your order can still be disputed and refunded.
                  </p>
                </div>
              </li>
              
              <li className="mkt-enter relative grid grid-cols-[44px_1fr] gap-x-5 pb-10 last:pb-0 md:gap-x-8" style={{ animationDelay: "480ms" }}>
                <span className="absolute left-[21px] top-11 h-[calc(100%-44px)] w-px bg-border" aria-hidden="true"></span>
                <span className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#ff0000]/30 bg-[#ff0000]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-timer h-4 w-4 text-[#ff0000]"><line x1="10" x2="14" y1="2" y2="2"></line><line x1="12" x2="15" y1="14" y2="11"></line><circle cx="12" cy="14" r="8"></circle></svg>
                </span>
                <div className="pt-0.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="mono-label text-[#ff0000]">Step 5</span>
                    <h3 className="text-lg text-foreground md:text-xl font-medium">Seller earnings are held for 3 days</h3>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    Even after you confirm, the seller's earnings sit in a 3-day protection window before they become withdrawable. It is our fraud buffer — bad actors cannot grab money and run.
                  </p>
                </div>
              </li>
              
              <li className="mkt-enter relative grid grid-cols-[44px_1fr] gap-x-5 pb-10 last:pb-0 md:gap-x-8" style={{ animationDelay: "560ms" }}>
                <span className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#ff0000]/30 bg-[#ff0000]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gavel h-4 w-4 text-[#ff0000]"><path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"></path><path d="m16 16 6-6"></path><path d="m8 8 6-6"></path><path d="m9 7 8 8"></path><path d="m21 11-8-8"></path></svg>
                </span>
                <div className="pt-0.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="mono-label text-[#ff0000]">Step 6</span>
                    <h3 className="text-lg text-foreground md:text-xl font-medium">Disputes end with a human decision</h3>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    If something goes wrong, open a dispute right from the order. Our team reviews the evidence and resolves it — buyer refunds are issued as store credit on your balance, and dishonest sellers do not get paid.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          <section className="mkt-enter mt-24 rounded-[14px] border border-destructive/25 bg-card p-6 md:p-10" aria-labelledby="never" style={{ animationDelay: "80ms" }}>
            <div className="flex items-center gap-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ban h-4 w-4 text-destructive"><circle cx="12" cy="12" r="10"></circle><path d="m4.9 4.9 14.2 14.2"></path></svg>
              <span className="mono-label text-muted-foreground">Scam-proofing</span>
            </div>
            <h2 id="never" className="mt-4 max-w-2xl text-3xl leading-tight text-foreground md:text-4xl tracking-tight font-medium">
              What we will <span className="text-[#ff0000]">never</span> ask you to do.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Impersonators are the oldest trick in this market. If anyone claiming to be larpings.com — or a seller — does any of the following, walk away and report it to <Link to="/support" className="text-[#ff0000] underline-offset-2 hover:underline">@Guardian in the site chat</Link>. Real staff always carry the ADMIN tag in chat.
            </p>
            
            <ul className="mt-8 grid gap-3 md:grid-cols-2">
              <li className="flex items-start gap-3 rounded-[12px] border border-border bg-secondary/50 px-4 py-3.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ban mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m4.9 4.9 14.2 14.2"></path></svg>
                <span className="text-sm leading-relaxed text-secondary-foreground">Ask you to pay outside the platform or send crypto directly to a seller's wallet</span>
              </li>
              <li className="flex items-start gap-3 rounded-[12px] border border-border bg-secondary/50 px-4 py-3.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ban mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m4.9 4.9 14.2 14.2"></path></svg>
                <span className="text-sm leading-relaxed text-secondary-foreground">Ask for your password, email inbox access or 2FA codes over DM</span>
              </li>
              <li className="flex items-start gap-3 rounded-[12px] border border-border bg-secondary/50 px-4 py-3.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ban mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m4.9 4.9 14.2 14.2"></path></svg>
                <span className="text-sm leading-relaxed text-secondary-foreground">Charge a surprise “release fee” or “unlock fee” to hand over your purchase</span>
              </li>
              <li className="flex items-start gap-3 rounded-[12px] border border-border bg-secondary/50 px-4 py-3.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ban mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m4.9 4.9 14.2 14.2"></path></svg>
                <span className="text-sm leading-relaxed text-secondary-foreground">Move your deal to WhatsApp, Discord or DMs to “finish it faster”</span>
              </li>
              <li className="flex items-start gap-3 rounded-[12px] border border-border bg-secondary/50 px-4 py-3.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ban mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m4.9 4.9 14.2 14.2"></path></svg>
                <span className="text-sm leading-relaxed text-secondary-foreground">Rush you to confirm delivery before the item is actually in your hands</span>
              </li>
            </ul>
          </section>

          <section className="mt-24" aria-labelledby="proof">
            <div className="mkt-enter max-w-2xl" style={{ animationDelay: "80ms" }}>
              <span className="mono-label text-muted-foreground">Check for yourself</span>
              <h2 id="proof" className="mt-4 text-3xl leading-tight text-foreground md:text-4xl tracking-tight font-medium">
                Proof, <span className="text-[#ff0000]">not promises</span>.
              </h2>
            </div>
            
            <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
              <Link to="/sold" className="mkt-enter group flex flex-col rounded-[14px] border border-border bg-card p-6 transition-colors hover:border-[#ff0000]/40 md:p-8" style={{ animationDelay: "160ms" }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#ff0000]/30 bg-[#ff0000]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-history h-4 w-4 text-[#ff0000]"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l4 2"></path></svg>
                </div>
                <h3 className="mt-5 text-lg text-foreground font-medium">The sold archive</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  Every drop that found a new owner here, with real prices and dates.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#ff0000]">
                  See past sales <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </span>
              </Link>
              
              <Link to="/marketplace" className="mkt-enter group flex flex-col rounded-[14px] border border-border bg-card p-6 transition-colors hover:border-[#ff0000]/40 md:p-8" style={{ animationDelay: "240ms" }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#ff0000]/30 bg-[#ff0000]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star h-4 w-4 text-[#ff0000]"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                </div>
                <h3 className="mt-5 text-lg text-foreground font-medium">Seller storefronts & reviews</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  Every seller has a public storefront with their listings and buyer reviews. Check them before you buy.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#ff0000]">
                  Meet the sellers <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </span>
              </Link>
              
              <Link to="/about" className="mkt-enter group flex flex-col rounded-[14px] border border-border bg-card p-6 transition-colors hover:border-[#ff0000]/40 md:p-8" style={{ animationDelay: "320ms" }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#ff0000]/30 bg-[#ff0000]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-newspaper h-4 w-4 text-[#ff0000]"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>
                </div>
                <h3 className="mt-5 text-lg text-foreground font-medium">The blog</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  Guides and honest breakdowns of how pricing and transfers actually work.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#ff0000]">
                  Read the blog <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </span>
              </Link>
            </div>
          </section>

          <section className="mt-24 pb-24" aria-labelledby="faq">
            <div className="mkt-enter max-w-2xl" style={{ animationDelay: "80ms" }}>
              <div className="flex items-center gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-check h-4 w-4 text-[#ff0000]"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="m9 15 2 2 4-4"></path></svg>
                <span className="mono-label text-muted-foreground">No spin</span>
              </div>
              <h2 id="faq" className="mt-4 text-3xl leading-tight text-foreground md:text-4xl tracking-tight font-medium">
                The honest <span className="text-[#ff0000]">FAQ</span>.
              </h2>
            </div>
            
            <div className="mt-10 space-y-3">
              <details className="mkt-enter group rounded-[12px] border border-border bg-card" style={{ animationDelay: "160ms" }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden md:px-6 md:text-base">
                  Is buying a username even legal?
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground md:px-6">
                  Yes. There is no law against paying someone to transfer a username or account to you in the vast majority of jurisdictions — it is a private sale of a digital asset. Platforms' terms of service can restrict transfers, which is a policy matter between the account holder and the platform, not a legal one. It is also exactly why transfers here are handled carefully and tracked end to end.
                </p>
              </details>
              
              <details className="mkt-enter group rounded-[12px] border border-border bg-card" style={{ animationDelay: "240ms" }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden md:px-6 md:text-base">
                  What if the seller never delivers?
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground md:px-6">
                  Then they never get paid. Sellers are only credited after you confirm receipt — if nothing arrives, you don't confirm, and you open a dispute from the order instead. Our team reviews it and refunds you as store credit. The seller cannot touch the money in the meantime.
                </p>
              </details>
              
              <details className="mkt-enter group rounded-[12px] border border-border bg-card" style={{ animationDelay: "320ms" }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden md:px-6 md:text-base">
                  Crypto is irreversible. What about chargebacks?
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground md:px-6">
                  Correct — crypto payments are final, and that is precisely why our protection is structural instead of bank-dependent: your payment goes to the platform (not the seller), the seller is only credited after you confirm delivery, earnings are then held for 3 days, and disputes are resolved by a human with the power to refund you. You are never relying on the goodwill of a stranger.
                </p>
              </details>
            </div>
          </section>

          <section className="mkt-enter relative mt-24 overflow-hidden rounded-[14px] border border-border bg-card px-6 py-12 text-center md:px-12 md:py-16 mb-24" style={{ animationDelay: "80ms" }}>
            <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: "radial-gradient(60% 80% at 50% 0%,rgba(255,0,0,0.12),transparent 65%)" }}></div>
            <div className="relative">
              <span className="mono-label text-muted-foreground">Still skeptical?</span>
              <h2 className="mx-auto mt-4 max-w-xl text-2xl font-semibold leading-[1.16] tracking-[-0.045em] text-foreground md:text-4xl">
                Good. Ask us the <span className="hl-tilt"><span className="hl-accent">hard questions.</span></span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Write to a real human before you spend a cent — or browse the marketplace and see the protections in action.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/contact" className="btn-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square h-4 w-4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> 
                  Contact us 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-3.5 w-3.5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </Link>
                <Link to="/marketplace" className="btn-outline-dim">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-store h-4 w-4"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path><path d="M2 7h20"></path><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"></path></svg> 
                  Browse the marketplace
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
