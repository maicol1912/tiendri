// Shared data loader for all template preview sub-routes.
// Encapsulates the config → resolve → manifest → mockData pipeline so each
// page.tsx only needs one call instead of duplicating 4 async steps.

import { getTemplateConfig } from "@/templates/registry";
import { resolveTemplateConfig } from "@/lib/resolveTemplateConfig";
import { getTemplateManifest } from "@/templates/manifest-resolver";
import { getTemplateMockData } from "@/templates/mock-loader";
import type { TemplateManifest, ResolvedStoreConfig } from "@/types/templates";
import type { StorefrontProduct, Category, StoreInfo } from "@/types/store";

export interface TemplatePageData {
  store: StoreInfo;
  products: StorefrontProduct[];
  categories: Category[];
  config: ResolvedStoreConfig;
  manifest: TemplateManifest;
}

/**
 * Load all data required to render a TemplateLayout for the given template.
 * Used by every sub-route page so the pipeline is defined exactly once.
 */
export async function loadTemplateData(
  templateName: string
): Promise<TemplatePageData> {
  const templateConfig = await getTemplateConfig(templateName);
  const resolvedConfig = resolveTemplateConfig(templateConfig);
  const manifest = getTemplateManifest(templateName, resolvedConfig);
  const mockData = await getTemplateMockData(templateName);

  return {
    store: mockData.store,
    products: mockData.products,
    categories: mockData.categories,
    config: resolvedConfig,
    manifest,
  };
}
