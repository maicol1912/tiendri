// Storefront Layout — Phase 5.1
// Server Component that powers every live merchant store at /[slug].
//
// Responsibilities:
//   1. Fetch the published store from Supabase via getStoreBySlug (anon client,
//      RLS ensures only onboarding_completed=true stores are returned)
//   2. Look up the template config from the registry (only tech-premium for now)
//   3. Merge template defaults with merchant customization via resolveTemplateConfig
//   4. Produce CSS custom properties with buildCssVars
//   5. Apply the merchant's chosen font pair via getFontPair
//   6. Inject everything into a .template-scope div
//   7. Pass the resolved config to children via StorefrontConfigProvider
//
// This mirrors the pattern of TemplateLayoutClient.tsx (the preview path) but
// runs entirely on the server — no client JS needed for theming.

import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getStoreBySlug } from "@/lib/getStoreBySlug";
import { resolveTemplateConfig } from "@/lib/resolveTemplateConfig";
import { buildCssVars } from "@/lib/buildCssVars";
import { getFontPair } from "@/lib/fonts";
import { techPremiumConfig } from "@/templates/tech-premium/config";
import { techPremiumConfigSchema } from "@/templates/tech-premium/config-schema";
import { CartProvider } from "@/templates/tech-premium/context/CartContext";
import { StorefrontConfigProvider } from "./storefront-config-provider";
import type { StoreInfo } from "@/types/store";

interface StorefrontLayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function StorefrontLayout({
  children,
  params,
}: StorefrontLayoutProps) {
  const { slug } = await params;

  // ── 1. Fetch store from Supabase ──────────────────────────────────────────
  const store = await getStoreBySlug(slug);
  if (!store) notFound();

  // ── 2. Resolve template config ────────────────────────────────────────────
  // For now only tech-premium exists. When more templates are added, use
  // a registry lookup: templateRegistry[store.template_id]?.config ?? techPremiumConfig
  const templateDefaults = techPremiumConfig;
  const resolvedConfig = resolveTemplateConfig(
    templateDefaults,
    store.customization ?? undefined,
    techPremiumConfigSchema,
  );

  // ── 3. Build CSS vars ─────────────────────────────────────────────────────
  const cssVars = buildCssVars(resolvedConfig);

  // ── 4. Resolve font pair ──────────────────────────────────────────────────
  // fontPair key is stored under customization.theme.fontPair (persisted by
  // updateTheme action). Falls back to "modern" when not set.
  const customization = store.customization as { theme?: { fontPair?: string } } | null;
  const fontPairKey = customization?.theme?.fontPair ?? "modern";
  const fontPair = getFontPair(fontPairKey);

  // ── 5. Build StoreInfo from resolved config + store row ───────────────────
  // Template components receive a StoreInfo prop — derive it from the resolved
  // branding config, falling back to the raw store row where needed.
  const storeInfo: StoreInfo = {
    name: resolvedConfig.branding?.storeName ?? store.name ?? slug,
    slug: store.slug,
    logo: resolvedConfig.branding?.logo ?? null,
    description: resolvedConfig.branding?.description,
    whatsapp: resolvedConfig.branding?.whatsapp,
    social_links: resolvedConfig.branding?.socialLinks
      ? {
          instagram: resolvedConfig.branding.socialLinks.instagram,
          facebook: resolvedConfig.branding.socialLinks.facebook,
          tiktok: resolvedConfig.branding.socialLinks.tiktok,
          twitter: resolvedConfig.branding.socialLinks.twitter,
          youtube: resolvedConfig.branding.socialLinks.youtube,
        }
      : undefined,
  };

  // ── 6. Render ─────────────────────────────────────────────────────────────
  return (
    <CartProvider slug={store.slug}>
      <StorefrontConfigProvider config={resolvedConfig} store={storeInfo}>
        {/* template-scope: injects CSS vars + font classes, same div pattern as
            TemplateLayoutClient but server-rendered — no client JS for theming. */}
        <div
          className={`template-scope ${fontPair.body.variable} ${fontPair.heading.variable}`}
          style={cssVars as React.CSSProperties}
        >
          {children}
        </div>
      </StorefrontConfigProvider>
    </CartProvider>
  );
}
