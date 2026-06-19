// Domain types — Product (dashboard/DB-aligned)
// Distinct from StorefrontProduct in store.ts which is display-optimized for templates.

export interface ProductImage {
  id: string;
  product_id: string;
  store_id: string;
  /** base64 data URL — used for localStorage phase; replaced by CDN URL in Supabase phase */
  url: string;
  sort_order: number;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  /** Integer offset in store currency — can be negative */
  price_modifier: number;
  created_at: string;
}

/**
 * UI-layer representation of a product variant.
 * Uses camelCase for form state and editor components.
 * Adapter boundary: DB reads map price_modifier → priceModifier,
 * writes map priceModifier → price_modifier.
 */
export interface UIProductVariant {
  id: string;
  name: string;
  priceModifier: number;
}

export interface Product {
  id: string;
  store_id: string;
  category_id: string;
  subcategory_id?: string | null;
  name: string;
  slug: string;
  /** Max 300 characters */
  description: string;
  /** Price in store currency as integer >= 0 */
  price: number;
  /** Must be positive integer or null */
  compare_at_price?: number | null;
  available: boolean;
  featured: boolean;
  sort_order: number;
  /** Max 4 images */
  images: ProductImage[];
  variants: ProductVariant[];
  created_at: string;
  updated_at: string;
}

export interface CreateProductInput {
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price?: number | null;
  category_id: string;
  subcategory_id?: string | null;
  available?: boolean;
  featured?: boolean;
  sort_order?: number;
  images?: Omit<ProductImage, 'id' | 'product_id' | 'store_id' | 'created_at'>[];
  variants?: Omit<ProductVariant, 'id' | 'product_id' | 'created_at'>[];
}

export interface UpdateProductInput {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  compare_at_price?: number | null;
  category_id?: string;
  subcategory_id?: string | null;
  available?: boolean;
  featured?: boolean;
  sort_order?: number;
  images?: Omit<ProductImage, 'id' | 'product_id' | 'store_id' | 'created_at'>[];
  variants?: Omit<ProductVariant, 'id' | 'product_id' | 'created_at'>[];
}

export interface ProductFilters {
  categoryId?: string;
  subcategoryId?: string;
  available?: boolean;
  featured?: boolean;
  search?: string;
}
