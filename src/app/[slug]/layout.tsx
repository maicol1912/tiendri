// Storefront Layout — Phase 5.1
// Server Component that powers every live merchant store at /[slug].
//
// Responsibilities:
//   1. Fetch the published store from Supabase via getStoreBySlug (anon client,
//      RLS ensures only onboarding_completed=true stores are returned)
//   2. Look up the template config from the registry using store.template_id
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
import { getStoreBySlug, appearanceToCustomization } from "@/catalog/getStoreBySlug";
import { resolveTemplateConfig } from "@/catalog/resolveTemplateConfig";
import { extractMediaTokens, resolveMediaUrlsForStorefront } from "@/catalog/resolveMediaUrlsForStorefront";
import type { StoreCustomization } from "@/types/templates";
import { buildCssVars } from "@/catalog/buildCssVars";
import { getFontPair } from "@/shared/fonts";
import { getTemplateConfig, getTemplateSchema } from "@/templates";
import { CartProvider } from "@/templates/_core/cart";
import { StorefrontConfigProvider } from "./storefront-config-provider";
import type { StoreInfo } from "@/types/domain/store";
import PreviewListener from "@/storefront/preview/PreviewListener";

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
  // Use the registry to load the correct template defaults for store.template_id.
  // Falls back to tech-premium for null/undefined/unknown template IDs.
  const effectiveTemplateId = store.template_id ?? "tech-premium";
  const [templateDefaults, templateSchema] = await Promise.all([
    getTemplateConfig(effectiveTemplateId),
    getTemplateSchema(effectiveTemplateId),
  ]);
  // Derive typed customization: prefer store_appearance (new path), fall back to
  // legacy stores.customization JSONB so existing stores keep working unchanged.
  const storeCustomization: StoreCustomization | undefined =
    appearanceToCustomization(store.store_appearance, effectiveTemplateId) ??
    (store.customization as StoreCustomization | undefined);

  const mediaTokens = storeCustomization
    ? extractMediaTokens(storeCustomization)
    : [];
  const urlMap = mediaTokens.length > 0
    ? await resolveMediaUrlsForStorefront(store.id, mediaTokens)
    : new Map<string, string>();

  const resolvedConfig = resolveTemplateConfig(
    templateDefaults,
    storeCustomization,
    templateSchema ?? undefined,
    urlMap,
  );

  // ── 3. Build CSS vars ─────────────────────────────────────────────────────
  const cssVars = buildCssVars(resolvedConfig);

  // ── 4. Resolve font pair ──────────────────────────────────────────────────
  // fontPair key comes from store_appearance.font_pair (new path) or
  // legacy customization.theme.fontPair. Falls back to "minimalista".
  const fontPairKey =
    store.store_appearance?.font_pair ??
    storeCustomization?.theme?.fontPair ??
    "minimalista";
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
    <CartProvider slug={slug} storageKey={`tc_${effectiveTemplateId.replace(/-/g, "_")}_cart`}>
      <StorefrontConfigProvider config={resolvedConfig} store={storeInfo}>
        {/* template-scope: injects CSS vars + font classes, same div pattern as
            TemplateLayoutClient but server-rendered — no client JS for theming. */}
        <div
          className={`template-scope ${fontPair.body.variable} ${fontPair.heading.variable}`}
          style={cssVars as React.CSSProperties}
        >
          {children}
          <PreviewListener />
        </div>
      </StorefrontConfigProvider>
    </CartProvider>
  );
}
