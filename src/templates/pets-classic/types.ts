// Pets Classic Template — TypeScript Interfaces
// Light theme, warm orange (#FFAF42) accent, Poppins font.
// Config-driven: ALL colors via var(--t-*), ZERO hardcoded.

export interface StoreInfo {
  name: string;
  logo: string | null;
  slug: string;
  whatsapp?: string;
  social_links?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    twitter?: string;
    youtube?: string;
  };
}

export type PetsClassicCategoryIconName =
  | "utensils"
  | "bone"
  | "flask-conical"
  | "scissors"
  | "wrench"
  | "shirt"
  | "heart"
  | "star"
  | "package"
  | "shopping-bag";

export interface PetsClassicCategory {
  id: string;
  name: string;
  iconName: PetsClassicCategoryIconName;
  /** Path to the SVG icon asset */
  iconSrc: string;
}

export interface ProductImage {
  url: string;
  sort_order: number;
}

export interface PetsClassicProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price: number | null;
  images: ProductImage[];
  available: boolean;
  featured?: boolean;
  inWishlist?: boolean;
  categoryId?: string;
  rating?: number;
  description?: string;
  tags?: string[];
}

export interface PromoSlide {
  id: string;
  badge?: string;
  headline: string;
  subtext?: string;
  ctaText?: string;
  imageUrl: string;
  secondaryImageUrl?: string;
  bgColor?: string;
  imagePosition?: string;
}

export type NavTab = "home" | "wishlist" | "cart" | "profile" | "listing";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
}

export interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
  notes: string;
}
