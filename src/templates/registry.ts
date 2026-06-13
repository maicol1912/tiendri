// Template schema registry — async and sync loaders for TemplateConfigSchema.
// Add new templates here as they are implemented.

import type { TemplateConfigSchema } from "@/types/templates";

// ---------------------------------------------------------------------------
// Async loader — preferred for dashboard pages (code-splits schema per template)
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
// Sync loader — for contexts where await is not available (e.g. RSC initial load)
// Only available for templates whose schema has already been statically imported.
// ---------------------------------------------------------------------------

// Static references — imported once so they are always available synchronously.
import { techPremiumConfigSchema } from "./tech-premium/config-schema";
import { fashionConfigSchema } from "./fashion/config-schema";
import { furnitureDarkConfigSchema } from "./furniture-dark/config-schema";
import { beautySoftConfigSchema } from "./beauty-soft/config-schema";
import { beautyElegantConfigSchema } from "./beauty-elegant/config-schema";
import { decorWarmConfigSchema } from "./decor-warm/config-schema";
import { foodNightConfigSchema } from "./food-night/config-schema";
import { furnitureLightConfigSchema } from "./furniture-light/config-schema";

const syncRegistry: Record<string, TemplateConfigSchema> = {
  "tech-premium": techPremiumConfigSchema,
  fashion: fashionConfigSchema,
  "furniture-dark": furnitureDarkConfigSchema,
  "furniture-light": furnitureLightConfigSchema,
  "beauty-soft": beautySoftConfigSchema,
  "beauty-elegant": beautyElegantConfigSchema,
  "decor-warm": decorWarmConfigSchema,
  "food-night": foodNightConfigSchema,
};

/**
 * Synchronously return the TemplateConfigSchema for the given template ID.
 * Returns null for unknown template IDs.
 * Prefer `getTemplateSchema` (async) when possible — this one statically
 * imports all schemas and includes them in the initial bundle.
 */
export function getTemplateSchemaSync(
  templateId: string
): TemplateConfigSchema | null {
  return syncRegistry[templateId] ?? null;
}
