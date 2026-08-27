import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

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
  const { handle } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [buyError, setBuyError] = useState("");
  const [buySuccess, setBuySuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!handle) return;
      const { data: listingData } = await supabase
        .from('listings')
        .select('*')
        .eq('handle', handle)
        .single();
      
      if (listingData) {
        setListing(listingData);
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', listingData.seller_id)
          .single();
        if (profileData) {
          setSeller(profileData);
        }
      }
      setLoading(false);
    }
    loadData();
  }, [handle]);

  async function handleBuy() {
    setBuying(true);
    setBuyError("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate(`/signin?returnTo=/listing/${handle}`);
        return;
      }
      if (session.user.id === listing.seller_id) {
        throw new Error("You cannot buy your own listing.");
      }

      // Call the Edge Function to create an invoice
      const { data, error } = await supabase.functions.invoke('create-invoice', {
        body: { listing_id: listing.id }
      });

      if (error) {
        console.error("Function error:", error);
        throw new Error("Failed to initialize payment");
      }
      if (data?.error) {
        throw new Error(data.error);
      }

      setBuySuccess(true);
      // Redirect to Rune Pay checkout
      if (data?.payment_url) {
        window.location.href = data.payment_url;
      } else {
        throw new Error("No payment URL received");
      }
    } catch (err: any) {
      console.error(err);
      setBuyError(err.message || "Checkout failed");
    } finally {
      setBuying(false);
    }
  }

  if (loading) {
    return <div className="pt-24 px-4 pb-24 text-center">Loading...</div>;
  }

  if (!listing) {
    return <div className="pt-24 px-4 pb-24 text-center">Listing not found.</div>;
  }

  const handleLength = listing.handle.replace(/^@+/, '').length;
  const handleLengthLabel = handleLength === 1 ? '1-character' : `${handleLength}-character`;
  const platformLabel = listing.platform || 'Marketplace';

  return (
    <div className="pt-24 px-4 pb-24 md:pb-12 max-w-[1152px] mx-auto min-h-screen">
      <nav aria-label="Breadcrumb" className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase flex flex-wrap items-center gap-2 mb-6">
        <Link to="/marketplace" className="hover:text-white transition-colors">Drops</Link>
        <span>/</span>
        <Link to={`/marketplace?platform=${listing.platform}`} className="hover:text-white transition-colors capitalize">{listing.platform}</Link>
        <span>/</span>
        <span className="text-white">@{listing.handle}</span>
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
                  <span className="font-medium text-white">{listing.handle}</span>
                </div>
                
                <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
                  <span className="bg-[rgba(9,9,11,0.6)] font-medium text-[12px] flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-[#222226]">
                    <span className="text-[#93939f]">@</span>
                    <span className="capitalize">{platformLabel}</span>
                  </span>
                  <span className="bg-[rgba(9,9,11,0.6)] text-[#b7b7c2] font-medium text-[12px] px-3 py-1.5 rounded-[8px] border border-[#222226]">
                    {handleLengthLabel}
                  </span>
                  <span className="bg-[rgba(9,9,11,0.6)] text-[#b7b7c2] font-medium text-[12px] capitalize px-3 py-1.5 rounded-[8px] border border-[#222226]">
                    {listing.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid gap-6 grid-cols-3 mt-6">
            <div>
              <div className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">Platform</div>
              <div className="font-mono text-[14px] capitalize mt-1.5">{listing.platform}</div>
            </div>
            <div>
              <div className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">Length</div>
              <div className="font-mono text-[14px] mt-1.5">{handleLength} characters</div>
            </div>
            <div>
              <div className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">Category</div>
              <div className="font-mono text-[14px] capitalize mt-1.5">{listing.category}</div>
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
                <div className="leading-none font-mono text-[48px]">${Number(listing.price).toLocaleString()}</div>
                <div className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase mt-2">All-in · no fees on top</div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase mb-2.5">Pay with</div>
              
              <div className="grid grid-cols-5 gap-2">
                {/* Simplified the crypto buttons for cleanliness */}
                {['BTC', 'ETH', 'USDT', 'USDC', 'SOL', 'TON', 'TRX', 'BNB', 'DAI'].map(coin => (
                  <button key={coin} onClick={handleBuy} disabled={buying || listing.status === 'sold'} type="button" title={coin} className="bg-[rgba(9,9,11,0.5)] flex flex-col items-center gap-1.5 px-0 py-2.5 rounded-[10px] border border-[#222226] hover:border-[#ff0000] hover:bg-[#ff0000]/5 transition-colors disabled:opacity-50">
                    <div className="w-7 h-7 bg-zinc-800 rounded-full flex items-center justify-center text-[10px] text-white">
                      {coin.slice(0,3)}
                    </div>
                    <span className="text-[#93939f] font-mono text-[10px] text-center block">{coin}</span>
                  </button>
                ))}
                
                <button type="button" onClick={handleBuy} disabled={buying || listing.status === 'sold'} title="Polygon" className="bg-[rgba(9,9,11,0.5)] flex flex-col items-center gap-1.5 px-0 py-2.5 rounded-[10px] border border-[#222226] hover:border-[#ff0000] hover:bg-[#ff0000]/5 transition-colors disabled:opacity-50">
                  <span className="bg-[#8247e5] text-white font-semibold text-[9px] w-7 h-7 flex justify-center items-center rounded-full">POL</span>
                  <span className="text-[#93939f] font-mono text-[10px] text-center block">POL</span>
                </button>
              </div>
              {buyError && <p className="text-[#ff0000] text-sm mt-3 text-center">{buyError}</p>}
              {buySuccess && <p className="text-emerald-400 text-sm mt-3 text-center">Order created! Redirecting...</p>}
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
              <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-white uppercase">
                {seller ? seller.username.slice(0,2) : '?'}
              </div>
              <div className="min-w-0 grow">
                <p className="font-medium text-[14px] flex items-center gap-1 mb-0.5">
                  @{seller?.username || 'unknown'}
                  {seller?.rating >= 4.5 && <VerifiedIcon className="text-[#ff0000] w-4 h-4 fill-[#ff0000]" />}
                </p>
                <div className="text-[#93939f] text-[12px] flex items-center gap-2">
                  <span className="flex items-center gap-0.5"><StarIcon className="text-amber-400" /> {seller?.rating || '0.0'}</span>
                  <span>{seller?.reviews || 0} sales</span>
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
            <Link to={seller ? `/seller/${seller.username}` : '#'} className="bg-transparent text-[#b7b7c2] font-medium text-[12px] flex grow justify-center items-center gap-1.5 px-3 py-2 rounded-[10px] border border-[#222226] hover:bg-white/5 transition-colors mt-2">
                <ProfileIcon /> Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
