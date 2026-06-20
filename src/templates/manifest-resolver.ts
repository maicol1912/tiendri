// manifest-resolver.ts
// Dado un templateId y un TemplateConfig resuelto, devuelve el TemplateManifest
// completo con las variantes de slots que cada template declara.
//
// Centraliza la lógica para que tanto la ruta de preview (/template/[name])
// como la ruta de storefront (/[slug]) usen exactamente el mismo manifiesto.

import type { TemplateConfig } from "@/types/templates/template-config";
import type { TemplateManifest, TemplateVariants } from "@/types/templates/manifest";
import type { HeroVariant } from "@/templates/_variants/hero/types";
import type { ProductCardVariant } from "@/templates/_variants/product-card/types";
import type { CategoryNavVariant } from "@/templates/_variants/category-nav/types";

/**
 * Construye un TemplateManifest a partir del config ya cargado del template.
 * Las variantes de slots vienen directamente del manifest.ts de cada template.
 *
 * Si el config incluye `structuralVariants` (campo JSONB del DB), mapea los
 * nombres de campo del DB (heroVariant, cardContentLayout, categoryNavStyle) a
 * los nombres de slot del manifiesto (hero, productCard, categoryNav).
 * Los defaults del manifest siempre ganan si no hay override en el DB.
 *
 * @param templateId - Identificador del template (ej. "tech-premium")
 * @param config     - TemplateConfig ya cargado via getTemplateConfig()
 */
export function getTemplateManifest(
  templateId: string,
  config: TemplateConfig
): TemplateManifest {
  const manifest = config as Partial<TemplateManifest>;
  if (!manifest.variants) {
    throw new Error(
      `Template "${templateId}" does not declare variants in its manifest.ts`
    );
  }

  const sv = config.structuralVariants;
  if (sv) {
    const variantOverrides: Partial<TemplateVariants> = {};
    if (sv.heroVariant) variantOverrides.hero = sv.heroVariant as unknown as HeroVariant;
    if (sv.cardContentLayout) variantOverrides.productCard = sv.cardContentLayout as unknown as ProductCardVariant;
    if (sv.categoryNavStyle) variantOverrides.categoryNav = sv.categoryNavStyle as unknown as CategoryNavVariant;
    // addToCartStyle and categoryDisplayType have no manifest slot equivalents yet

    return {
      ...(config as TemplateManifest),
      variants: { ...manifest.variants, ...variantOverrides },
    };
  }

  return config as TemplateManifest;
}
