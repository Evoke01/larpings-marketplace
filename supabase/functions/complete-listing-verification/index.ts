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

    const { listing_id, code } = await req.json();
    if (typeof code !== "string" || !code.trim()) return json({ error: "Verification code is required" }, 400);

    const { data: listing, error: listingError } = await admin.from("listings")
      .select("id, seller_id, verification_code_hash, verification_expires_at")
      .eq("id", listing_id).eq("seller_id", user.id).single();
    if (listingError || !listing) return json({ error: "Listing not found" }, 404);
    if (!listing.verification_code_hash || !listing.verification_expires_at || new Date(listing.verification_expires_at).getTime() < Date.now()) {
      return json({ error: "This verification code has expired. Start a new verification." }, 400);
    }

    const normalizedCode = code.trim().toUpperCase();
    if ((await sha256(normalizedCode)) !== listing.verification_code_hash) return json({ error: "That code does not match" }, 400);

    const { data: profile } = await admin.from("profiles").select("bio").eq("id", user.id).single();
    if (!profile?.bio?.toUpperCase().includes(normalizedCode)) {
      return json({ error: "Add the code to the username account bio, then try again" }, 400);
    }

    const { error: updateError } = await admin.from("listings").update({
      verification_status: "verified",
      verified_at: new Date().toISOString(),
      verification_code_hash: null,
      verification_expires_at: null,
    }).eq("id", listing_id).eq("seller_id", user.id);
    if (updateError) return json({ error: "Could not complete verification" }, 500);
    return json({ verified: true });
  } catch (error) {
    console.error("Complete verification error:", error);
    return json({ error: "Could not complete verification" }, 500);
  }
});
