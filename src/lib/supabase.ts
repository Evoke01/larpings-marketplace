import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xnacxehraxwqfwqaiemf.supabase.co';
const supabaseKey = 'sb_publishable_9iyNNBTXCuAF7Srk3QdipA_W-HNsob5';

export const supabase = createClient(supabaseUrl, supabaseKey);
