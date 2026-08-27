import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { listing_id } = await req.json();
    if (!listing_id) {
      return new Response(JSON.stringify({ error: "listing_id is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Get the listing price
    const { data: listing, error: listingError } = await supabaseClient
      .from("listings")
      .select("price")
      .eq("id", listing_id)
      .single();

    if (listingError || !listing) {
      return new Response(JSON.stringify({ error: "Listing not found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Call RunePay API to create a sandbox invoice. The key must be stored as a
    // Supabase Function secret, never shipped to the browser or committed.
    const runepayKey = Deno.env.get("RUNEPAY_API_KEY");
    if (!runepayKey) {
      return new Response(JSON.stringify({ error: "Payment provider is not configured" }), { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const amount = Number(listing.price);
    if (!Number.isFinite(amount) || amount <= 0) {
      return new Response(JSON.stringify({ error: "Listing has an invalid price" }), { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const orderRef = `ORDER_${crypto.randomUUID()}`;

    // IMPORTANT: Note on callback_url below:
    // In local dev, localhost won't receive webhooks. When deployed to Supabase, 
    // Deno.env.get("SUPABASE_URL") will evaluate to the real project URL.
    const response = await fetch("https://rpay.gg/api/v1/payment/invoice", {
      method: "POST",
      headers: {
        "merchant_api_key": runepayKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "USD",
        order_id: orderRef,
        description: `Payment for listing ${listing_id}`,
        sandbox: true,
        return_url: `${req.headers.get("origin") ?? "http://localhost:5173"}/orders`,
        callback_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/runepay-webhook`,
      }),
    });

    const runepayData = await response.json();

    if (!response.ok || runepayData.error || !runepayData.data?.track_id || !runepayData.data?.payment_url) {
       console.error("RunePay error:", runepayData);
       const providerMessage = runepayData.error?.message || runepayData.message || `Payment provider returned HTTP ${response.status}`;
       return new Response(JSON.stringify({ error: providerMessage }), { status: response.ok ? 502 : response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Use a service role client to insert the order since normal user might not have insert RLS depending on setup, 
    // but the user is the buyer so they should have permission. We'll use the user's client.
    const { data: order, error: orderError } = await supabaseClient
      .from("orders")
      .insert({
        listing_id,
        buyer_id: user.id,
        status: "Waiting",
        track_id: runepayData.data.track_id,
        payment_url: runepayData.data.payment_url,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order insert error:", orderError);
      return new Response(JSON.stringify({ error: "Failed to create order in db" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ payment_url: runepayData.data.payment_url, order }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Internal Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
