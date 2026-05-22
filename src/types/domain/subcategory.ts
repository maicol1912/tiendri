// Domain types — Subcategory
// Only used when catalog_mode = 'nested'.

export interface Subcategory {
  id: string;
  category_id: string;
  store_id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface CreateSubcategoryInput {
  name: string;
  slug: string;
  category_id: string;
  description?: string;
  image?: string;
  sort_order?: number;
}

export interface UpdateSubcategoryInput {
  name?: string;
  slug?: string;
  description?: string;
  image?: string;
  sort_order?: number;
}
