// Repository factory.
// Returns localStorage implementations for now.
// Future: check auth state and return Supabase implementations.

import {
  LocalCategoryRepository,
  LocalSubcategoryRepository,
  LocalProductRepository,
  LocalStoreRepository,
  LocalMediaRepository,
} from './local-storage';
import type {
  CategoryRepository,
  SubcategoryRepository,
  ProductRepository,
  StoreRepository,
  MediaRepository,
} from './interfaces';

const DEMO_STORE_ID = 'demo-store' as const;

/** Returns the active storeId. Fixed to 'demo-store' until auth is implemented. */
export function getStoreId(): string {
  return DEMO_STORE_ID;
}

// Singleton instances — created once at module level so hooks never get a new
// reference on re-render. This prevents useCallback dependency arrays from
// seeing a changed `repo` and triggering an infinite re-render loop.
const _categoryRepo: CategoryRepository = new LocalCategoryRepository();
const _subcategoryRepo: SubcategoryRepository = new LocalSubcategoryRepository();
const _productRepo: ProductRepository = new LocalProductRepository();
const _storeRepo: StoreRepository = new LocalStoreRepository();
const _mediaRepo: MediaRepository = new LocalMediaRepository();

export function getCategoryRepository(): CategoryRepository {
  return _categoryRepo;
}

export function getSubcategoryRepository(): SubcategoryRepository {
  return _subcategoryRepo;
}

export function getProductRepository(): ProductRepository {
  return _productRepo;
}

export function getStoreRepository(): StoreRepository {
  return _storeRepo;
}

export function getMediaRepository(): MediaRepository {
  return _mediaRepo;
}

/** Stable frozen object — same reference on every call. */
const _repositories = Object.freeze({
  categories: _categoryRepo,
  subcategories: _subcategoryRepo,
  products: _productRepo,
  store: _storeRepo,
  media: _mediaRepo,
});

/** Convenience — returns all repositories in one call (stable reference). */
export function getRepositories(): {
  readonly categories: CategoryRepository;
  readonly subcategories: SubcategoryRepository;
  readonly products: ProductRepository;
  readonly store: StoreRepository;
  readonly media: MediaRepository;
} {
  return _repositories;
}
