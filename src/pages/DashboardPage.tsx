import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ username: string } | null>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);
  const [salesCount, setSalesCount] = useState(0);
  const [soldTotal, setSoldTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/signin'); return; }

      const [{ data: prof }, { data: listingsData }, { data: ordersData }, { data: salesData }, { data: offersData }] = await Promise.all([
        supabase.from('profiles').select('username').eq('id', user.id).single(),
        supabase.from('listings').select('*').eq('seller_id', user.id).eq('status', 'active'),
        supabase.from('orders').select('*, listings!inner(handle, price, seller_id)').eq('listings.seller_id', user.id).order('created_at', { ascending: false }).limit(10),
        supabase.from('orders').select('id, listings!inner(seller_id, price)').eq('listings.seller_id', user.id).in('status', ['confirmed', 'closed']),
        supabase.from('listing_offers').select('*, listings!inner(handle, price), profiles!buyer_id(username, display_name)').eq('listings.seller_id', user.id).eq('status', 'pending').order('created_at', { ascending: false }),
      ]);

      setProfile(prof);
      setListings(listingsData ?? []);
      setOrders(ordersData ?? []);
      setOffers(offersData ?? []);
      setSalesCount(salesData?.length ?? 0);
      setSoldTotal(salesData?.reduce((acc, order) => acc + ((order.listings as any)?.price || 0), 0) ?? 0);
      setLoading(false);
    };
    init();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="w-6 h-6 border-2 border-[#ff0000] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const confirmedSales = salesCount;
  const badgeCatalog = ["Verified", "Top Seller", "1 Sales", "10 Sales", "30 Sales", "50 Sales", "100 Sales", "500 Sales", "1000 Sales", "2000 Sales", "God Seller", "OG User", "Admin"];
  const earnedBadges = new Set([
    ...(confirmedSales >= 1 ? ["1 Sales"] : []), ...(confirmedSales >= 10 ? ["10 Sales"] : []), ...(confirmedSales >= 30 ? ["30 Sales"] : []), ...(confirmedSales >= 50 ? ["50 Sales"] : []), ...(confirmedSales >= 100 ? ["100 Sales"] : []), ...(confirmedSales >= 500 ? ["500 Sales"] : []), ...(confirmedSales >= 1000 ? ["1000 Sales"] : []), ...(confirmedSales >= 2000 ? ["2000 Sales", "God Seller"] : []),
  ]);
  
  const nextBadgeTarget = confirmedSales >= 2000 ? 2000 : confirmedSales >= 1000 ? 2000 : confirmedSales >= 500 ? 1000 : confirmedSales >= 100 ? 500 : confirmedSales >= 50 ? 100 : confirmedSales >= 30 ? 50 : confirmedSales >= 10 ? 30 : confirmedSales >= 1 ? 10 : 1;
  const salesProgress = Math.min((confirmedSales / nextBadgeTarget) * 100, 100);

  const handleOffer = async (offerId: string, status: 'accepted' | 'rejected') => {
    setOffers(prev => prev.filter(o => o.id !== offerId));
    await supabase.from('listing_offers').update({ status }).eq('id', offerId);
  };

  return (
    <div className="px-4 pb-32 pt-8 mx-auto max-w-6xl">
      <div className="mkt-enter mb-6 flex items-center gap-3 px-1">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user h-5 w-5 text-accent">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="flex items-center gap-1.5 truncate text-xl text-foreground md:text-2xl">
            {profile?.username ? `@${profile.username}` : 'My Account'}
          </h1>
          <p className="mono-label mt-0.5 text-muted-foreground">Seller dashboard</p>
        </div>
        {profile?.username && (
          <div className="flex shrink-0 gap-2"><Link className="btn-white !px-3.5 !py-2 !text-xs" to="/sell">+ Add listing</Link><Link className="btn-outline-dim !px-3.5 !py-2 !text-xs" to="/account#customize">Customize profile</Link><Link className="btn-outline-dim !px-3.5 !py-2 !text-xs" to={`/${profile.username}`}>Storefront</Link></div>
        )}
      </div>
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <div className="mkt-enter grid grid-cols-2 gap-2.5 md:grid-cols-4" style={{ animationDelay: "70ms" }}>
            <div className="rounded-[12px] border border-border bg-card p-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-column h-3.5 w-3.5"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg><span className="mono-label">Revenue</span>
              </div>
              <p className="mt-2 truncate font-mono text-2xl text-foreground">${soldTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground">total earnings</p>
            </div>
            <div className="rounded-[12px] border border-border bg-card p-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag h-3.5 w-3.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg><span className="mono-label">Confirmed sales</span>
              </div>
              <p className="mt-2 truncate font-mono text-2xl text-foreground">{confirmedSales}</p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground">confirmed &amp; closed</p>
            </div>

            <a href="#active-listings" className="rounded-[12px] border border-border bg-card p-4 hover:border-red-500/30 hover:bg-[#131316] transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package h-3.5 w-3.5"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path><path d="m7.5 4.27 9 5.15"></path></svg><span className="mono-label">Active listings</span>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
              <p className="mt-2 truncate font-mono text-2xl text-foreground">{listings.length}</p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground">live on the market</p>
            </a>
          </div>
          {/* Pending Offers */}
          {offers.length > 0 && (
            <div className="mkt-enter mb-6" style={{ animationDelay: "150ms" }}>
              <div className="mono-label mb-3 flex items-center gap-1.5 px-1 text-amber-300">
                Pending Offers
              </div>
              <div className="rounded-[14px] border border-amber-500/30 bg-amber-500/10 divide-y divide-amber-500/20">
                {offers.map((offer) => (
                  <div key={offer.id} className="px-5 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-amber-100">@{offer.listings.handle}</p>
                        <p className="text-xs text-amber-200/70">Offer from @{offer.profiles?.username || 'user'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-semibold text-amber-300">${offer.amount.toLocaleString()}</p>
                        <p className="text-[10px] text-amber-200/50 line-through">List: ${offer.listings.price}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => handleOffer(offer.id, 'accepted')} className="flex-1 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 px-3 py-1.5 rounded text-xs font-medium border border-emerald-500/30 transition-colors">Accept</button>
                      <button onClick={() => handleOffer(offer.id, 'rejected')} className="flex-1 bg-red-500/20 text-red-300 hover:bg-red-500/30 px-3 py-1.5 rounded text-xs font-medium border border-red-500/30 transition-colors">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Listings */}
          <div id="active-listings" className="mkt-enter scroll-mt-20" style={{ animationDelay: "170ms" }}>
            <div className="mono-label mb-3 flex items-center gap-1.5 px-1 text-muted-foreground">
              Active listings
            </div>
            {listings.length === 0 ? (
              <div className="rounded-[14px] border border-border bg-card py-8 text-center">
                <p className="text-sm text-muted-foreground">No active listings yet</p>
                <p className="mt-1 text-xs text-muted-foreground/60">Go to Sell to create your first listing.</p>
              </div>
            ) : (
              <div className="rounded-[14px] border border-border bg-card divide-y divide-border">
                {listings.map((l) => (
                  <div key={l.id} className="px-5 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                      <p className="font-medium">@{l.handle}</p>
                      <p className="text-xs text-muted-foreground">{l.platform} · {l.category}</p>
                      </div>
                      <p className="font-mono font-semibold">${l.price.toLocaleString()}</p>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Orders */}
          <div className="mkt-enter" style={{ animationDelay: "230ms" }}>
            <div className="mono-label mb-3 px-1 text-muted-foreground">Recent orders</div>
            {orders.length === 0 ? (
              <div className="rounded-[14px] border border-border bg-card py-12 text-center">
                <p className="text-sm text-muted-foreground">No orders yet</p>
                <p className="mt-1 text-xs text-muted-foreground/60">Your completed orders and earnings will show up here.</p>
              </div>
            ) : (
              <div className="rounded-[14px] border border-border bg-card divide-y divide-border">
                {orders.map((o) => (
                  <div key={o.id} className="flex items-center justify-between px-5 py-4">
                    <div>
                      <p className="font-medium">@{o.listings?.handle}</p>
                      <p className="text-xs text-muted-foreground capitalize">{o.status}</p>
                    </div>
                    <p className="font-mono font-semibold">${o.listings?.price?.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 lg:col-span-4">
          <div className="mkt-enter" style={{ animationDelay: "130ms" }}>
            <div className="rounded-[14px] border border-border bg-card p-5">
              <p className="mono-label mb-3 text-muted-foreground">Next badge</p>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border font-medium border-yellow-400/40 bg-yellow-400/10 text-yellow-300 px-2.5 py-1 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap h-3.5 w-3.5"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
                  {nextBadgeTarget} Sales
                </span>
                <p className="shrink-0 text-xs text-muted-foreground"><span className="font-mono text-foreground">{confirmedSales}</span><span className="font-mono">/{nextBadgeTarget}</span> sales</p>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${salesProgress}%` }}></div>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground"><span className="font-mono text-foreground">{Math.max(nextBadgeTarget - confirmedSales, 0)}</span> more confirmed sales to unlock it.</p>
            </div>
          </div>
          <div className="mkt-enter rounded-[14px] border border-border bg-card p-5" style={{ animationDelay: "155ms" }}>
            <p className="mono-label text-muted-foreground">Storefront profile</p>
            <p className="mt-2 text-sm text-muted-foreground">Add your avatar, banner, bio, and social links so buyers know who they’re dealing with.</p>
            <Link to="/account#customize" className="btn-white mt-4 inline-flex !py-2.5 !text-xs">Edit storefront profile</Link>
          </div>
          <div className="mkt-enter rounded-[14px] border border-border bg-card p-5" style={{ animationDelay: "175ms" }}>
            <p className="mono-label text-muted-foreground">Sales badges</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {badgeCatalog.map((badge) => <span key={badge} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${earnedBadges.has(badge) ? "border-amber-300/40 bg-amber-300/10 text-amber-200" : "border-border bg-secondary text-muted-foreground/50"}`}>{earnedBadges.has(badge) ? <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>} {badge}</span>)}
            </div>
          </div>
          <div className="mkt-enter" style={{ animationDelay: "190ms" }}>
            <div className="rounded-[14px] border border-border bg-card p-5 md:p-6">
              <p className="mono-label text-muted-foreground">Listing Analytics</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Views</p>
                  <p className="font-mono text-2xl text-foreground">{listings.reduce((sum, l) => sum + (l.views || 0), 0)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Clicks</p>
                  <p className="font-mono text-2xl text-foreground">{listings.reduce((sum, l) => sum + (l.clicks || 0), 0)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mkt-enter rounded-[14px] border border-border bg-card p-4" style={{ animationDelay: "250ms" }}>
            <p className="mono-label mb-3 text-muted-foreground">Quick links</p>
            <div className="grid grid-cols-2 gap-2">
              <Link className="btn-white !py-2.5 !text-xs text-center" to="/sell">New listing</Link>
              <Link className="btn-outline-dim !py-2.5 !text-xs text-center" to="/orders">My orders</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
