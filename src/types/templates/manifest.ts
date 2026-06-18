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

// The set of variant choices a template declares.
// Every slot is required — templates must nominate exactly one variant per slot.
export interface TemplateVariants {
  header: HeaderVariant;
  footer: FooterVariant;
  bottomNav: BottomNavVariant;
  productCard: ProductCardVariant;
  hero: HeroVariant;
  categoryNav: CategoryNavVariant;
  searchBar: SearchBarVariant;
}

// Full template manifest — combines the shared TemplateConfig with the
// variant declarations the template ships with.
export interface TemplateManifest extends TemplateConfig {
  variants: TemplateVariants;
}
