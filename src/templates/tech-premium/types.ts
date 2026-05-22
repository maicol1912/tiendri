// Tech Premium Template — TypeScript Interfaces
// "cyber" e-store theme: white bg (#FFFFFF), light gray surface (#F6F6F6),
// black accent/CTA (#000000), dark hero (#211C24), Inter font.

// ── Re-exports from shared types (backwards compatibility) ────────────────────
// Shared domain types live in @/types/store and @/types/cart.
// Components that import from this file continue to work unchanged.
export type { StoreInfo, Category, ProductImage, Product } from "@/types/store";
export type { CartItem, CheckoutFormData } from "@/types/cart";

// ── Tech Premium-specific types ───────────────────────────────────────────────

export interface Banner {
  title: string;
  titleBold?: string;
  description: string;
  image: string;
  ctaText?: string;
  bgColor: string;
  textColor?: string;
}

export interface BannerGrid {
  wide: Banner;      // PlayStation 5 — wide left top
  tall: Banner;      // Macbook Air — tall right
  smallLeft: Banner; // AirPods Max
  smallRight: Banner; // Vision Pro
}

export interface PopularProduct {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  bgColor: string;
}

export interface HeroBannerData {
  subtitle: string;
  titleLight: string;
  titleBold: string;
  description: string;
  ctaText: string;
  image: string;
  bgColor: string;
}

export interface SummerSaleBanner {
  image: string;
  imageMobile?: string;
  titleLight: string;
  titleBold: string;
  description: string;
  ctaText: string;
}

export interface ReviewData {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  images?: string[];
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
}

export interface SpecBadge {
  label: string;
  value: string;
  icon?: string;
}

export interface RatingDistribution {
  label: string;
  count: number;
  percentage: number;
}

export type NavTab = "home" | "search" | "cart" | "profile";

export type CurrentPage = "home" | "listing" | "product-detail" | "cart" | "search" | "checkout";

export type ProductTab = "new-arrival" | "bestseller" | "featured";

export type TemplateMode = "live" | "preview";

export type HomeSectionId =
  | "hero"
  | "banners"
  | "categories"
  | "products"
  | "popular"
  | "discounts"
  | "summer-sale";

export interface HomeSectionConfig {
  id: HomeSectionId;
  visible: boolean;
}
