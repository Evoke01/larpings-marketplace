import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ESCROW_ABI, ESCROW_ADDRESSES, uuidToBytes32 } from "../lib/wagmi";

const ClipboardIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" />
  </svg>
);

const STATUS_COLORS: Record<string, string> = {
  pending: "text-[#b7b7c2] bg-[#1b1b20] border-[#333338]",
  Waiting: "text-[#b7b7c2] bg-[#1b1b20] border-[#333338]",
  Confirming: "text-red-300 bg-red-500/10 border-red-500/30",
  Paid: "text-red-300 bg-red-500/10 border-red-500/30",
  Underpaid: "text-[#ff0000] bg-[rgba(255,0,0,0.1)] border-[rgba(255,0,0,0.3)]",
  Failed: "text-[#ff0000] bg-[rgba(255,0,0,0.1)] border-[rgba(255,0,0,0.3)]",
  Expired: "text-[#93939f] bg-[rgba(147,147,159,0.1)] border-[rgba(147,147,159,0.3)]",
  delivered: "text-[#b7b7c2] bg-[#1b1b20] border-[#333338]",
  confirmed: "text-[#f9f9fb] bg-red-500/10 border-red-500/30",
  cancelled: "text-[#ff0000] bg-[rgba(255,0,0,0.1)] border-[rgba(255,0,0,0.3)]",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const { writeContract } = useWriteContract();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      setSession(s);
      if (s) {
        const { data } = await supabase
          .from('orders')
          .select('*, listings(handle, price, platform, category, details)')
          .eq('buyer_id', s.user.id)
          .order('created_at', { ascending: false });
        setOrders(data ?? []);
      }
      setLoading(false);
    });
  }, []);

  async function confirmDelivery(order: any) {
    // For EVM orders with an on-chain escrow, call the smart contract
    if ((order.pay_chain === "ETH" || order.pay_chain === "BNB") && order.chain_id) {
      const contractAddress = ESCROW_ADDRESSES[order.chain_id];
      if (contractAddress && contractAddress !== "0x0000000000000000000000000000000000000000") {
        writeContract({
          address: contractAddress,
          abi: ESCROW_ABI,
          functionName: "confirmDelivery",
          args: [uuidToBytes32(order.id)],
        });
        return;
      }
    }
    // Fallback: legacy RPC (non-EVM or pre-contract orders)
    const { error } = await supabase.rpc('confirm_order_delivery', { p_order_id: order.id });
    if (!error) setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'confirmed' } : o));
  }

  if (loading) {
    return (
      <div className="bg-zinc-950 text-[#f9f9fb] min-h-screen font-[Poppins,ui-sans-serif,system-ui,sans-serif] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#ff0000] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 text-[#f9f9fb] min-h-screen font-[Poppins,ui-sans-serif,system-ui,sans-serif]">
      <div className="w-full max-w-[672px] mx-auto pt-8 px-4">
        <div className="mb-8">
          <span className="text-[#93939f] font-mono font-medium text-[11px] tracking-[1.76px] uppercase">
            Purchases &amp; sales
          </span>
          <h1 className="leading-10 font-medium text-[36px] tracking-[-1.08px] mt-3">
            Your <span className="text-[#ff0000]">orders.</span>
          </h1>
          <p className="text-[#93939f] leading-5 text-sm mt-2">
            Track every transfer — confirm delivery to release payment to the seller.
          </p>
        </div>

        {!session ? (
          <div className="bg-[#111113] p-6 rounded-[14px] border border-[#222226]">
            <div className="bg-[rgba(255,0,0,0.1)] w-14 h-14 flex justify-center items-center mx-auto rounded-[12px] text-[#ff0000]">
              <ClipboardIcon />
            </div>
            <div className="text-center mt-4">
              <h2 className="leading-7 font-medium text-lg tracking-[-0.54px]">Track your orders</h2>
              <p className="text-[#93939f] leading-5 text-sm mt-1">Sign in to view purchases, sales, and manage delivery.</p>
            </div>
            <Link to="/signin?returnTo=/orders" className="bg-[#ff0000] text-white leading-none font-medium text-sm w-full inline-flex justify-center items-center gap-2 shadow-[rgba(255,255,255,0.18)_0px_1px_0px_0px_inset,rgba(255,0,0,0.55)_0px_8px_24px_-12px] mt-5 px-[22px] py-3 rounded-[10px] hover:bg-[#cc0000] hover:-translate-y-px active:translate-y-0 transition-all">
              Sign in
            </Link>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-[#111113] p-8 rounded-[14px] border border-[#222226] text-center">
            <div className="bg-[rgba(255,0,0,0.1)] w-14 h-14 flex justify-center items-center mx-auto rounded-[12px] text-[#ff0000]">
              <ClipboardIcon />
            </div>
            <h2 className="mt-4 font-medium text-lg">No orders yet</h2>
            <p className="text-[#93939f] text-sm mt-1">Browse the marketplace to find something you want.</p>
            <Link to="/marketplace" className="mt-5 inline-flex items-center gap-2 bg-[#ff0000] text-white font-medium text-sm px-6 py-3 rounded-[10px] hover:bg-[#cc0000] transition-colors">
              Browse Marketplace
            </Link>
          </div>
        ) : (
          <div className="space-y-3 pb-8">
            {orders.map(order => (
              <div key={order.id} className="bg-[#111113] p-5 rounded-[14px] border border-[#222226]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-lg">{order.listings?.category === "username" || order.listings?.category === "account" ? "@" : ""}{order.listings?.category === "fansign" ? order.listings?.details?.recipient || order.listings?.handle : order.listings?.category === "service" ? order.listings?.details?.service_name || order.listings?.handle : order.listings?.handle}</p>
                    <p className="text-[#93939f] text-sm capitalize">{order.listings?.platform} · {order.listings?.category}</p>
                    {order.listings?.category === "fansign" && <p className="mt-1 text-xs text-[#b7b7c2]">Fansign · {order.listings?.details?.delivery_format || "custom delivery"}</p>}
                    {order.listings?.category === "service" && <p className="mt-1 text-xs text-[#b7b7c2]">{order.listings?.details?.service_group || "Service"} · {order.listings?.details?.service_option || "custom scope"}</p>}
                  </div>
                  <span className={`font-mono font-medium text-[11px] tracking-widest uppercase px-2.5 py-1.5 rounded-[8px] border ${STATUS_COLORS[order.status] ?? 'text-[#93939f] bg-[#111113] border-[#222226]'}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-mono font-semibold">${Number(order.listings?.price).toLocaleString()}</span>
                  {(order.status === 'Paid' || order.status === 'Delivered' || order.status === 'delivered') && (
                    <button
                      onClick={() => confirmDelivery(order)}
                      className="bg-[#ff0000] text-white text-sm font-medium px-4 py-2 rounded-[8px] hover:bg-[#cc0000] transition-colors"
                    >
                      Confirm Delivery
                    </button>
                  )}
                </div>
                <p className="text-[#93939f] font-mono text-[10px] mt-3">{new Date(order.created_at).toLocaleString()}
                  {order.pay_chain && <span className="ml-2 opacity-60">· paid via {order.pay_chain}</span>}
                  {order.tx_hash && <span className="ml-1 opacity-50">· <a href={`https://etherscan.io/tx/${order.tx_hash}`} target="_blank" rel="noreferrer" className="underline">tx</a></span>}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
