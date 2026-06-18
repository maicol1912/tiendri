// Template System — Per-Section Custom Config Types
// Typed payloads for SectionConfig.config per section kind.

export type TextAlignment = 'left' | 'center' | 'right';

export interface HeroSectionCustomConfig {
  textAlignment?: TextAlignment;
  fontFamily?: string;
}

export interface CategoriesSectionCustomConfig {
  gridColumnsMobile?: number;
  gridColumnsDesktop?: number;
  textAlignment?: TextAlignment;
}

export interface ProductsSectionCustomConfig {
  gridColumnsMobile?: number;
  gridColumnsDesktop?: number;
  textAlignment?: TextAlignment;
  fontFamily?: string;
  curatedProductIds?: string[];
}
