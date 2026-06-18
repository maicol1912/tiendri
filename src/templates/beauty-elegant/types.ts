// Beauty Elegant Template — Shared TypeScript Types

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

// Backwards-compat alias — components that imported BeautyElegantProduct keep working
export type { StorefrontProduct as BeautyElegantProduct } from "@/types/store";

// ── Filter system ─────────────────────────────────────────────────────────────

export type BeautyElegantSortOption = 'recent' | 'price-asc' | 'price-desc';

// ── Category type (beauty-elegant custom — simpler than shared Category) ──────

export interface BeautyElegantCategory {
  id: string;
  name: string;
}

// ── Navigation tab type ───────────────────────────────────────────────────────

export type NavTab = "home" | "search" | "cart" | "info";

// ── Checkout order item ───────────────────────────────────────────────────────

export interface CheckoutOrderItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string | null;
  variantName?: string;
  quantity: number;
}

// ── Checkout form values ──────────────────────────────────────────────────────

export interface CheckoutFormValues {
  fullName: string;
  whatsapp: string;
  email: string;
  address: string;
  notes: string;
}
