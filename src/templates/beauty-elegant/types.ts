// Beauty Elegant Template — Shared TypeScript Types

import type { StoreInfo as SharedStoreInfo } from "@/types/store";

// Re-export shared StoreInfo
export type { StoreInfo } from "@/types/store";

// ── Template-specific product type ────────────────────────────────────────────

export interface BeautyElegantProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number | null;
  images: Array<{ url: string; sort_order: number }>;
  description?: string;
  inStock: boolean;
  categoryId?: string;
  subtitle?: string;
  healthFacts?: string;
  discountLabel?: string;
}

// ── Category type ─────────────────────────────────────────────────────────────

export interface BeautyElegantCategory {
  id: string;
  name: string;
}

// ── Navigation tab type ───────────────────────────────────────────────────────

export type NavTab = "home" | "calendar" | "tickets" | "profile";

// ── Cart item ─────────────────────────────────────────────────────────────────

export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  originalPrice?: number | null;
  imageUrl: string | null;
  description?: string;
  variantLabel?: string | null;
  quantity: number;
}

// ── Checkout order item ───────────────────────────────────────────────────────

export interface CheckoutOrderItem {
  productId: string;
  productName: string;
  price: number;
  imageUrl: string | null;
  variantLabel?: string;
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

// ── Unused but needed for StoreInfo compatibility ─────────────────────────────
export type { SharedStoreInfo };
