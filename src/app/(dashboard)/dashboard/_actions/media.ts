'use server'

import type {
  MediaAsset,
  MediaAssetContext,
  MediaSearchFilters,
  MediaLibraryStats,
  UpdateMediaAssetInput,
  ActionResult,
} from '@/types/domain'
import { getStoreContext } from '@/shared/action-helpers'
import { wrapDatabaseError } from '@/shared/errors'
import { stripMediaPrefix } from '@/shared/media'

// ── Constants ─────────────────────────────────────────────────────────────────

// Default limits matching localStorage implementation; overridden by plan data when available.
const DEFAULT_LIMIT_COUNT = 100
const DEFAULT_LIMIT_BYTES = 8_388_608 // 8 MB

// ── Bucket resolution ─────────────────────────────────────────────────────────

function bucketForContext(context: MediaAssetContext | undefined): string {
  switch (context) {
    case 'logo':
      return 'logos'
    case 'product':
      return 'products'
    case 'banner':
      return 'banners'
    case 'category':
      return 'categories'
    case 'general':
    default:
      return 'banners' // fallback bucket
  }
}

// ── Extension resolution ──────────────────────────────────────────────────────

function extForMimetype(mimetype: string): string {
  if (mimetype === 'image/webp') return 'webp'
  if (mimetype === 'image/png') return 'png'
  if (mimetype === 'image/jpeg' || mimetype === 'image/jpg') return 'jpg'
  return 'webp'
}

// ── Row mapper ────────────────────────────────────────────────────────────────

function mapRow(row: {
  id: string
  store_id: string
  filename: string
  alt: string
  url: string
  mimetype: string
  size: number
  width: number
  height: number
  context: string
  tags: string[]
  created_at: string
}): MediaAsset {
  return {
    id: `media_${row.id}`,
    store_id: row.store_id,
    filename: row.filename,
    alt: row.alt ?? '',
    url: row.url,
    mimetype: row.mimetype,
    size: row.size,
    width: row.width,
    height: row.height,
    context: row.context as MediaAssetContext,
    tags: row.tags ?? [],
    created_at: row.created_at,
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function err(code: string, message: string): ActionResult<never> {
  return { success: false, error: { code, message } }
}

/**
 * Given a CDN URL like:
 *   https://<project>.supabase.co/storage/v1/object/public/<bucket>/<path>
 * Returns { bucket, path } or null if the URL doesn't match the expected pattern.
 */
function parseStorageUrl(url: string): { bucket: string; path: string } | null {
  try {
    const parsed = new URL(url)
    // pathname: /storage/v1/object/public/<bucket>/<path...>
    const parts = parsed.pathname.split('/')
    // Expected: ['', 'storage', 'v1', 'object', 'public', '<bucket>', ...rest]
    const publicIdx = parts.indexOf('public')
    if (publicIdx === -1 || publicIdx + 2 >= parts.length) return null
    const bucket = parts[publicIdx + 1]
    const path = parts.slice(publicIdx + 2).join('/')
    return { bucket, path }
  } catch {
    return null
  }
}

// ── 1. uploadMediaAsset ───────────────────────────────────────────────────────

/**
 * Uploads an image to Supabase Storage and registers it in media_assets.
 *
 * The `base64Data` field must be a data URL: "data:image/webp;base64,AAAA..."
 * The plan media limit is enforced by the DB trigger (enforce_max_media_assets).
 */
export async function uploadMediaAsset(input: {
  filename: string
  base64Data: string
  mimetype: string
  size: number
  width: number
  height: number
  context?: MediaAssetContext
  tags?: string[]
  alt?: string
}): Promise<ActionResult<MediaAsset>> {
  const ctx = await getStoreContext()
  if (!ctx.success) return { success: false, error: ctx.error }
  const { storeId, supabase } = ctx

  try {
    // ── a. Decode base64 ──────────────────────────────────────────────────────
    // Strip data URL prefix if present: "data:image/webp;base64,AAAA..." → "AAAA..."
    const commaIdx = input.base64Data.indexOf(',')
    const rawBase64 =
      commaIdx !== -1 ? input.base64Data.slice(commaIdx + 1) : input.base64Data

    const fileBuffer = Buffer.from(rawBase64, 'base64')

    // ── b. Determine bucket and storage path ──────────────────────────────────
    const bucket = bucketForContext(input.context)
    const ext = extForMimetype(input.mimetype)
    const uuid = crypto.randomUUID()
    const storagePath = `${storeId}/${uuid}.${ext}`

    // ── c. Upload to Supabase Storage ─────────────────────────────────────────
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(storagePath, fileBuffer, {
        contentType: input.mimetype,
        upsert: false,
      })

    if (uploadError) {
      return err(
        'STORAGE_UPLOAD_FAILED',
        `No se pudo subir la imagen: ${uploadError.message}`
      )
    }

    // ── d. Get public CDN URL ─────────────────────────────────────────────────
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(storagePath)

    // ── e. Insert into media_assets ───────────────────────────────────────────
    const { data, error: insertError } = await supabase
      .from('media_assets')
      .insert({
        store_id: storeId,
        filename: input.filename,
        alt: input.alt ?? '',
        url: publicUrl,
        mimetype: input.mimetype,
        size: input.size,
        width: input.width,
        height: input.height,
        context: (input.context ?? 'general') as MediaAssetContext,
        tags: input.tags ?? [],
      })
      .select()
      .single()

    if (insertError) {
      // If the DB trigger fires (MEDIA_ASSET_LIMIT), surface a clean error code.
      if (insertError.message.includes('MEDIA_ASSET_LIMIT')) {
        // Clean up the already-uploaded file to avoid orphaned storage objects.
        await supabase.storage.from(bucket).remove([storagePath])
        return err(
          'MAX_MEDIA_REACHED',
          'Tu biblioteca ya alcanzó el límite de imágenes del plan. Eliminá algunas para continuar.'
        )
      }
      // Clean up storage on any DB failure.
      await supabase.storage.from(bucket).remove([storagePath])
      return err(
        'DATABASE_ERROR',
        `No se pudo registrar la imagen: ${insertError.message}`
      )
    }

    return { success: true, data: mapRow(data) }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Error desconocido'
    return err('UPLOAD_FAILED', `Error al subir la imagen: ${message}`)
  }
}

// ── 2. listMediaAssets ────────────────────────────────────────────────────────

/**
 * Returns all media assets for the current store, sorted by created_at DESC.
 */
export async function listMediaAssets(): Promise<MediaAsset[]> {
  const ctx = await getStoreContext()
  if (!ctx.success) return []
  const { storeId, supabase } = ctx

  const { data, error } = await supabase
    .from('media_assets')
    .select('*')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false })

  if (error || !data) return []

  return data.map(mapRow)
}

// ── 3. searchMediaAssets ──────────────────────────────────────────────────────

/**
 * Filters media assets by context, tags (intersection), and/or text query
 * (case-insensitive match against filename and alt).
 */
export async function searchMediaAssets(
  filters: MediaSearchFilters
): Promise<MediaAsset[]> {
  const ctx = await getStoreContext()
  if (!ctx.success) return []
  const { storeId, supabase } = ctx

  let query = supabase
    .from('media_assets')
    .select('*')
    .eq('store_id', storeId)
    .order('created_at', { ascending: false })

  if (filters.context !== undefined) {
    query = query.eq('context', filters.context)
  }

  // Tags intersection: asset must contain ALL listed tags (array contains).
  if (filters.tags && filters.tags.length > 0) {
    query = query.contains('tags', filters.tags)
  }

  const { data, error } = await query

  if (error || !data) return []

  let assets = data.map(mapRow)

  // Text search: ILIKE on filename and alt. Done client-side to avoid SQL injection
  // and because Supabase's .ilike() only targets a single column at a time.
  if (filters.query && filters.query.trim() !== '') {
    const q = filters.query.trim().toLowerCase()
    assets = assets.filter(
      (a) =>
        a.filename.toLowerCase().includes(q) ||
        a.alt.toLowerCase().includes(q)
    )
  }

  return assets
}

// ── 4. getMediaAssetById ──────────────────────────────────────────────────────

/**
 * Returns a single media asset by its domain id (with "media_" prefix), or null.
 */
export async function getMediaAssetById(id: string): Promise<MediaAsset | null> {
  const ctx = await getStoreContext()
  if (!ctx.success) return null
  const { storeId, supabase } = ctx

  const { data, error } = await supabase
    .from('media_assets')
    .select('*')
    .eq('id', stripMediaPrefix(id))
    .eq('store_id', storeId)
    .single()

  if (error || !data) return null

  return mapRow(data)
}

// ── 5. updateMediaAssetAlt ────────────────────────────────────────────────────

/**
 * Updates the mutable fields of a media asset: alt text and/or tags.
 * All other fields (url, size, dimensions, context) are immutable.
 */
export async function updateMediaAssetAlt(
  id: string,
  input: UpdateMediaAssetInput
): Promise<ActionResult<MediaAsset>> {
  const ctx = await getStoreContext()
  if (!ctx.success) return { success: false, error: ctx.error }
  const { storeId, supabase } = ctx

  const updates: { alt?: string; tags?: string[] } = {}
  if (input.alt !== undefined) updates.alt = input.alt
  if (input.tags !== undefined) updates.tags = input.tags

  if (Object.keys(updates).length === 0) {
    // Nothing to update — fetch and return current state.
    const asset = await getMediaAssetById(id)
    if (!asset) return err('MEDIA_NOT_FOUND', 'Imagen no encontrada.')
    return { success: true, data: asset }
  }

  const { data, error } = await supabase
    .from('media_assets')
    .update(updates)
    .eq('id', stripMediaPrefix(id))
    .eq('store_id', storeId)
    .select()
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return err('MEDIA_NOT_FOUND', 'Imagen no encontrada.')
    }
    return err('DATABASE_ERROR', `No se pudo actualizar la imagen: ${error.message}`)
  }

  if (!data) return err('MEDIA_NOT_FOUND', 'Imagen no encontrada.')

  return { success: true, data: mapRow(data) }
}

// ── 6. deleteMediaAsset ───────────────────────────────────────────────────────

/**
 * Deletes a media asset from Storage and from the media_assets table.
 *
 * If the Storage deletion fails (e.g. file already gone), the DB record is still
 * removed — an orphaned storage file is preferable over a phantom DB record.
 */
export async function deleteMediaAsset(id: string): Promise<ActionResult<void>> {
  const ctx = await getStoreContext()
  if (!ctx.success) return { success: false, error: ctx.error }
  const { storeId, supabase } = ctx

  // Fetch the asset to get the CDN URL before deleting.
  const { data: asset, error: fetchError } = await supabase
    .from('media_assets')
    .select('id, url')
    .eq('id', stripMediaPrefix(id))
    .eq('store_id', storeId)
    .single()

  if (fetchError || !asset) {
    return err('MEDIA_NOT_FOUND', 'Imagen no encontrada.')
  }

  // Parse the CDN URL to get bucket + path for Storage deletion.
  const storageRef = parseStorageUrl(asset.url)
  if (storageRef) {
    // Best-effort: ignore Storage errors — DB record takes priority.
    await supabase.storage
      .from(storageRef.bucket)
      .remove([storageRef.path])
  }

  // Delete from DB.
  const { error: deleteError } = await supabase
    .from('media_assets')
    .delete()
    .eq('id', stripMediaPrefix(id))
    .eq('store_id', storeId)

  if (deleteError) {
    return err(
      'DATABASE_ERROR',
      `No se pudo eliminar la imagen: ${deleteError.message}`
    )
  }

  return { success: true, data: undefined }
}

// ── 7. getMediaStats ──────────────────────────────────────────────────────────

/**
 * Returns usage statistics for the store's media library.
 *
 * Reads limitCount from plans.media_limit via a JOIN; falls back to defaults
 * (100 assets, 8 MB) if the plan data is unavailable.
 * limitBytes uses the default 8 MB — Storage doesn't expose a per-plan byte cap
 * in the current schema, matching the localStorage implementation.
 */
export async function getMediaStats(): Promise<MediaLibraryStats> {
  const ctx = await getStoreContext()
  if (!ctx.success) return { count: 0, totalBytes: 0, limitBytes: DEFAULT_LIMIT_BYTES, limitCount: DEFAULT_LIMIT_COUNT }
  const { storeId, supabase } = ctx

  // Fetch all assets to compute count + totalBytes (lightweight: only size column).
  const { data: assets } = await supabase
    .from('media_assets')
    .select('size')
    .eq('store_id', storeId)

  const count = assets?.length ?? 0
  const totalBytes = assets?.reduce((acc, a) => acc + (a.size ?? 0), 0) ?? 0

  // Try to read the plan's media_limit for this store.
  const { data: storeData } = await supabase
    .from('stores')
    .select('plans(media_limit)')
    .eq('id', storeId)
    .single()

  let limitCount = DEFAULT_LIMIT_COUNT

  if (storeData?.plans) {
    const plan = Array.isArray(storeData.plans)
      ? storeData.plans[0]
      : storeData.plans
    if (plan && typeof (plan as { media_limit?: number }).media_limit === 'number') {
      limitCount = (plan as { media_limit: number }).media_limit
    }
  }

  return {
    count,
    totalBytes,
    limitBytes: DEFAULT_LIMIT_BYTES,
    limitCount,
  }
}

// ── 8. resolveMediaUrl ────────────────────────────────────────────────────────

/**
 * Resolves a single media asset id to its CDN URL, or null if not found.
 */
export async function resolveMediaUrl(mediaId: string): Promise<string | null> {
  const ctx = await getStoreContext()
  if (!ctx.success) return null
  const { storeId, supabase } = ctx

  const { data, error } = await supabase
    .from('media_assets')
    .select('url')
    .eq('id', stripMediaPrefix(mediaId))
    .eq('store_id', storeId)
    .single()

  if (error || !data) return null

  return data.url
}

// ── 9. resolveMediaUrls ───────────────────────────────────────────────────────

/**
 * Batch-resolves multiple media asset ids to their CDN URLs.
 * Returns a Record<id, url> — missing ids are omitted from the result.
 * The returned keys use the "media_" prefixed domain id format.
 */
export async function resolveMediaUrls(
  mediaIds: string[]
): Promise<Record<string, string>> {
  if (mediaIds.length === 0) return {}

  const ctx = await getStoreContext()
  if (!ctx.success) return {}
  const { storeId, supabase } = ctx

  const rawIds = mediaIds.map(stripMediaPrefix)

  const { data, error } = await supabase
    .from('media_assets')
    .select('id, url')
    .in('id', rawIds)
    .eq('store_id', storeId)

  if (error || !data) return {}

  const result: Record<string, string> = {}
  for (const row of data) {
    result[`media_${row.id}`] = row.url
  }

  return result
}
