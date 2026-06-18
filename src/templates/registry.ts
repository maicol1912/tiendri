// Template schema registry — async loader for TemplateConfigSchema.
// Uses dynamic imports so each schema is code-split into its own chunk.
// Add new templates here as they are implemented.

import type { TemplateConfig, TemplateConfigSchema } from "@/types/templates";

// ---------------------------------------------------------------------------
// Async loader — code-splits each schema into its own chunk.
// Importing this file does NOT pull any schema into the bundle.
// ---------------------------------------------------------------------------

/**
 * Load the TemplateConfigSchema for the given template ID.
 * Returns null for unknown template IDs so callers can fall back to universal-only tabs.
 *
 * @example
 * const schema = await getTemplateSchema("tech-premium");
 * if (!schema) { /* universal tabs only *\/ }
 */
export async function getTemplateSchema(
  templateId: string
): Promise<TemplateConfigSchema | null> {
  switch (templateId) {
    case "tech-premium": {
      const { techPremiumConfigSchema } = await import(
        "./tech-premium/config-schema"
      );
      return techPremiumConfigSchema;
    }
    case "fashion": {
      const { fashionConfigSchema } = await import("./fashion/config-schema");
      return fashionConfigSchema;
    }
    case "furniture-dark": {
      const { furnitureDarkConfigSchema } = await import("./furniture-dark/config-schema");
      return furnitureDarkConfigSchema;
    }
    case "beauty-soft": {
      const { beautySoftConfigSchema } = await import("./beauty-soft/config-schema");
      return beautySoftConfigSchema;
    }
    case "beauty-elegant": {
      const { beautyElegantConfigSchema } = await import("./beauty-elegant/config-schema");
      return beautyElegantConfigSchema;
    }
    case "decor-warm": {
      const { decorWarmConfigSchema } = await import("./decor-warm/config-schema");
      return decorWarmConfigSchema;
    }
    case "furniture-light": {
      const { furnitureLightConfigSchema } = await import("./furniture-light/config-schema");
      return furnitureLightConfigSchema;
    }
    case "food-night": {
      const { foodNightConfigSchema } = await import("./food-night/config-schema");
      return foodNightConfigSchema;
    }
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Async loader — code-splits each template config (defaults) into its chunk.
// Falls back to tech-premium for unknown template IDs.
// ---------------------------------------------------------------------------

/**
 * Load the default TemplateConfig for the given template ID.
 * Falls back to tech-premium for unknown IDs so the storefront always renders.
 *
 * @example
 * const config = await getTemplateConfig("fashion");
 */
export async function getTemplateConfig(
  templateId: string
): Promise<TemplateConfig> {
  switch (templateId) {
    case "fashion": {
      const { fashionManifest } = await import("./fashion/manifest");
      return fashionManifest as TemplateConfig;
    }
    case "furniture-dark": {
      const { furnitureDarkManifest } = await import("./furniture-dark/manifest");
      return furnitureDarkManifest as TemplateConfig;
    }
    case "furniture-light": {
      const { furnitureLightManifest } = await import("./furniture-light/manifest");
      return furnitureLightManifest as TemplateConfig;
    }
    case "beauty-soft": {
      const { beautySoftManifest } = await import("./beauty-soft/manifest");
      return beautySoftManifest as TemplateConfig;
    }
    case "beauty-elegant": {
      const { beautyElegantManifest } = await import("./beauty-elegant/manifest");
      return beautyElegantManifest as TemplateConfig;
    }
    case "decor-warm": {
      const { decorWarmManifest } = await import("./decor-warm/manifest");
      return decorWarmManifest as TemplateConfig;
    }
    case "food-night": {
      const { foodNightManifest } = await import("./food-night/manifest");
      return foodNightManifest as TemplateConfig;
    }
    // "tech-premium" is the default — also catches unknown IDs
    case "tech-premium":
    default: {
      const { techPremiumManifest } = await import("./tech-premium/manifest");
      return techPremiumManifest as TemplateConfig;
    }
  }
}
