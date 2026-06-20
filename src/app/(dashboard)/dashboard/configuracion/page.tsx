// /dashboard/configuracion — Server Component
// Tries to load initial customization from Supabase (authenticated user's store).
// If not authenticated or no store found, passes null so the Client Component
// falls back to localStorage (demo mode).

import { readCustomization, readProducts } from "./actions";
import { ConfiguracionClient } from "./configuracion-client";
import { DEFAULT_TEMPLATE_ID } from "@/shared/constants";
import type { StoreCustomization } from "@/types/templates/store-customization";

const FALLBACK_CUSTOMIZATION: StoreCustomization = { templateId: DEFAULT_TEMPLATE_ID };

export default async function ConfiguracionPage() {
  // Fetch customization and products in parallel — both return safe fallbacks when not authenticated.
  const [supabaseCustomization, products] = await Promise.all([
    readCustomization(),
    readProducts(),
  ]);

  return (
    <ConfiguracionClient
      initialCustomization={supabaseCustomization ?? FALLBACK_CUSTOMIZATION}
      // When supabaseCustomization is null the client knows to use localStorage fallback
      isAuthenticated={supabaseCustomization !== null}
      initialProducts={products}
    />
  );
}
