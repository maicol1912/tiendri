// Template schema registry — async loader for TemplateConfigSchema.
// Uses dynamic imports so each schema is code-split into its own chunk.
// Add new templates here as they are implemented.

import type { TemplateConfig, TemplateConfigSchema } from "@/types/templates";
import { DEFAULT_TEMPLATE_ID } from "@/shared/constants";

// ---------------------------------------------------------------------------
// Data-driven loader maps — code-splits each module into its own chunk.
// Importing this file does NOT pull any schema or config into the bundle.
// To add a 9th template: add one line per map below.
// ---------------------------------------------------------------------------

const SCHEMA_LOADERS: Record<string, () => Promise<TemplateConfigSchema>> = {
  "tech-premium":   () => import("./tech-premium/config-schema").then((m) => m.techPremiumConfigSchema),
  "fashion":        () => import("./fashion/config-schema").then((m) => m.fashionConfigSchema),
  "furniture-dark": () => import("./furniture-dark/config-schema").then((m) => m.furnitureDarkConfigSchema),
  "furniture-light":() => import("./furniture-light/config-schema").then((m) => m.furnitureLightConfigSchema),
  "beauty-soft":    () => import("./beauty-soft/config-schema").then((m) => m.beautySoftConfigSchema),
  "beauty-elegant": () => import("./beauty-elegant/config-schema").then((m) => m.beautyElegantConfigSchema),
  "decor-warm":     () => import("./decor-warm/config-schema").then((m) => m.decorWarmConfigSchema),
  "food-night":     () => import("./food-night/config-schema").then((m) => m.foodNightConfigSchema),
};

const CONFIG_LOADERS: Record<string, () => Promise<TemplateConfig>> = {
  "tech-premium":   () => import("./tech-premium/manifest").then((m) => m.techPremiumManifest as TemplateConfig),
  "fashion":        () => import("./fashion/manifest").then((m) => m.fashionManifest as TemplateConfig),
  "furniture-dark": () => import("./furniture-dark/manifest").then((m) => m.furnitureDarkManifest as TemplateConfig),
  "furniture-light":() => import("./furniture-light/manifest").then((m) => m.furnitureLightManifest as TemplateConfig),
  "beauty-soft":    () => import("./beauty-soft/manifest").then((m) => m.beautySoftManifest as TemplateConfig),
  "beauty-elegant": () => import("./beauty-elegant/manifest").then((m) => m.beautyElegantManifest as TemplateConfig),
  "decor-warm":     () => import("./decor-warm/manifest").then((m) => m.decorWarmManifest as TemplateConfig),
  "food-night":     () => import("./food-night/manifest").then((m) => m.foodNightManifest as TemplateConfig),
};

// ---------------------------------------------------------------------------
// Public API — unchanged externally.
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
  const loader = SCHEMA_LOADERS[templateId];
  if (!loader) return null;
  return loader();
}

/**
 * Load the default TemplateConfig for the given template ID.
 * Falls back to the default template for unknown IDs so the storefront always renders.
 *
 * @example
 * const config = await getTemplateConfig("fashion");
 */
export async function getTemplateConfig(
  templateId: string
): Promise<TemplateConfig> {
  const loader = CONFIG_LOADERS[templateId] ?? CONFIG_LOADERS[DEFAULT_TEMPLATE_ID];
  return loader();
}
