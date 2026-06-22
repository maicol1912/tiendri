'use server'

import { createClient } from '@/infrastructure/supabase/server'
import type { Subcategory, CreateSubcategoryInput, UpdateSubcategoryInput } from '@/types/domain'
import type { ActionResult } from '@/types/domain'
import { subcategorySchema, updateSubcategorySchema } from '@/shared/validators/category.schema'
import { getStoreId } from './store'

// ── Row mapper ────────────────────────────────────────────────────────────────

function mapRow(row: {
  id: string
  store_id: string
  category_id: string
  name: string
  slug: string
  description: string | null
  image: string | null
  sort_order: number
  created_at: string
  updated_at: string
}): Subcategory {
  return {
    id: row.id,
    store_id: row.store_id,
    category_id: row.category_id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? undefined,
    image: row.image ?? undefined,
    sort_order: row.sort_order,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

// ── listSubcategories ─────────────────────────────────────────────────────────

/**
 * Returns all subcategories for a given category, ordered by sort_order ASC.
 * On error returns an empty array.
 */
export async function listSubcategories(categoryId: string): Promise<Subcategory[]> {
  const storeId = await getStoreId()
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('store_id', storeId)
    .eq('category_id', categoryId)
    .order('sort_order', { ascending: true })

  if (error || !data) return []

  return data.map(mapRow)
}

// ── getSubcategoryById ────────────────────────────────────────────────────────

/**
 * Fetches a single subcategory by id, scoped to the current store.
 * Returns null if not found or on error.
 */
export async function getSubcategoryById(id: string): Promise<Subcategory | null> {
  const storeId = await getStoreId()
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('id', id)
    .eq('store_id', storeId)
    .single()

  if (error || !data) return null

  return mapRow(data)
}

// ── createSubcategory ─────────────────────────────────────────────────────────

/**
 * Creates a new subcategory under the given category.
 *
 * Validates input with Zod, checks slug uniqueness scoped to the CATEGORY
 * (not the store), calculates sort_order as max within that category + 1,
 * and delegates the 20-subcategory-per-category limit to the DB trigger
 * `enforce_max_subcategories`.
 */
export async function createSubcategory(
  input: CreateSubcategoryInput
): Promise<ActionResult<Subcategory>> {
  // Zod validation
  const validation = subcategorySchema.safeParse(input)
  if (!validation.success) {
    const firstIssue = validation.error.issues[0]
    const field = typeof firstIssue?.path[0] === 'string' ? firstIssue.path[0] : undefined
    return {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: firstIssue?.message ?? 'Datos inválidos.',
        field,
      },
    }
  }

  const storeId = await getStoreId()
  const supabase = await createClient()

  try {
    // Slug uniqueness check — scoped to category (not store)
    const { data: existing } = await supabase
      .from('subcategories')
      .select('id')
      .eq('slug', validation.data.slug)
      .eq('category_id', validation.data.category_id)
      .maybeSingle()

    if (existing) {
      return {
        success: false,
        error: {
          code: 'SLUG_TAKEN',
          message: 'Ya existe una subcategoría con ese slug en esta categoría.',
          field: 'slug',
        },
      }
    }

    // Calculate next sort_order within the category
    const { data: maxRow } = await supabase
      .from('subcategories')
      .select('sort_order')
      .eq('store_id', storeId)
      .eq('category_id', validation.data.category_id)
      .order('sort_order', { ascending: false })
      .limit(1)
      .maybeSingle()

    const sortOrder =
      validation.data.sort_order ?? (maxRow ? maxRow.sort_order + 1 : 0)

    // Insert
    const { data, error } = await supabase
      .from('subcategories')
      .insert({
        store_id: storeId,
        category_id: validation.data.category_id,
        name: validation.data.name,
        slug: validation.data.slug,
        description: validation.data.description ?? null,
        image: validation.data.image ?? null,
        sort_order: sortOrder,
      })
      .select('*')
      .single()

    if (error) {
      // DB trigger raises SUBCATEGORY_LIMIT on check_violation
      if (error.message.includes('SUBCATEGORY_LIMIT')) {
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
    if (message.includes('SUBCATEGORY_LIMIT')) {
      return {
        success: false,
        error: { code: 'PLAN_LIMIT', message },
      }
    }
    return {
      success: false,
      error: { code: 'DATABASE_ERROR', message },
    }
  }
}

// ── updateSubcategory ─────────────────────────────────────────────────────────

/**
 * Updates an existing subcategory (partial update).
 * Validates changed fields with Zod, checks slug uniqueness within the same
 * category excluding the current record, then applies the update.
 */
export async function updateSubcategory(
  id: string,
  input: UpdateSubcategoryInput
): Promise<ActionResult<Subcategory>> {
  // Zod partial validation
  const validation = updateSubcategorySchema.safeParse(input)
  if (!validation.success) {
    const firstIssue = validation.error.issues[0]
    const field = typeof firstIssue?.path[0] === 'string' ? firstIssue.path[0] : undefined
    return {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: firstIssue?.message ?? 'Datos inválidos.',
        field,
      },
    }
  }

  const storeId = await getStoreId()
  const supabase = await createClient()

  try {
    // Fetch current record to get category_id for slug uniqueness scope
    const { data: current } = await supabase
      .from('subcategories')
      .select('category_id')
      .eq('id', id)
      .eq('store_id', storeId)
      .single()

    if (!current) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Subcategoría no encontrada.' },
      }
    }

    // Slug uniqueness check — exclude current record, scope to category
    if (validation.data.slug) {
      const { data: conflict } = await supabase
        .from('subcategories')
        .select('id')
        .eq('slug', validation.data.slug)
        .eq('category_id', current.category_id)
        .neq('id', id)
        .maybeSingle()

      if (conflict) {
        return {
          success: false,
          error: {
            code: 'SLUG_TAKEN',
            message: 'Ya existe una subcategoría con ese slug en esta categoría.',
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
      ...(validation.data.image !== undefined && { image: validation.data.image ?? null }),
      ...(validation.data.sort_order !== undefined && { sort_order: validation.data.sort_order }),
    }

    const { data, error } = await supabase
      .from('subcategories')
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
        error: { code: 'NOT_FOUND', message: 'Subcategoría no encontrada.' },
      }
    }

    return { success: true, data: mapRow(data) }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido'
    return {
      success: false,
      error: { code: 'DATABASE_ERROR', message },
    }
  }
}

// ── deleteSubcategory ─────────────────────────────────────────────────────────

/**
 * Deletes a subcategory and handles orphaned products.
 *
 * products.subcategory_id has ON DELETE SET NULL, so deleting the subcategory
 * would silently NULL the products' subcategory_id. We handle orphans explicitly
 * BEFORE deleting:
 *   - orphanAction='move': UPDATE products SET subcategory_id = targetSubcategoryId
 *   - orphanAction='delete': DELETE products WHERE subcategory_id = id
 *
 * Both steps are done before the subcategory delete. If the products step fails,
 * we abort and do NOT delete the subcategory (manual transaction safety).
 */
export async function deleteSubcategory(
  id: string,
  orphanAction: 'move' | 'delete',
  targetSubcategoryId?: string
): Promise<ActionResult<void>> {
  const storeId = await getStoreId()
  const supabase = await createClient()

  try {
    // Validate input
    if (orphanAction === 'move' && !targetSubcategoryId) {
      return {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Debes indicar la subcategoría destino para mover los productos.',
        },
      }
    }

    // Verify subcategory exists
    const { data: existing } = await supabase
      .from('subcategories')
      .select('id')
      .eq('id', id)
      .eq('store_id', storeId)
      .single()

    if (!existing) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Subcategoría no encontrada.' },
      }
    }

    // Handle orphaned products BEFORE deleting the subcategory
    if (orphanAction === 'move') {
      const { error: moveError } = await supabase
        .from('products')
        .update({ subcategory_id: targetSubcategoryId })
        .eq('subcategory_id', id)
        .eq('store_id', storeId)

      if (moveError) {
        return {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: `No se pudieron mover los productos: ${moveError.message}`,
          },
        }
      }
    } else {
      // orphanAction === 'delete'
      const { error: deleteProductsError } = await supabase
        .from('products')
        .delete()
        .eq('subcategory_id', id)
        .eq('store_id', storeId)

      if (deleteProductsError) {
        return {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: `No se pudieron eliminar los productos de la subcategoría: ${deleteProductsError.message}`,
          },
        }
      }
    }

    // Delete the subcategory (ON DELETE SET NULL on products is now safe — products handled above)
    const { error } = await supabase
      .from('subcategories')
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
    const message = err instanceof Error ? err.message : 'Error desconocido'
    return {
      success: false,
      error: { code: 'DATABASE_ERROR', message },
    }
  }
}

// ── reorderSubcategories ──────────────────────────────────────────────────────

/**
 * Re-orders subcategories within a category by applying a new sort_order
 * to each id in the list. Index position becomes the new sort_order value.
 */
export async function reorderSubcategories(
  categoryId: string,
  orderedIds: string[]
): Promise<ActionResult<void>> {
  const storeId = await getStoreId()
  const supabase = await createClient()

  try {
    const { error } = await supabase
      .from('subcategories')
      .upsert(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        orderedIds.map((id, i) => ({ id, sort_order: i, store_id: storeId, category_id: categoryId })) as any[],
        { onConflict: 'id' }
      )

    if (error) {
      return {
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: `Error al reordenar las subcategorías: ${error.message}`,
        },
      }
    }

    return { success: true, data: undefined }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido'
    return {
      success: false,
      error: { code: 'DATABASE_ERROR', message },
    }
  }
}

// ── deleteAllByCategory ───────────────────────────────────────────────────────

/**
 * Cascade helper — deletes all subcategories for a given category.
 *
 * Note: subcategories.category_id has ON DELETE CASCADE, so this is handled
 * automatically when the category is deleted. This action exists for explicit
 * programmatic use (e.g., before switching catalog_mode to 'simple').
 *
 * Products with subcategory_id pointing to these subcategories will have their
 * subcategory_id set to NULL automatically (ON DELETE SET NULL on products).
 */
export async function deleteAllByCategory(categoryId: string): Promise<void> {
  const storeId = await getStoreId()
  const supabase = await createClient()

  await supabase
    .from('subcategories')
    .delete()
    .eq('category_id', categoryId)
    .eq('store_id', storeId)
}
