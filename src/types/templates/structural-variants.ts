import type { CardContentLayout, HeroVariant, CategoryNavPattern, CategoryNavVariant, AddToCartStyle, BottomNavVariant, HeaderVariant, FooterVariant } from "./primitives";

export interface StructuralVariants {
  cardContentLayout?: CardContentLayout;
  heroVariant?: HeroVariant;
  categoryNavStyle?: CategoryNavPattern;
  categoryNavVariant?: CategoryNavVariant;
  addToCartStyle?: AddToCartStyle;
  bottomNavVariant?: BottomNavVariant;
  headerVariant?: HeaderVariant;
  footerVariant?: FooterVariant;
}

export interface TemplateRecipe {
  defaultHeroVariant: HeroVariant;
  defaultCategoryNavVariant: CategoryNavVariant;
  defaultCardContentLayout: CardContentLayout;
  defaultBottomNavVariant: BottomNavVariant;
  defaultHeaderVariant?: HeaderVariant;
  defaultFooterVariant?: FooterVariant;
}
