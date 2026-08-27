import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xnacxehraxwqfwqaiemf.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_9iyNNBTXCuAF7Srk3QdipA_W-HNsob5';

export const supabase = createClient(supabaseUrl, supabaseKey);
