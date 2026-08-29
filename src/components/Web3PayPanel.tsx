import React, { useState, useCallback } from "react";
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain, useBalance, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { mainnet, bsc } from "wagmi/chains";
import { parseEther, formatEther } from "viem";
import {
  ESCROW_ABI, ESCROW_ADDRESSES, CHAIN_LABELS, CUSTODY_WALLETS,
  uuidToBytes32, type PayChain, type EvmChain, type CustodyChain,
} from "../lib/wagmi";
import { supabase } from "../lib/supabase";

// ─── Small sub-components ──────────────────────────────────────────────────

function ChainBadge({ chain }: { chain: PayChain }) {
  const c = CHAIN_LABELS[chain];
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase px-1.5 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.07] ${c.color}`}>
      {c.icon} {c.label}
    </span>
  );
}

function TxStep({ done, active, label }: { done: boolean; active: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold border transition-all ${
        done   ? "bg-green-500 border-green-500 text-white" :
        active ? "border-accent bg-accent/10 text-accent animate-pulse" :
                 "border-border bg-white/[0.03] text-muted-foreground"
      }`}>
        {done ? "✓" : ""}
      </span>
      <span className={done ? "text-foreground/70" : active ? "text-foreground" : "text-muted-foreground"}>{label}</span>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

interface Props {
  orderId: string;          // Supabase UUID
  sellerWalletAddress: string | null; // seller's EVM wallet (from profiles)
  priceUsd: number;         // listing price in USD (used as ETH/BNB value for now)
  listingStatus: string;
  onSuccess: () => void;
}

export default function Web3PayPanel({ orderId, sellerWalletAddress, priceUsd, listingStatus, onSuccess }: Props) {
  const [selectedChain, setSelectedChain] = useState<PayChain | null>(null);
  const [custodyCopied, setCustodyCopied] = useState(false);
  const [custodyTxHash, setCustodyTxHash] = useState("");
  const [custodySubmitting, setCustodySubmitting] = useState(false);
  const [custodyDone, setCustodyDone] = useState(false);
  const [error, setError] = useState("");

  // wagmi hooks
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { data: balance } = useBalance({ address });

  const { writeContract, data: txHash, isPending: isTxPending } = useWriteContract();
  const { isLoading: isTxConfirming, isSuccess: isTxConfirmed } =
    useWaitForTransactionReceipt({ hash: txHash });

  const isSold = listingStatus === "sold";
  
  const getCryptoPrice = (chain: string, usdValue: number) => {
    const rates: Record<string, number> = { ETH: 3000, BNB: 600, SOL: 150, BTC: 65000, LTC: 80 };
    const val = usdValue / (rates[chain] || 1);
    if (chain === 'BTC') return val.toFixed(8);
    if (chain === 'ETH' || chain === 'BNB') return val.toFixed(6);
    return val.toFixed(4);
  };
  const currentCryptoPrice = selectedChain ? getCryptoPrice(selectedChain, priceUsd) : "0";

  const evmChains: EvmChain[] = ["ETH", "BNB"];
  const custodyChains: CustodyChain[] = ["SOL", "BTC", "LTC"];

  // ── EVM Pay ──────────────────────────────────────────────────────────────

  const handleEvmPay = useCallback(async () => {
    setError("");
    if (!selectedChain || !evmChains.includes(selectedChain as EvmChain)) return;

    const targetChainId = selectedChain === "ETH" ? mainnet.id : bsc.id;
    const contractAddress = ESCROW_ADDRESSES[targetChainId];

    if (!sellerWalletAddress) {
      setError("Seller has not set a wallet address yet.");
      return;
    }
    if (contractAddress === "0x0000000000000000000000000000000000000000") {
      setError("Contract not deployed yet — check back soon.");
      return;
    }

    // Switch chain if needed
    if (chainId !== targetChainId) {
      switchChain({ chainId: targetChainId });
      return;
    }

    const orderIdBytes32 = uuidToBytes32(orderId);

    try {
      writeContract({
        address: contractAddress,
        abi: ESCROW_ABI,
        functionName: "deposit",
        args: [orderIdBytes32, sellerWalletAddress as `0x${string}`],
        value: parseEther(currentCryptoPrice),
      });
    } catch (e: any) {
      setError(e.message ?? "Transaction failed");
    }
  }, [selectedChain, chainId, orderId, sellerWalletAddress, currentCryptoPrice, switchChain, writeContract]);

  // Track confirmed EVM tx → update Supabase
  React.useEffect(() => {
    if (isTxConfirmed && txHash) {
      supabase.from("orders").update({
        status: "Paid",
        tx_hash: txHash,
        pay_chain: selectedChain,
      }).eq("id", orderId).then(() => onSuccess());
    }
  }, [isTxConfirmed, txHash]);

  // ── Custody Pay (SOL / BTC / LTC) ──────────────────────────────────────

  const custodyAddress = selectedChain && custodyChains.includes(selectedChain as CustodyChain)
    ? CUSTODY_WALLETS[selectedChain as CustodyChain]
    : null;

  const handleCopy = () => {
    if (custodyAddress) {
      navigator.clipboard.writeText(custodyAddress);
      setCustodyCopied(true);
      setTimeout(() => setCustodyCopied(false), 2000);
    }
  };

  const handleCustodySubmit = async () => {
    if (!custodyTxHash.trim()) { setError("Paste your transaction hash above."); return; }
    setCustodySubmitting(true);
    setError("");
    await supabase.from("orders").update({
      status: "Paid",
      tx_hash: custodyTxHash.trim(),
      pay_chain: selectedChain,
    }).eq("id", orderId);
    setCustodySubmitting(false);
    setCustodyDone(true);
    onSuccess();
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="mt-6 space-y-4">

      {/* Chain selector */}
      <div>
        <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase mb-2.5">Pay with</p>
        <div className="grid grid-cols-5 gap-2">
          {(["ETH", "BNB", "SOL", "BTC", "LTC"] as PayChain[]).map(chain => {
            const c = CHAIN_LABELS[chain];
            const isEvm = evmChains.includes(chain as EvmChain);
            return (
              <button
                key={chain}
                disabled={isSold}
                onClick={() => { setSelectedChain(chain); setError(""); }}
                className={`relative flex flex-col items-center gap-1.5 py-2.5 rounded-[10px] border transition-all disabled:opacity-40 ${
                  selectedChain === chain
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card/50 hover:border-accent/40 hover:bg-accent/5"
                }`}
              >
                <span className={`text-xl leading-none ${c.color}`}>{c.icon}</span>
                <span className="text-muted-foreground font-mono text-[9px] uppercase tracking-widest">{chain}</span>
                {isEvm && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-background" title="Trustless smart contract" />
                )}
              </button>
            );
          })}
        </div>
        <p className="text-muted-foreground/60 text-[10px] mt-1.5 flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full inline-block" /> ETH + BNB use trustless smart contract escrow
        </p>
      </div>

      {/* EVM flow */}
      {selectedChain && evmChains.includes(selectedChain as EvmChain) && (
        <div className="float-shell p-4 space-y-3">
          <div className="flex items-center justify-between">
            <ChainBadge chain={selectedChain} />
            {isConnected && (
              <button onClick={() => disconnect()} className="text-[10px] text-muted-foreground hover:text-foreground font-mono">
                {address?.slice(0, 6)}…{address?.slice(-4)} ✕
              </button>
            )}
          </div>

          {!isConnected ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Connect your wallet to continue.</p>
              <div className="flex flex-wrap gap-2">
                {connectors.map(c => (
                  <button key={c.id} onClick={() => connect({ connector: c })} className="btn-outline-dim !text-xs !px-3 !py-2">
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {balance && (
                <p className="text-xs text-muted-foreground">
                  Balance: <span className="text-foreground font-mono">{parseFloat(formatEther(balance.value)).toFixed(4)} {balance.symbol}</span>
                </p>
              )}

              <div className="bg-background/60 rounded-[10px] border border-border p-3 space-y-2">
                <TxStep done={false} active label={`Deposit ${currentCryptoPrice} ${selectedChain} into escrow contract`} />
                <TxStep done={false} active={isTxPending} label="Wallet signature pending…" />
                <TxStep done={false} active={isTxConfirming} label="Waiting for on-chain confirmation…" />
                <TxStep done={isTxConfirmed} active={false} label="Funds locked ✓ — seller will deliver" />
              </div>

              {chainId !== (selectedChain === "ETH" ? mainnet.id : bsc.id) ? (
                <button onClick={() => switchChain({ chainId: selectedChain === "ETH" ? mainnet.id : bsc.id })} className="btn-accent w-full">
                  Switch to {CHAIN_LABELS[selectedChain].label}
                </button>
              ) : isTxConfirmed ? (
                <div className="text-center py-2 text-green-400 text-sm font-medium">✓ Payment confirmed on-chain!</div>
              ) : (
                <button
                  disabled={isTxPending || isTxConfirming || isSold}
                  onClick={handleEvmPay}
                  className="btn-accent w-full disabled:opacity-50"
                >
                  {isTxPending ? "Confirm in wallet…" : isTxConfirming ? "Confirming on-chain…" : `Pay ${currentCryptoPrice} ${selectedChain}`}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Custody flow (SOL / BTC / LTC) */}
      {selectedChain && custodyChains.includes(selectedChain as CustodyChain) && (
        <div className="float-shell p-4 space-y-3">
          <div className="flex items-center justify-between">
            <ChainBadge chain={selectedChain} />
            <span className="text-[10px] font-mono text-yellow-400/70 bg-yellow-400/10 border border-yellow-400/20 rounded px-1.5 py-0.5">Transparent custodial</span>
          </div>

          {custodyDone ? (
            <div className="text-center py-2 text-green-400 text-sm font-medium">✓ Tx submitted — order created!</div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">Send exactly <span className="text-foreground font-semibold">{currentCryptoPrice} {selectedChain}</span> (≈${priceUsd.toLocaleString()} USD) to this address:</p>

              <div className="flex items-center gap-2 bg-background/80 rounded-[10px] border border-border p-2.5">
                <code className="text-xs font-mono text-foreground/90 flex-1 break-all">{custodyAddress}</code>
                <button onClick={handleCopy} className="text-[10px] text-muted-foreground hover:text-foreground flex-shrink-0 border border-border rounded-md px-2 py-1 transition-colors">
                  {custodyCopied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1.5">Paste your transaction hash after sending:</p>
                <input
                  value={custodyTxHash}
                  onChange={e => setCustodyTxHash(e.target.value)}
                  placeholder="0x… or txid…"
                  className="w-full bg-background/60 border border-border rounded-[10px] px-3 py-2 text-xs font-mono text-foreground outline-none focus:border-accent/60"
                />
              </div>

              <button
                disabled={custodySubmitting || !custodyTxHash.trim()}
                onClick={handleCustodySubmit}
                className="btn-accent w-full disabled:opacity-50 !text-sm"
              >
                {custodySubmitting ? "Submitting…" : "I've sent the payment"}
              </button>
            </>
          )}
        </div>
      )}

      {error && (
        <p className="text-destructive text-xs text-center">{error}</p>
      )}
    </div>
  );
}
