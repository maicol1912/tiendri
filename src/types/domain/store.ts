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
  hours?: string;
  paymentMethods?: string[];
  shippingInfo?: string;
  social_links?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    twitter?: string;
    youtube?: string;
  };
}

// ── Shared catalog types ──────────────────────────────────────────────────────

export interface StorefrontCategory {
  id: string;
  name: string;
  slug: string;
  /** Lucide icon name — e.g. "Smartphone", "Watch", "Camera" */
  icon: string;
  image?: string;
  productCount?: number;
}

export interface ColorOption {
  id: string;
  label: string;
  hex: string;
}

export interface StorefrontProductImage {
  url: string;
  sort_order: number;
  alt?: string;
}

export interface StorefrontVariantOption {
  id: string;
  label: string;
  value?: string;
  priceModifier?: number;
  available?: boolean;
}

export interface StorefrontVariantGroup {
  id: string;
  label: string;
  type: 'color' | 'size' | 'storage' | 'custom';
  options: StorefrontVariantOption[];
}

export interface StorefrontProduct {
  id: string;
  name: string;
  /** Subtitle shown below the muted name (e.g. "Full Sleeve Zipper") */
  subtitle?: string;
  slug: string;
  price: number;
  originalPrice?: number | null;
  images: StorefrontProductImage[];
  description?: string;
  specs?: string[];
  rating?: number;
  reviewCount?: number;
  colors?: ColorOption[];
  storageOptions?: string[];
  variants?: StorefrontVariantGroup[];
  inStock: boolean;
  inWishlist?: boolean;
  categoryId: string;
  subcategoryId?: string;
}
