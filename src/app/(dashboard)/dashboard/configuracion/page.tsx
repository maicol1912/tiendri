// /dashboard/configuracion — Server Component
// Fetches the authenticated merchant's store and passes data to the client component.
// Auth: getUser() — never getSession()

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ConfiguracionClient } from "./configuracion-client";
import type { StoreCustomization } from "@/types/templates/store-customization";

// Lightweight interface for what this page needs from the store row
interface StoreForConfig {
  id: string;
  slug: string;
  name: string;
  customization: unknown;
}

export default async function ConfiguracionPage() {
  const supabase = await createClient();

  // Auth check — getUser() validates the JWT server-side (no spoofing risk)
  const { data: authData, error: userError } = await supabase.auth.getUser();
  if (userError || !authData.user) {
    redirect("/auth/login");
  }

  // Fetch the merchant's store
  const { data: rawStore } = await supabase
    .from("stores")
    .select("id, slug, name, customization")
    .eq("owner_id", authData.user.id)
    .single();

  // Supabase types partial selects as `never` in strict mode — cast via unknown
  const store = rawStore as unknown as StoreForConfig | null;

  // If no store yet (edge case — onboarding not complete) redirect to dashboard
  if (!store) {
    redirect("/dashboard");
  }

  // Cast the JSONB to typed StoreCustomization — safe because we control the shape
  const customization = (store.customization ?? {}) as StoreCustomization;

  return (
    <ConfiguracionClient
      storeId={store.id}
      storeSlug={store.slug}
      storeName={store.name}
      initialCustomization={customization}
    />
  );
}
