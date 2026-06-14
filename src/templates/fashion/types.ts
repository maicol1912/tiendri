// Fashion Template — TypeScript Interfaces
// Monochromatic B&W theme: warm off-white bg (#F5F5F0), black accent (#000000),
// light gray surface (#D9D9D9), Inter font, zero border radius.

// ── Re-exports from shared types ──────────────────────────────────────────────
// Shared domain types live in @/types/store and @/types/cart.
// Components that import from this file continue to work unchanged.
export type { StoreInfo, Category, ProductImage, StorefrontProduct } from "@/types/store";
export type { CartItem, CheckoutFormData } from "@/types/cart";

// ── Fashion-specific types ─────────────────────────────────────────────────────

export interface PopularProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  bgColor: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export type NavTab = "home" | "search" | "cart" | "info";

export type CurrentPage =
  | "home"
  | "listing"
  | "detail"
  | "cart"
  | "checkout"
  | "search";

export type SortOption = "recent" | "price-asc" | "price-desc" | "rating";

export type TemplateMode = "live" | "preview";

export type HomeSectionId =
  | "hero"
  | "collections"
  | "editorial";

export interface HomeSectionConfig {
  id: HomeSectionId;
  visible: boolean;
}

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
  checked?: boolean;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  expanded?: boolean;
  isCollapsed?: boolean;
}
