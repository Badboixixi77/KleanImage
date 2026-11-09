/**
 * Server-side Supabase client.
 * Uses the service role key — NEVER expose to the client bundle.
 * Only import this in Server Components, Route Handlers, and Server Actions.
 */
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createServerClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
