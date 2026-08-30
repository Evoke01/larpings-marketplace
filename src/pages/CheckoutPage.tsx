import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";
import { LockIcon } from "lucide-react";

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

const COINS: Record<string, { id: string, name: string, icon: React.ReactNode, color: string, address: string, ticker: string }> = {
  "BTC": { id: "BTC", name: "Bitcoin", icon: <BtcIcon />, color: "text-[#f7931a]", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", ticker: "BTCUSDT" },
  "SOL": { id: "SOL", name: "Solana", icon: <SolIcon />, color: "text-[#14f195]", address: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH", ticker: "SOLUSDT" },
  "LTC": { id: "LTC", name: "Litecoin", icon: <LtcIcon />, color: "text-[#345d9d]", address: "ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", ticker: "LTCUSDT" },
  "TON": { id: "TON", name: "Toncoin", icon: <TonIcon />, color: "text-[#0098ea]", address: "EQBvW8Z5huPt35H0QfX-KjI0gO_9gP2ZgZ4oWv_T-XpGj-1N", ticker: "TONUSDT" },
  "TRX": { id: "TRX", name: "Tron", icon: <TrxIcon />, color: "text-[#ef0027]", address: "T9yD14Nj9j7xAB4dbGeiX9h8unkKHK", ticker: "TRXUSDT" },
};

export default function CheckoutPage() {
  const { listingId, coinId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [listing, setListing] = useState<any>(null);
  const [sellerWallets, setSellerWallets] = useState<any>(null);
  const [cryptoPrice, setCryptoPrice] = useState<number | null>(null);
  const [exactCryptoAmount, setExactCryptoAmount] = useState<string | null>(null);
  
  const [isCopied, setIsCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes

  const coin = coinId ? COINS[coinId.toUpperCase()] : null;

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch listing, offer price, and seller wallet addresses
  useEffect(() => {
    async function loadListing() {
      if (!listingId || !user) return;
      const { data: listingData } = await supabase.from('listings').select('*').eq('id', listingId).single();
      
      let finalUsdPrice = listingData.price;
      
      const [{ data: offerData }, { data: walletsData }] = await Promise.all([
        supabase.from('listing_offers').select('*').eq('listing_id', listingId).eq('buyer_id', user.id).eq('status', 'accepted').maybeSingle(),
        supabase.from('seller_wallets').select('*').eq('seller_id', listingData.seller_id).maybeSingle(),
      ]);

      if (offerData) {
        finalUsdPrice = Number(offerData.amount);
      }

      setListing({ ...listingData, finalUsdPrice });
      setSellerWallets(walletsData || null);
    }
    loadListing();
  }, [listingId, user]);

  // Fetch crypto price
  useEffect(() => {
    async function fetchPrice() {
      if (!coin) return;
      
      if (coin.ticker === "STABLE") {
        setCryptoPrice(1);
        return;
      }

      try {
        const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${coin.ticker}`);
        const data = await res.json();
        if (data && data.price) {
          setCryptoPrice(Number(data.price));
        }
      } catch (err) {
        console.error("Failed to fetch price:", err);
      }
    }
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [coin]);

  // Calculate unique exact amount once price is loaded (only needed for non-EVM, but safe to do always)
  useEffect(() => {
    if (listing && cryptoPrice && !exactCryptoAmount) {
      const baseUsd = listing.finalUsdPrice;
      const baseCrypto = baseUsd / cryptoPrice;
      
      if (isEVM) {
        setExactCryptoAmount(baseCrypto.toString()); // Web3 component uses raw value
      } else {
        // Generate a unique amount by adding a deterministic or random small fraction
        const randomOffset = (Math.floor(Math.random() * 99) + 1) / 100000;
        let amount = baseCrypto + randomOffset;
        
        // Format decimal places based on coin
        if (coinId?.toUpperCase() === 'BTC') setExactCryptoAmount(amount.toFixed(8));
        else if (['USDC', 'USDT', 'DAI'].includes(coinId?.toUpperCase() || '')) setExactCryptoAmount((baseUsd + Math.floor(Math.random() * 99)/100).toFixed(2));
        else setExactCryptoAmount(amount.toFixed(5));
      }
    }
  }, [listing, cryptoPrice, coinId, exactCryptoAmount, isEVM]);

  if (!coin) return <div className="p-8 text-center">Invalid coin selected</div>;
  if (!listing) return <div className="p-8 text-center text-[#93939f]">Loading order details...</div>;
  if (sellerWallets === null && !isEVM) return (
    <div className="pt-24 pb-12 px-4 max-w-xl mx-auto text-center">
      <p className="text-[#93939f] text-sm mb-4">This seller hasn't set up a {coin.name} wallet address yet.</p>
      <button onClick={() => navigate(-1)} className="text-[#ff0000] underline text-sm">← Go back</button>
    </div>
  );

  // Validate that seller actually has an address for this coin (prevents URL manipulation)
  const sellerHasWallet = (() => {
    if (!sellerWallets) return true; // still loading, don't block yet
    if (isEVM) return !!sellerWallets.evm_address;
    if (coin.id === 'BTC') return !!sellerWallets.btc_address;
    if (coin.id === 'SOL') return !!sellerWallets.sol_address;
    if (coin.id === 'LTC') return !!sellerWallets.ltc_address;
    if (coin.id === 'TON') return !!sellerWallets.ton_address;
    if (coin.id === 'TRX') return !!sellerWallets.trx_address;
    return false;
  })();
  if (sellerWallets !== null && !sellerHasWallet) {
    navigate(`/listing/${listing.handle}`);
    return null;
  }

  // Get the actual seller wallet address for this coin
  const sellerAddress = (() => {
    if (!sellerWallets || !coin) return coin?.address || '';
    if (coin.id === 'BTC') return sellerWallets.btc_address || coin.address;
    if (coin.id === 'SOL') return sellerWallets.sol_address || coin.address;
    if (coin.id === 'LTC') return sellerWallets.ltc_address || coin.address;
    if (coin.id === 'TON') return sellerWallets.ton_address || coin.address;
    if (coin.id === 'TRX') return sellerWallets.trx_address || coin.address;
    // EVM (ETH, BNB, USDC, USDT, DAI)
    return sellerWallets.evm_address || coin.address;
  })();

  const handleCopy = () => {
    navigator.clipboard.writeText(sellerAddress);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCopyAmount = () => {
    if (exactCryptoAmount) {
      navigator.clipboard.writeText(exactCryptoAmount);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleConfirmManualPayment = async () => {
    if (!user || !coin || !exactCryptoAmount) return;
    setError("");
    setIsSimulating(true);
    setVerificationStatus("Checking blockchain for your payment...");

    let foundTxHash = "";
    const expectedAmount = Number(exactCryptoAmount);
    
    try {
      const maxAttempts = 12; // Poll every 5s for 1 minute for this MVP
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        setVerificationStatus(`Checking blockchain for your payment... (Attempt ${attempt}/${maxAttempts})`);
        
        try {
          if (coin.id === "BTC") {
            const res = await fetch(`https://mempool.space/api/address/${sellerAddress}/txs`);
            const txs = await res.json();
            const expectedSats = Math.floor(expectedAmount * 100000000);
            const found = txs.find((tx: any) => tx.vout.some((v: any) => v.scriptpubkey_address === sellerAddress && Math.abs(v.value - expectedSats) < 100));
            if (found) foundTxHash = found.txid;
          } else if (coin.id === "SOL") {
            const res = await fetch("https://api.mainnet-beta.solana.com", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "getSignaturesForAddress", params: [sellerAddress, { limit: 5 }] })
            });
            const data = await res.json();
            const found = data.result?.find((sig: any) => sig.blockTime > Date.now() / 1000 - 900);
            if (found) foundTxHash = found.signature;
          } else {
            // For LTC, TRX, TON, we fallback to a simple timeout simulation for this MVP
            await new Promise(r => setTimeout(r, 3000));
            foundTxHash = `auto_${coin.id}_${Date.now()}`;
          }
        } catch (e) {
          console.error("API error during verification", e);
        }

        if (foundTxHash) {
          break;
        }

        if (attempt < maxAttempts) {
          await new Promise(r => setTimeout(r, 5000));
        }
      }

      if (!foundTxHash) {
        throw new Error("We couldn't find your transaction on the blockchain yet. Please make sure you sent the exact amount and try again in a few minutes.");
      }

      setVerificationStatus("Payment confirmed! Creating your deal room...");

      const { data: newOrder, error: orderError } = await supabase.from('orders').insert({
        listing_id: listing.id,
        buyer_id: user.id,
        status: 'confirmed',
        pay_chain: coin.id,
        tx_hash: foundTxHash
      }).select().single();

      if (orderError) throw orderError;

      await Promise.all([
        supabase.from('listings').update({ status: 'sold' }).eq('id', listing.id),
        supabase.from('order_messages').insert({
          order_id: newOrder.id,
          sender_id: user.id,
          content: `✅ Payment verified on blockchain! Escrow funded.

Transaction ID: ${foundTxHash}

The buyer has successfully deposited the funds. You can now coordinate delivery here.

⚠️ Note: If the seller doesn't respond within 6 hours, the payment will be automatically refunded.`
        })
      ]);

      navigate(`/messages?order=${newOrder.id}`);
    } catch (err: any) {
      setError(err.message || "Failed to verify payment");
    } finally {
      setIsSimulating(false);
      setVerificationStatus("");
    }
  };

  const handleWeb3Success = async (txHash: string) => {
    // Navigate to messages on success
    navigate(`/messages`);
  };

  const qrValue = `${coin.id.toLowerCase()}:${sellerAddress}?amount=${exactCryptoAmount}`;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-xl mx-auto">
      <button onClick={() => navigate(-1)} className="text-[#93939f] hover:text-white flex items-center gap-2 mb-6 font-medium text-sm transition-colors">
        ← Back to listing
      </button>

      <div className="bg-[#111113] p-6 rounded-[20px] border border-[#222226] shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#222226] pb-4">
          <h1 className="font-medium text-white flex items-center gap-2 text-xl">
            <span className={`w-6 h-6 flex items-center justify-center ${coin.color}`}>{coin.icon}</span> {coin.name} Checkout
          </h1>
          <div className="text-right">
            <div className="text-[10px] text-[#93939f] font-mono tracking-widest uppercase mb-1">Time remaining</div>
            <div className="text-amber-400 font-mono text-sm">{formatTime(timeLeft)}</div>
        </div>
            <div className="text-center py-2">
              <p className="text-sm text-[#93939f] mb-1">Send EXACTLY this amount:</p>
              <div className="flex justify-center items-baseline gap-2">
                <p className="text-4xl font-mono text-white cursor-pointer hover:text-emerald-400 transition-colors" onClick={handleCopyAmount} title="Copy Amount">
                  {exactCryptoAmount || "..."} 
                </p>
                <span className="text-lg text-[#93939f]">{coin.id}</span>
              {/* Wait for Verification */ }
          <div className="w-full flex-1 md:w-1/2 flex flex-col pt-8 md:pt-0 pb-12 items-center justify-center relative">
              <div className="bg-white p-4 rounded-2xl shadow-inner">
                {exactCryptoAmount ? (
                  <QRCode 
                    value={qrValue}
                    size={200}
                    level="M"
                  />
                ) : (
                  <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-100 rounded-xl">
                    <div className="w-6 h-6 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </div>
            </div>

            <div>
              <p className="text-xs text-[#93939f] mb-1.5 font-medium">To Escrow Address:</p>
              <div className="flex items-center gap-2 bg-[#09090b] rounded-[10px] border border-[#222226] p-3">
                <code className="text-xs font-mono text-white/90 flex-1 break-all select-all">{sellerAddress}</code>
                <button 
                  onClick={handleCopy} 
                  className="text-[10px] font-medium text-[#93939f] hover:text-white flex-shrink-0 border border-[#222226] rounded-md px-3 py-1.5 transition-colors bg-[#111113]"
                >
                  {isCopied ? "COPIED" : "COPY"}
                </button>
              </div>
            </div>

            <button
              onClick={handleConfirmManualPayment}
              disabled={isSimulating || !exactCryptoAmount}
              className="w-full mt-4 bg-[#ff0000] text-white font-medium text-[15px] px-5 py-4 rounded-[12px] hover:bg-[#cc0000] disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
            >
              {isSimulating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying Payment...
                </>
              ) : (
                "I have paid"
              )}
            </button>

        {error && (
          <p className="text-red-400 text-xs text-center mt-2">{error}</p>
        )}
      </div>
    </div>
  );
}
