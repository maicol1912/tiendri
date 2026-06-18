// Furniture Light Template — TypeScript Interfaces
// KASA-inspired: white bg, orange #F5841F accent, teal #26A69A, dark navy #1B2838.

export type { StoreInfo, Category, ProductImage, ColorOption, StorefrontProduct, StorefrontVariantGroup, StorefrontVariantOption } from "@/types/store";
export type { CartItem, CheckoutFormData } from "@/types/cart";

// ── Furniture Light-specific types ───────────────────────────────────────────

export interface FurnitureCategory {
  id: string;
  name: string;
  /** Lucide icon key: "table" | "chair" | "cabinet" | "sofa" | "bed" | "kitchen" | "bathroom" | "workspace" */
  icon?: string;
  productCount?: number;
}

export type FurnitureNavTab = "home" | "search" | "cart" | "info";

export interface StyleCard {
  id?: string;
  name: string;
  image: string;
}

export type FurnitureLightSortOption = 'recent' | 'price-asc' | 'price-desc' | 'rating';
