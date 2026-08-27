import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

// Helper to calculate HMAC-SHA512 using Web Crypto API
async function hmacSha512(secretHex: string, data: ArrayBuffer) {
  const keyBytes = new Uint8Array(secretHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  
  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"]
  );
  
  const signature = await crypto.subtle.sign("HMAC", key, data);
  return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const rawBody = await req.arrayBuffer();
    
    const runepayKey = Deno.env.get("RUNEPAY_API_KEY");
    if (!runepayKey) {
      console.error("RUNEPAY_API_KEY is not configured");
      return new Response("Payment provider is not configured", { status: 503 });
    }
    
    // The secret is the SHA-256 hex digest of the API key (as per Rune Pay docs)
    const secretBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(runepayKey)
    );
    const secretHex = Array.from(new Uint8Array(secretBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Calculate expected HMAC-SHA512 signature
    const expectedSignature = await hmacSha512(secretHex, rawBody);
    const receivedSignature = req.headers.get("HMAC") ?? "";
    
    // Validate signature
    if (expectedSignature !== receivedSignature) {
       console.error("Signature mismatch. Expected:", expectedSignature, "Received:", receivedSignature);
       // We reject unauthorized requests
       return new Response("Unauthorized", { status: 401 });
    }

    const payloadText = new TextDecoder().decode(rawBody);
    const event = JSON.parse(payloadText);

    // Use service role key to bypass RLS since this is a webhook
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const trackId = event.track_id;
    const status = event.status; // Waiting, Underpaid, Confirming, Paid, Expired, Cancelled, Failed
    const cryptoAmount = event.received_amount || event.pay_amount;
    const cryptoCurrency = event.pay_currency;

    if (!trackId) {
      return new Response("Missing track_id", { status: 400 });
    }

    // Update the order in the database
    const { error } = await supabaseAdmin
      .from("orders")
      .update({
        status: status,
        crypto_amount: cryptoAmount,
        crypto_currency: cryptoCurrency,
      })
      .eq("track_id", trackId);

    if (error) {
      console.error("Database update error:", error);
      return new Response("Database error", { status: 500 });
    }

    // Acknowledge the webhook
    return new Response("OK", { status: 200 });

  } catch (error: any) {
    console.error("Webhook Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
