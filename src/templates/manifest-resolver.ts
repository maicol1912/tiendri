// manifest-resolver.ts
// Dado un templateId y un TemplateConfig resuelto, devuelve el TemplateManifest
// completo con las variantes de slots que cada template declara.
//
// Centraliza la declaración de variantes por template para que tanto la ruta
// de preview (/template/[name]) como la ruta de storefront (/[slug]) usen
// exactamente el mismo manifiesto.

import type { TemplateConfig } from "@/types/templates/template-config";
import type { TemplateManifest, TemplateVariants } from "@/types/templates/manifest";

// ── Tabla de variantes por template ───────────────────────────────────────────
// Cada entrada declara qué variante de cada slot usa el template.
// Si el template no está en la tabla, se usan los defaults.

const TEMPLATE_VARIANTS: Record<string, TemplateVariants> = {
  "tech-premium": {
    header: "DEFAULT",
    footer: "COLUMNS",
    bottomNav: "EDGE",
    productCard: "BELOW_IMAGE",
    hero: "FULL_BLEED",
    categoryNav: "HORIZONTAL_SCROLL",
    searchBar: "INLINE",
  },
  fashion: {
    header: "GLASS",
    footer: "COMPACT",
    bottomNav: "FLOATING_PILL",
    productCard: "OVERLAY_BOTTOM",
    hero: "SPLIT",
    categoryNav: "CHIPS",
    searchBar: "INLINE",
  },
  "furniture-dark": {
    header: "GREETING",
    footer: "COMPACT",
    bottomNav: "EDGE",
    productCard: "BELOW_IMAGE",
    hero: "PROMO_STRIP",
    categoryNav: "HORIZONTAL_SCROLL",
    searchBar: "INLINE",
  },
  "furniture-light": {
    header: "DEFAULT",
    footer: "COMPACT",
    bottomNav: "EDGE",
    productCard: "BELOW_IMAGE",
    hero: "CONTAINED",
    categoryNav: "HORIZONTAL_SCROLL",
    searchBar: "INLINE",
  },
  "beauty-soft": {
    header: "GLASS",
    footer: "COMPACT",
    bottomNav: "FLOATING_PILL",
    productCard: "BELOW_IMAGE",
    hero: "CARD_SPLIT",
    categoryNav: "HORIZONTAL_SCROLL",
    searchBar: "ICON_TRIGGER",
  },
  "beauty-elegant": {
    header: "GLASS",
    footer: "COMPACT",
    bottomNav: "FLOATING_PILL",
    productCard: "OVERLAY_BOTTOM",
    hero: "TEXT_ONLY",
    categoryNav: "TABS",
    searchBar: "INLINE",
  },
  "decor-warm": {
    header: "GREETING_SIMPLE",
    footer: "COMPACT",
    bottomNav: "DOT_INDICATOR",
    productCard: "WITH_DESCRIPTION",
    hero: "CAROUSEL",
    categoryNav: "COLUMNAR",
    searchBar: "ICON_TRIGGER",
  },
  "food-night": {
    header: "DEFAULT",
    footer: "COMPACT",
    bottomNav: "EDGE",
    productCard: "SIDE_BY_SIDE",
    hero: "CONTAINED",
    categoryNav: "HORIZONTAL_SCROLL",
    searchBar: "INLINE",
  },
};

// ── Variantes por defecto (fallback para templates no registrados) ─────────────

const DEFAULT_VARIANTS: TemplateVariants = {
  header: "DEFAULT",
  footer: "COLUMNS",
  bottomNav: "EDGE",
  productCard: "BELOW_IMAGE",
  hero: "FULL_BLEED",
  categoryNav: "HORIZONTAL_SCROLL",
  searchBar: "INLINE",
};

// ── Función principal ──────────────────────────────────────────────────────────

/**
 * Construye un TemplateManifest combinando el config del template con
 * la declaración de variantes correspondiente.
 *
 * Priority order for variants:
 *   1. config.variants  — set by the template's own manifest.ts (Phase 5)
 *   2. TEMPLATE_VARIANTS[templateId] — resolver table (legacy fallback)
 *   3. DEFAULT_VARIANTS — ultimate fallback for unknown templates
 *
 * @param templateId - Identificador del template (ej. "tech-premium")
 * @param config     - TemplateConfig ya cargado via getTemplateConfig()
 */
export function getTemplateManifest(
  templateId: string,
  config: TemplateConfig
): TemplateManifest {
  // If the template's own manifest already declares variants, respect them.
  // Only fall back to the resolver table (or defaults) when variants are absent.
  const variants =
    (config as Partial<TemplateManifest>).variants ??
    TEMPLATE_VARIANTS[templateId] ??
    DEFAULT_VARIANTS;
  return {
    ...config,
    variants,
  };
}
