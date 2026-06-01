// Furniture Dark Template — TypeScript Interfaces
// Dark theme (#181818 background), yellow-green accent (#EFF422→#B0BA38), Urbanist font.
// Faithful reproduction of "Akshan Furniture Store" dark mode.

export interface StorefrontStore {
  name: string;
  logo: string | null;
  slug: string;
  whatsapp?: string;
  description?: string;
  social_links?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface StorefrontCategory {
  id: string;
  name: string;
  /** Lifestyle/room photo — uses object-cover. Circular display. */
  image: string | null;
}

export interface StorefrontProductImage {
  url: string;
  alt?: string;
  sort_order?: number;
}

export interface ColorOption {
  id: string;
  /** CSS hex color string e.g. "#C4A07A" */
  hex: string;
  name: string;
}

export interface StorefrontProduct {
  id: string;
  name: string;
  price: number;
  /** Original/compare-at price for discount badge */
  originalPrice?: number;
  images: StorefrontProductImage[];
  /** Convenience alias for images[0].url */
  image?: string;
  available?: boolean;
  description?: string;
  /** Average rating 0–5 */
  rating?: number;
  /** Number of reviews e.g. 1300 */
  reviewCount?: number;
  /** Whether product is in wishlist (visual only) */
  inWishlist?: boolean;
  /** Category this product belongs to */
  categoryId?: string;
  /** Available colors */
  colors?: ColorOption[];
}

export type NavTab = "home" | "search" | "cart" | "wishlist" | "account";

export interface PromoCard {
  id: string;
  title: string;
  tag?: string;
  ctaLabel?: string;
  /** Banner/hero image — uses object-cover */
  image: string;
  /** Background color of card — defaults to #242424 */
  bgColor?: string;
}

export interface VideoData {
  /** Poster/thumbnail image displayed as background */
  posterImage: string;
  /** Optional: video source URL */
  videoUrl?: string;
  title?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  /** Thumbnail image URL */
  image: string;
  rating?: number;
  reviewCount?: number;
  colorId?: string;
}

export interface CheckoutItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  notes: string;
}

export interface CategoryCardData {
  id: string;
  name: string;
  /** Full lifestyle/room image — uses object-cover on full-width card */
  image: string;
  productCount?: number;
}

export interface CategoryBannerData {
  /** Full-width lifestyle image */
  image: string;
  title?: string;
  /** Category or collection name shown as pill overlay */
  categoryName?: string;
  headline?: string;
  subtext?: string;
}

export type ViewMode = "grid" | "list";
