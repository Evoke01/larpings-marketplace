import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ReputationPanel from "../components/ReputationPanel";

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

const CryptoMark = ({ coin }: { coin: string }) => {
  const common = "w-4 h-4";
  if (coin === "BTC") return <span className="text-[17px] leading-none font-semibold">₿</span>;
  if (coin === "ETH") return <svg viewBox="0 0 24 24" className={common} fill="currentColor"><path d="m12 2-6.3 10.2L12 16l6.3-3.8L12 2Z" opacity=".9" /><path d="m12 17.5-6.3-3.8L12 22l6.3-8.3-6.3 3.8Z" opacity=".55" /></svg>;
  if (coin === "USDT") return <span className="text-[15px] font-semibold">₮</span>;
  if (coin === "USDC") return <span className="text-[13px] font-semibold">$</span>;
  if (coin === "SOL") return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 6h14l-3 3H2l3-3Z" /><path d="M8 11h14l-3 3H5l3-3Z" /><path d="M5 16h14l-3 3H2l3-3Z" /></svg>;
  if (coin === "TON") return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5h16l-8 14L4 5Z" /><path d="M8 5h8l-4 7-4-7Z" /></svg>;
  if (coin === "TRX") return <svg viewBox="0 0 24 24" className={common} fill="currentColor"><path d="m4 4 16 3-9 14L4 4Zm3.2 3.1 4.6 9.8 5.4-8.2-10-1.6Z" /></svg>;
  if (coin === "BNB") return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m12 2 3.2 3.2-3.2 3.2-3.2-3.2L12 2Zm-6.4 6.4L8.8 11.6l-3.2 3.2-3.2-3.2 3.2-3.2Zm12.8 0 3.2 3.2-3.2 3.2-3.2-3.2 3.2-3.2ZM12 15.6l3.2 3.2-3.2 3.2-3.2-3.2 3.2-3.2ZM12 8.8l3.2 3.2-3.2 3.2-3.2-3.2L12 8.8Z" /></svg>;
  if (coin === "DAI") return <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="8" /><path d="M8 7v10M8 9h6a3 3 0 1 1 0 6H8M7 10h8M7 14h8" /></svg>;
  return <span className="text-[12px] font-semibold">POL</span>;
};

export default function ListingPage() {
  const { handle } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [buyError, setBuyError] = useState("");
  const [buySuccess, setBuySuccess] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [simulateMessage, setSimulateMessage] = useState("");

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

  async function handleBuy(payCurrency: string) {
    setBuying(true);
    setBuyError("");
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        navigate(`/signin?returnTo=/listing/${handle}`);
        return;
      }
      if (user.id === listing.seller_id) {
        throw new Error("You cannot buy your own listing.");
      }

      // Call the Edge Function to create an invoice
      const { data, error } = await supabase.functions.invoke('create-invoice', {
        body: { listing_id: listing.id, pay_currency: payCurrency }
      });

      if (error) {
        console.error("Function error:", error);
        let providerMessage = "Failed to initialize payment";
        const response = (error as any).context;
        if (response && typeof response.clone === "function") {
          try {
            const body = await response.clone().json();
            if (body?.error) providerMessage = body.error;
          } catch {
            // Keep the friendly fallback when the function returns no JSON body.
          }
        }
        throw new Error(providerMessage);
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

  async function handleSandboxSimulation() {
    setSimulating(true);
    setSimulateMessage("");
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        navigate(`/signin?returnTo=/listing/${handle}`);
        return;
      }

      const { data, error } = await supabase.functions.invoke("simulate-sandbox-payment", {
        body: { listing_id: listing.id },
      });
      if (error) throw new Error("Sandbox simulator is unavailable");
      if (data?.error) throw new Error(data.error);
      setSimulateMessage("Sandbox payment marked Paid. Open Orders to verify the flow.");
    } catch (error: any) {
      setSimulateMessage(error.message || "Sandbox simulation failed");
    } finally {
      setSimulating(false);
    }
  }

  const isFansign = listing.category === "fansign";
  const isService = listing.category === "service";
  const isUsernameLike = listing.category === "username" || listing.category === "account";
  const details = listing.details ?? {};
  const handleLength = listing.handle.replace(/^@+/, '').length;
  const handleLengthLabel = handleLength === 1 ? '1-character' : `${handleLength}-character`;
  const platformLabel = listing.platform || 'Marketplace';
  const offerTitle = isFansign ? details.recipient || listing.handle : isService ? details.service_name || listing.handle : listing.handle;

  return (
    <div className="pt-24 px-4 pb-24 md:pb-12 max-w-[1152px] mx-auto min-h-screen">
      <nav aria-label="Breadcrumb" className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase flex flex-wrap items-center gap-2 mb-6">
        <Link to="/marketplace" className="hover:text-white transition-colors">Drops</Link>
        <span>/</span>
        <Link to={`/marketplace?platform=${listing.platform}`} className="hover:text-white transition-colors capitalize">{listing.platform}</Link>
        <span>/</span>
        <span className="text-white">{isUsernameLike ? "@" : ""}{listing.handle}</span>
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
              {isUsernameLike ? "@" : "✦"}
            </span>
            
            <div className="aspect-[16/10] relative z-10 flex flex-col p-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xl tracking-tight text-white">larpings<span className="text-[#ff0000] text-[14px] align-middle relative -top-[1px]">@</span>com</span>
                <span className="bg-[rgba(52,211,153,0.1)] text-emerald-400 font-mono font-medium text-[11px] tracking-[1.76px] uppercase flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] border border-[rgba(52,211,153,0.35)]">
                  <span className="bg-emerald-400 w-1.5 h-1.5 rounded-full" /> 
                  1 of 1 — unique
                </span>
              </div>
              
              <div className="flex flex-col grow justify-center items-center">
                <div className="leading-none text-[60px] md:text-[80px] text-center whitespace-nowrap overflow-hidden px-2">
                  <span className="text-[#93939f]">@</span>
                  <span className="font-medium text-white">{offerTitle}</span>
                </div>
                
                <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
                  <span className="bg-[rgba(9,9,11,0.6)] font-medium text-[12px] flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-[#222226]">
                    <span className="text-[#93939f]">{isUsernameLike ? "@" : "✦"}</span>
                    <span className="capitalize">{platformLabel}</span>
                  </span>
                  <span className="bg-[rgba(9,9,11,0.6)] text-[#b7b7c2] font-medium text-[12px] px-3 py-1.5 rounded-[8px] border border-[#222226]">
                    {isUsernameLike ? handleLengthLabel : isFansign ? "Custom order" : "Service offer"}
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
              <div className="font-mono text-[14px] mt-1.5">{isUsernameLike ? `${handleLength} characters` : isFansign ? (details.delivery_format || "Custom delivery") : (details.service_option || "Defined scope")}</div>
            </div>
            <div>
              <div className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">Category</div>
              <div className="font-mono text-[14px] capitalize mt-1.5">{listing.category}</div>
            </div>
          </div>

          {(isFansign || isService) && (
            <div className="bg-[#111113] mt-6 p-6 rounded-[14px] border border-[#222226]">
              <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">{isFansign ? "Fansign brief" : "Service scope"}</span>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {isFansign ? <>
                  <div><span className="text-xs text-[#93939f]">Recipient</span><p className="mt-1 text-sm">{details.recipient || "Specified after purchase"}</p></div>
                  <div><span className="text-xs text-[#93939f]">Delivery</span><p className="mt-1 text-sm">{details.delivery_format || "Custom"}</p></div>
                  <div className="sm:col-span-2"><span className="text-xs text-[#93939f]">Message</span><p className="mt-1 whitespace-pre-wrap text-sm text-[#b7b7c2]">{details.message || listing.description || "Seller will confirm the brief after purchase."}</p></div>
                </> : <>
                  <div><span className="text-xs text-[#93939f]">Type</span><p className="mt-1 text-sm">{details.service_type || "Service"}</p></div>
                  <div><span className="text-xs text-[#93939f]">Subcategory</span><p className="mt-1 text-sm">{details.service_group || "Custom"}</p></div>
                  <div className="sm:col-span-2"><span className="text-xs text-[#93939f]">Offer</span><p className="mt-1 text-sm text-[#b7b7c2]">{details.service_option || listing.description || "Seller will confirm the scope after purchase."}</p></div>
                </>}
              </div>
            </div>
          )}
          
          {/* Transfer Info */}
          <div className="bg-[#111113] mt-6 p-6 rounded-[14px] border border-[#222226]">
            <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">How the protected order works</span>
            <ol className="list-none mb-0 pl-0 mt-4 space-y-3.5">
              <li className="text-[#b7b7c2] text-[14px] flex items-start gap-3">
                <span className="text-[#ff0000] font-mono font-medium text-[11px] tracking-[1.76px] uppercase mt-0.5">01</span>
                Pick your coin and pay on the secure hosted checkout.
              </li>
              <li className="text-[#b7b7c2] text-[14px] flex items-start gap-3">
                <span className="text-[#ff0000] font-mono font-medium text-[11px] tracking-[1.76px] uppercase mt-0.5">02</span>
                The order is locked while the seller prepares and delivers {isFansign ? "your fansign" : isService ? "the service" : "the goods"}.
              </li>
              <li className="text-[#b7b7c2] text-[14px] flex items-start gap-3">
                <span className="text-[#ff0000] font-mono font-medium text-[11px] tracking-[1.76px] uppercase mt-0.5">03</span>
                You confirm delivery — only then the seller gets paid.
              </li>
            </ol>
          </div>
        </div>
        
        {/* Right Column: Sticky Sidebar */}
        <div className="lg:sticky lg:self-start lg:top-24">
          <div className="bg-[#111113] p-6 rounded-[18px] border border-[#222226]">
            <div className="bg-[rgba(52,211,153,0.1)] text-emerald-400 font-mono font-medium text-[11px] tracking-[1.76px] uppercase inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] border border-[rgba(52,211,153,0.35)]">
              <span className="w-1.5 h-1.5 relative flex">
                <span className="bg-emerald-400 w-full h-full absolute opacity-[0.4] rounded-full animate-ping" />
                <span className="bg-emerald-400 w-1.5 h-1.5 relative rounded-full" />
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
                {['BTC', 'ETH', 'USDT', 'USDC', 'SOL', 'TON', 'TRX', 'BNB', 'DAI'].map(coin => (
                  <button key={coin} onClick={() => handleBuy(coin)} disabled={buying || listing.status === 'sold'} type="button" title={coin} className="bg-[rgba(9,9,11,0.5)] flex flex-col items-center gap-1.5 px-0 py-2.5 rounded-[10px] border border-[#222226] hover:border-[#ff0000] hover:bg-[#ff0000]/5 transition-colors disabled:opacity-50">
                    <div className="w-7 h-7 bg-zinc-800 rounded-full flex items-center justify-center text-[#b7b7c2]">
                      <CryptoMark coin={coin} />
                    </div>
                    <span className="text-[#93939f] font-mono text-[10px] text-center block">{coin}</span>
                  </button>
                ))}
                
                <button type="button" onClick={() => handleBuy('POL')} disabled={buying || listing.status === 'sold'} title="Polygon" className="bg-[rgba(9,9,11,0.5)] flex flex-col items-center gap-1.5 px-0 py-2.5 rounded-[10px] border border-[#222226] hover:border-[#ff0000] hover:bg-[#ff0000]/5 transition-colors disabled:opacity-50">
                  <span className="bg-zinc-800 text-[#b7b7c2] w-7 h-7 flex justify-center items-center rounded-full"><CryptoMark coin="POL" /></span>
                  <span className="text-[#93939f] font-mono text-[10px] text-center block">POL</span>
                </button>
              </div>
              {buyError && <p className="text-[#ff0000] text-sm mt-3 text-center">{buyError}</p>}
              {buySuccess && <p className="text-emerald-400 text-sm mt-3 text-center">Order created! Redirecting...</p>}
              {listing.handle === "sandbox-payment-test" && (
                <div className="mt-4 rounded-[10px] border border-amber-400/30 bg-amber-400/5 p-3">
                  <p className="text-amber-300 text-xs text-center">TEST ONLY — no real crypto required</p>
                  <button
                    type="button"
                    onClick={handleSandboxSimulation}
                    disabled={simulating}
                    className="w-full mt-2 rounded-[8px] border border-amber-400/40 px-3 py-2 text-xs font-medium text-amber-200 hover:bg-amber-400/10 disabled:opacity-50"
                  >
                    {simulating ? "Simulating…" : "Simulate sandbox payment"}
                  </button>
                  {simulateMessage && <p className="text-amber-200 text-xs text-center mt-2">{simulateMessage}</p>}
                </div>
              )}
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
                </p>
                <div className="text-[#93939f] text-[12px] flex items-center gap-2">
                  <span>{seller?.rep_count || 0} Rep</span>
                  <span>{seller?.vouch_count || 0} Vouch</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              {listing.verification_status === "verified" ? (
                <span title="Ownership verified" className="bg-[#ff0000] text-white font-medium text-[10px] flex items-center gap-1 px-2 py-0.5 rounded-full border border-[#ff0000]/50">
                  <VerifiedIcon className="w-3 h-3 text-white fill-white stroke-[#ff0000]" />Verified ownership
                </span>
              ) : (
                <span title="The seller has not completed ownership verification" className="bg-amber-500/10 text-amber-300 font-medium text-[10px] flex items-center gap-1 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Unverified ownership
                </span>
              )}
              <span className="bg-amber-500/20 text-amber-300 font-medium text-[10px] flex items-center gap-1 px-2 py-0.5 rounded-full border border-amber-500/40">
                <TopSellerIcon />Top Seller
              </span>
            </div>
            
            <Link to={seller ? `/messages?user=${encodeURIComponent(seller.id)}` : '/messages'} className="bg-[#ff0000] text-white font-medium text-[12px] w-full inline-flex justify-center items-center gap-2 mt-4 px-[22px] py-2.5 rounded-[10px] hover:bg-[#cc0000] transition-colors shadow-[0_10px_30px_-12px_rgba(255,0,0,0.5)]">
              <ContactIcon /> Contact the seller
            </Link>
            <Link to={seller ? `/seller/${seller.username}` : '#'} className="bg-transparent text-[#b7b7c2] font-medium text-[12px] flex grow justify-center items-center gap-1.5 px-3 py-2 rounded-[10px] border border-[#222226] hover:bg-white/5 transition-colors mt-2">
                <ProfileIcon /> Profile
            </Link>
            {seller && <ReputationPanel profileId={seller.id} profileHandle={seller.username} compact />}
          </div>
        </div>
      </div>
    </div>
  );
}
