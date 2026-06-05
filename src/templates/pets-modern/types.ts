// Pet V3 Template — TypeScript Interfaces
// "Pet Shop App" theme: white bg (#FFFFFF), light gray surface (#F2F3F2),
// orange accent (#FF7322), dark text (#1D1D1B), green promo gradient.
// Font: Brandon Grotesque style (system sans-serif fallback).

// ── Re-exports from shared types (backwards compatibility) ────────────────────
export type { StoreInfo, Category, ProductImage, StorefrontProduct } from "@/types/store";
export type { CartItem, CheckoutFormData } from "@/types/cart";

// ── Pet V3-specific types ────────────────────────────────────────────────────

export interface PetCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  /** Pastel background color for category card */
  bgColor: string;
  /** Border color for category card */
  borderColor: string;
}

export interface TrendingItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface PetType {
  id: string;
  label: string;
  image: string;
  bgColor: string;
}

export interface PromoBannerData {
  title: string;
  subtitle: string;
  image: string;
}

export type NavTab = "shop" | "explore" | "cart" | "info";

export type PetFilter = "all" | "dog" | "cat" | "small-animal" | "bird";

export type HomeSectionId =
  | "promo-banner"
  | "trending"
  | "pet-types"
  | "products";

export interface HomeSectionConfig {
  id: HomeSectionId;
  visible: boolean;
}
