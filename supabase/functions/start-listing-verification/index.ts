import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: Record<string, unknown>, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json" },
});

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const admin = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");
  try {
    const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
    const { data: { user } } = await admin.auth.getUser(token);
    if (!user) return json({ error: "Unauthorized" }, 401);

    const { listing_id } = await req.json();
    const { data: listing, error } = await admin.from("listings").select("id, seller_id, verification_status").eq("id", listing_id).single();
    if (error || !listing) return json({ error: "Listing not found" }, 404);
    if (listing.seller_id !== user.id) return json({ error: "You can only verify your own listing" }, 403);

    const code = `LARPINGS-${crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    const { error: updateError } = await admin.from("listings").update({
      verification_status: "pending",
      verification_code_hash: await sha256(code),
      verification_expires_at: expiresAt,
    }).eq("id", listing_id).eq("seller_id", user.id);
    if (updateError) return json({ error: "Could not start verification" }, 500);
    return json({ code, expires_at: expiresAt });
  } catch (error) {
    console.error("Start verification error:", error);
    return json({ error: "Could not start verification" }, 500);
  }
});
