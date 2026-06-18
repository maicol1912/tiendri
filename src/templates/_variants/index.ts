// Master re-export for all slot variant registries.
// Each slot lives in its own subdirectory with a registry, types, and variant components.

export {
  HEADER_REGISTRY,
  type HeaderVariant,
  type HeaderSlotProps,
  type NavLink,
} from "./header";

export {
  FOOTER_REGISTRY,
  type FooterVariant,
  type FooterSlotProps,
} from "./footer";

export {
  BOTTOM_NAV_REGISTRY,
  type BottomNavVariant,
  type BottomNavSlotProps,
} from "./bottom-nav";

export {
  SEARCH_BAR_REGISTRY,
  type SearchBarVariant,
  type SearchBarSlotProps,
} from "./search-bar";

export {
  PRODUCT_CARD_REGISTRY,
  type ProductCardVariant,
  type ProductCardSlotProps,
} from "./product-card";

export {
  HERO_REGISTRY,
  type HeroVariant,
  type HeroSlotProps,
} from "./hero";

export {
  CATEGORY_NAV_REGISTRY,
  type CategoryNavVariant,
  type CategoryNavSlotProps,
} from "./category-nav";
