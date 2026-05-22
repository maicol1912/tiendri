'use client';

// Repository hooks for dashboard pages.
// Each hook manages state, calls repository methods, and exposes loading/error.

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getRepositories, getStoreId } from '@/lib/repositories';
import type { Category, CreateCategoryInput, UpdateCategoryInput } from '@/types/domain';
import type { Subcategory, CreateSubcategoryInput, UpdateSubcategoryInput } from '@/types/domain';
import type { Product, CreateProductInput, UpdateProductInput, ProductFilters } from '@/types/domain';

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

export function useCategories(storeId?: string): UseCategoriesReturn {
  const resolvedStoreId = storeId ?? getStoreId();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const repo = useMemo(() => getRepositories().categories, []);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await repo.list(resolvedStoreId);
      setCategories(data);
    } catch {
      setError('No se pudieron cargar las categorías.');
    } finally {
      setIsLoading(false);
    }
  }, [resolvedStoreId, repo]);

  useEffect(() => {
    void load();
  }, [load]);

  const create = useCallback(
    async (input: CreateCategoryInput): Promise<boolean> => {
      const result = await repo.create(resolvedStoreId, input);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [resolvedStoreId, load, repo]
  );

  const update = useCallback(
    async (id: string, input: UpdateCategoryInput): Promise<boolean> => {
      const result = await repo.update(resolvedStoreId, id, input);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [resolvedStoreId, load, repo]
  );

  const remove = useCallback(
    async (id: string): Promise<boolean> => {
      const result = await repo.delete(resolvedStoreId, id);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [resolvedStoreId, load, repo]
  );

  const reorder = useCallback(
    async (orderedIds: string[]): Promise<boolean> => {
      const result = await repo.reorder(resolvedStoreId, orderedIds);
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
    [resolvedStoreId, repo]
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

export function useSubcategories(storeId: string | undefined, categoryId: string): UseSubcategoriesReturn {
  const resolvedStoreId = storeId ?? getStoreId();
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const repo = useMemo(() => getRepositories().subcategories, []);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await repo.listByCategory(resolvedStoreId, categoryId);
      setSubcategories(data);
    } catch {
      setError('No se pudieron cargar las subcategorías.');
    } finally {
      setIsLoading(false);
    }
  }, [resolvedStoreId, categoryId, repo]);

  useEffect(() => {
    void load();
  }, [load]);

  const create = useCallback(
    async (input: CreateSubcategoryInput): Promise<boolean> => {
      const result = await repo.create(resolvedStoreId, input);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [resolvedStoreId, load, repo]
  );

  const update = useCallback(
    async (id: string, input: UpdateSubcategoryInput): Promise<boolean> => {
      const result = await repo.update(resolvedStoreId, id, input);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [resolvedStoreId, load, repo]
  );

  const remove = useCallback(
    async (
      id: string,
      orphanAction: 'move' | 'delete',
      targetSubcategoryId?: string
    ): Promise<boolean> => {
      const result = await repo.delete(resolvedStoreId, id, orphanAction, targetSubcategoryId);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [resolvedStoreId, load, repo]
  );

  const reorder = useCallback(
    async (orderedIds: string[]): Promise<boolean> => {
      const result = await repo.reorder(resolvedStoreId, categoryId, orderedIds);
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
    [resolvedStoreId, categoryId, repo]
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

export function useProducts(
  storeId?: string,
  filters?: ProductFilters
): UseProductsReturn {
  const resolvedStoreId = storeId ?? getStoreId();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const repo = useMemo(() => getRepositories().products, []);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await repo.list(resolvedStoreId, filters);
      setProducts(data);
    } catch {
      setError('No se pudieron cargar los productos.');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedStoreId, repo, JSON.stringify(filters)]);

  useEffect(() => {
    void load();
  }, [load]);

  const create = useCallback(
    async (input: CreateProductInput): Promise<boolean> => {
      const result = await repo.create(resolvedStoreId, input);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [resolvedStoreId, load, repo]
  );

  const update = useCallback(
    async (id: string, input: UpdateProductInput): Promise<boolean> => {
      const result = await repo.update(resolvedStoreId, id, input);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [resolvedStoreId, load, repo]
  );

  const remove = useCallback(
    async (id: string): Promise<boolean> => {
      const result = await repo.delete(resolvedStoreId, id);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [resolvedStoreId, load, repo]
  );

  const toggleAvailable = useCallback(
    async (id: string): Promise<boolean> => {
      const result = await repo.toggleAvailable(resolvedStoreId, id);
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
    [resolvedStoreId, repo]
  );

  const toggleFeatured = useCallback(
    async (id: string): Promise<boolean> => {
      const result = await repo.toggleFeatured(resolvedStoreId, id);
      if (result.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? result.data : p))
        );
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [resolvedStoreId, repo]
  );

  const reorder = useCallback(
    async (orderedIds: string[]): Promise<boolean> => {
      const result = await repo.reorder(resolvedStoreId, orderedIds);
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
    [resolvedStoreId, repo]
  );

  return {
    products,
    isLoading,
    error,
    create,
    update,
    remove,
    toggleAvailable,
    toggleFeatured,
    reorder,
    refresh: load,
  };
}
