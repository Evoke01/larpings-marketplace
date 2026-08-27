import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );
    const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
    if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const { data: existing } = await supabaseAdmin
      .from("seller_verification_payments")
      .select("payment_url, status")
      .eq("seller_id", user.id)
      .in("status", ["Waiting", "Underpaid", "Confirming"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (existing?.payment_url) return new Response(JSON.stringify({ payment_url: existing.payment_url, status: existing.status }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const runepayKey = Deno.env.get("RUNEPAY_API_KEY");
    if (!runepayKey) return new Response(JSON.stringify({ error: "Payment provider is not configured" }), { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const orderRef = `VERIFY_${crypto.randomUUID()}`;
    const origin = req.headers.get("origin") ?? "http://localhost:5173";
    const response = await fetch("https://rpay.gg/api/v1/payment/invoice", {
      method: "POST",
      headers: { merchant_api_key: runepayKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 49,
        currency: "USD",
        order_id: orderRef,
        description: "Larpings Verified seller review",
        sandbox: true,
        return_url: `${origin}/account`,
        callback_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/runepay-webhook`,
      }),
    });
    const data = await response.json();
    if (!response.ok || data.error || !data.data?.track_id || !data.data?.payment_url) {
      console.error("RunePay verification error:", data);
      return new Response(JSON.stringify({ error: data.error?.message || data.message || `Payment provider returned HTTP ${response.status}` }), { status: response.ok ? 502 : response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { error: insertError } = await supabaseAdmin.from("seller_verification_payments").insert({
      seller_id: user.id,
      amount: 49,
      currency: "USD",
      status: "Waiting",
      track_id: data.data.track_id,
      payment_url: data.data.payment_url,
    });
    if (insertError) {
      console.error("Verification payment insert error:", insertError);
      return new Response(JSON.stringify({ error: "Failed to save verification payment" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ payment_url: data.data.payment_url }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error: any) {
    console.error("Verification invoice error:", error);
    return new Response(JSON.stringify({ error: error.message || "Unable to initialize verification payment" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
