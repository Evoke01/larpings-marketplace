import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ADMIN_SECRET = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;

// Alchemy webhook signature verification token (set in Alchemy dashboard)
const ALCHEMY_SIGNING_KEY = Deno.env.get("ALCHEMY_SIGNING_KEY") ?? "";

const supabase = createClient(SUPABASE_URL, ADMIN_SECRET);

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const body = await req.text();

  // Optional: verify Alchemy signature
  if (ALCHEMY_SIGNING_KEY) {
    const sig = req.headers.get("x-alchemy-signature");
    if (!sig) return new Response("Missing signature", { status: 401 });
    // Simple HMAC check (Alchemy uses HMAC-SHA256)
    const key = await crypto.subtle.importKey(
      "raw", new TextEncoder().encode(ALCHEMY_SIGNING_KEY),
      { name: "HMAC", hash: "SHA-256" }, false, ["verify"]
    );
    const bodyBytes = new TextEncoder().encode(body);
    const sigBytes  = hexToBytes(sig);
    const valid = await crypto.subtle.verify("HMAC", key, sigBytes, bodyBytes);
    if (!valid) return new Response("Invalid signature", { status: 401 });
  }

  let payload: any;
  try { payload = JSON.parse(body); }
  catch { return new Response("Bad JSON", { status: 400 }); }

  const events: any[] = payload?.event?.data?.block?.logs ?? payload?.webhookId ? [payload] : [];

  for (const ev of events) {
    const { topics = [], transactionHash, data } = ev;

    // Topic[0] is the event signature hash
    const sig = topics[0];

    // Deposited(bytes32 orderId, address buyer, address seller, uint256 amount)
    if (sig === "0x3af6bb9fd37b34e63e58a8a7bd57e41e0e5f0a1c") {
      const orderId = topic32ToUUID(topics[1]);
      await supabase.from("orders").update({
        status:   "Paid",
        tx_hash:  transactionHash,
      }).eq("id", orderId);
    }

    // Released(bytes32 orderId, uint256 sellerAmount, uint256 feeAmount)
    if (sig === "0x5e3d26f29b4fd44a8a9a3c02b3e9e6d22f3ac0b") {
      const orderId = topic32ToUUID(topics[1]);
      await supabase.from("orders").update({
        status:  "confirmed",
        tx_hash: transactionHash,
      }).eq("id", orderId);
    }

    // Refunded(bytes32 orderId, uint256 amount)
    if (sig === "0x2f8788117e7eff1d82e926ec794901d17c78024") {
      const orderId = topic32ToUUID(topics[1]);
      await supabase.from("orders").update({
        status:  "cancelled",
        tx_hash: transactionHash,
      }).eq("id", orderId);
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});

// ── Helpers ──────────────────────────────────────────────────────────────────

function topic32ToUUID(hex: string): string {
  // Strip 0x prefix and leading zeros, take first 32 hex chars (16 bytes = UUID without dashes)
  const clean = hex.replace(/^0x0*/, "").slice(0, 32).padEnd(32, "0");
  return [
    clean.slice(0, 8),
    clean.slice(8, 12),
    clean.slice(12, 16),
    clean.slice(16, 20),
    clean.slice(20, 32),
  ].join("-");
}

function hexToBytes(hex: string): Uint8Array {
  const h = hex.startsWith("0x") ? hex.slice(2) : hex;
  const arr = new Uint8Array(h.length / 2);
  for (let i = 0; i < arr.length; i++) arr[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  return arr;
}
