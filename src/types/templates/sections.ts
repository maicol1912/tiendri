// Template System — Section Types
// Section ordering and visibility config used in TemplateConfig and StoreCustomization.

// Exhaustive union of all keys registered in SECTION_REGISTRY.
// Add here when a new section renderer is added to _core/sections/index.ts.
export type SectionId =
  | "hero"
  | "categories"
  | "products"
  | "collections"
  | "editorial"
  | "banners"
  | "popular"
  | "video"
  | "featured"
  | "searchBar"
  | "discounts"
  | "bestSellers";

// Per-section config: what order it renders in and whether it's shown.
// Header, Footer, and BottomNav are structural and NOT part of this system.
export interface SectionConfig {
  id: SectionId;
  visible: boolean;
  config?: Record<string, unknown>;
}
