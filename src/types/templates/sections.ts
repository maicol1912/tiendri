// Template System — Section Types
// Section ordering and visibility config used in TemplateConfig and StoreCustomization.

// Each template defines its own section IDs (e.g. HomeSectionId in tech-premium).
// At the shared layer we keep it open — templates narrow this with their own unions.
export type SectionId = string;

// Per-section config: what order it renders in and whether it's shown.
// Header, Footer, and BottomNav are structural and NOT part of this system.
export interface SectionConfig {
  id: SectionId;
  visible: boolean;
}
