// Furniture Dark Template — TypeScript Interfaces
// Dark theme (#181818 background), yellow-green accent (#EFF422→#B0BA38), Urbanist font.
// Faithful reproduction of "Akshan Furniture Store" dark mode.

// ── Re-exports from canonical types ──────────────────────────────────────────

export type {
  StoreInfo,
  Category,
  ProductImage,
  ColorOption,
  StorefrontProduct,
  StorefrontVariantGroup,
  StorefrontVariantOption,
} from "@/types/store";

export type { CartItem } from "@/types/cart";

// ── Local-only types ──────────────────────────────────────────────────────────

export type NavTab = "home" | "search" | "cart" | "info";

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

export interface CheckoutItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

/** Local checkout form — furniture-dark uses its own field names */
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

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  isCollapsed?: boolean;
}

export type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "newest";
