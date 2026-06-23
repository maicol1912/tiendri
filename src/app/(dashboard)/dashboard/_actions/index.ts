// Server Actions barrel — re-export from domain action files.
// Import from here in dashboard pages and components:
//   import { getStore, updateCatalogMode } from '@/app/(dashboard)/dashboard/_actions'

export { getStore, updateCatalogMode, getStoreId, getChecklistState } from './store'
export type { ChecklistState } from './store'
export {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
  countCategories,
} from './categories'
export {
  listSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  reorderSubcategories,
  deleteAllByCategory,
} from './subcategories'
export {
  listProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  reorderProducts,
  toggleAvailable,
  toggleFeatured,
  countProducts,
  countProductsByCategory,
  switchCatalogModeToSimple,
} from './products'
export {
  uploadMediaAsset,
  listMediaAssets,
  searchMediaAssets,
  getMediaAssetById,
  updateMediaAssetAlt,
  deleteMediaAsset,
  getMediaStats,
  resolveMediaUrl,
  resolveMediaUrls,
} from './media'
