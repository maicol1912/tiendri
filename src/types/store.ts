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
    youtube?: string;
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

// ── Composable template shared contracts ─────────────────────────────────────
// Superset interfaces used by cross-template adapters.
// Templates map their native types to these via toSharedStore / toSharedCategories.

export interface SharedStoreInfo {
  name: string;
  slug: string;
  logo?: string | null;
  description?: string | null;
  whatsapp?: string | null;
  social_links?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
  } | null;
}

export interface SharedCategory {
  id: string;
  name: string;
  image?: string | null;
  icon?: string | null;
}

export interface StorefrontProduct {
  id: string;
  name: string;
  /** Subtitle shown below the muted name (e.g. "Full Sleeve Zipper") */
  subtitle?: string;
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
