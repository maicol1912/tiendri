// Domain types barrel — re-exports all dashboard domain types.
// Import from here in dashboard pages/components.

export type { CategoryIcon, Category, CreateCategoryInput, UpdateCategoryInput } from './category';
export type { Subcategory, CreateSubcategoryInput, UpdateSubcategoryInput } from './subcategory';
export type {
  ProductImage,
  ProductVariant,
  UIProductVariant,
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
export type {
  Store,
  StoreInfo,
  ColorOption,
  StorefrontVariantOption,
  StorefrontVariantGroup,
  StorefrontProduct,
} from './store';
export type { CartItem, Cart, CheckoutFormData } from './cart';
export type {
  VibeId,
  CatalogMode,
  OnboardingStep,
  AccentColor,
  OnboardingState,
} from './onboarding';
export { INITIAL_ONBOARDING_STATE } from './onboarding';
