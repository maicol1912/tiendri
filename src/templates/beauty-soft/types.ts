// Beauty Soft Template — Shared TypeScript Types
// Template-specific types adapted for tiendri_v2 architecture.

// ── Re-exports from shared types (backwards compatibility) ────────────────────
// Shared domain types live in @/types/store.
// Components that import from this file continue to work unchanged.
export type {
  StoreInfo,
  StorefrontProduct,
  ColorOption,
  ProductImage,
  Category,
} from "@/types/store";

// Backwards-compat alias — components that imported BeautySoftProduct keep working
export type { StorefrontProduct as BeautySoftProduct } from "@/types/store";

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

// ── Category type (beauty-soft custom — simpler than shared Category) ─────────

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
