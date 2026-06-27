// /dashboard/configuracion — Server Component
// Tries to load initial customization from Supabase (authenticated user's store).
// If not authenticated or no store found, passes null so the Client Component
// falls back to localStorage (demo mode).

import { readCustomization, readProducts } from "./actions";
import { ConfiguracionClient } from "./configuracion-client";
import { DEFAULT_TEMPLATE_ID } from "@/shared/constants";
import { getStoreContext } from "@/shared/action-helpers";
import { getTemplateConfig } from "@/templates/registry";
import type { StoreCustomization } from "@/types/templates/store-customization";

const FALLBACK_CUSTOMIZATION: StoreCustomization = { templateId: DEFAULT_TEMPLATE_ID };

export default async function ConfiguracionPage() {
  // Fetch customization, products, and store context in parallel — all return safe fallbacks when not authenticated.
  const [supabaseCustomization, products, storeContext] = await Promise.all([
    readCustomization(),
    readProducts(),
    getStoreContext(),
  ]);

  const slug = storeContext.success ? storeContext.slug : null;

  // Fetch manifest after customization resolves — needs templateId from the store's customization.
  const templateId =
    (supabaseCustomization ?? FALLBACK_CUSTOMIZATION).templateId ?? DEFAULT_TEMPLATE_ID;
  const manifest = await getTemplateConfig(templateId);

  return (
    <ConfiguracionClient
      supabaseCustomization={supabaseCustomization ?? FALLBACK_CUSTOMIZATION}
      // When supabaseCustomization is null the client knows to use localStorage fallback
      isAuthenticated={supabaseCustomization !== null}
      initialProducts={products}
      slug={slug}
      manifest={manifest}
    />
  );
}
