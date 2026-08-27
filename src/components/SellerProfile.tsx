import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

type Profile = { id: string; username: string; display_name: string | null; bio: string | null; avatar_url: string | null; banner_url: string | null; website_url: string | null; twitter_url: string | null; instagram_url: string | null; discord_url: string | null; rating: number | null; reviews: number | null; created_at: string };
type Listing = { id: string; handle: string; description: string | null; category: string | null; platform: string | null; price: number; created_at: string; verification_status: "unverified" | "pending" | "verified" | null };

const formatDate = (value: string) => new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value));
const formatPrice = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);
const VerifiedTick = () => <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-white" fill="#2575ff" stroke="currentColor" strokeWidth="1.5" aria-label="Larpings Verified"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" fill="none" /></svg>;

export default function SellerProfile({ handle }: { handle: string }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [salesCount, setSalesCount] = useState(0);
  const [accountVerified, setAccountVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const normalizedHandle = handle.trim().replace(/^@+/, "").toLowerCase();

    async function loadStorefront() {
      setLoading(true);
      setError(null);
      const { data: seller, error: profileError } = await supabase
        .from("profiles")
        .select("id, username, display_name, bio, avatar_url, banner_url, website_url, twitter_url, instagram_url, discord_url, rating, reviews, created_at")
        .eq("username", normalizedHandle)
        .maybeSingle();

      if (!active) return;
      if (profileError) {
        setError("We couldn’t load this storefront right now.");
        setLoading(false);
        return;
      }
      if (!seller) {
        setProfile(null);
        setListings([]);
        setLoading(false);
        return;
      }

      const [{ data: sellerListings, error: listingsError }, { data: sales }, { data: verification }] = await Promise.all([supabase
        .from("listings")
        .select("id, handle, description, category, platform, price, created_at, verification_status")
        .eq("seller_id", seller.id)
        .eq("status", "active")
        .order("created_at", { ascending: false }), supabase.from("orders").select("id, listings!inner(seller_id)").eq("listings.seller_id", seller.id).eq("status", "confirmed"), supabase.from("seller_verifications").select("seller_id").eq("seller_id", seller.id).eq("status", "verified").maybeSingle()]);

      if (!active) return;
      setProfile(seller);
      setSalesCount(sales?.length ?? 0);
      setAccountVerified(Boolean(verification));
      if (listingsError) {
        setError("The seller loaded, but their listings couldn’t be loaded.");
        setListings([]);
      } else {
        setListings(sellerListings ?? []);
      }
      setLoading(false);
    }

    if (normalizedHandle) loadStorefront();
    else {
      setError("This storefront URL is missing a seller handle.");
      setLoading(false);
    }
    return () => { active = false; };
  }, [handle]);

  if (loading) return <div className="min-h-[70vh] flex items-center justify-center"><div className="w-7 h-7 border-2 border-[#ff0000] border-t-transparent rounded-full animate-spin" /></div>;
  if (error) return <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4"><p className="text-[#ff0000] font-mono text-[11px] tracking-[2px] uppercase mb-3">Storefront unavailable</p><h1 className="text-2xl font-medium mb-3">Something went wrong</h1><p className="text-[#93939f] max-w-md mb-6">{error}</p><Link to="/marketplace" className="bg-white text-[#0e0e11] font-medium px-5 py-3 rounded-[10px]">Browse marketplace</Link></div>;
  if (!profile) return <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4"><p className="text-[#ff0000] font-mono text-[11px] tracking-[2px] uppercase mb-3">404</p><h1 className="text-2xl font-medium mb-3">Seller not found</h1><p className="text-[#93939f] max-w-md mb-6">This storefront doesn’t exist or the seller has changed their username.</p><Link to="/marketplace" className="bg-white text-[#0e0e11] font-medium px-5 py-3 rounded-[10px]">Browse marketplace</Link></div>;


  return (
    <main className="w-full max-w-[1152px] mx-auto px-4 pb-24 pt-4">
      <div className="h-56 relative overflow-hidden rounded-[18px] bg-gradient-to-br from-[#241014] via-[#111113] to-[#09090b]" style={profile.banner_url ? { backgroundImage: `url(${profile.banner_url})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}><div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,0,.35),transparent_40%)]" /><div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#09090b] to-transparent" /></div>
      <div className="relative z-10 -mt-12 flex flex-wrap items-end justify-between gap-4 px-6">
        <div className="flex items-end gap-5 min-w-0"><div className="w-24 h-24 shrink-0 overflow-hidden rounded-full bg-[#1c1c20] border-4 border-[#09090b] flex items-center justify-center text-2xl font-semibold text-white">{profile.avatar_url ? <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" /> : profile.username.slice(0, 2).toUpperCase()}</div><div className="pb-1 min-w-0"><h1 className="flex items-center gap-2 text-3xl font-medium tracking-tight truncate">{profile.display_name || profile.username}{accountVerified && <VerifiedTick />}</h1><p className="flex items-center gap-1.5 text-[#93939f] text-sm">@{profile.username}{accountVerified && <span className="text-[10px] text-[#5f9bff]">Larpings Verified</span>}</p></div></div>
        <Link to={`/messages?user=${encodeURIComponent(profile.id)}`} className="bg-[#ff0000] text-white font-medium px-4 py-2.5 rounded-[10px]">Message</Link>
      </div>
      <p className="text-[#93939f] text-sm mt-6 px-6">{profile.bio || "Verified seller storefront on larpings.com."}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 px-6"><Link to="/badges" className="rounded-full border border-[#333338] px-3 py-1 text-xs font-medium text-[#93939f] transition-colors hover:border-[#ff0000] hover:text-[#ff0000]">Badge guide →</Link></div>
      <section aria-label="Seller stats" className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
        <div className="bg-[#111113] p-4 rounded-[12px] border border-[#222226]"><p className="text-[#93939f] font-mono text-[11px] uppercase tracking-[1.76px]">Rating</p><p className="font-mono text-xl mt-1.5">{profile.rating && profile.rating > 0 ? profile.rating.toFixed(1) : "—"}</p></div>
        <div className="bg-[#111113] p-4 rounded-[12px] border border-[#222226]"><p className="text-[#93939f] font-mono text-[11px] uppercase tracking-[1.76px]">Reviews</p><p className="font-mono text-xl mt-1.5">{profile.reviews ?? 0}</p></div>
        <div className="bg-[#111113] p-4 rounded-[12px] border border-[#222226]"><p className="text-[#93939f] font-mono text-[11px] uppercase tracking-[1.76px]">Active listings</p><p className="font-mono text-xl mt-1.5">{listings.length}</p></div>
        <div className="bg-[#111113] p-4 rounded-[12px] border border-[#222226]"><p className="text-[#93939f] font-mono text-[11px] uppercase tracking-[1.76px]">Member since</p><p className="font-mono text-xl mt-1.5">{formatDate(profile.created_at)}</p></div>
      </section>
      <section aria-labelledby="seller-listings" className="mt-12"><h2 id="seller-listings" className="text-[#93939f] font-mono text-[11px] uppercase tracking-[1.76px]">Live listings from @{profile.username}</h2>
        {listings.length === 0 ? <div className="bg-[#111113] text-center mt-5 p-10 rounded-[14px] border border-[#222226]"><p className="text-[#93939f] text-sm">No active listings right now.</p><Link to="/marketplace" className="inline-block mt-5 text-sm text-white border border-[#222226] px-5 py-3 rounded-[10px]">Browse marketplace</Link></div> : <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-5">{listings.map((listing) => <Link key={listing.id} to={`/listing/${encodeURIComponent(listing.handle)}`} className="bg-[#111113] rounded-[14px] border border-[#222226] p-5 hover:border-[#ff0000]/50 transition-colors"><div className="flex items-start justify-between gap-3"><span className="text-xl font-medium truncate">@{listing.handle}</span><span className="font-mono text-sm shrink-0">{formatPrice(listing.price)}</span></div><p className="text-[#93939f] text-xs mt-3 line-clamp-2 min-h-8">{listing.description || "No description provided."}</p><div className="flex gap-2 mt-5 text-[10px] text-[#93939f] uppercase tracking-wider"><span>{listing.platform || "Marketplace"}</span><span>·</span><span>{listing.category || "Listing"}</span></div></Link>)}</div>}
      </section>
    </main>
  );
}
