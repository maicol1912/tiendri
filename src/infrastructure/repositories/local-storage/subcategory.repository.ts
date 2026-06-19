// localStorage implementation of SubcategoryRepository.
// Only valid when catalog_mode = 'nested'.
// Cascade delete: subcategory → products (orphanAction: 'delete' | 'move').

import type {
  Subcategory,
  CreateSubcategoryInput,
  UpdateSubcategoryInput,
  ActionResult,
} from '@/types/domain';
import type { SubcategoryRepository } from '../interfaces';
import { subcategorySchema, updateSubcategorySchema } from '@/shared/validators/category.schema';

const STORE_ID = 'demo-store' as const;
const KEY = `tiendri_${STORE_ID}_subcategories`;
const PROD_KEY = `tiendri_${STORE_ID}_products`;
const MAX_PER_CATEGORY = 20;

// ── Helpers ───────────────────────────────────────────────────────────────────

function readAll(): Subcategory[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Subcategory[];
  } catch {
    return [];
  }
}

function writeAll(subcategories: Subcategory[]): void {
  localStorage.setItem(KEY, JSON.stringify(subcategories));
}

function slugExistsForOtherId(
  subcategories: Subcategory[],
  slug: string,
  categoryId: string,
  excludeId?: string
): boolean {
  // Slug uniqueness is scoped to category
  return subcategories.some(
    (s) => s.category_id === categoryId && s.slug === slug && s.id !== excludeId
  );
}

function err(code: string, message: string, field?: string): ActionResult<never> {
  return { success: false, error: { code, message, field } };
}

// ── Repository ────────────────────────────────────────────────────────────────

export class LocalSubcategoryRepository implements SubcategoryRepository {
  async listByCategory(storeId: string, categoryId: string): Promise<Subcategory[]> {
    return readAll()
      .filter((s) => s.store_id === storeId && s.category_id === categoryId)
      .sort((a, b) => a.sort_order - b.sort_order);
  }

  async getById(storeId: string, id: string): Promise<Subcategory | null> {
    return readAll().find((s) => s.store_id === storeId && s.id === id) ?? null;
  }

  async create(storeId: string, input: CreateSubcategoryInput): Promise<ActionResult<Subcategory>> {
    const validation = subcategorySchema.safeParse(input);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      const field = typeof firstError?.path[0] === 'string' ? firstError.path[0] : undefined;
      return err('VALIDATION_ERROR', firstError?.message ?? 'Datos inválidos.', field);
    }

    const all = readAll();
    const categorySubcats = all.filter(
      (s) => s.store_id === storeId && s.category_id === input.category_id
    );

    if (categorySubcats.length >= MAX_PER_CATEGORY) {
      return err(
        'VALIDATION_ERROR',
        `Solo se permiten hasta ${MAX_PER_CATEGORY} subcategorías por categoría.`
      );
    }

    if (slugExistsForOtherId(all, input.slug, input.category_id)) {
      return err('SLUG_TAKEN', 'Ya existe una subcategoría con ese slug en esta categoría.', 'slug');
    }

    const now = new Date().toISOString();
    const subcategory: Subcategory = {
      id: crypto.randomUUID(),
      store_id: storeId,
      category_id: input.category_id,
      name: input.name,
      slug: input.slug,
      description: input.description,
      image: input.image,
      sort_order: input.sort_order ?? categorySubcats.length,
      created_at: now,
      updated_at: now,
    };

    writeAll([...all, subcategory]);
    return { success: true, data: subcategory };
  }

  async update(
    storeId: string,
    id: string,
    input: UpdateSubcategoryInput
  ): Promise<ActionResult<Subcategory>> {
    const validation = updateSubcategorySchema.safeParse(input);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      const field = typeof firstError?.path[0] === 'string' ? firstError.path[0] : undefined;
      return err('VALIDATION_ERROR', firstError?.message ?? 'Datos inválidos.', field);
    }

    const all = readAll();
    const index = all.findIndex((s) => s.store_id === storeId && s.id === id);

    if (index === -1) {
      return err('NOT_FOUND', 'Subcategoría no encontrada.');
    }

    const current = all[index];

    if (input.slug && slugExistsForOtherId(all, input.slug, current.category_id, id)) {
      return err('SLUG_TAKEN', 'Ya existe una subcategoría con ese slug en esta categoría.', 'slug');
    }

    const updated: Subcategory = {
      ...current,
      ...input,
      updated_at: new Date().toISOString(),
    };

    const next = [...all];
    next[index] = updated;
    writeAll(next);
    return { success: true, data: updated };
  }

  async delete(
    storeId: string,
    id: string,
    orphanAction: 'move' | 'delete',
    targetSubcategoryId?: string
  ): Promise<ActionResult<void>> {
    const all = readAll();
    const exists = all.some((s) => s.store_id === storeId && s.id === id);

    if (!exists) {
      return err('NOT_FOUND', 'Subcategoría no encontrada.');
    }

    if (orphanAction === 'move' && !targetSubcategoryId) {
      return err(
        'VALIDATION_ERROR',
        'Debes indicar la subcategoría destino para mover los productos.'
      );
    }

    // Handle orphaned products
    try {
      const rawProds = localStorage.getItem(PROD_KEY);
      if (rawProds) {
        const allProds: Array<{
          id: string;
          store_id: string;
          subcategory_id?: string | null;
          updated_at: string;
        }> = JSON.parse(rawProds);

        const updatedProds = allProds.map((p) => {
          if (p.store_id !== storeId || p.subcategory_id !== id) return p;

          if (orphanAction === 'move') {
            return {
              ...p,
              subcategory_id: targetSubcategoryId ?? null,
              updated_at: new Date().toISOString(),
            };
          }
          // orphanAction === 'delete' — mark for removal (handled below)
          return { ...p, __delete: true };
        });

        if (orphanAction === 'delete') {
          const remaining = updatedProds.filter(
            (p) => !(p as { __delete?: boolean }).__delete
          );
          localStorage.setItem(PROD_KEY, JSON.stringify(remaining));
        } else {
          localStorage.setItem(PROD_KEY, JSON.stringify(updatedProds));
        }
      }
    } catch {
      // Best-effort cascade
    }

    const remaining = all.filter((s) => !(s.store_id === storeId && s.id === id));
    writeAll(remaining);
    return { success: true, data: undefined };
  }

  async reorder(
    storeId: string,
    categoryId: string,
    orderedIds: string[]
  ): Promise<ActionResult<void>> {
    const all = readAll();
    const categorySubcats = all.filter(
      (s) => s.store_id === storeId && s.category_id === categoryId
    );

    const idsSet = new Set(categorySubcats.map((s) => s.id));
    const allExist = orderedIds.every((id) => idsSet.has(id));
    if (!allExist) {
      return err('NOT_FOUND', 'Una o más subcategorías no fueron encontradas.');
    }

    const orderMap = new Map(orderedIds.map((id, index) => [id, index]));

    const updated = all.map((s) => {
      if (s.store_id !== storeId || s.category_id !== categoryId) return s;
      const newOrder = orderMap.get(s.id);
      if (newOrder === undefined) return s;
      return { ...s, sort_order: newOrder, updated_at: new Date().toISOString() };
    });

    writeAll(updated);
    return { success: true, data: undefined };
  }

  async deleteAllByCategory(storeId: string, categoryId: string): Promise<void> {
    const all = readAll();
    const remaining = all.filter(
      (s) => !(s.store_id === storeId && s.category_id === categoryId)
    );
    writeAll(remaining);
    // Note: products cascade is handled by LocalCategoryRepository.delete()
  }
}
