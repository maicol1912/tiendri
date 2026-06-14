// Furniture Light Template — TypeScript Interfaces
// KASA-inspired: white bg, orange #F5841F accent, teal #26A69A, dark navy #1B2838.

export type { StoreInfo, Category, ProductImage, StorefrontProduct } from "@/types/store";
export type { CartItem, CheckoutFormData } from "@/types/cart";

// ── Furniture Light-specific types ───────────────────────────────────────────

export interface FurnitureProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price: number | null;
  images: Array<{ url: string; sort_order: number }>;
  available: boolean;
  description?: string;
  /** Per-card lifestyle background color */
  cardBgColor?: string;
  inWishlist?: boolean;
  categoryId?: string;
  rating?: number;
  unitsSold?: number;
  discountPercent?: number;
  colorVariant?: string;
  colorOptions?: string[];
}

export interface FurnitureCategory {
  id: string;
  name: string;
  /** Lucide icon key: "table" | "chair" | "cabinet" | "sofa" | "bed" | "kitchen" | "bathroom" | "workspace" */
  icon?: string;
  productCount?: number;
}

export interface FurnitureStoreInfo {
  name: string;
  slug: string;
  logo: string | null;
  description?: string;
  whatsapp?: string;
  social_links?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface FurnitureCheckoutFormData {
  nombre: string;
  whatsapp: string;
  email: string;
  direccion: string;
  notas: string;
}

export type FurnitureNavTab = "home" | "search" | "cart" | "info";

export interface StyleCard {
  id?: string;
  name: string;
  image: string;
}
