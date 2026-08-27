import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";

type Profile = { id: string; username: string; rating: number | null; reviews: number | null; created_at: string };

const formatDate = (value: string) => new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value));

export default function AccountPage() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [listingCount, setListingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const userId = user.id;
    let active = true;
    async function loadAccount() {
      const [profileResult, listingsResult] = await Promise.all([
        supabase.from("profiles").select("id, username, rating, reviews, created_at").eq("id", userId).maybeSingle(),
        supabase.from("listings").select("id", { count: "exact", head: true }).eq("seller_id", userId).eq("status", "active"),
      ]);
      if (!active) return;
      if (profileResult.error) setError("We couldn’t load your profile details.");
      setProfile(profileResult.data);
      setListingCount(listingsResult.count ?? 0);
      setLoading(false);
    }
    loadAccount();
    return () => { active = false; };
  }, [user]);

  if (loading) return <div className="min-h-[70vh] flex items-center justify-center"><div className="w-7 h-7 border-2 border-[#ff0000] border-t-transparent rounded-full animate-spin" /></div>;
  if (error) return <div className="min-h-[70vh] flex items-center justify-center text-center px-4"><div><p className="text-[#ff0000] font-mono text-[11px] tracking-[2px] uppercase mb-3">Account unavailable</p><p className="text-[#93939f]">{error}</p></div></div>;

  const username = profile?.username || user?.email?.split("@")[0] || "member";

  return (
    <main className="mx-auto max-w-6xl px-4 pb-32 pt-8">
      <header className="mb-8"><span className="mono-label text-[#93939f]">Your account</span><h1 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">Profile & account</h1><p className="mt-2 max-w-xl text-sm text-[#93939f]">Manage your larpings identity, marketplace activity, and account access.</p></header>
      <div className="grid gap-6 lg:grid-cols-12">
        <section className="lg:col-span-8 space-y-6">
          <div className="rounded-[14px] border border-[#222226] bg-[#111113] p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-4 border-b border-[#222226] pb-6"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ff0000]/10 text-xl font-semibold text-[#ff0000]">{username.slice(0, 2).toUpperCase()}</div><div className="min-w-0 flex-1"><p className="text-xl font-medium truncate">@{username}</p><p className="mt-1 truncate text-sm text-[#93939f]">{user?.email}</p></div><Link to={`/seller/${encodeURIComponent(username)}`} className="rounded-[10px] border border-[#222226] px-3.5 py-2 text-xs font-medium text-white hover:border-[#ff0000]/50">View storefront</Link></div>
            <div className="grid gap-4 pt-6 sm:grid-cols-2"><div><p className="mono-label text-[#93939f]">Username</p><p className="mt-2 text-sm">@{username}</p></div><div><p className="mono-label text-[#93939f]">Member since</p><p className="mt-2 text-sm">{profile?.created_at ? formatDate(profile.created_at) : "—"}</p></div><div><p className="mono-label text-[#93939f]">Email status</p><p className="mt-2 text-sm text-emerald-300">Verified</p></div><div><p className="mono-label text-[#93939f]">Account type</p><p className="mt-2 text-sm">Buyer & seller</p></div></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3"><div className="rounded-[12px] border border-[#222226] bg-[#111113] p-4"><p className="mono-label text-[#93939f]">Rating</p><p className="mt-2 font-mono text-2xl">{profile?.rating && profile.rating > 0 ? profile.rating.toFixed(1) : "—"}</p></div><div className="rounded-[12px] border border-[#222226] bg-[#111113] p-4"><p className="mono-label text-[#93939f]">Reviews</p><p className="mt-2 font-mono text-2xl">{profile?.reviews ?? 0}</p></div><div className="rounded-[12px] border border-[#222226] bg-[#111113] p-4"><p className="mono-label text-[#93939f]">Active listings</p><p className="mt-2 font-mono text-2xl">{listingCount}</p></div></div>
          <div><p className="mono-label mb-3 px-1 text-[#93939f]">Account actions</p><div className="rounded-[14px] border border-[#222226] bg-[#111113]"><Link to="/orders" className="flex items-center justify-between border-b border-[#222226] p-4 text-sm hover:bg-white/[0.03]"><span><span className="block font-medium">Orders</span><span className="mt-1 block text-xs text-[#93939f]">Track purchases and delivery status.</span></span><span className="text-[#93939f]">→</span></Link><Link to="/messages" className="flex items-center justify-between border-b border-[#222226] p-4 text-sm hover:bg-white/[0.03]"><span><span className="block font-medium">Messages</span><span className="mt-1 block text-xs text-[#93939f]">Chat with sellers and buyers.</span></span><span className="text-[#93939f]">→</span></Link><Link to="/dashboard" className="flex items-center justify-between p-4 text-sm hover:bg-white/[0.03]"><span><span className="block font-medium">Seller dashboard</span><span className="mt-1 block text-xs text-[#93939f]">Manage listings, sales, and payouts.</span></span><span className="text-[#93939f]">→</span></Link></div></div>
        </section>
        <aside className="space-y-6 lg:col-span-4"><div className="rounded-[14px] border border-[#222226] bg-[#111113] p-5"><p className="mono-label text-[#93939f]">Security</p><div className="mt-4 flex items-center justify-between gap-3"><div><p className="text-sm font-medium">Email and password</p><p className="mt-1 text-xs text-[#93939f]">Managed securely by Supabase Auth.</p></div><span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2.5 py-1 text-[10px] text-emerald-300">Active</span></div><Link to="/signin?reset=true" className="mt-5 inline-flex text-xs text-[#ff0000] hover:underline">Reset password</Link></div><div className="rounded-[14px] border border-[#222226] bg-[#111113] p-5"><p className="mono-label text-[#93939f]">Need help?</p><p className="mt-3 text-sm leading-relaxed text-[#93939f]">Our support team can help with orders, listings, or account access.</p><Link to="/support" className="mt-5 inline-flex rounded-[10px] border border-[#222226] px-3.5 py-2 text-xs font-medium text-white hover:border-[#ff0000]/50">Contact support</Link></div><button onClick={() => void signOut()} className="w-full rounded-[10px] border border-[#222226] px-4 py-3 text-sm font-medium text-[#93939f] hover:border-red-500/50 hover:text-red-300">Sign out</button></aside>
      </div>
    </main>
  );
}
