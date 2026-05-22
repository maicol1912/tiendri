// localStorage implementation of CategoryRepository.
// All operations are wrapped in try/catch with ActionResult errors.
// Cascade delete: category → subcategories → products (via SubcategoryRepo + ProductRepo).

import type { Category, CreateCategoryInput, UpdateCategoryInput, ActionResult } from '@/types/domain';
import type { CategoryRepository } from '../interfaces';

const STORE_ID = 'demo-store' as const;
const KEY = `tiendri_${STORE_ID}_categories`;
const MAX_CATEGORIES = 50;

// ── Helpers ───────────────────────────────────────────────────────────────────

function readAll(): Category[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Category[];
  } catch {
    return [];
  }
}

function writeAll(categories: Category[]): void {
  localStorage.setItem(KEY, JSON.stringify(categories));
}

function slugExistsForOtherId(categories: Category[], slug: string, excludeId?: string): boolean {
  return categories.some((c) => c.slug === slug && c.id !== excludeId);
}

function err(code: string, message: string, field?: string): ActionResult<never> {
  return { success: false, error: { code, message, field } };
}

// ── Repository ────────────────────────────────────────────────────────────────

export class LocalCategoryRepository implements CategoryRepository {
  async list(storeId: string): Promise<Category[]> {
    const all = readAll();
    return all
      .filter((c) => c.store_id === storeId)
      .sort((a, b) => a.sort_order - b.sort_order);
  }

  async getById(storeId: string, id: string): Promise<Category | null> {
    const all = readAll();
    return all.find((c) => c.store_id === storeId && c.id === id) ?? null;
  }

  async create(storeId: string, input: CreateCategoryInput): Promise<ActionResult<Category>> {
    const all = readAll();
    const storeCategories = all.filter((c) => c.store_id === storeId);

    if (storeCategories.length >= MAX_CATEGORIES) {
      return err('VALIDATION_ERROR', `Solo se permiten hasta ${MAX_CATEGORIES} categorías por tienda.`);
    }

    if (slugExistsForOtherId(storeCategories, input.slug)) {
      return err('SLUG_TAKEN', 'Ya existe una categoría con ese slug.', 'slug');
    }

    const now = new Date().toISOString();
    const category: Category = {
      id: crypto.randomUUID(),
      store_id: storeId,
      name: input.name,
      slug: input.slug,
      description: input.description,
      image: input.image,
      icon: input.icon,
      sort_order: input.sort_order ?? storeCategories.length,
      created_at: now,
      updated_at: now,
    };

    writeAll([...all, category]);
    return { success: true, data: category };
  }

  async update(
    storeId: string,
    id: string,
    input: UpdateCategoryInput
  ): Promise<ActionResult<Category>> {
    const all = readAll();
    const index = all.findIndex((c) => c.store_id === storeId && c.id === id);

    if (index === -1) {
      return err('NOT_FOUND', 'Categoría no encontrada.');
    }

    const storeCategories = all.filter((c) => c.store_id === storeId);

    if (input.slug && slugExistsForOtherId(storeCategories, input.slug, id)) {
      return err('SLUG_TAKEN', 'Ya existe una categoría con ese slug.', 'slug');
    }

    const updated: Category = {
      ...all[index],
      ...input,
      updated_at: new Date().toISOString(),
    };

    const next = [...all];
    next[index] = updated;
    writeAll(next);
    return { success: true, data: updated };
  }

  async delete(storeId: string, id: string): Promise<ActionResult<void>> {
    const all = readAll();
    const exists = all.some((c) => c.store_id === storeId && c.id === id);

    if (!exists) {
      return err('NOT_FOUND', 'Categoría no encontrada.');
    }

    // Cascade: delete subcategories (which in turn delete their products)
    // Done inline to avoid circular dependency — direct localStorage access
    const subcatKey = `tiendri_${STORE_ID}_subcategories`;
    const prodKey = `tiendri_${STORE_ID}_products`;

    try {
      const rawSubcats = localStorage.getItem(subcatKey);
      if (rawSubcats) {
        const allSubcats: Array<{ id: string; category_id: string; store_id: string }> =
          JSON.parse(rawSubcats);
        const subcatIdsToDelete = allSubcats
          .filter((s) => s.store_id === storeId && s.category_id === id)
          .map((s) => s.id);

        // Remove subcategories belonging to this category
        const remainingSubcats = allSubcats.filter(
          (s) => !(s.store_id === storeId && s.category_id === id)
        );
        localStorage.setItem(subcatKey, JSON.stringify(remainingSubcats));

        // Remove products belonging to the deleted subcategories OR the category directly
        const rawProds = localStorage.getItem(prodKey);
        if (rawProds) {
          const allProds: Array<{
            id: string;
            category_id: string;
            subcategory_id?: string | null;
            store_id: string;
          }> = JSON.parse(rawProds);

          const remainingProds = allProds.filter((p) => {
            if (p.store_id !== storeId) return true;
            if (p.category_id === id) return false;
            if (p.subcategory_id && subcatIdsToDelete.includes(p.subcategory_id)) return false;
            return true;
          });
          localStorage.setItem(prodKey, JSON.stringify(remainingProds));
        }
      }
    } catch {
      // Cascade best-effort — don't block category delete
    }

    const remaining = all.filter((c) => !(c.store_id === storeId && c.id === id));
    writeAll(remaining);
    return { success: true, data: undefined };
  }

  async reorder(storeId: string, orderedIds: string[]): Promise<ActionResult<void>> {
    const all = readAll();
    const storeCategories = all.filter((c) => c.store_id === storeId);

    const idsSet = new Set(storeCategories.map((c) => c.id));
    const allExist = orderedIds.every((id) => idsSet.has(id));
    if (!allExist) {
      return err('NOT_FOUND', 'Una o más categorías no fueron encontradas.');
    }

    const orderMap = new Map(orderedIds.map((id, index) => [id, index]));

    const updated = all.map((c) => {
      if (c.store_id !== storeId) return c;
      const newOrder = orderMap.get(c.id);
      if (newOrder === undefined) return c;
      return { ...c, sort_order: newOrder, updated_at: new Date().toISOString() };
    });

    writeAll(updated);
    return { success: true, data: undefined };
  }

  async count(storeId: string): Promise<number> {
    return readAll().filter((c) => c.store_id === storeId).length;
  }
}
