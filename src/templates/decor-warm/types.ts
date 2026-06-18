// Decor Warm Template — Types
// Re-exports shared types and declares template-specific types.

export type { StoreInfo, StorefrontProduct, ProductImage, ColorOption, Category, StorefrontVariantGroup, StorefrontVariantOption } from "@/types/store";

// ── Filter system ─────────────────────────────────────────────────────────────

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  isCollapsed?: boolean;
}

export type SortOption = 'recent' | 'price-asc' | 'price-desc' | 'rating';

// ── Category icon type ────────────────────────────────────────────────────────

/** Icon-based category card displayed on home page */
export interface DecorWarmCategoryIcon {
  id: string;
  name: string;
  /** Lucide icon name e.g. "Sofa", "BedDouble", "Lamp" */
  icon: string;
}

// ── Nav tab type ──────────────────────────────────────────────────────────────

export type DecorWarmNavTab = "home" | "categories" | "cart" | "info";

// ── Promo banner slide ────────────────────────────────────────────────────────

export interface DecorWarmPromoSlide {
  imageUrl: string;
  label: string;
  heading: string;
  badge?: string;
}

// ── Cart item ─────────────────────────────────────────────────────────────────

export interface DecorWarmCartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
}

// ── Checkout form ─────────────────────────────────────────────────────────────

export interface DecorWarmCheckoutFormData {
  nombre: string;
  whatsapp: string;
  email: string;
  direccion: string;
  notas: string;
}

// ── Best seller ───────────────────────────────────────────────────────────────

export interface DecorWarmBestSeller {
  productId: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string | null;
}

// ── Wishlist item ─────────────────────────────────────────────────────────────

export interface DecorWarmWishlistItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string | null;
}
