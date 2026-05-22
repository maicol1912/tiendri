import { createBrowserClient } from "@supabase/ssr";

// TODO: Add proper type for Database generic
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
