import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";

const COINS = [
  { id: "BTC", name: "Bitcoin", icon: "₿", color: "text-[#f7931a]", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
  { id: "ETH", name: "Ethereum", icon: "Ξ", color: "text-[#627eea]", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" },
  { id: "SOL", name: "Solana", icon: "◎", color: "text-[#14f195]", address: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH" },
  { id: "LTC", name: "Litecoin", icon: "Ł", color: "text-[#345d9d]", address: "ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
  { id: "BNB", name: "Binance Coin", icon: "BNB", color: "text-[#f3ba2f]", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" },
  { id: "TON", name: "Toncoin", icon: "💎", color: "text-[#0098ea]", address: "EQBvW8Z5huPt35H0QfX-KjI0gO_9gP2ZgZ4oWv_T-XpGj-1N" },
  { id: "TRX", name: "Tron", icon: "TRX", color: "text-[#ef0027]", address: "T9yD14Nj9j7xAB4dbGeiX9h8unkKHK" },
  { id: "USDC", name: "USD Coin", icon: "$", color: "text-[#2775ca]", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" },
  { id: "USDT", name: "Tether", icon: "₮", color: "text-[#26a17b]", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" },
  { id: "DAI", name: "Dai", icon: "◈", color: "text-[#f5ac37]", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" },
];

interface Props {
  orderId: string; // Used as listingId in the UI context
  sellerWalletAddress: string | null;
  priceUsd: number;
  listingStatus: string;
  onSuccess: () => void;
}

export default function Web3PayPanel({ orderId: listingId, priceUsd, listingStatus, onSuccess }: Props) {
  const { user } = useAuth();
  const [selectedCoin, setSelectedCoin] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");

  const isSold = listingStatus === "sold";
  
  // Calculate price with implicit $5 gas/network fee
  const networkFeeUsd = 5;
  const totalUsd = priceUsd + networkFeeUsd;

  const getCryptoPrice = (chain: string, usdValue: number) => {
    const rates: Record<string, number> = { 
      BTC: 65000, ETH: 3000, SOL: 150, LTC: 80, BNB: 600, 
      TON: 7, TRX: 0.12, USDC: 1, USDT: 1, DAI: 1 
    };
    const val = usdValue / (rates[chain] || 1);
    if (chain === 'BTC') return val.toFixed(8);
    if (chain === 'ETH' || chain === 'BNB') return val.toFixed(6);
    if (['USDC', 'USDT', 'DAI'].includes(chain)) return val.toFixed(2);
    return val.toFixed(4);
  };

  const handleCopy = () => {
    if (selectedCoin) {
      navigator.clipboard.writeText(selectedCoin.address);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleConfirmPayment = async () => {
    if (!user) {
      setError("You must be logged in to buy.");
      return;
    }
    if (!txHash.trim()) {
      setError("Please enter the Transaction ID to confirm payment.");
      return;
    }
    setError("");
    setIsSimulating(true);

    // Simulate network delay for verification
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // 1. Create the order
      const { data: newOrder, error: orderError } = await supabase.from('orders').insert({
        listing_id: listingId,
        buyer_id: user.id,
        status: 'confirmed',
        pay_chain: selectedCoin.id,
        tx_hash: txHash.trim()
      }).select().single();

      if (orderError) throw orderError;

      // 2. Insert system welcome message with warning
      await supabase.from('order_messages').insert({
        order_id: newOrder.id,
        sender_id: user.id,
        content: "✅ Payment confirmed! Escrow funded.\n\nThe buyer has successfully deposited the funds. You can now coordinate delivery here.\n\n⚠️ Note: If the seller doesn't respond within 6 hours, the payment will be automatically refunded."
      });

      // 3. Mark success
      setPaymentDone(true);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to confirm payment");
    } finally {
      setIsSimulating(false);
    }
  };

  if (isSold) {
    return null;
  }

  // If payment is completely done, we don't render anything here anymore 
  // because the parent ListingPage will render the Escrow Funded box.
  if (paymentDone) {
    return null;
  }

  return (
    <div className="mt-6 space-y-4">
      {/* Coin Selector */}
      <div>
        <p className="text-[#93939f] font-mono text-[10px] tracking-widest uppercase mb-2.5">Pay with Crypto</p>
        <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
          {COINS.map(coin => (
            <button
              key={coin.id}
              onClick={() => setSelectedCoin(coin)}
              className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-[10px] border transition-all ${
                selectedCoin?.id === coin.id
                  ? "border-[#ff0000] bg-[#ff0000]/10"
                  : "border-[#222226] bg-[#09090b]/40 hover:border-[#ff0000]/40 hover:bg-[#ff0000]/5"
              }`}
            >
              <span className={`text-xl leading-none ${coin.color}`}>{coin.icon}</span>
              <span className="text-[#93939f] font-mono text-[9px] uppercase tracking-widest">{coin.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Interface Modal */}
      {selectedCoin && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#111113] p-6 rounded-[20px] border border-[#222226] w-full max-w-md shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#222226] pb-4">
              <h4 className="font-medium text-white flex items-center gap-2 text-lg">
                <span className={selectedCoin.color}>{selectedCoin.icon}</span> {selectedCoin.name} Checkout
              </h4>
              <button 
                onClick={() => setSelectedCoin(null)}
                className="text-[#93939f] hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <div className="text-center py-2">
              <p className="text-sm text-[#93939f] mb-1">Send EXACTLY this amount:</p>
              <p className="text-3xl font-mono text-white">
                {getCryptoPrice(selectedCoin.id, totalUsd)} <span className="text-sm text-[#93939f]">{selectedCoin.id}</span>
              </p>
            </div>

            <div className="flex items-center justify-center py-2">
              {/* Generic Black QR Code */}
              <div className="w-48 h-48 bg-white p-3 rounded-[14px] flex items-center justify-center shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-full h-full">
                  <path d="M3 3h8v8H3zm2 2v4h4V5zm8-2h8v8h-8zm2 2v4h4V5zM3 13h8v8H3zm2 2v4h4v-4zm13-2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm-4-6h2v2h-2zm2 2h2v2h-2zm-2 2h2v2h-2zm2 2h2v2h-2zm-6 8h2v2H7zm4 0h2v2h-2z"/>
                </svg>
              </div>
            </div>

            <div>
              <p className="text-xs text-[#93939f] mb-1.5 font-medium">To Address:</p>
              <div className="flex items-center gap-2 bg-[#09090b] rounded-[10px] border border-[#222226] p-2.5">
                <code className="text-xs font-mono text-white/90 flex-1 break-all select-all">{selectedCoin.address}</code>
                <button 
                  onClick={handleCopy} 
                  className="text-[10px] font-medium text-[#93939f] hover:text-white flex-shrink-0 border border-[#222226] rounded-md px-3 py-1.5 transition-colors bg-[#111113]"
                >
                  {isCopied ? "COPIED" : "COPY"}
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs text-[#93939f] mb-1.5 font-medium">Transaction ID / Hash:</p>
              <input 
                type="text" 
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder="Paste Tx ID here after sending..."
                className="w-full bg-[#09090b] text-white text-sm rounded-[10px] border border-[#222226] p-3 focus:outline-none focus:border-[#ff0000]"
              />
            </div>

            <button
              onClick={handleConfirmPayment}
              disabled={isSimulating}
              className="w-full mt-2 bg-[#ff0000] text-white font-medium text-[14px] px-5 py-3.5 rounded-[10px] hover:bg-[#cc0000] disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
            >
              {isSimulating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying Payment...
                </>
              ) : (
                "Confirm Payment"
              )}
            </button>

            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
