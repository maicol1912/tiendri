// Template System — TemplateManifest
// The contract a template declares in the centralised architecture.
// Each template's manifest.ts exports an object that satisfies this interface.

import type { TemplateConfig } from "./template-config";
import type { HeaderVariant } from "@/templates/_variants/header/types";
import type { FooterVariant } from "@/templates/_variants/footer/types";
import type { BottomNavVariant } from "@/templates/_variants/bottom-nav/types";
import type { ProductCardVariant } from "@/templates/_variants/product-card/types";
import type { HeroVariant } from "@/templates/_variants/hero/types";
import type { CategoryNavVariant } from "@/templates/_variants/category-nav/types";
import type { SearchBarVariant } from "@/templates/_variants/search-bar/types";
import type { BestSellersVariant } from "@/templates/_variants/best-sellers/types";
import type { PopularVariant } from "@/templates/_variants/popular/types";
import type { BannersVariant } from "@/templates/_variants/banners/types";
import type { EditorialVariant } from "@/templates/_variants/editorial/types";
import type { VideoVariant } from "@/templates/_variants/video/types";

// The set of variant choices a template declares.
// The 7 structural slots are required — templates must nominate exactly one variant per slot.
// The 5 inline-section slots are optional — only templates that render these sections declare them.
export interface TemplateVariants {
  header: HeaderVariant;
  footer: FooterVariant;
  bottomNav: BottomNavVariant;
  productCard: ProductCardVariant;
  hero: HeroVariant;
  categoryNav: CategoryNavVariant;
  searchBar: SearchBarVariant;
  // Inline section slots (optional — declare only when the template renders the section)
  bestSellers?: BestSellersVariant;
  popular?: PopularVariant;
  banners?: BannersVariant;
  editorial?: EditorialVariant;
  video?: VideoVariant;
}

// Full template manifest — combines the shared TemplateConfig with the
// variant declarations the template ships with.
export interface TemplateManifest extends TemplateConfig {
  variants: TemplateVariants;
}
