// Domain types barrel — re-exports all dashboard domain types.
// Import from here in dashboard pages/components.

export type { CategoryIcon, Category, CreateCategoryInput, UpdateCategoryInput } from './category';
export type { Subcategory, CreateSubcategoryInput, UpdateSubcategoryInput } from './subcategory';
export type {
  ProductImage,
  ProductVariant,
  Product,
  CreateProductInput,
  UpdateProductInput,
  ProductFilters,
} from './product';
export type { ActionResult } from './action-result';
export type {
  MediaAssetContext,
  MediaAsset,
  CreateMediaAssetInput,
  UpdateMediaAssetInput,
  MediaLibraryStats,
  MediaSearchFilters,
} from './media-asset';
