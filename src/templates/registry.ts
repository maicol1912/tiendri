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
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Sync loader — for contexts where await is not available (e.g. RSC initial load)
// Only available for templates whose schema has already been statically imported.
// ---------------------------------------------------------------------------

// Static reference — imported once so it is always available synchronously.
import { techPremiumConfigSchema } from "./tech-premium/config-schema";

const syncRegistry: Record<string, TemplateConfigSchema> = {
  "tech-premium": techPremiumConfigSchema,
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
