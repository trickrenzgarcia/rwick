import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client (only for server actions)
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use service role key for server-side

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Client-side Supabase client for public read operations only
export const createClientSideSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
};
