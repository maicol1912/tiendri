// localStorage implementation of ProductRepository.
// Images stored as base64 data URLs (localStorage phase).
// Max 1000 products, max 4 images per product.

import type {
  Product,
  ProductImage,
  ProductVariant,
  CreateProductInput,
  UpdateProductInput,
  ProductFilters,
  ActionResult,
} from '@/types/domain';
import type { ProductRepository } from '../interfaces';
import { productSchema, updateProductSchema } from '@/shared/validators/product.schema';

const STORE_ID = 'demo-store' as const;
const KEY = `tiendri_${STORE_ID}_products`;
const MAX_PRODUCTS = 1000;
const MAX_IMAGES = 4;

// ── Helpers ───────────────────────────────────────────────────────────────────

function readAll(): Product[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Product[];
  } catch {
    return [];
  }
}

function writeAll(products: Product[]): void {
  localStorage.setItem(KEY, JSON.stringify(products));
}

function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  return products.filter((p) => {
    if (filters.categoryId && p.category_id !== filters.categoryId) return false;
    if (filters.subcategoryId && p.subcategory_id !== filters.subcategoryId) return false;
    if (filters.available !== undefined && p.available !== filters.available) return false;
    if (filters.featured !== undefined && p.featured !== filters.featured) return false;
    if (filters.search) {
      const term = filters.search.toLowerCase();
      if (!p.name.toLowerCase().includes(term) && !p.description.toLowerCase().includes(term)) {
        return false;
      }
    }
    return true;
  });
}

function buildImages(
  productId: string,
  storeId: string,
  inputs: Omit<ProductImage, 'id' | 'product_id' | 'store_id' | 'created_at'>[]
): ProductImage[] {
  const now = new Date().toISOString();
  return inputs.map((img) => ({
    id: crypto.randomUUID(),
    product_id: productId,
    store_id: storeId,
    url: img.url,
    sort_order: img.sort_order,
    created_at: now,
  }));
}

function buildVariants(
  productId: string,
  inputs: Omit<ProductVariant, 'id' | 'product_id' | 'created_at'>[]
): ProductVariant[] {
  const now = new Date().toISOString();
  return inputs.map((v) => ({
    id: crypto.randomUUID(),
    product_id: productId,
    name: v.name,
    price_modifier: v.price_modifier,
    created_at: now,
  }));
}

function err(code: string, message: string, field?: string): ActionResult<never> {
  return { success: false, error: { code, message, field } };
}

// ── Repository ────────────────────────────────────────────────────────────────

export class LocalProductRepository implements ProductRepository {
  async list(storeId: string, filters?: ProductFilters): Promise<Product[]> {
    const storeProducts = readAll()
      .filter((p) => p.store_id === storeId)
      .sort((a, b) => a.sort_order - b.sort_order);

    return filters ? applyFilters(storeProducts, filters) : storeProducts;
  }

  async getById(storeId: string, id: string): Promise<Product | null> {
    return readAll().find((p) => p.store_id === storeId && p.id === id) ?? null;
  }

  async getBySlug(storeId: string, slug: string): Promise<Product | null> {
    return readAll().find((p) => p.store_id === storeId && p.slug === slug) ?? null;
  }

  async create(storeId: string, input: CreateProductInput): Promise<ActionResult<Product>> {
    const validation = productSchema.safeParse(input);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      const field = typeof firstError?.path[0] === 'string' ? firstError.path[0] : undefined;
      return err('VALIDATION_ERROR', firstError?.message ?? 'Datos inválidos.', field);
    }

    const all = readAll();
    const storeProducts = all.filter((p) => p.store_id === storeId);

    if (storeProducts.length >= MAX_PRODUCTS) {
      return err('VALIDATION_ERROR', `Solo se permiten hasta ${MAX_PRODUCTS} productos por tienda.`);
    }

    if ((input.images?.length ?? 0) > MAX_IMAGES) {
      return err('MAX_IMAGES_REACHED', `El producto puede tener máximo ${MAX_IMAGES} imágenes.`, 'images');
    }

    const slugExists = storeProducts.some((p) => p.slug === input.slug);
    if (slugExists) {
      return err('SLUG_TAKEN', 'Ya existe un producto con ese slug.', 'slug');
    }

    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    const product: Product = {
      id,
      store_id: storeId,
      category_id: input.category_id,
      subcategory_id: input.subcategory_id ?? null,
      name: input.name,
      slug: input.slug,
      description: input.description,
      price: input.price,
      compare_at_price: input.compare_at_price ?? null,
      available: input.available ?? true,
      featured: input.featured ?? false,
      sort_order: input.sort_order ?? storeProducts.length,
      images: buildImages(id, storeId, input.images ?? []),
      variants: buildVariants(id, input.variants ?? []),
      created_at: now,
      updated_at: now,
    };

    writeAll([...all, product]);
    return { success: true, data: product };
  }

  async update(
    storeId: string,
    id: string,
    input: UpdateProductInput
  ): Promise<ActionResult<Product>> {
    const validation = updateProductSchema.safeParse(input);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      const field = typeof firstError?.path[0] === 'string' ? firstError.path[0] : undefined;
      return err('VALIDATION_ERROR', firstError?.message ?? 'Datos inválidos.', field);
    }

    const all = readAll();
    const index = all.findIndex((p) => p.store_id === storeId && p.id === id);

    if (index === -1) {
      return err('NOT_FOUND', 'Producto no encontrado.');
    }

    if ((input.images?.length ?? 0) > MAX_IMAGES) {
      return err('MAX_IMAGES_REACHED', `El producto puede tener máximo ${MAX_IMAGES} imágenes.`, 'images');
    }

    if (input.slug) {
      const storeProducts = all.filter((p) => p.store_id === storeId);
      const slugTaken = storeProducts.some((p) => p.slug === input.slug && p.id !== id);
      if (slugTaken) {
        return err('SLUG_TAKEN', 'Ya existe un producto con ese slug.', 'slug');
      }
    }

    const current = all[index];
    const now = new Date().toISOString();

    const updated: Product = {
      ...current,
      ...input,
      images: input.images
        ? buildImages(id, storeId, input.images)
        : current.images,
      variants: input.variants
        ? buildVariants(id, input.variants)
        : current.variants,
      updated_at: now,
    };

    const next = [...all];
    next[index] = updated;
    writeAll(next);
    return { success: true, data: updated };
  }

  async delete(storeId: string, id: string): Promise<ActionResult<void>> {
    const all = readAll();
    const exists = all.some((p) => p.store_id === storeId && p.id === id);

    if (!exists) {
      return err('NOT_FOUND', 'Producto no encontrado.');
    }

    const remaining = all.filter((p) => !(p.store_id === storeId && p.id === id));
    writeAll(remaining);
    return { success: true, data: undefined };
  }

  async reorder(storeId: string, orderedIds: string[]): Promise<ActionResult<void>> {
    const all = readAll();
    const storeProducts = all.filter((p) => p.store_id === storeId);

    const idsSet = new Set(storeProducts.map((p) => p.id));
    const allExist = orderedIds.every((id) => idsSet.has(id));
    if (!allExist) {
      return err('NOT_FOUND', 'Uno o más productos no fueron encontrados.');
    }

    const orderMap = new Map(orderedIds.map((id, index) => [id, index]));

    const updated = all.map((p) => {
      if (p.store_id !== storeId) return p;
      const newOrder = orderMap.get(p.id);
      if (newOrder === undefined) return p;
      return { ...p, sort_order: newOrder, updated_at: new Date().toISOString() };
    });

    writeAll(updated);
    return { success: true, data: undefined };
  }

  async toggleAvailable(storeId: string, id: string): Promise<ActionResult<Product>> {
    const all = readAll();
    const index = all.findIndex((p) => p.store_id === storeId && p.id === id);

    if (index === -1) {
      return err('NOT_FOUND', 'Producto no encontrado.');
    }

    const updated: Product = {
      ...all[index],
      available: !all[index].available,
      updated_at: new Date().toISOString(),
    };

    const next = [...all];
    next[index] = updated;
    writeAll(next);
    return { success: true, data: updated };
  }

  async toggleFeatured(storeId: string, id: string): Promise<ActionResult<Product>> {
    const all = readAll();
    const index = all.findIndex((p) => p.store_id === storeId && p.id === id);

    if (index === -1) {
      return err('NOT_FOUND', 'Producto no encontrado.');
    }

    const updated: Product = {
      ...all[index],
      featured: !all[index].featured,
      updated_at: new Date().toISOString(),
    };

    const next = [...all];
    next[index] = updated;
    writeAll(next);
    return { success: true, data: updated };
  }

  async count(storeId: string): Promise<number> {
    return readAll().filter((p) => p.store_id === storeId).length;
  }

  async countByCategory(storeId: string, categoryId: string): Promise<number> {
    return readAll().filter(
      (p) => p.store_id === storeId && p.category_id === categoryId
    ).length;
  }

  async switchCatalogModeToSimple(storeId: string): Promise<void> {
    const all = readAll();
    const updated = all.map((p) => {
      if (p.store_id !== storeId) return p;
      return {
        ...p,
        subcategory_id: null,
        updated_at: new Date().toISOString(),
      };
    });
    writeAll(updated);
  }
}
