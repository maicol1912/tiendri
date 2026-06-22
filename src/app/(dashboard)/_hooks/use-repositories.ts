'use client';

// Repository hooks for dashboard pages.
// Each hook manages state, calls Server Actions directly, and exposes loading/error.

import { useState, useEffect, useCallback } from 'react';
import type { Category, CreateCategoryInput, UpdateCategoryInput } from '@/types/domain';
import type { Subcategory, CreateSubcategoryInput, UpdateSubcategoryInput } from '@/types/domain';
import type { Product, CreateProductInput, UpdateProductInput, ProductFilters } from '@/types/domain';
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
} from '../dashboard/_actions/categories';
import {
  listSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  reorderSubcategories,
} from '../dashboard/_actions/subcategories';
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  reorderProducts,
  toggleAvailable,
  toggleFeatured,
} from '../dashboard/_actions/products';

// ── useCategories ─────────────────────────────────────────────────────────────

export interface UseCategoriesReturn {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  create: (input: CreateCategoryInput) => Promise<boolean>;
  update: (id: string, input: UpdateCategoryInput) => Promise<boolean>;
  remove: (id: string) => Promise<boolean>;
  reorder: (orderedIds: string[]) => Promise<boolean>;
  refresh: () => Promise<void>;
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await listCategories();
      setCategories(data);
    } catch {
      setError('No se pudieron cargar las categorías.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const create = useCallback(
    async (input: CreateCategoryInput): Promise<boolean> => {
      const result = await createCategory(input);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [load]
  );

  const update = useCallback(
    async (id: string, input: UpdateCategoryInput): Promise<boolean> => {
      const result = await updateCategory(id, input);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [load]
  );

  const remove = useCallback(
    async (id: string): Promise<boolean> => {
      const result = await deleteCategory(id);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [load]
  );

  const reorder = useCallback(
    async (orderedIds: string[]): Promise<boolean> => {
      const result = await reorderCategories(orderedIds);
      if (result.success) {
        // Optimistic update — reorder locally without reload
        setCategories((prev) => {
          const map = new Map(prev.map((c) => [c.id, c]));
          return orderedIds
            .map((id, index) => {
              const cat = map.get(id);
              if (!cat) return null;
              return { ...cat, sort_order: index };
            })
            .filter((c): c is Category => c !== null);
        });
        return true;
      }
      setError(result.error.message);
      return false;
    },
    []
  );

  return { categories, isLoading, error, create, update, remove, reorder, refresh: load };
}

// ── useSubcategories ──────────────────────────────────────────────────────────

export interface UseSubcategoriesReturn {
  subcategories: Subcategory[];
  isLoading: boolean;
  error: string | null;
  create: (input: CreateSubcategoryInput) => Promise<boolean>;
  update: (id: string, input: UpdateSubcategoryInput) => Promise<boolean>;
  remove: (
    id: string,
    orphanAction: 'move' | 'delete',
    targetSubcategoryId?: string
  ) => Promise<boolean>;
  reorder: (orderedIds: string[]) => Promise<boolean>;
  refresh: () => Promise<void>;
}

export function useSubcategories(categoryId: string): UseSubcategoriesReturn {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await listSubcategories(categoryId);
      setSubcategories(data);
    } catch {
      setError('No se pudieron cargar las subcategorías.');
    } finally {
      setIsLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    void load();
  }, [load]);

  const create = useCallback(
    async (input: CreateSubcategoryInput): Promise<boolean> => {
      const result = await createSubcategory(input);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [load]
  );

  const update = useCallback(
    async (id: string, input: UpdateSubcategoryInput): Promise<boolean> => {
      const result = await updateSubcategory(id, input);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [load]
  );

  const remove = useCallback(
    async (
      id: string,
      orphanAction: 'move' | 'delete',
      targetSubcategoryId?: string
    ): Promise<boolean> => {
      const result = await deleteSubcategory(id, orphanAction, targetSubcategoryId);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [load]
  );

  const reorder = useCallback(
    async (orderedIds: string[]): Promise<boolean> => {
      const result = await reorderSubcategories(categoryId, orderedIds);
      if (result.success) {
        setSubcategories((prev) => {
          const map = new Map(prev.map((s) => [s.id, s]));
          return orderedIds
            .map((id, index) => {
              const sub = map.get(id);
              if (!sub) return null;
              return { ...sub, sort_order: index };
            })
            .filter((s): s is Subcategory => s !== null);
        });
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [categoryId]
  );

  return { subcategories, isLoading, error, create, update, remove, reorder, refresh: load };
}

// ── useProducts ───────────────────────────────────────────────────────────────

export interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  create: (input: CreateProductInput) => Promise<boolean>;
  update: (id: string, input: UpdateProductInput) => Promise<boolean>;
  remove: (id: string) => Promise<boolean>;
  toggleAvailable: (id: string) => Promise<boolean>;
  toggleFeatured: (id: string) => Promise<boolean>;
  reorder: (orderedIds: string[]) => Promise<boolean>;
  refresh: () => Promise<void>;
}

export function useProducts(filters?: ProductFilters): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filtersKey = JSON.stringify(filters);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await listProducts(filters);
      setProducts(data);
    } catch {
      setError('No se pudieron cargar los productos.');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey]);

  useEffect(() => {
    void load();
  }, [load]);

  const create = useCallback(
    async (input: CreateProductInput): Promise<boolean> => {
      const result = await createProduct(input);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [load]
  );

  const update = useCallback(
    async (id: string, input: UpdateProductInput): Promise<boolean> => {
      const result = await updateProduct(id, input);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [load]
  );

  const remove = useCallback(
    async (id: string): Promise<boolean> => {
      const result = await deleteProduct(id);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [load]
  );

  const handleToggleAvailable = useCallback(
    async (id: string): Promise<boolean> => {
      const result = await toggleAvailable(id);
      if (result.success) {
        // Optimistic update
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? result.data : p))
        );
        return true;
      }
      setError(result.error.message);
      return false;
    },
    []
  );

  const handleToggleFeatured = useCallback(
    async (id: string): Promise<boolean> => {
      const result = await toggleFeatured(id);
      if (result.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? result.data : p))
        );
        return true;
      }
      setError(result.error.message);
      return false;
    },
    []
  );

  const reorder = useCallback(
    async (orderedIds: string[]): Promise<boolean> => {
      const result = await reorderProducts(orderedIds);
      if (result.success) {
        setProducts((prev) => {
          const map = new Map(prev.map((p) => [p.id, p]));
          return orderedIds
            .map((id, index) => {
              const prod = map.get(id);
              if (!prod) return null;
              return { ...prod, sort_order: index };
            })
            .filter((p): p is Product => p !== null);
        });
        return true;
      }
      setError(result.error.message);
      return false;
    },
    []
  );

  return {
    products,
    isLoading,
    error,
    create,
    update,
    remove,
    toggleAvailable: handleToggleAvailable,
    toggleFeatured: handleToggleFeatured,
    reorder,
    refresh: load,
  };
}
