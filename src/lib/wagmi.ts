import { http, createConfig } from "wagmi";
import { mainnet, bsc } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const WC_PROJECT_ID = "larpings-marketplace"; // replace with real WalletConnect project ID from cloud.walletconnect.com

export const ADMIN_ADDRESS = "0xE5aC3077E03e84eAf5079599b9637C8bDBb3F317" as const;

// Deployed contract addresses (fill in after deploying LarpingsEscrow.sol)
export const ESCROW_ADDRESSES: Record<number, `0x${string}`> = {
  1:  "0x0000000000000000000000000000000000000000", // Ethereum mainnet — fill after deploy
  56: "0x0000000000000000000000000000000000000000", // BSC mainnet     — fill after deploy
};

export const ALCHEMY_ETH_URL = `https://eth-mainnet.g.alchemy.com/v2/alch_a1vTRbqmiTW7VEMR9Q0vq`;
export const ALCHEMY_BSC_URL = `https://bnb-mainnet.g.alchemy.com/v2/alch_a1vTRbqmiTW7VEMR9Q0vq`;

export const wagmiConfig = createConfig({
  chains: [mainnet, bsc],
  connectors: [
    injected(),
    walletConnect({ projectId: WC_PROJECT_ID }),
  ],
  transports: {
    [mainnet.id]: http(ALCHEMY_ETH_URL),
    [bsc.id]:     http(ALCHEMY_BSC_URL),
  },
});

// Platform custody wallets for non-EVM chains (transparent custodial)
export const CUSTODY_WALLETS = {
  SOL: "REPLACE_WITH_YOUR_SOLANA_WALLET_ADDRESS",
  BTC: "REPLACE_WITH_YOUR_BITCOIN_WALLET_ADDRESS",
  LTC: "REPLACE_WITH_YOUR_LITECOIN_WALLET_ADDRESS",
} as const;

export type EvmChain = "ETH" | "BNB";
export type CustodyChain = "SOL" | "BTC" | "LTC";
export type PayChain = EvmChain | CustodyChain;

export const CHAIN_LABELS: Record<PayChain, { label: string; chainId?: number; icon: string; color: string }> = {
  ETH: { label: "Ethereum",  chainId: 1,  icon: "⟠",  color: "text-blue-400" },
  BNB: { label: "BNB Chain", chainId: 56, icon: "⬡",  color: "text-yellow-400" },
  SOL: { label: "Solana",    icon: "◎",  color: "text-purple-400" },
  BTC: { label: "Bitcoin",   icon: "₿",  color: "text-orange-400" },
  LTC: { label: "Litecoin",  icon: "Ł",  color: "text-slate-300" },
};

// ABI — only the functions we call from the frontend
export const ESCROW_ABI = [
  {
    name: "deposit",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "orderId", type: "bytes32" },
      { name: "seller",  type: "address" },
    ],
    outputs: [],
  },
  {
    name: "confirmDelivery",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "orderId", type: "bytes32" }],
    outputs: [],
  },
  {
    name: "getEscrow",
    type: "function",
    stateMutability: "view",
    inputs:  [{ name: "orderId", type: "bytes32" }],
    outputs: [
      { name: "buyer",  type: "address" },
      { name: "seller", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "status", type: "uint8"   },
    ],
  },
] as const;

/** Convert a Supabase UUID string to bytes32 for the contract */
export function uuidToBytes32(uuid: string): `0x${string}` {
  const hex = uuid.replace(/-/g, "");
  return `0x${hex.padEnd(64, "0")}` as `0x${string}`;
}
