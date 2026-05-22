// Shared store/platform types

// ── Platform model (database record) ─────────────────────────────────────────

export interface Store {
  id: string;
  slug: string;
  name: string;
  ownerId: string;
  whatsappNumber: string;
  templateId: string;
  createdAt: string;
  updatedAt: string;
}

// ── Template-facing store info (what templates receive as props) ──────────────

export interface StoreInfo {
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
  };
}

// ── Shared catalog types ──────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  /** Lucide icon name — e.g. "Smartphone", "Watch", "Camera" */
  icon: string;
  productCount?: number;
}

export interface ProductImage {
  url: string;
  sort_order: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number | null;
  discount?: number | null;
  images: ProductImage[];
  description?: string;
  specs?: string[];
  rating?: number;
  reviewCount?: number;
  colors?: string[];
  storageOptions?: string[];
  inStock: boolean;
  inWishlist?: boolean;
  categoryId?: string;
}
