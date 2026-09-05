import React, { useState, useEffect } from "react";
import Seo from "../components/Seo";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";
import ReputationPanel from "../components/ReputationPanel";

const BtcIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M14.5 10c1.5 0 2.5-1 2.5-2.5S16 5 14.5 5H9v2h1v10H9v2h5.5c1.5 0 3-1 3-3s-1-2.5-2.5-3zM12 7h2.5c.5 0 1 .5 1 1s-.5 1-1 1H12V7zm3.5 8H12v-2h3.5c.5 0 1 .5 1 1s-.5 1-1 1z"/></svg>;
const EthIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2L5 11l7 4 7-4-7-9zM5 13l7 9 7-9-7 4-7-4z"/></svg>;
const SolIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M4 17h12l4-3H8l-4 3zm16-7H8l-4 3h12l4-3zm0-4l-4 3H4l4-3h12z"/></svg>;
const LtcIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M9 18l1-4H8l1-2h2.5l1-4h3l-1 4h2l-1 2h-2l-1.5 6H18l-1 2H7z"/></svg>;
const BnbIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 4l-4 4-2-2 6-6 6 6-2 2-4-4zm-5 9l2-2 2 2-2 2-2-2zm10 0l2-2 2 2-2 2-2-2zm-3 3l-2-2 2-2 2 2-2 2zm0 4l-4-4-2 2 6 6 6-6-2-2-4 4z"/></svg>;
const TonIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 3l9 9-9 10-9-10 9-9zm0 2.5L6 11l6 8 6-8-6-5.5zm-3 8h6M12 6v9"/></svg>;
const TrxIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 3L3 10l9 12 9-12-9-9zm0 3.5l5 4-5 1.5V6.5zM7.5 10l5-1.5v3L7.5 10zm9 0l-5 1.5v-3l5 1.5zM8.5 11.5l3.5 8V13l-3.5-1.5zm7 0V20l3.5-8-3.5 1.5z"/></svg>;
const UsdcIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2A10 10 0 1022 12 10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8zm1-4.5v2h-2V16c-1.5-.4-2.5-1.5-2.5-3h2c0 1 1.5 1.5 2.5 1 1-.5 1-1.5 0-2-1.5-.6-3.5-1-3.5-3s1-2.5 2.5-3V4h2v2c1.5.4 2.5 1.5 2.5 3h-2c0-1-1.5-1.5-2.5-1-1 .5-1 1.5 0 2 1.5.6 3.5 1 3.5 3s-1 2.5-2.5 3z"/></svg>;
const UsdtIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-4-8c0 1.5 1.8 2.5 4 2.5s4-1 4-2.5c0-.4-.2-.8-1-1H9c-.8.2-1 .6-1 1zM13 9V6h3V4H8v2h3v3c-2 .2-4 .8-4 2 0 1.5 2 2.5 5 2.5s5-1 5-2.5c0-1.5-2-2-4-2z"/></svg>;
const DaiIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2L2 12l10 10 10-10L12 2zm0 17L4 12l8-7 8 7-8 7zM10.5 8h3v1.5h-3zM10.5 14h3v1.5h-3zM9 11h6v1.5H9z"/></svg>;

const COINS = [
  { id: "BTC", name: "Bitcoin", icon: <BtcIcon />, color: "text-[#f7931a]" },
  { id: "SOL", name: "Solana", icon: <SolIcon />, color: "text-[#14f195]" },
  { id: "LTC", name: "Litecoin", icon: <LtcIcon />, color: "text-[#345d9d]" },
  { id: "TON", name: "Toncoin", icon: <TonIcon />, color: "text-[#0098ea]" },
  { id: "TRX", name: "Tron", icon: <TrxIcon />, color: "text-[#ef0027]" },
];

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
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState<any>(null);
  const { user } = useAuth();
  const [seller, setSeller] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paySuccess, setPaySuccess] = useState(false);
  const [userOffer, setUserOffer] = useState<any>(null);
  const [sellerWallets, setSellerWallets] = useState<any>(undefined); // undefined=loading, null=no record, {...}=loaded
  const [existingOrder, setExistingOrder] = useState<any>(null);
  
  // Likes state
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Offer modal state
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [submittingOffer, setSubmittingOffer] = useState(false);
  const [offerSuccess, setOfferSuccess] = useState(false);
  const [offerError, setOfferError] = useState("");

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      const { data: listingData } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single();
      
      if (listingData) {
        setListing(listingData);
        setLikesCount(listingData.likes_count || 0);
        
        // Fire and forget view increment
        supabase.rpc('increment_listing_view', { p_listing_id: listingData.id }).then();
        
        const [{ data: profileData }, { data: walletsData }] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', listingData.seller_id).single(),
          supabase.from('seller_wallets').select('*').eq('seller_id', listingData.seller_id).maybeSingle(),
        ]);
        if (profileData) setSeller(profileData);
        // null explicitly means "checked and found nothing"; undefined means "not yet checked"
        setSellerWallets(walletsData ?? null);
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  useEffect(() => {
    if (!user || !listing) return;
    async function loadOffer() {
      const { data } = await supabase
        .from('listing_offers')
        .select('*')
        .eq('listing_id', listing.id)
        .eq('buyer_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data) setUserOffer(data);
    }
    async function loadLikeStatus() {
      const { data } = await supabase
        .from('listing_likes')
        .select('*')
        .eq('listing_id', listing.id)
        .eq('user_id', user!.id)
        .maybeSingle();
      if (data) setIsLiked(true);
    }
    async function checkExistingOrder() {
      const { data } = await supabase
        .from('orders')
        .select('id, status')
        .eq('listing_id', listing.id)
        .eq('buyer_id', user!.id)
        .neq('status', 'closed')
        .neq('status', 'cancelled')
        .limit(1)
        .maybeSingle();
      if (data) setExistingOrder(data);
    }
    loadLikeStatus();
    loadOffer();
    checkExistingOrder();
  }, [user, listing]);

  const handleLike = async () => {
    if (!user) return navigate(`/signin?returnTo=/listing/${id}`);
    
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(prev => Math.max(0, prev - 1));
      await supabase.from('listing_likes').delete().eq('listing_id', listing.id).eq('user_id', user.id);
    } else {
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
      await supabase.from('listing_likes').insert({ listing_id: listing.id, user_id: user.id });
    }
  };

  const handleMakeOffer = async () => {
    if (!user) {
      setOfferError("Please sign in to make an offer.");
      return;
    }
    const amount = Number(offerAmount);
    if (isNaN(amount) || amount <= 0 || amount >= Number(listing.price)) {
      setOfferError("Please enter a valid amount lower than the asking price.");
      return;
    }
    setSubmittingOffer(true);
    setOfferError("");
    
    const { error } = await supabase.from('listing_offers').insert({
      listing_id: listing.id,
      buyer_id: user.id,
      amount: amount
    });

    setSubmittingOffer(false);
    if (error) {
      setOfferError(error.message);
    } else {
      setOfferSuccess(true);
      setUserOffer({ status: 'pending', amount: amount });
      setTimeout(() => {
        setShowOfferModal(false);
        setOfferSuccess(false);
        setOfferAmount("");
      }, 2500);
    }
  };

  if (loading) {
    return <div className="pt-24 px-4 pb-24 text-center">Loading...</div>;
  }

  if (!listing) {
    return <div className="pt-24 px-4 pb-24 text-center">Listing not found.</div>;
  }


  const isFansign = listing.category === "fansign";
  const isService = listing.category === "service";
  const isUsernameLike = listing.category === "username" || listing.category === "account";
  const details = listing.details ?? {};
  const handleLength = listing.handle.replace(/^@+/, '').length;
  const handleLengthLabel = handleLength === 1 ? '1-character' : `${handleLength}-character`;
  const platformLabel = listing.platform || 'Marketplace';
  const offerTitle = isFansign ? details.recipient || listing.handle : isService ? details.service_name || listing.handle : listing.handle;
  const effectivePrice = userOffer?.status === 'accepted' ? Number(userOffer.amount) : Number(listing.price);
  const isSold = listing.status !== 'active';

  return (
    <div className="pt-24 px-4 pb-24 md:pb-12 max-w-[1152px] mx-auto min-h-screen">
      <Seo 
        title={`Buy @${listing.handle} on ${platformLabel} | larpings.com`}
        description={listing.description || `Buy ${listing.handle} securely on larpings.com with escrow protection.`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          'name': listing.handle,
          'description': listing.description || `Buy ${listing.handle} on ${platformLabel}`,
          'offers': {
            '@type': 'Offer',
            'price': listing.price,
            'priceCurrency': 'USD'
          }
        }}
      />
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
                <h1 className="leading-none text-[60px] md:text-[80px] text-center whitespace-nowrap overflow-hidden px-2">
                  <span className="text-[#93939f]">@</span>
                  <span className="font-medium text-white">{offerTitle}</span>
                </h1>
                
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
            <div className="flex items-center justify-between mb-6">
              {user?.id === listing.seller_id ? (
                <div className="bg-amber-500/10 text-amber-400 font-mono font-medium text-[11px] tracking-[1.76px] uppercase inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] border border-amber-500/30">
                  You are the seller
                </div>
              ) : (
                <div className="bg-[rgba(52,211,153,0.1)] text-emerald-400 font-mono font-medium text-[11px] tracking-[1.76px] uppercase inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] border border-[rgba(52,211,153,0.35)]">
                  <span className="w-1.5 h-1.5 relative flex shrink-0">
                    <span className="bg-emerald-400 w-full h-full absolute opacity-[0.4] rounded-full animate-ping" />
                    <span className="bg-emerald-400 w-1.5 h-1.5 relative rounded-full" />
                  </span>
                  Available now
                </div>
              )}
              
              <button 
                onClick={handleLike} 
                className={`flex items-center gap-1.5 text-xs font-mono font-medium tracking-widest uppercase transition-colors ${isLiked ? "text-[#ff0000]" : "text-[#93939f] hover:text-[#ff0000]"}`}
              >
                <svg className={`w-5 h-5 ${isLiked ? "fill-[#ff0000]" : "fill-none"}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
                {likesCount}
              </button>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">Price</span>
              <div className="leading-none font-mono text-[48px]">${effectivePrice.toLocaleString()}</div>
              <div className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase mt-1">
                {userOffer?.status === 'accepted' ? 'Accepted Offer Price' : 'All-in · no fees on top'}
              </div>
            </div>

            {userOffer?.status === 'pending' ? (
              <div className="mt-4 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-center text-sm text-amber-300 font-medium">
                Your offer of ${Number(userOffer.amount).toLocaleString()} is pending seller review.
              </div>
            ) : userOffer?.status === 'rejected' ? (
              <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center text-sm text-red-300 font-medium">
                Your offer was rejected. You can make another offer below.
              </div>
            ) : null}

            {user?.id !== listing.seller_id && (!userOffer || userOffer?.status === 'rejected') && !isSold && (
              <button onClick={() => setShowOfferModal(true)} className="w-full mt-4 bg-zinc-900 text-white font-medium text-[13px] px-5 py-3 rounded-[10px] border border-[#222226] hover:border-[#ff0000]/50 transition-colors">
                Make an Offer
              </button>
            )}
            
            <div className="mt-6 space-y-4">
              {user?.id !== listing.seller_id && !isSold && (
                <div>
                  {existingOrder ? (
                    <div className="rounded-[10px] border border-amber-500/30 bg-amber-500/10 p-3 text-center">
                      <p className="text-amber-300 text-xs font-medium mb-2">You already have an active deal on this listing.</p>
                      <button onClick={() => navigate(`/messages?order=${existingOrder.id}`)} className="text-[11px] text-amber-400 underline">View Deal Chat →</button>
                    </div>
                  ) : (
                    <button
                      onClick={async () => {
                        if (!user) return navigate(`/login?returnTo=/listing/${listing.handle}`);
                        const { data, error } = await supabase.from('orders').insert({
                          listing_id: listing.id,
                          buyer_id: user.id,
                          status: 'pending'
                        }).select().single();
                        if (error) {
                          alert(error.message);
                          return;
                        }
                        navigate(`/messages?order=${data.id}`);
                      }}
                      className="w-full bg-[#ff0000] text-white font-medium text-[15px] px-5 py-4 rounded-[12px] hover:bg-[#cc0000] transition-colors"
                    >
                      Buy Now
                    </button>
                  )}
                </div>
              )}
              <div className="bg-[rgba(9,9,11,0.4)] mt-3 p-3.5 rounded-[12px] border border-[#222226]">
                {paySuccess ? (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">✓</div>
                    <h4 className="text-white font-medium mb-1">Escrow Funded</h4>
                    <p className="text-xs text-[#93939f] mb-4">Your funds are safe. Head to the Deal Chat to securely coordinate with the seller.</p>
                    <Link to="/messages" className="bg-[#ff0000] text-white text-[12px] font-medium px-4 py-2 rounded-lg hover:bg-[#cc0000] transition-colors inline-block">
                      Go to Deal Chat →
                    </Link>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
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

              <span className="bg-amber-500/20 text-amber-300 font-medium text-[10px] flex items-center gap-1 px-2 py-0.5 rounded-full border border-amber-500/40">
                <TopSellerIcon />Top Seller
              </span>
            </div>
            
            <Link to={seller ? `/messages?user=${encodeURIComponent(seller.id)}` : '/messages'} className="bg-[#ff0000] text-white font-medium text-[12px] w-full inline-flex justify-center items-center gap-2 mt-4 px-[22px] py-2.5 rounded-[10px] hover:bg-[#cc0000] transition-colors shadow-[0_10px_30px_-12px_rgba(255,0,0,0.5)]">
              <ContactIcon /> Contact the seller
            </Link>
            <Link to={seller ? `/${seller.username}` : '#'} className="bg-transparent text-[#b7b7c2] font-medium text-[12px] flex grow justify-center items-center gap-1.5 px-3 py-2 rounded-[10px] border border-[#222226] hover:bg-white/5 transition-colors mt-2">
                <ProfileIcon /> Profile
            </Link>
            {seller && <ReputationPanel profileId={seller.id} profileHandle={seller.username} compact />}
          </div>
        </div>
      </div>

      {/* Make Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#111113] rounded-[18px] border border-[#222226] p-6 w-full max-w-sm shadow-2xl relative">
            <h3 className="text-xl font-medium text-white mb-2">Make an Offer</h3>
            <p className="text-sm text-[#93939f] mb-6">Propose a new price for this listing. The seller will review and can accept or reject it.</p>
            
            {offerSuccess ? (
              <div className="text-center py-6 text-emerald-400 font-medium">
                ✓ Offer submitted successfully!
              </div>
            ) : (
              <>
                <div className="relative mb-4">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#93939f]">$</span>
                  <input 
                    type="number"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    placeholder="Enter amount in USD"
                    className="w-full bg-[#09090b] border border-[#222226] rounded-xl pl-8 pr-4 py-3 text-white outline-none focus:border-[#ff0000]"
                  />
                </div>
                {offerError && <p className="text-red-400 text-xs mb-4">{offerError}</p>}
                
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowOfferModal(false)} className="flex-1 px-4 py-3 rounded-xl font-medium text-[#93939f] hover:text-white transition-colors">
                    Cancel
                  </button>
                  <button 
                    onClick={handleMakeOffer}
                    disabled={submittingOffer || !offerAmount}
                    className="flex-1 bg-[#ff0000] text-white px-4 py-3 rounded-xl font-medium hover:bg-[#cc0000] disabled:opacity-50 transition-colors"
                  >
                    {submittingOffer ? "Submitting..." : "Submit Offer"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      </div>
    </div>
  );
}
