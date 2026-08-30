import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

type Seller = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  rep_count: number | null;
  vouch_count: number | null;
  activeListings: number;
};

const CrownIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m3 7 4.2 4L12 4l4.8 7L21 7l-2 11H5L3 7Z" /><path d="M5 21h14" /></svg>;
const ArrowIcon = () => <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;

function Avatar({ seller, size = "h-12 w-12" }: { seller: Seller; size?: string }) {
  return <div className={`${size} shrink-0 overflow-hidden rounded-full border border-[#333338] bg-[#241014] flex items-center justify-center font-semibold text-white`}>
    {seller.avatar_url ? <img src={seller.avatar_url} alt="" className="h-full w-full object-cover" /> : seller.username.slice(0, 2).toUpperCase()}
  </div>;
}

export default function RanksPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRanks() {
      const [{ data: profiles }, { data: listings }] = await Promise.all([
        supabase.from("profiles").select("id, username, display_name, avatar_url, rep_count, vouch_count, created_at"),
        supabase.from("listings").select("seller_id").eq("status", "active"),
      ]);
      const listingCounts = new Map<string, number>();
      (listings ?? []).forEach((listing) => listingCounts.set(listing.seller_id, (listingCounts.get(listing.seller_id) ?? 0) + 1));
      const ranked = (profiles ?? []).map((profile) => ({ ...profile, activeListings: listingCounts.get(profile.id) ?? 0 }))
        .filter((seller) => seller.activeListings > 0 || (seller.rep_count ?? 0) > 0)
        .sort((a, b) => (b.rep_count ?? 0) - (a.rep_count ?? 0) || (b.vouch_count ?? 0) - (a.vouch_count ?? 0) || b.activeListings - a.activeListings)
        .slice(0, 31);
      setSellers(ranked);
      setLoading(false);
    }
    loadRanks();
  }, []);

  const podium = useMemo(() => [sellers[1], sellers[0], sellers[2]].filter(Boolean), [sellers]);

  return <div className="mx-auto w-full max-w-[1152px] px-4 pb-16 pt-12">
    <section className="relative overflow-hidden rounded-[18px] border border-[#222226] bg-[#111113] px-5 py-12 text-center md:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_0%,rgba(255,0,0,.13),transparent_70%)]" />
      <div className="relative"><span className="mono-label inline-flex items-center gap-2 rounded-[8px] border border-[#222226] bg-[#0b0b0d] px-3 py-2 text-[#b7b7c2]"><CrownIcon /> LIVE RANKINGS</span>
        <h1 className="mt-6 text-4xl font-semibold tracking-[-1.8px] md:text-[52px]">The sellers everyone<br /><span className="text-[#ff0000]">buys from.</span></h1>
        <p className="mx-auto mt-5 max-w-[520px] leading-relaxed text-[#93939f]">A live leaderboard of larpings sellers, ranked by their buyer track record and the storefronts they keep active.</p>
      </div>
    </section>

    <section className="mt-12"><div className="mb-5 flex items-end justify-between"><div><p className="mono-label text-[#ff0000]">THE PODIUM</p><h2 className="mt-2 text-2xl font-medium">Top 3 by sales</h2></div><span className="text-xs text-[#666]">Live data</span></div>
      {loading ? <div className="h-48 animate-pulse rounded-[14px] border border-[#222226] bg-[#111113]" /> : sellers.length === 0 ? <EmptyRanks /> : <div className="grid gap-4 md:grid-cols-3 md:items-end">{podium.map((seller, index) => <PodiumCard key={seller.id} seller={seller} rank={index === 0 ? 2 : index === 1 ? 1 : 3} />)}</div>}
    </section>

    {!loading && sellers.length > 0 && <section className="mt-14"><div className="mb-5"><p className="mono-label text-[#ff0000]">THE CHASING PACK</p><h2 className="mt-2 text-2xl font-medium">Ranks 4–31</h2></div><div className="overflow-hidden rounded-[14px] border border-[#222226] bg-[#111113]">{sellers.slice(3).map((seller, index) => <Link key={seller.id} to={`/${seller.username}`} className="flex items-center gap-4 border-b border-[#222226] px-4 py-4 transition-colors last:border-0 hover:bg-[#171719]"><span className="w-7 text-center font-mono text-sm text-[#666]">{index + 4}</span><Avatar seller={seller} size="h-10 w-10" /><span className="min-w-0 flex-1"><span className="block truncate font-medium">{seller.display_name || `@${seller.username}`}</span><span className="text-xs text-[#777]">@{seller.username} · {seller.activeListings} active listing{seller.activeListings === 1 ? "" : "s"}</span></span><span className="hidden text-right sm:block"><span className="block font-mono text-sm">{seller.vouch_count ?? 0}</span><span className="mono-label text-[#666]">sales</span></span><ArrowIcon /></Link>)}</div></section>}
    <div className="mt-14 flex flex-col items-center rounded-[14px] border border-[#222226] bg-[#111113] px-6 py-10 text-center"><p className="mono-label text-[#ff0000]">YOUR NAME BELONGS UP HERE</p><h2 className="mt-3 text-2xl font-medium">List a handle. Start climbing.</h2><p className="mt-3 max-w-md text-sm leading-relaxed text-[#93939f]">Build a track record through secure checkout, clear delivery and verified ownership.</p><Link to="/sell" className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-[#ff0000] px-5 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]">Create a listing <ArrowIcon /></Link></div>
  </div>;
}

function PodiumCard({ seller, rank }: { seller: Seller; rank: number }) { return <Link to={`/${seller.username}`} className={`group rounded-[14px] border bg-[#111113] p-5 text-center transition-all hover:-translate-y-1 hover:border-[#ff0000]/50 ${rank === 1 ? "border-[#ff0000]/60 md:-translate-y-4" : "border-[#222226]"}`}><div className="flex justify-center"><Avatar seller={seller} size={rank === 1 ? "h-20 w-20" : "h-16 w-16"} /></div><p className="mt-4 font-mono text-xs text-[#ff0000]">#{rank}</p><h3 className="mt-1 truncate text-lg font-medium">@{seller.username}</h3><p className="mt-1 text-xs text-[#777]">{seller.activeListings} active listing{seller.activeListings === 1 ? "" : "s"}</p><p className="mt-5 font-mono text-2xl">{seller.vouch_count ?? 0}</p><p className="mono-label text-[#666]">sales / track record</p></Link>; }
function EmptyRanks() { return <div className="rounded-[14px] border border-[#222226] bg-[#111113] px-6 py-12 text-center text-[#93939f]">Seller rankings will appear once active storefronts begin building a track record.</div>; }
