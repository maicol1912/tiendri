import type { CardContentLayout, HeroVariant, CategoryNavPattern, CategoryNavVariant, AddToCartStyle } from "./primitives";

export interface StructuralVariants {
  cardContentLayout?: CardContentLayout;
  heroVariant?: HeroVariant;
  categoryNavStyle?: CategoryNavPattern;
  categoryNavVariant?: CategoryNavVariant;
  addToCartStyle?: AddToCartStyle;
}

export interface TemplateRecipe {
  defaultHeroVariant: HeroVariant;
  defaultCategoryNavVariant: CategoryNavVariant;
  defaultCardContentLayout: CardContentLayout;
}
