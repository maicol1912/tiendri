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
    case "pets-modern": {
      const { petsModernConfigSchema } = await import("./pets-modern/config-schema");
      return petsModernConfigSchema;
    }
    case "electronics-classic": {
      const { electronicsClassicConfigSchema } = await import("./electronics-classic/config-schema");
      return electronicsClassicConfigSchema;
    }
    case "furniture-dark": {
      const { furnitureDarkConfigSchema } = await import("./furniture-dark/config-schema");
      return furnitureDarkConfigSchema;
    }
    case "beauty-soft": {
      const { beautySoftConfigSchema } = await import("./beauty-soft/config-schema");
      return beautySoftConfigSchema;
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
import { petsModernConfigSchema } from "./pets-modern/config-schema";
import { electronicsClassicConfigSchema } from "./electronics-classic/config-schema";
import { furnitureDarkConfigSchema } from "./furniture-dark/config-schema";
import { beautySoftConfigSchema } from "./beauty-soft/config-schema";

const syncRegistry: Record<string, TemplateConfigSchema> = {
  "tech-premium": techPremiumConfigSchema,
  fashion: fashionConfigSchema,
  "pets-modern": petsModernConfigSchema,
  "electronics-classic": electronicsClassicConfigSchema,
  "furniture-dark": furnitureDarkConfigSchema,
  "beauty-soft": beautySoftConfigSchema,
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
