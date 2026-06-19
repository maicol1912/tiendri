"use client";

// Storefront Config Provider — Phase 5.2
// React context that distributes the server-resolved TemplateConfig to all
// client-side children inside the /[slug] route tree.
//
// Why this exists:
//   The layout.tsx (Server Component) fetches the store from Supabase, calls
//   resolveTemplateConfig, and passes the result here. Client-side shells
//   (HomeShell, SearchShell, etc.) read the config via useStorefrontConfig()
//   instead of re-fetching or importing from a static file.
//
// Note on StoreInfo:
//   The resolved config contains branding fields (storeName, whatsapp, logo,
//   socialLinks, description). This provider also accepts a StoreInfo object
//   derived from those fields so template components that receive a `store` prop
//   don't need to know how to extract it from the config.

import { createContext, useContext, type ReactNode } from "react";
import type { ResolvedStoreConfig } from "@/types/templates";
import type { StoreInfo } from "@/types/domain/store";

// ── Context types ─────────────────────────────────────────────────────────────

interface StorefrontContextValue {
  config: ResolvedStoreConfig;
  store: StoreInfo;
}

const StorefrontContext = createContext<StorefrontContextValue | null>(null);

// ── Hook ──────────────────────────────────────────────────────────────────────

/**
 * Access the resolved storefront config and store info from any client
 * component inside the /[slug] route tree.
 *
 * @throws If called outside a StorefrontConfigProvider.
 */
export function useStorefrontConfig(): StorefrontContextValue {
  const ctx = useContext(StorefrontContext);
  if (!ctx) {
    throw new Error(
      "useStorefrontConfig must be called inside StorefrontConfigProvider"
    );
  }
  return ctx;
}

// ── Provider ──────────────────────────────────────────────────────────────────

interface StorefrontConfigProviderProps {
  config: ResolvedStoreConfig;
  store: StoreInfo;
  children: ReactNode;
}

export function StorefrontConfigProvider({
  config,
  store,
  children,
}: StorefrontConfigProviderProps) {
  return (
    <StorefrontContext.Provider value={{ config, store }}>
      {children}
    </StorefrontContext.Provider>
  );
}
