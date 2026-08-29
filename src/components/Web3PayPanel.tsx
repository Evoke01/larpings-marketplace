import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect, useWriteContract, useWaitForTransactionReceipt, useBalance } from "wagmi";
import { parseEther } from "viem";
import { ESCROW_ABI, ESCROW_ADDRESSES, uuidToBytes32 } from "../lib/wagmi";
import { LockIcon } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

interface Web3PayPanelProps {
  listingId: string;
  finalUsdPrice: number;
  cryptoPrice: number;
  coinId: string;
  sellerId: string;
  onSuccess?: (txHash: string) => void;
}

export default function Web3PayPanel({ listingId, finalUsdPrice, cryptoPrice, coinId, sellerId, onSuccess }: Web3PayPanelProps) {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  
  const [error, setError] = useState<string | null>(null);
  
  const { writeContract, data: hash, isPending: isConfirming } = useWriteContract();
  const { isLoading: isWaiting } = useWaitForTransactionReceipt({ hash });
  const { data: balance } = useBalance({ address });

  const exactCryptoAmount = (finalUsdPrice / cryptoPrice).toFixed(5);
  const requiredChainId = coinId === "BNB" ? 97 : 1;
  const isWrongNetwork = isConnected && chainId !== requiredChainId;
  const hasEnoughFunds = balance && balance.value >= parseEther(exactCryptoAmount);

  const handleDeposit = async () => {
    setError(null);
    try {
      // 1. Fetch seller's EVM wallet address from seller_wallets
      const { data: walletData, error: walletError } = await supabase
        .from('seller_wallets')
        .select('evm_address')
        .eq('seller_id', sellerId)
        .single();
        
      if (walletError || !walletData?.evm_address) {
        throw new Error("Seller has not configured an EVM payout address.");
      }

      // 2. Create pending order
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) throw new Error("Not authenticated");
      
      const { data: newOrder, error: orderError } = await supabase
        .from('orders')
        .insert({
          listing_id: listingId,
          buyer_id: authData.user.id,
          status: 'pending',
          pay_chain: coinId
        })
        .select()
        .single();
        
      if (orderError) throw orderError;
      
      // 3. Call smart contract deposit
      writeContract({
        address: ESCROW_ADDRESSES[requiredChainId],
        abi: ESCROW_ABI,
        functionName: "deposit",
        args: [uuidToBytes32(newOrder.id), walletData.evm_address as `0x${string}`],
        value: parseEther(exactCryptoAmount)
      }, {
        onSuccess: (txHash) => {
          // Update order to confirmed and listing to sold
          Promise.all([
            supabase.from('orders').update({ status: 'confirmed', tx_hash: txHash }).eq('id', newOrder.id),
            supabase.from('listings').update({ status: 'sold' }).eq('id', listingId),
            supabase.from('order_messages').insert({
              order_id: newOrder.id,
              sender_id: authData.user.id,
              content: "✅ Web3 Payment confirmed! Escrow funded.\n\nThe buyer has successfully deposited the funds into the smart contract."
            })
          ]).then(() => {
            navigate(`/messages?order=${newOrder.id}`);
          });
        },
        onError: async (err) => {
          await supabase.from('orders').delete().eq('id', newOrder.id);
          setError(err.message || "Transaction failed");
        }
      });
      
    } catch (err: any) {
      setError(err.message || "Failed to initialize payment");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 h-full">
      <div className="text-center mb-8">
        <p className="text-[#93939f] mb-1">Total to pay on Smart Contract:</p>
        <div className="text-4xl font-mono text-white flex justify-center items-baseline gap-2">
          {exactCryptoAmount} <span className="text-lg text-[#93939f]">{coinId}</span>
        </div>
      </div>
      
      {error && (
        <div className="w-full bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm mb-6 break-words">
          {error}
        </div>
      )}

      {!isConnected ? (
        <div className="w-full space-y-3">
          <p className="text-sm text-[#93939f] text-center mb-4">Connect your Web3 wallet to continue</p>
          {connectors.filter(c => c.id !== 'walletConnect').map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              className="w-full bg-[#1c1c1f] hover:bg-[#2c2c30] text-white py-4 rounded-xl border border-[#222226] font-medium transition-colors"
            >
              Connect with {connector.name}
            </button>
          ))}
        </div>
      ) : isWrongNetwork ? (
        <div className="text-center w-full">
          <p className="text-red-400 mb-4">Wrong Network. Please switch to {coinId === "BNB" ? "BNB Smart Chain Testnet" : "Ethereum"}.</p>
          <button 
            onClick={() => disconnect()}
            className="text-sm text-[#93939f] hover:text-white"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <div className="w-full space-y-4">
          <div className="bg-[#1c1c1f] p-4 rounded-xl border border-[#222226] flex justify-between items-center text-sm">
            <span className="text-[#93939f]">Connected Wallet</span>
            <span className="font-mono text-white truncate max-w-[150px]">{address}</span>
          </div>
          
          <button
            onClick={handleDeposit}
            disabled={isConfirming || isWaiting || !hasEnoughFunds}
            className="w-full bg-[#ff0000] text-white font-medium text-[15px] px-5 py-4 rounded-xl hover:bg-[#cc0000] disabled:opacity-50 transition-colors flex justify-center items-center gap-2"
          >
            {isConfirming || isWaiting ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Confirming...</>
            ) : !hasEnoughFunds ? (
              "Insufficient Balance"
            ) : (
              "Pay with Smart Contract"
            )}
          </button>
          
          <div className="text-center">
            <button 
              onClick={() => disconnect()}
              className="text-xs text-[#93939f] hover:text-white"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
      
      <p className="text-[#93939f] text-[11px] flex justify-center items-center gap-1.5 mt-6">
        <LockIcon className="w-3 h-3" /> Funds are securely locked in Larpings Escrow until delivery
      </p>
    </div>
  );
}
