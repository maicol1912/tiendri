// /dashboard/configuracion — Server Component
// Tries to load initial customization from Supabase (authenticated user's store).
// If not authenticated or no store found, passes null so the Client Component
// falls back to localStorage (demo mode).

import { readCustomization } from "./actions";
import { ConfiguracionClient } from "./configuracion-client";
import type { StoreCustomization } from "@/types/templates/store-customization";

const FALLBACK_CUSTOMIZATION: StoreCustomization = { templateId: "tech-premium" };

export default async function ConfiguracionPage() {
  // Attempt Supabase read — returns null when not authenticated
  const supabaseCustomization = await readCustomization();

  return (
    <ConfiguracionClient
      initialCustomization={supabaseCustomization ?? FALLBACK_CUSTOMIZATION}
      // When supabaseCustomization is null the client knows to use localStorage fallback
      isAuthenticated={supabaseCustomization !== null}
    />
  );
}
