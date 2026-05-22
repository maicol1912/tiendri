// Media asset domain types — store-level image management.
// Follows tiendri-rules.md §3.1 (ActionResult) and §2 (domain types).

// ── Context ───────────────────────────────────────────────────────────────────

export type MediaAssetContext =
  | 'product'
  | 'banner'
  | 'logo'
  | 'category'
  | 'general';

// ── Core entity ───────────────────────────────────────────────────────────────

export interface MediaAsset {
  /** Stable UUID with "media_" prefix — e.g. "media_abc123" */
  id: string;
  store_id: string;
  filename: string;
  /** Always a string, defaults to "" — never null */
  alt: string;
  /** base64 data URL (localStorage) or CDN URL (Supabase, future) */
  url: string;
  mimetype: string;
  /** Byte count of the stored url string */
  size: number;
  width: number;
  height: number;
  context: MediaAssetContext;
  /** Always an array, defaults to [] — never null */
  tags: string[];
  /** ISO 8601 timestamp */
  created_at: string;
}

// ── Input / mutation types ────────────────────────────────────────────────────

export interface CreateMediaAssetInput {
  filename: string;
  alt?: string;
  url: string;
  mimetype: string;
  size: number;
  width: number;
  height: number;
  context?: MediaAssetContext;
  tags?: string[];
}

export interface UpdateMediaAssetInput {
  alt?: string;
  tags?: string[];
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export interface MediaLibraryStats {
  count: number;
  totalBytes: number;
  /** 8 MB hard cap — 8_388_608 bytes */
  limitBytes: number;
  /** 100 assets per store */
  limitCount: number;
}

// ── Search ────────────────────────────────────────────────────────────────────

export interface MediaSearchFilters {
  /** Filter by asset context */
  context?: MediaAssetContext;
  /** Filter by tags — intersection (asset must have ALL listed tags) */
  tags?: string[];
  /** Case-insensitive match against filename and alt text */
  query?: string;
}
