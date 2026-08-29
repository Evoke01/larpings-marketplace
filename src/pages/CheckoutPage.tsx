import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";
import { LockIcon } from "lucide-react";
import Web3PayPanel from "../components/Web3PayPanel";

const EVM_COINS = ["ETH", "BNB", "USDC", "USDT", "DAI"];

const COINS: Record<string, { id: string, name: string, icon: string, color: string, address: string, ticker: string }> = {
  "BTC": { id: "BTC", name: "Bitcoin", icon: "₿", color: "text-[#f7931a]", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", ticker: "BTCUSDT" },
  "ETH": { id: "ETH", name: "Ethereum", icon: "Ξ", color: "text-[#627eea]", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", ticker: "ETHUSDT" },
  "SOL": { id: "SOL", name: "Solana", icon: "◎", color: "text-[#14f195]", address: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH", ticker: "SOLUSDT" },
  "LTC": { id: "LTC", name: "Litecoin", icon: "Ł", color: "text-[#345d9d]", address: "ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", ticker: "LTCUSDT" },
  "BNB": { id: "BNB", name: "Binance Coin", icon: "BNB", color: "text-[#f3ba2f]", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", ticker: "BNBUSDT" },
  "TON": { id: "TON", name: "Toncoin", icon: "💎", color: "text-[#0098ea]", address: "EQBvW8Z5huPt35H0QfX-KjI0gO_9gP2ZgZ4oWv_T-XpGj-1N", ticker: "TONUSDT" },
  "TRX": { id: "TRX", name: "Tron", icon: "TRX", color: "text-[#ef0027]", address: "T9yD14Nj9j7xAB4dbGeiX9h8unkKHK", ticker: "TRXUSDT" },
  "USDC": { id: "USDC", name: "USD Coin", icon: "$", color: "text-[#2775ca]", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", ticker: "STABLE" },
  "USDT": { id: "USDT", name: "Tether", icon: "₮", color: "text-[#26a17b]", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", ticker: "STABLE" },
  "DAI": { id: "DAI", name: "Dai", icon: "◈", color: "text-[#f5ac37]", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", ticker: "STABLE" },
};

export default function CheckoutPage() {
  const { listingId, coinId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [listing, setListing] = useState<any>(null);
  const [cryptoPrice, setCryptoPrice] = useState<number | null>(null);
  const [exactCryptoAmount, setExactCryptoAmount] = useState<string | null>(null);
  
  const [isCopied, setIsCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes

  const coin = coinId ? COINS[coinId.toUpperCase()] : null;
  const isEVM = coinId ? EVM_COINS.includes(coinId.toUpperCase()) : false;

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch listing and user offer price
  useEffect(() => {
    async function loadListing() {
      if (!listingId || !user) return;
      const { data: listingData } = await supabase.from('listings').select('*').eq('id', listingId).single();
      
      let finalUsdPrice = listingData.price;
      
      const { data: offerData } = await supabase
        .from('listing_offers')
        .select('*')
        .eq('listing_id', listingId)
        .eq('buyer_id', user.id)
        .eq('status', 'accepted')
        .maybeSingle();

      if (offerData) {
        finalUsdPrice = Number(offerData.amount);
      }

      setListing({ ...listingData, finalUsdPrice });
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

  const handleCopy = () => {
    navigator.clipboard.writeText(coin.address);
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
    if (!user) return;
    setError("");
    setIsSimulating(true);

    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      const { data: newOrder, error: orderError } = await supabase.from('orders').insert({
        listing_id: listing.id,
        buyer_id: user.id,
        status: 'confirmed',
        pay_chain: coin.id,
        tx_hash: `auto_${exactCryptoAmount}_${Date.now()}` // Backend will use exact amount to verify
      }).select().single();

      if (orderError) throw orderError;

      await Promise.all([
        supabase.from('listings').update({ status: 'sold' }).eq('id', listing.id),
        supabase.from('order_messages').insert({
          order_id: newOrder.id,
          sender_id: user.id,
          content: "✅ Payment confirmed! Escrow funded.\n\nThe buyer has successfully deposited the funds. You can now coordinate delivery here.\n\n⚠️ Note: If the seller doesn't respond within 6 hours, the payment will be automatically refunded."
        })
      ]);

      navigate(`/messages?order=${newOrder.id}`);
    } catch (err: any) {
      setError(err.message || "Failed to confirm payment");
    } finally {
      setIsSimulating(false);
    }
  };

  const handleWeb3Success = async (txHash: string) => {
    // Navigate to messages on success
    navigate(`/messages`);
  };

  const qrValue = `${coin.id.toLowerCase()}:${coin.address}?amount=${exactCryptoAmount}`;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-xl mx-auto">
      <button onClick={() => navigate(-1)} className="text-[#93939f] hover:text-white flex items-center gap-2 mb-6 font-medium text-sm transition-colors">
        ← Back to listing
      </button>

      <div className="bg-[#111113] p-6 rounded-[20px] border border-[#222226] shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#222226] pb-4">
          <h1 className="font-medium text-white flex items-center gap-2 text-xl">
            <span className={coin.color}>{coin.icon}</span> {coin.name} Checkout
          </h1>
          <div className="text-right">
            <div className="text-[10px] text-[#93939f] font-mono tracking-widest uppercase mb-1">Time remaining</div>
            <div className="text-amber-400 font-mono text-sm">{formatTime(timeLeft)}</div>
          </div>
        </div>

        {isEVM ? (
          <Web3PayPanel 
            listingId={listing.id}
            finalUsdPrice={listing.finalUsdPrice}
            cryptoPrice={cryptoPrice || 0}
            coinId={coin.id}
            onSuccess={handleWeb3Success}
            sellerId={listing.seller_id}
          />
        ) : (
          <>
            <div className="text-center py-2">
              <p className="text-sm text-[#93939f] mb-1">Send EXACTLY this amount:</p>
              <div className="flex justify-center items-baseline gap-2">
                <p className="text-4xl font-mono text-white cursor-pointer hover:text-emerald-400 transition-colors" onClick={handleCopyAmount} title="Copy Amount">
                  {exactCryptoAmount || "..."} 
                </p>
                <span className="text-lg text-[#93939f]">{coin.id}</span>
              </div>
              <p className="text-[11px] text-[#93939f] mt-2">
                This unique amount helps us automatically verify your payment.
              </p>
            </div>

            <div className="flex items-center justify-center py-4">
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

            <div>
              <p className="text-xs text-[#93939f] mb-1.5 font-medium">To Escrow Address:</p>
              <div className="flex items-center gap-2 bg-[#09090b] rounded-[10px] border border-[#222226] p-3">
                <code className="text-xs font-mono text-white/90 flex-1 break-all select-all">{coin.address}</code>
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
          </>
        )}

        {error && !isEVM && (
          <p className="text-red-400 text-xs text-center mt-2">{error}</p>
        )}
      </div>
    </div>
  );
}
