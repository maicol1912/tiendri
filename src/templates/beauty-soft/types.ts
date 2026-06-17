// Beauty Soft Template — Shared TypeScript Types
// Template-specific types adapted for tiendri_v2 architecture.

import type { StoreInfo as SharedStoreInfo, StorefrontVariantGroup } from "@/types/store";

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

export type SortOption = "recent" | "price-asc" | "price-desc" | "rating";

// Re-export shared StoreInfo
export type { StoreInfo } from "@/types/store";

// ── Template-specific product type (aligned with shared StorefrontProduct) ────

export interface BeautySoftProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number | null;
  discount?: number | null;
  images: Array<{ url: string; sort_order: number }>;
  description?: string;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  inWishlist?: boolean;
  categoryId?: string;
  variants?: StorefrontVariantGroup[];
}

// ── Category type ─────────────────────────────────────────────────────────────

export interface BeautySoftCategory {
  id: string;
  name: string;
  imageUrl?: string;
}

// ── Hero banner data ──────────────────────────────────────────────────────────

export interface HeroBannerData {
  title: string;
  discountText: string;
  ctaText: string;
  imageUrl?: string;
}

// ── Navigation tab type ───────────────────────────────────────────────────────

export type NavTab = "home" | "cart" | "search" | "info";

// ── Cart item (for checkout) ──────────────────────────────────────────────────

export interface CheckoutOrderItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string | null;
  variantName?: string;
  quantity: number;
}
