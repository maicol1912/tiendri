// Electronics Classic Template — TypeScript types
// Blue #0079EB primary, Inter font, "TronMart" style.

export interface StorefrontProduct {
  id: string;
  name: string;
  price: number;
  compare_at_price: number | null;
  images: Array<{ url: string; sort_order: number }>;
  available: boolean;
  description?: string;
  rating?: number;
  reviewCount?: number;
  category?: string;
  subtitle?: string;
}

export interface StorefrontCategory {
  id: string;
  name: string;
  image: string | null;
  productCount?: number;
}

export interface StorefrontStore {
  name: string;
  logo: string | null;
  slug: string;
  whatsapp?: string;
  phone?: string;
  social_links?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    twitter?: string;
    youtube?: string;
  };
}

export type NavTab = "home" | "search" | "cart" | "wishlist" | "account";

export interface HeroBanner {
  id: string;
  image: string;
  headline: string;
  subtext: string;
  ctaLabel: string;
}

export interface PromoBanner {
  id: string;
  headline: string;
  subtext?: string;
  ctaLabel: string;
  image: string;
  bgColor?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  avatar: string | null;
  text: string;
  rating: number;
}

export interface BrandLogo {
  id: string;
  name: string;
  image: string;
}

export interface CartItem {
  productId: string;
  variantName?: string | null;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
  rating?: number;
  reviewCount?: number;
}

export interface CheckoutFormData {
  nombre: string;
  whatsapp: string;
  email: string;
  direccion: string;
  notas: string;
}

export interface ProductSection {
  id: string;
  title: string;
  products: StorefrontProduct[];
}

export interface FeatureCard {
  id: string;
  title: string;
  image: string;
  bgColor?: string;
}

export interface ProductReview {
  id: string;
  name: string;
  email?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductFeature {
  id: string;
  label: string;
}

export interface ProductAbout {
  headline: string;
  description: string;
  image: string;
  caption: string;
  subcaption: string;
}

export interface FeatureShowcase {
  id: string;
  subtitle: string;
  headline: string;
  description: string;
  image: string;
}

export type SortOption =
  | "latest"
  | "price-high"
  | "price-low"
  | "name-asc"
  | "name-desc";
