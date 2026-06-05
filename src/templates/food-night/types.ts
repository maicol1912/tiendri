// Food Night Template — TypeScript Interfaces
// Dark pizza/food delivery app theme.
// Background: var(--t-background), accent: var(--t-primary).

export interface StoreInfo {
  name: string;
  logo: string | null;
  slug: string;
  avatar?: string | null;
  greeting?: string;
  whatsapp?: string;
  social_links?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface Category {
  id: string;
  name: string;
}

export interface ProductImage {
  url: string;
  sort_order: number;
}

export interface StorefrontProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price?: number | null;
  images: ProductImage[];
  available: boolean;
  description?: string;
  rating?: number;
  reviewCount?: number;
  inWishlist?: boolean;
  categoryId?: string;
}

export interface SizeOption {
  id: string;
  label: string;
}

export type NavTab = "home" | "search" | "cart" | "info";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
  sizeLabel?: string | null;
  rating?: number;
  reviewCount?: number;
}

export interface CheckoutItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
  sizeLabel?: string | null;
}

export interface CheckoutFormData {
  nombre: string;
  whatsapp: string;
  email: string;
  direccion: string;
  notas: string;
}

export interface HomeSectionConfig {
  id: string;
  visible: boolean;
}
