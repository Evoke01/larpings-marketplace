import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Post {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
}

const POSTS: Post[] = [
  {
    slug: "ogusers-vs-larpings-what-actually-matters-in-2026",
    category: "trust",
    title: "OGUsers vs larpings.com — what actually matters in 2026",
    excerpt: "An honest breakdown of larpings.com vs legacy forums: which platform is safer for username deals, which has real escrow, and how to close a clean transaction in 2026.",
    readTime: "7 min",
    date: "Aug 27, 2026",
  },
  {
    slug: "instagram-username-dm-scam-red-flags-2026",
    category: "trust",
    title: "Instagram username DM scam — red flags & how to stay safe in 2026",
    excerpt: "A practical, up-to-date guide to avoiding DM-based username scams: how protected transfers work, what signals to watch for, and the mistakes to avoid.",
    readTime: "7 min",
    date: "Aug 26, 2026",
  },
  {
    slug: "how-to-buy-instagram-username-from-someone-2026",
    category: "guides",
    title: "A practical guide to buying an Instagram username from someone (2026 edition)",
    excerpt: "Step-by-step walkthrough of buying a username safely: how the market works, what a protected transfer looks like, and how larpings.com handles escrow.",
    readTime: "7 min",
    date: "Aug 25, 2026",
  },
  {
    slug: "how-to-get-taken-instagram-username-inactive-2026",
    category: "guides",
    title: "How to Get a Taken Instagram Username in 2026: Claim Inactive Handles",
    excerpt: "Discover proven strategies to get a taken Instagram username in 2026, including how to claim inactive usernames and what Instagram's latest policies mean for buyers.",
    readTime: "5 min",
    date: "Jul 11, 2026",
  },
  {
    slug: "best-username-marketplaces-2026-escrow-ranking",
    category: "trust",
    title: "7 Best Username Marketplaces of 2026 Ranked by Escrow Safety",
    excerpt: "Explore the top username marketplaces of 2026, ranked by escrow safety, user trust, and real transaction data. Find where to buy handles with verified protection.",
    readTime: "5 min",
    date: "Jul 11, 2026",
  },
  {
    slug: "larpings-vs-swapd-vs-ogusers-marketplace-comparison-2026",
    category: "guides",
    title: "larpings.com vs OGUsers vs Swapd: Username Marketplace Comparison 2026",
    excerpt: "Compare larpings.com, OGUsers, and Swapd in 2026. Find the best username marketplace for rare social handles, platform safety, and trusted transactions.",
    readTime: "6 min",
    date: "Jul 11, 2026",
  },
  {
    slug: "larpings-vs-fragment-telegram-username-marketplace-2026",
    category: "guides",
    title: "larpings.com vs Fragment: Telegram Username Marketplace Comparison 2026",
    excerpt: "Compare larpings.com and Fragment for buying Telegram usernames in 2026. Learn which marketplace is best for your needs, security, and investment strategy.",
    readTime: "5 min",
    date: "Jul 10, 2026",
  },
  {
    slug: "telegram-username-price-scarcity-math-2026",
    category: "guides",
    title: "Telegram Username Price in 2026: Why Short Handles Cost Thousands",
    excerpt: "Explore why Telegram username prices have soared in 2026. Uncover the value drivers, scarcity math, and pricing realities of short Telegram handles.",
    readTime: "4 min",
    date: "Jul 9, 2026",
  },
  {
    slug: "instagram-username-valuation-calculator-2026",
    category: "guides",
    title: "Instagram Username Valuation: Find Your Handle's Worth in 2026",
    excerpt: "Curious about your Instagram username's value? Uncover how to appraise an IG handle, calculate its worth, and maximize your sale price in 2026.",
    readTime: "5 min",
    date: "Jul 8, 2026",
  },
  {
    slug: "personal-branding-og-username-2026",
    category: "branding",
    title: "Why Your Username Is Your Brand: OG Handles & Personal Identity in 2026",
    excerpt: "How a rare, short username positions you ahead of competitors on every platform. The psychology of handles, and why brands are willing to pay premium prices.",
    readTime: "5 min",
    date: "Jul 7, 2026",
  },
  {
    slug: "crypto-checkout-username-marketplace-guide-2026",
    category: "crypto",
    title: "Crypto Checkout for Username Deals: Full Guide for Buyers in 2026",
    excerpt: "Everything you need to know about paying with crypto on larpings.com — which coins are accepted, how escrow works with blockchain payments, and how to stay safe.",
    readTime: "6 min",
    date: "Jul 6, 2026",
  },
  {
    slug: "remove-instagram-shadowban-fast-2026",
    category: "guides",
    title: "How to Remove Instagram Shadowban Fast: Complete Guide for 2026",
    excerpt: "Struggling with low IG reach? Learn how to remove Instagram shadowban quickly in 2026. Step-by-step shadowban fixes and unban strategies from marketplace experts.",
    readTime: "5 min",
    date: "Jul 5, 2026",
  },
];

const TOPICS = ["All", "branding", "crypto", "growth", "guides", "legal", "news", "services", "tools", "trust"];
const LANGS = ["EN", "IT", "ES", "DE", "FR"];
const POSTS_PER_PAGE = 12;

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
  </svg>
);

export default function BlogPage() {
  const [activeTopic, setActiveTopic] = useState("All");
  const [activeLang, setActiveLang] = useState("EN");
  const [page, setPage] = useState(1);

  const filtered = activeTopic === "All"
    ? POSTS
    : POSTS.filter(p => p.category === activeTopic);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const pagePosts = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleTopicChange = (t: string) => {
    setActiveTopic(t);
    setPage(1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-4 pt-6">
        {/* Hero */}
        <section className="hero-frame mkt-enter">
          <div className="hero-grid" aria-hidden="true"></div>
          <span className="at-watermark" aria-hidden="true">✎</span>
          <div className="relative z-10 px-6 py-10 md:px-12 md:py-14">
            <span className="mono-label inline-flex items-center gap-2 rounded-[8px] border border-border bg-background/50 px-3 py-1.5 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent"></span>
              BLOG — guides &amp; insights
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] text-foreground md:text-6xl">
              Guides &amp; insights for the{" "}
              <span className="text-accent">username economy</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Everything about rare usernames: buying and selling safely on larpings.com, personal branding, growth tactics, account security and the market behind OG handles.
            </p>
          </div>
        </section>

        {/* Filters */}
        <div className="mkt-enter mt-8 space-y-3" style={{ animationDelay: "80ms" }}>
          {/* Language */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mono-label mr-1 text-muted-foreground">Language</span>
            {LANGS.map(lang => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`inline-flex items-center rounded-[8px] border px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeLang === lang
                    ? "border-accent/60 bg-accent/10 text-accent"
                    : "border-border bg-card text-secondary-foreground hover:border-accent/40 hover:text-foreground"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Topics */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mono-label mr-1 text-muted-foreground">Topic</span>
            {TOPICS.map(topic => (
              <button
                key={topic}
                onClick={() => handleTopicChange(topic)}
                className={`inline-flex items-center rounded-[8px] border px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeTopic === topic
                    ? "border-accent/60 bg-accent/10 text-accent"
                    : "border-border bg-card text-secondary-foreground hover:border-accent/40 hover:text-foreground"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pagePosts.length === 0 ? (
            <div className="col-span-3 py-20 text-center text-muted-foreground">
              No posts in this category yet.
            </div>
          ) : (
            pagePosts.map((post, i) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="mkt-enter group flex flex-col overflow-hidden rounded-[14px] border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
                style={{ animationDelay: `${120 + i * 50}ms` }}
              >
                <div className="flex flex-1 flex-col p-5">
                  <span className="mono-label text-accent">{post.category}</span>
                  <h2 className="mt-2.5 line-clamp-2 text-lg leading-snug text-foreground">{post.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <ClockIcon /> {post.readTime}
                    </span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn-outline-dim disabled:pointer-events-none disabled:opacity-40 inline-flex items-center gap-2"
            >
              <ArrowLeftIcon /> Prev
            </button>
            <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="btn-outline-dim disabled:pointer-events-none disabled:opacity-40 inline-flex items-center gap-2"
            >
              Next <ArrowRightIcon />
            </button>
          </div>
        )}

        {/* Single-page state: show page indicator anyway */}
        {totalPages <= 1 && filtered.length > 0 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <span className="btn-outline-dim pointer-events-none opacity-40 inline-flex items-center gap-2">
              <ArrowLeftIcon /> Prev
            </span>
            <span className="text-sm text-muted-foreground">Page 1 of 1</span>
            <span className="btn-outline-dim pointer-events-none opacity-40 inline-flex items-center gap-2">
              Next <ArrowRightIcon />
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
