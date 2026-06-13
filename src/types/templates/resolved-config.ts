// Template System — ResolvedStoreConfig / MockStoreConfig
// The MERGED result: template defaults with merchant overrides applied on top.
// This is what every component receives — it never sees raw TemplateConfig
// or raw StoreCustomization directly.

import type { TemplateConfig } from "./template-config";
import type { ThemeCustomization, StoreCustomization } from "./store-customization";
import type { TemplateConfigSchema } from "./config-schema";
import type { DensityLevel, ShadowElevation, TransitionSpeed, TransitionEasing } from "./primitives";
import type { StructuralVariants } from "./structural-variants";

/** Effect/motion tokens forwarded from the merged config */
interface EffectTokens {
  shadowElevation?: ShadowElevation;
  transitionSpeed?: TransitionSpeed;
  transitionEasing?: TransitionEasing;
}

// ResolvedStoreConfig extends TemplateConfig with runtime-resolved fields
// forwarded from the merchant's StoreCustomization. The optional fields
// are additive and backward-compatible — consumers that don't read them are unaffected.
export interface ResolvedStoreConfig extends TemplateConfig {
  /** Merchant's full theme object — forwarded from StoreCustomization.theme.
   * Carries typography, fontPair, and color/radius overrides (for buildCssVars). */
  theme?: ThemeCustomization;
  /** Resolved density level — forwarded from StoreCustomization.layout.density. */
  layoutDensity?: DensityLevel;
  /** Resolved structural variant overrides — forwarded from StoreCustomization.layout.structuralVariants. */
  structuralVariants?: StructuralVariants;
  /** Resolved effect tokens — forwarded from the active preset's effects sub-object.
   * When present, overrides the animationLevel/shadowStyle already in layout. */
  effects?: EffectTokens;
}

// MockStoreConfig = same type, just populated with static mock data instead of
// a live Supabase-resolved merge. Same contract, different data source.
export type MockStoreConfig = ResolvedStoreConfig;

// Function signature for the config resolver utility (see src/lib/resolveTemplateConfig.ts).
export type ConfigResolver = (
  templateConfig: TemplateConfig,
  customization?: StoreCustomization,
  schema?: TemplateConfigSchema,
  urlMap?: Map<string, string>,
) => ResolvedStoreConfig;
