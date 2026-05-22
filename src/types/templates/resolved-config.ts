// Template System — ResolvedStoreConfig / MockStoreConfig
// The MERGED result: template defaults with merchant overrides applied on top.
// This is what every component receives — it never sees raw TemplateConfig
// or raw StoreCustomization directly.

import type { TemplateConfig } from "./template-config";
import type { StoreCustomization } from "./store-customization";

// ResolvedStoreConfig has the same shape as TemplateConfig because the resolver
// just deep-merges merchant overrides into the template defaults.
// Using a type alias (not a new interface) makes assignability trivial.
export type ResolvedStoreConfig = TemplateConfig;

// MockStoreConfig = same type, just populated with static mock data instead of
// a live Supabase-resolved merge. Same contract, different data source.
export type MockStoreConfig = ResolvedStoreConfig;

// Function signature for the config resolver utility (see src/lib/resolveTemplateConfig.ts).
export type ConfigResolver = (
  templateConfig: TemplateConfig,
  customization?: StoreCustomization,
) => ResolvedStoreConfig;
