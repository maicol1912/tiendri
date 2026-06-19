// Domain types — Category & Subcategory
// These are canonical DB-aligned types used in the dashboard.
// Templates use the lighter Category from src/types/store.ts.

export type CategoryIcon =
  | 'Smartphone'
  | 'Watch'
  | 'Camera'
  | 'Laptop'
  | 'Headphones'
  | 'Tv'
  | 'Shirt'
  | 'ShoppingBag'
  | 'Home'
  | 'Sofa'
  | 'Utensils'
  | 'Car'
  | 'Bike'
  | 'Dumbbell'
  | 'Book'
  | 'Music'
  | 'Gamepad2'
  | 'Baby'
  | 'Dog'
  | 'Flower2';

export interface Category {
  id: string;
  store_id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon: CategoryIcon;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Single source of truth — derived from Zod schemas in validators/category.schema.ts.
export type { CreateCategoryInput, UpdateCategoryInput } from "@/shared/validators/category.schema";
