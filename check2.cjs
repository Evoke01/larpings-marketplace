const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://xnacxehraxwqfwqaiemf.supabase.co', 'sb_publishable_9iyNNBTXCuAF7Srk3QdipA_W-HNsob5');

async function test() {
  const { data, error } = await supabase
    .from('listings')
    .select('*, profiles!listings_seller_id_fkey(username)')
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  console.log("Error:", error);
  console.log("Data length:", data ? data.length : 0);
  console.log("Data sample:", data ? data : null);
}

test();
