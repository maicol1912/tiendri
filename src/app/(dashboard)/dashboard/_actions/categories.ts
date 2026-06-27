'use server'

import type { Category, CreateCategoryInput, UpdateCategoryInput } from '@/types/domain'
import type { ActionResult } from '@/types/domain'
import { categorySchema, updateCategorySchema } from '@/shared/validators/category.schema'
import { getStoreContext } from '@/shared/action-helpers'
import { firstValidationError, wrapDatabaseError } from '@/shared/errors'
import { isMediaToken } from '@/shared/media'
import { resolveMediaUrls } from './media'

// ── Row mapper ────────────────────────────────────────────────────────────────

function mapRow(row: {
  id: string
  store_id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  icon: string
  sort_order: number
  created_at: string
  updated_at: string
}): Category {
  return {
    id: row.id,
    store_id: row.store_id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? undefined,
    image: row.image ?? undefined,
    icon: row.icon as Category['icon'],
    sort_order: row.sort_order,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

// ── listCategories ────────────────────────────────────────────────────────────

/**
 * Returns all categories for the current store, ordered by sort_order ASC.
 * On error returns an empty array — callers should treat it as "no categories".
 */
export async function listCategories(): Promise<Category[]> {
  const ctx = await getStoreContext()
  if (!ctx.success) return []
  const { storeId, supabase } = ctx

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('store_id', storeId)
    .order('sort_order', { ascending: true })

  if (error || !data) return []

  const categories = data.map(mapRow)

  const mediaIds = categories
    .map((c) => c.image)
    .filter(isMediaToken)

  if (mediaIds.length > 0) {
    const urlMap = await resolveMediaUrls(mediaIds)
    for (const cat of categories) {
      if (cat.image && urlMap[cat.image]) {
        cat.image = urlMap[cat.image]
      }
    }
  }

  return categories
}

// ── getCategoryById ───────────────────────────────────────────────────────────

/**
 * Fetches a single category by id, scoped to the current store.
 * Returns null if not found or on error.
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  const ctx = await getStoreContext()
  if (!ctx.success) return null
  const { storeId, supabase } = ctx

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .eq('store_id', storeId)
    .single()

  if (error || !data) return null

  const category = mapRow(data)

  if (isMediaToken(category.image)) {
    const urlMap = await resolveMediaUrls([category.image])
    if (urlMap[category.image]) {
      category.image = urlMap[category.image]
    }
  }

  return category
}

// ── createCategory ────────────────────────────────────────────────────────────

/**
 * Creates a new category for the current store.
 *
 * Validates input with Zod, checks slug uniqueness, calculates sort_order,
 * and delegates plan-limit enforcement to the DB trigger `enforce_max_categories`.
 */
export async function createCategory(
  input: CreateCategoryInput
): Promise<ActionResult<Category>> {
  // Zod validation
  const validation = categorySchema.safeParse(input)
  if (!validation.success) {
    return firstValidationError(validation)
  }

  const ctx = await getStoreContext()
  if (!ctx.success) return { success: false, error: ctx.error }
  const { storeId, supabase } = ctx

  try {
    // Slug uniqueness check
    const { data: existing } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', validation.data.slug)
      .eq('store_id', storeId)
      .maybeSingle()

    if (existing) {
      return {
        success: false,
        error: {
          code: 'SLUG_TAKEN',
          message: 'Este slug ya está en uso',
          field: 'slug',
        },
      }
    }

    // Calculate next sort_order
    const { data: maxRow } = await supabase
      .from('categories')
      .select('sort_order')
      .eq('store_id', storeId)
      .order('sort_order', { ascending: false })
      .limit(1)
      .maybeSingle()

    const sortOrder =
      validation.data.sort_order ?? (maxRow ? maxRow.sort_order + 1 : 0)

    // Insert
    const { data, error } = await supabase
      .from('categories')
      .insert({
        store_id: storeId,
        name: validation.data.name,
        slug: validation.data.slug,
        description: validation.data.description ?? null,
        image: validation.data.image ?? null,
        icon: validation.data.icon,
        sort_order: sortOrder,
      })
      .select('*')
      .single()

    if (error) {
      // DB trigger raises CATEGORY_LIMIT on check_violation
      if (error.message.includes('CATEGORY_LIMIT')) {
        return {
          success: false,
          error: {
            code: 'PLAN_LIMIT',
            message: error.message,
          },
        }
      }
      return {
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: error.message,
        },
      }
    }

    return { success: true, data: mapRow(data) }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido'
    // Catch plan limit errors that bubble up as exceptions
    if (message.includes('CATEGORY_LIMIT')) {
      return {
        success: false,
        error: { code: 'PLAN_LIMIT', message },
      }
    }
    return wrapDatabaseError(err)
  }
}

// ── updateCategory ────────────────────────────────────────────────────────────

/**
 * Updates an existing category (partial update).
 * Validates changed fields with Zod, checks slug uniqueness excluding the
 * current record, then applies the update.
 */
export async function updateCategory(
  id: string,
  input: UpdateCategoryInput
): Promise<ActionResult<Category>> {
  // Zod partial validation
  const validation = updateCategorySchema.safeParse(input)
  if (!validation.success) {
    return firstValidationError(validation)
  }

  const ctx = await getStoreContext()
  if (!ctx.success) return { success: false, error: ctx.error }
  const { storeId, supabase } = ctx

  try {
    // Slug uniqueness check — exclude current record
    if (validation.data.slug) {
      const { data: conflict } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', validation.data.slug)
        .eq('store_id', storeId)
        .neq('id', id)
        .maybeSingle()

      if (conflict) {
        return {
          success: false,
          error: {
            code: 'SLUG_TAKEN',
            message: 'Este slug ya está en uso',
            field: 'slug',
          },
        }
      }
    }

    // Build update payload — only include defined fields
    const updatePayload = {
      ...(validation.data.name !== undefined && { name: validation.data.name }),
      ...(validation.data.slug !== undefined && { slug: validation.data.slug }),
      ...(validation.data.description !== undefined && {
        description: validation.data.description ?? null,
      }),
      ...(validation.data.image !== undefined &&
          !validation.data.image?.startsWith('http') &&
          { image: validation.data.image ?? null }),
      ...(validation.data.icon !== undefined && { icon: validation.data.icon }),
      ...(validation.data.sort_order !== undefined && { sort_order: validation.data.sort_order }),
    }

    const { data, error } = await supabase
      .from('categories')
      .update(updatePayload)
      .eq('id', id)
      .eq('store_id', storeId)
      .select('*')
      .single()

    if (error) {
      return {
        success: false,
        error: { code: 'DATABASE_ERROR', message: error.message },
      }
    }

    if (!data) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Categoría no encontrada.' },
      }
    }

    return { success: true, data: mapRow(data) }
  } catch (err) {
    return wrapDatabaseError(err)
  }
}

// ── deleteCategory ────────────────────────────────────────────────────────────

/**
 * Deletes a category and its associated products.
 *
 * products.category_id has ON DELETE RESTRICT (not CASCADE), so products must
 * be deleted first. subcategories are deleted automatically via ON DELETE CASCADE
 * on subcategories.category_id.
 */
export async function deleteCategory(id: string): Promise<ActionResult<void>> {
  const ctx = await getStoreContext()
  if (!ctx.success) return { success: false, error: ctx.error }
  const { storeId, supabase } = ctx

  try {
    // Delete products belonging to this category first (RESTRICT constraint)
    const { error: productsError } = await supabase
      .from('products')
      .delete()
      .eq('category_id', id)
      .eq('store_id', storeId)

    if (productsError) {
      return {
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: `No se pudieron eliminar los productos de la categoría: ${productsError.message}`,
        },
      }
    }

    // Delete the category (subcategories cascade automatically via FK)
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
      .eq('store_id', storeId)

    if (error) {
      return {
        success: false,
        error: { code: 'DATABASE_ERROR', message: error.message },
      }
    }

    return { success: true, data: undefined }
  } catch (err) {
    return wrapDatabaseError(err)
  }
}

// ── reorderCategories ─────────────────────────────────────────────────────────

/**
 * Re-orders categories by applying a new sort_order to each id in the list.
 * Index position in the array becomes the new sort_order value.
 */
export async function reorderCategories(orderedIds: string[]): Promise<ActionResult<void>> {
  const ctx = await getStoreContext()
  if (!ctx.success) return { success: false, error: ctx.error }
  const { storeId, supabase } = ctx

  try {
    const { error } = await supabase
      .from('categories')
      .upsert(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        orderedIds.map((id, i) => ({ id, sort_order: i, store_id: storeId })) as any[],
        { onConflict: 'id' }
      )

    if (error) {
      return {
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: `Error al reordenar las categorías: ${error.message}`,
        },
      }
    }

    return { success: true, data: undefined }
  } catch (err) {
    return wrapDatabaseError(err)
  }
}

// ── countCategories ───────────────────────────────────────────────────────────

/**
 * Returns the total number of categories for the current store.
 * On error returns 0.
 */
export async function countCategories(): Promise<number> {
  const ctx = await getStoreContext()
  if (!ctx.success) return 0
  const { storeId, supabase } = ctx

  const { count, error } = await supabase
    .from('categories')
    .select('id', { count: 'exact', head: true })
    .eq('store_id', storeId)

  if (error) return 0

  return count ?? 0
}
