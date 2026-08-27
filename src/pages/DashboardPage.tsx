import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ username: string; rating: number; reviews: number } | null>(null);
  const [listings, setListings] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [salesCount, setSalesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/signin'); return; }

      const [{ data: prof }, { data: listingsData }, { data: ordersData }, { data: salesData }] = await Promise.all([
        supabase.from('profiles').select('username, rating, reviews').eq('id', user.id).single(),
        supabase.from('listings').select('*').eq('seller_id', user.id).eq('status', 'active'),
        supabase.from('orders').select('*, listings(handle, price)').eq('buyer_id', user.id),
        supabase.from('orders').select('id').eq('seller_id', user.id).eq('status', 'confirmed'),
      ]);

      setProfile(prof);
      setListings(listingsData ?? []);
      setOrders(ordersData ?? []);
      setSalesCount(salesData?.length ?? 0);
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
  const salesProgress = Math.min((confirmedSales / 10) * 100, 100);

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
          <div className="flex shrink-0 gap-2"><Link className="btn-white !px-3.5 !py-2 !text-xs" to="/sell">+ Add listing</Link><Link className="btn-outline-dim !px-3.5 !py-2 !text-xs" to="/account#customize">Customize profile</Link><Link className="btn-outline-dim !px-3.5 !py-2 !text-xs" to={`/seller/${profile.username}`}>Storefront</Link></div>
        )}
      </div>
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <div className="mkt-enter grid grid-cols-2 gap-2.5 md:grid-cols-4" style={{ animationDelay: "70ms" }}>
            <div className="rounded-[12px] border border-border bg-card p-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chart-column h-3.5 w-3.5"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg><span className="mono-label">Revenue</span>
              </div>
              <p className="mt-2 truncate font-mono text-2xl text-foreground">$0.00</p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground">after the 9% fee</p>
            </div>
            <div className="rounded-[12px] border border-border bg-card p-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-bag h-3.5 w-3.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg><span className="mono-label">Confirmed sales</span>
              </div>
              <p className="mt-2 truncate font-mono text-2xl text-foreground">{confirmedSales}</p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground">buyer-confirmed</p>
            </div>
            <div className="rounded-[12px] border border-border bg-card p-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star h-3.5 w-3.5"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg><span className="mono-label">Rating</span>
              </div>
              <p className="mt-2 truncate font-mono text-2xl text-foreground">
                {profile?.rating && profile.rating > 0 ? profile.rating.toFixed(1) : '—'}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                {profile?.reviews ? `${profile.reviews} reviews` : 'no reviews yet'}
              </p>
            </div>
            <div className="rounded-[12px] border border-border bg-card p-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package h-3.5 w-3.5"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path><path d="m7.5 4.27 9 5.15"></path></svg><span className="mono-label">Active listings</span>
              </div>
              <p className="mt-2 truncate font-mono text-2xl text-foreground">{listings.length}</p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground">live on the market</p>
            </div>
          </div>

          {/* Active Listings */}
          <div className="mkt-enter" style={{ animationDelay: "170ms" }}>
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
                  <div key={l.id} className="flex items-center justify-between px-5 py-4">
                    <div>
                      <p className="font-medium">@{l.handle}</p>
                      <p className="text-xs text-muted-foreground">{l.platform} · {l.category}</p>
                    </div>
                    <p className="font-mono font-semibold">${l.price.toLocaleString()}</p>
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
                  {confirmedSales >= 2000 ? "2000" : confirmedSales >= 1000 ? "1000" : confirmedSales >= 500 ? "500" : confirmedSales >= 100 ? "100" : confirmedSales >= 50 ? "50" : confirmedSales >= 30 ? "30" : confirmedSales >= 10 ? "10" : "1"} Sales
                </span>
                <p className="shrink-0 text-xs text-muted-foreground"><span className="font-mono text-foreground">{confirmedSales}</span><span className="font-mono">/10</span> sales</p>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${salesProgress}%` }}></div>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground"><span className="font-mono text-foreground">{Math.max((confirmedSales >= 2000 ? 2000 : confirmedSales >= 1000 ? 1000 : confirmedSales >= 500 ? 500 : confirmedSales >= 100 ? 100 : confirmedSales >= 50 ? 50 : confirmedSales >= 30 ? 30 : confirmedSales >= 10 ? 10 : 1) - confirmedSales, 0)}</span> more confirmed sales to unlock it.</p>
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
              {[1, 10, 30, 50, 100, 500, 1000, 2000].filter((threshold) => confirmedSales >= threshold).map((threshold) => <span key={threshold} className="rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1.5 text-xs font-medium text-amber-200">✦ {threshold} Sales</span>)}
              {confirmedSales === 0 && <span className="text-xs text-muted-foreground">Complete your first confirmed sale to unlock a badge.</span>}
            </div>
          </div>
          <div className="mkt-enter" style={{ animationDelay: "190ms" }}>
            <div className="rounded-[14px] border border-border bg-card p-5 md:p-6">
              <p className="mono-label text-muted-foreground">Available for payout</p>
              <h2 className="mt-2 font-mono text-4xl text-foreground">$0.00</h2>
              <p className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">Earnings unlock <span className="font-medium text-foreground">3 days</span> after each sale.</p>
              <button disabled className="btn-white mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60">Request payout</button>
              <p className="mt-2 text-center text-[10px] text-muted-foreground">Minimum payout: $10</p>
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
