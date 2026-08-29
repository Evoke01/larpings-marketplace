# Pick Up Here Tomorrow! 🚀

You left off right at the finish line of deploying the `LarpingsEscrow` Smart Contract. 

Here is exactly what you need to do when you get back:

### 1. Fund your Wallet for Gas
You noticed that clicking "Deploy" on Remix did nothing. That's because the wallet you connected (`0xB51...EB178`) had exactly `0.000` crypto in it. 
- You need to send about $5 worth of BNB (if deploying to Binance Smart Chain) or ETH (if deploying to Base/Ethereum) to your wallet to pay the one-time network deployment fee.

### 2. Deploy the Contract on Remix
1. Open [Remix IDE](https://remix.ethereum.org/).
2. In the "Deploy & Run Transactions" tab, click the **Environment** dropdown.
3. Select **WalletConnect** and scan the QR code with your phone's wallet app (make sure your phone is set to the correct network, like BNB Chain or Base).
4. Right above the blue Deploy button, paste your Admin Address into the `_admin` box:
   `0xE5aC3077E03e84eAf5079599b9637C8bDBb3F317`
5. Click **Deploy** and confirm the transaction on your phone.

### 3. Update the Code
1. Once deployed, Remix will show the contract address at the bottom left under "Deployed Contracts". Copy it!
2. Open `src/lib/wagmi.ts` in your codebase.
3. Paste that copied address into the `ESCROW_ADDRESSES` block (around line 11).

### 4. Setup Alchemy Webhook (Final Step!)
1. Go to your [Alchemy Dashboard](https://dashboard.alchemy.com/webhooks).
2. Create a new **Custom Webhook** for the network you deployed on.
3. Set the target URL to: `https://YOUR-SUPABASE-URL/functions/v1/web3-webhook`
4. Tell it to track your new Smart Contract address.
5. Copy the **Alchemy Signing Key** it gives you, and add it to your Supabase Edge Function environment variables as `ALCHEMY_SIGNING_KEY`.

Have a good night! Say "hello" tomorrow and we will finish this up in 5 minutes!
