import { createWalletClient, http, publicActions } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { bscTestnet } from 'viem/chains';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    console.error("Please provide your PRIVATE_KEY environment variable.");
    process.exit(1);
  }
  
  // Format private key correctly if it doesn't have 0x
  const formattedKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
  const account = privateKeyToAccount(formattedKey);

  const client = createWalletClient({
    account,
    chain: bscTestnet,
    transport: http()
  }).extend(publicActions);

  console.log("Deploying contracts with the account:", account.address);
  const balance = await client.getBalance({ address: account.address });
  console.log("Account balance (wei):", balance.toString());

  // Load compiled artifact
  const artifactPath = path.join(__dirname, '..', 'artifacts', 'contracts', 'LarpingsEscrow.sol', 'LarpingsEscrow.json');
  if (!fs.existsSync(artifactPath)) {
    console.error("Compiled contract not found.");
    process.exit(1);
  }
  
  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

  console.log("Deploying contract...");
  const hash = await client.deployContract({
    abi: artifact.abi,
    bytecode: artifact.bytecode,
    args: [account.address], // admin
  });

  console.log("Transaction Hash:", hash);
  console.log("Waiting for confirmation...");
  
  const receipt = await client.waitForTransactionReceipt({ hash });
  console.log("LarpingsEscrow deployed to:", receipt.contractAddress);
}

main().catch(console.error);
