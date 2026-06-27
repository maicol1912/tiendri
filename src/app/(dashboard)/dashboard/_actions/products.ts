'use server'

import type {
  Product,
  ProductImage,
  ProductVariant,
  CreateProductInput,
  UpdateProductInput,
  ProductFilters,
  ActionResult,
} from '@/types/domain'
import { productSchema, updateProductSchema } from '@/shared/validators/product.schema'
import { resolveMediaUrls } from './media'
import { getStoreContext } from '@/shared/action-helpers'
import { firstValidationError, wrapDatabaseError } from '@/shared/errors'
import { isMediaToken } from '@/shared/media'

// ── Row mappers ───────────────────────────────────────────────────────────────

interface ProductRow {
  id: string
  store_id: string
  category_id: string
  subcategory_id: string | null
  name: string
  slug: string
  description: string | null
  price: number
  compare_at_price: number | null
  available: boolean
  featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

interface ProductImageRow {
  id: string
  product_id: string
  store_id: string
  url: string
  sort_order: number
  created_at: string
}

interface ProductVariantRow {
  id: string
  product_id: string
  name: string
  price_modifier: number
  created_at: string
}

function mapImageRow(row: ProductImageRow): ProductImage {
  return {
    id: row.id,
    product_id: row.product_id,
    store_id: row.store_id,
    url: row.url,
    sort_order: row.sort_order,
    created_at: row.created_at,
  }
}

function mapVariantRow(row: ProductVariantRow): ProductVariant {
  return {
    id: row.id,
    product_id: row.product_id,
    name: row.name,
    price_modifier: row.price_modifier,
    created_at: row.created_at,
  }
}

function mapProductRow(
  row: ProductRow & {
    product_images?: ProductImageRow[]
    product_variants?: ProductVariantRow[]
  }
): Product {
  const images = (row.product_images ?? [])
    .map(mapImageRow)
    .sort((a, b) => a.sort_order - b.sort_order)

  const variants = (row.product_variants ?? []).map(mapVariantRow)

  return {
    id: row.id,
    store_id: row.store_id,
    category_id: row.category_id,
    subcategory_id: row.subcategory_id ?? undefined,
    name: row.name,
    slug: row.slug,
    description: row.description ?? '',
    price: row.price,
    compare_at_price: row.compare_at_price ?? undefined,
    available: row.available,
    featured: row.featured,
    sort_order: row.sort_order,
    images,
    variants,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

// ── Media URL resolution ──────────────────────────────────────────────────────

/**
 * Resolves media_* IDs in a single product's images to their CDN URLs in-place.
 */
async function resolveProductImageUrls(product: Product): Promise<void> {
  const mediaIds = product.images
    .map((img) => img.url)
    .filter((url): url is string => !!url && isMediaToken(url))
  if (mediaIds.length === 0) return
  const urlMap = await resolveMediaUrls(mediaIds)
  for (const img of product.images) {
    if (img.url && urlMap[img.url]) {
      img.url = urlMap[img.url]
    }
  }
}

// ── listProducts ──────────────────────────────────────────────────────────────

export async function listProducts(filters?: ProductFilters): Promise<Product[]> {
  const ctx = await getStoreContext()
  if (!ctx.success) return []
  const { storeId, supabase } = ctx

  let query = supabase
    .from('products')
    .select('*, product_images(*), product_variants(*)')
    .eq('store_id', storeId)
    .order('sort_order', { ascending: true })

  if (filters?.categoryId) {
    query = query.eq('category_id', filters.categoryId)
  }
  if (filters?.subcategoryId) {
    query = query.eq('subcategory_id', filters.subcategoryId)
  }
  if (filters?.available !== undefined) {
    query = query.eq('available', filters.available)
  }
  if (filters?.featured !== undefined) {
    query = query.eq('featured', filters.featured)
  }
  if (filters?.search) {
    query = query.ilike('name', `%${filters.search}%`)
  }

  const { data, error } = await query

  if (error || !data) return []

  const products = data.map(mapProductRow)

  const mediaIds = products
    .flatMap((p) => p.images)
    .map((img) => img.url)
    .filter((url): url is string => !!url && isMediaToken(url))

  if (mediaIds.length > 0) {
    const urlMap = await resolveMediaUrls(mediaIds)
    for (const product of products) {
      for (const img of product.images) {
        if (img.url && urlMap[img.url]) {
          img.url = urlMap[img.url]
        }
      }
    }
  }

  return products
}

// ── getProductById ────────────────────────────────────────────────────────────

export async function getProductById(id: string): Promise<Product | null> {
  const ctx = await getStoreContext()
  if (!ctx.success) return null
  const { storeId, supabase } = ctx

  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*), product_variants(*)')
    .eq('id', id)
    .eq('store_id', storeId)
    .single()

  if (error || !data) return null

  const product = mapProductRow(data)
  await resolveProductImageUrls(product)
  return product
}

// ── getProductBySlug ──────────────────────────────────────────────────────────

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const ctx = await getStoreContext()
  if (!ctx.success) return null
  const { storeId, supabase } = ctx

  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*), product_variants(*)')
    .eq('slug', slug)
    .eq('store_id', storeId)
    .single()

  if (error || !data) return null

  const product = mapProductRow(data)
  await resolveProductImageUrls(product)
  return product
}

// ── createProduct ─────────────────────────────────────────────────────────────

export async function createProduct(
  input: CreateProductInput
): Promise<ActionResult<Product>> {
  const validation = productSchema.safeParse(input)
  if (!validation.success) {
    return firstValidationError<Product>(validation)
  }

  const ctx = await getStoreContext()
  if (!ctx.success) return { success: false, error: ctx.error }
  const { storeId, supabase } = ctx

  try {
    // Slug uniqueness check
    const { data: existing } = await supabase
      .from('products')
      .select('id')
      .eq('slug', validation.data.slug)
      .eq('store_id', storeId)
      .maybeSingle()

    if (existing) {
      return {
        success: false,
        error: {
          code: 'SLUG_TAKEN',
          message: 'Ya existe un producto con ese slug.',
          field: 'slug',
        },
      }
    }

    // Calculate next sort_order
    const { data: maxRow } = await supabase
      .from('products')
      .select('sort_order')
      .eq('store_id', storeId)
      .order('sort_order', { ascending: false })
      .limit(1)
      .maybeSingle()

    const sortOrder =
      validation.data.sort_order ?? (maxRow ? maxRow.sort_order + 1 : 0)

    // Insert product
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert({
        store_id: storeId,
        category_id: validation.data.category_id,
        subcategory_id: validation.data.subcategory_id ?? null,
        name: validation.data.name,
        slug: validation.data.slug,
        description: validation.data.description ?? '',
        price: validation.data.price,
        compare_at_price: validation.data.compare_at_price ?? null,
        available: validation.data.available ?? true,
        featured: validation.data.featured ?? false,
        sort_order: sortOrder,
      })
      .select('*')
      .single()

    if (productError) {
      if (productError.message.includes('PRODUCT_LIMIT')) {
        return {
          success: false,
          error: { code: 'PLAN_LIMIT', message: productError.message },
        }
      }
      return {
        success: false,
        error: { code: 'DATABASE_ERROR', message: productError.message },
      }
    }

    // Insert images
    const imageInputs = validation.data.images ?? []
    let insertedImages: ProductImageRow[] = []

    if (imageInputs.length > 0) {
      const imageRows = imageInputs.map((img) => ({
        product_id: product.id,
        store_id: storeId,
        url: img.url,
        sort_order: img.sort_order,
      }))

      const { data: imgData, error: imgError } = await supabase
        .from('product_images')
        .insert(imageRows)
        .select('*')

      if (imgError) {
        // Rollback: delete the product we just created
        await supabase.from('products').delete().eq('id', product.id)
        if (imgError.message.includes('MAX_PRODUCT_IMAGES')) {
          return {
            success: false,
            error: {
              code: 'MAX_IMAGES_REACHED',
              message: 'El producto puede tener máximo 4 imágenes.',
              field: 'images',
            },
          }
        }
        return {
          success: false,
          error: { code: 'DATABASE_ERROR', message: imgError.message },
        }
      }

      insertedImages = imgData ?? []
    }

    // Insert variants
    const variantInputs = validation.data.variants ?? []
    let insertedVariants: ProductVariantRow[] = []

    if (variantInputs.length > 0) {
      const variantRows = variantInputs.map((v) => ({
        product_id: product.id,
        name: v.name,
        price_modifier: v.price_modifier,
      }))

      const { data: varData, error: varError } = await supabase
        .from('product_variants')
        .insert(variantRows)
        .select('*')

      if (varError) {
        // Rollback: delete the product (cascades images + variants)
        await supabase.from('products').delete().eq('id', product.id)
        return {
          success: false,
          error: { code: 'DATABASE_ERROR', message: varError.message },
        }
      }

      insertedVariants = varData ?? []
    }

    return {
      success: true,
      data: mapProductRow({
        ...product,
        product_images: insertedImages,
        product_variants: insertedVariants,
      }),
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido'
    if (message.includes('PRODUCT_LIMIT')) {
      return {
        success: false,
        error: { code: 'PLAN_LIMIT', message },
      }
    }
    return wrapDatabaseError(err)
  }
}

// ── updateProduct ─────────────────────────────────────────────────────────────

export async function updateProduct(
  id: string,
  input: UpdateProductInput
): Promise<ActionResult<Product>> {
  const validation = updateProductSchema.safeParse(input)
  if (!validation.success) {
    return firstValidationError<Product>(validation)
  }

  const ctx = await getStoreContext()
  if (!ctx.success) return { success: false, error: ctx.error }
  const { storeId, supabase } = ctx

  try {
    // Slug uniqueness check (if slug is being changed)
    if (validation.data.slug) {
      const { data: conflict } = await supabase
        .from('products')
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
            message: 'Ya existe un producto con ese slug.',
            field: 'slug',
          },
        }
      }
    }

    // Build update payload (only include changed fields)
    const updatePayload = {
      ...(validation.data.name !== undefined && { name: validation.data.name }),
      ...(validation.data.slug !== undefined && { slug: validation.data.slug }),
      ...(validation.data.description !== undefined && { description: validation.data.description }),
      ...(validation.data.price !== undefined && { price: validation.data.price }),
      ...(validation.data.compare_at_price !== undefined && {
        compare_at_price: validation.data.compare_at_price ?? null,
      }),
      ...(validation.data.category_id !== undefined && { category_id: validation.data.category_id }),
      ...(validation.data.subcategory_id !== undefined && {
        subcategory_id: validation.data.subcategory_id ?? null,
      }),
      ...(validation.data.available !== undefined && { available: validation.data.available }),
      ...(validation.data.featured !== undefined && { featured: validation.data.featured }),
      ...(validation.data.sort_order !== undefined && { sort_order: validation.data.sort_order }),
    }

    // Update product main record (only if there are fields to update)
    if (Object.keys(updatePayload).length > 0) {
      const { error: updateError } = await supabase
        .from('products')
        .update(updatePayload)
        .eq('id', id)
        .eq('store_id', storeId)

      if (updateError) {
        return {
          success: false,
          error: { code: 'DATABASE_ERROR', message: updateError.message },
        }
      }
    }

    // Handle images: insert-before-delete to avoid data loss on INSERT failure
    if (validation.data.images !== undefined) {
      // 1. Capture existing image IDs before touching anything
      const { data: existingImages } = await supabase
        .from('product_images')
        .select('id')
        .eq('product_id', id)

      const existingImageIds = (existingImages ?? []).map((r) => r.id)

      // 2. Insert new images first (if any)
      if (validation.data.images.length > 0) {
        const imageRows = validation.data.images.map((img) => ({
          product_id: id,
          store_id: storeId,
          url: img.url,
          sort_order: img.sort_order,
        }))

        const { error: imgError } = await supabase
          .from('product_images')
          .insert(imageRows)

        if (imgError) {
          if (imgError.message.includes('MAX_PRODUCT_IMAGES')) {
            return {
              success: false,
              error: {
                code: 'MAX_IMAGES_REACHED',
                message: 'El producto puede tener máximo 4 imágenes.',
                field: 'images',
              },
            }
          }
          return {
            success: false,
            error: { code: 'DATABASE_ERROR', message: imgError.message },
          }
        }
      }

      // 3. Only after INSERT succeeds, delete the old images by their captured IDs
      if (existingImageIds.length > 0) {
        await supabase
          .from('product_images')
          .delete()
          .in('id', existingImageIds)
      }
    }

    // Handle variants: delete all existing + re-insert from input
    if (validation.data.variants !== undefined) {
      // Delete existing variants
      await supabase
        .from('product_variants')
        .delete()
        .eq('product_id', id)

      // Insert new variants
      if (validation.data.variants.length > 0) {
        const variantRows = validation.data.variants.map((v) => ({
          product_id: id,
          name: v.name,
          price_modifier: v.price_modifier,
        }))

        const { error: varError } = await supabase
          .from('product_variants')
          .insert(variantRows)

        if (varError) {
          return {
            success: false,
            error: { code: 'DATABASE_ERROR', message: varError.message },
          }
        }
      }
    }

    // Fetch the full updated product with relations
    const { data: updated, error: fetchError } = await supabase
      .from('products')
      .select('*, product_images(*), product_variants(*)')
      .eq('id', id)
      .eq('store_id', storeId)
      .single()

    if (fetchError || !updated) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Producto no encontrado.' },
      }
    }

    return { success: true, data: mapProductRow(updated) }
  } catch (err) {
    return wrapDatabaseError(err)
  }
}

// ── deleteProduct ─────────────────────────────────────────────────────────────

export async function deleteProduct(id: string): Promise<ActionResult<void>> {
  const ctx = await getStoreContext()
  if (!ctx.success) return { success: false, error: ctx.error }
  const { storeId, supabase } = ctx

  try {
    // ON DELETE CASCADE handles product_images + product_variants
    const { error } = await supabase
      .from('products')
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

// ── reorderProducts ───────────────────────────────────────────────────────────

export async function reorderProducts(
  orderedIds: string[]
): Promise<ActionResult<void>> {
  const ctx = await getStoreContext()
  if (!ctx.success) return { success: false, error: ctx.error }
  const { storeId, supabase } = ctx

  try {
    const { error } = await supabase
      .from('products')
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
          message: `Error al reordenar los productos: ${error.message}`,
        },
      }
    }

    return { success: true, data: undefined }
  } catch (err) {
    return wrapDatabaseError(err)
  }
}

// ── toggleAvailable ───────────────────────────────────────────────────────────

export async function toggleAvailable(
  id: string
): Promise<ActionResult<Product>> {
  const ctx = await getStoreContext()
  if (!ctx.success) return { success: false, error: ctx.error }
  const { storeId, supabase } = ctx

  try {
    // Fetch current value
    const { data: current, error: fetchError } = await supabase
      .from('products')
      .select('available')
      .eq('id', id)
      .eq('store_id', storeId)
      .single()

    if (fetchError || !current) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Producto no encontrado.' },
      }
    }

    // Flip and update
    const { error: updateError } = await supabase
      .from('products')
      .update({ available: !current.available })
      .eq('id', id)
      .eq('store_id', storeId)

    if (updateError) {
      return {
        success: false,
        error: { code: 'DATABASE_ERROR', message: updateError.message },
      }
    }

    // Fetch full product with relations
    const { data: updated, error: refetchError } = await supabase
      .from('products')
      .select('*, product_images(*), product_variants(*)')
      .eq('id', id)
      .eq('store_id', storeId)
      .single()

    if (refetchError || !updated) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Producto no encontrado.' },
      }
    }

    const product = mapProductRow(updated)
    await resolveProductImageUrls(product)
    return { success: true, data: product }
  } catch (err) {
    return wrapDatabaseError(err)
  }
}

// ── toggleFeatured ────────────────────────────────────────────────────────────

export async function toggleFeatured(
  id: string
): Promise<ActionResult<Product>> {
  const ctx = await getStoreContext()
  if (!ctx.success) return { success: false, error: ctx.error }
  const { storeId, supabase } = ctx

  try {
    // Fetch current value
    const { data: current, error: fetchError } = await supabase
      .from('products')
      .select('featured')
      .eq('id', id)
      .eq('store_id', storeId)
      .single()

    if (fetchError || !current) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Producto no encontrado.' },
      }
    }

    // Flip and update
    const { error: updateError } = await supabase
      .from('products')
      .update({ featured: !current.featured })
      .eq('id', id)
      .eq('store_id', storeId)

    if (updateError) {
      return {
        success: false,
        error: { code: 'DATABASE_ERROR', message: updateError.message },
      }
    }

    // Fetch full product with relations
    const { data: updated, error: refetchError } = await supabase
      .from('products')
      .select('*, product_images(*), product_variants(*)')
      .eq('id', id)
      .eq('store_id', storeId)
      .single()

    if (refetchError || !updated) {
      return {
        success: false,
        error: { code: 'NOT_FOUND', message: 'Producto no encontrado.' },
      }
    }

    const product = mapProductRow(updated)
    await resolveProductImageUrls(product)
    return { success: true, data: product }
  } catch (err) {
    return wrapDatabaseError(err)
  }
}

// ── countProducts ─────────────────────────────────────────────────────────────

export async function countProducts(): Promise<number> {
  const ctx = await getStoreContext()
  if (!ctx.success) return 0
  const { storeId, supabase } = ctx

  const { count, error } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('store_id', storeId)

  if (error) return 0

  return count ?? 0
}

// ── countProductsByCategory ───────────────────────────────────────────────────

export async function countProductsByCategory(
  categoryId: string
): Promise<number> {
  const ctx = await getStoreContext()
  if (!ctx.success) return 0
  const { storeId, supabase } = ctx

  const { count, error } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('store_id', storeId)
    .eq('category_id', categoryId)

  if (error) return 0

  return count ?? 0
}

// ── switchCatalogModeToSimple ─────────────────────────────────────────────────

export async function switchCatalogModeToSimple(): Promise<void> {
  const ctx = await getStoreContext()
  if (!ctx.success) return
  const { storeId, supabase } = ctx

  await supabase.rpc('switch_catalog_mode_to_simple', {
    target_store_id: storeId,
  })
}
