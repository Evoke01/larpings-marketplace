import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border bg-[hsl(var(--section-background))] font-[Poppins,ui-sans-serif,system-ui,sans-serif]">
      <div className="mx-auto max-w-6xl px-4">
        
        {/* Get Alerts Form Section */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-border py-10 md:flex-row md:items-center">
          <div>
            <h3 className="text-lg text-foreground font-medium tracking-tight">Never miss a drop</h3>
            <p className="mt-1 text-sm text-muted-foreground">One email when rare goods hit the marketplace. No spam, unsubscribe anytime.</p>
          </div>
          <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              required 
              placeholder="you@example.com" 
              className="h-11 flex-1 rounded-[10px] border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none transition-colors" 
            />
            <button 
              type="submit" 
              className="btn-white !py-0 h-11 shrink-0"
            >
              Get alerts 
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>

        <div className="grid gap-8 py-12 md:grid-cols-4 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-base font-bold tracking-tight text-foreground">
              larpings<span className="relative -top-px align-middle text-[10px] text-accent">@</span>com
            </Link>
            <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-muted-foreground">
              The premium drops marketplace. Rare loot, exclusive sauce — instant crypto checkout, protected transfer.
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <p className="mono-label mb-4 text-muted-foreground">Marketplace</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Browse all drops", to: "/marketplace" },
                { label: "Instagram", to: "/marketplace?platform=instagram" },
                { label: "TikTok", to: "/marketplace?platform=tiktok" },
                { label: "X / Twitter", to: "/marketplace?platform=twitter" },
                { label: "Snapchat", to: "/marketplace?platform=snapchat" },
                { label: "Telegram", to: "/marketplace?platform=telegram" },
              ].map(({ label, to }) => (
                <li key={label}><Link to={to} className="text-secondary-foreground hover:text-foreground transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Selling */}
          <div>
            <p className="mono-label mb-4 text-muted-foreground">Selling</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Sell your goods", to: "/sell" },
                { label: "How it works", to: "/about" },
                { label: "Seller dashboard", to: "/account" },
                { label: "Sold goods", to: "/sold" },
              ].map(({ label, to }) => (
                <li key={label}><Link to={to} className="text-secondary-foreground hover:text-foreground transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mono-label mb-4 text-muted-foreground">Company</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "About us", to: "/about" },
                { label: "Support", to: "/support" },
                { label: "Guides", to: "/guides" },
                { label: "Is it legit?", to: "/legit" },
                { label: "Blog", to: "/blog" },
              ].map(({ label, to }) => (
                <li key={label}><Link to={to} className="text-secondary-foreground hover:text-foreground transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-border py-6 text-[13px] text-muted-foreground md:flex-row md:items-center">
          <p>© 2025 larpings.com — All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link to="/support" className="hover:text-foreground transition-colors">Support — chat with @Guardian</Link>
          </div>
        </div>

      </div>


    </footer>
  );
}
