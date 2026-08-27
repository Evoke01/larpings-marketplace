import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const authorization = req.headers.get("Authorization") ?? "";
    const accessToken = authorization.replace(/^Bearer\s+/i, "").trim();
    if (!accessToken) return json({ error: "Unauthorized" }, 401);

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    if (authError || !user) return json({ error: "Unauthorized" }, 401);

    const { listing_id } = await req.json();
    if (!listing_id) return json({ error: "listing_id is required" }, 400);

    const { data: listing, error: listingError } = await supabaseAdmin
      .from("listings")
      .select("id, handle, description")
      .eq("id", listing_id)
      .single();

    if (listingError || !listing) return json({ error: "Listing not found" }, 404);
    if (listing.handle !== "sandbox-payment-test" || !listing.description?.startsWith("TEST ONLY")) {
      return json({ error: "Sandbox simulation is only available for the test listing" }, 403);
    }

    const { data: order, error: orderLookupError } = await supabaseAdmin
      .from("orders")
      .select("id, status, track_id")
      .eq("listing_id", listing_id)
      .eq("buyer_id", user.id)
      .in("status", ["pending", "Waiting"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (orderLookupError) return json({ error: "Could not find the pending sandbox order" }, 500);
    if (!order) return json({ error: "Start the sandbox checkout first, then simulate payment" }, 404);

    const { data: updatedOrder, error: updateError } = await supabaseAdmin
      .from("orders")
      .update({ status: "Paid", crypto_currency: "SANDBOX" })
      .eq("id", order.id)
      .eq("buyer_id", user.id)
      .select()
      .single();

    if (updateError) return json({ error: "Could not complete the sandbox payment" }, 500);
    return json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Sandbox payment simulation error:", error);
    return json({ error: "Sandbox payment simulation failed" }, 500);
  }
});
