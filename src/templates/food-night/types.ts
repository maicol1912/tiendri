// Food Night Template — TypeScript Interfaces
// Dark pizza/food delivery app theme.
// Background: var(--t-background), accent: var(--t-primary).

export type { StoreInfo, StorefrontProduct, ProductImage, ColorOption, Category, StorefrontVariantGroup, StorefrontVariantOption } from "@/types/store";

export interface SizeOption {
  id: string;
  label: string;
}

export type NavTab = "home" | "search" | "cart" | "info";

export interface CheckoutItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
  variantName?: string | null;
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

export type SortOption = "recent" | "price-asc" | "price-desc" | "rating";
