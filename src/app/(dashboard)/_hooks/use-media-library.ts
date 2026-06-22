'use client';

// Media Library hook — calls Server Actions directly.
// No storeId param — Server Actions resolve the store from the session.
// Canvas→WebP pipeline lives in @/shared/image-processing.

import { useState, useEffect, useCallback } from 'react';
import {
  listMediaAssets,
  uploadMediaAsset,
  deleteMediaAsset,
  updateMediaAssetAlt,
  searchMediaAssets,
  resolveMediaUrl,
  getMediaStats,
} from '@/app/(dashboard)/dashboard/_actions/media';
import { resizeAndConvert } from '@/shared/image-processing';
import { getImageSizeConfig } from '@/shared/image-size-config';
import type {
  MediaAsset,
  MediaLibraryStats,
  MediaSearchFilters,
  MediaAssetContext,
} from '@/types/domain';

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_INPUT_BYTES = 5 * 1024 * 1024; // 5 MB raw input guard (before resize)

// ── Types ─────────────────────────────────────────────────────────────────────

export interface UploadOptions {
  context?: MediaAssetContext;
  tags?: string[];
  alt?: string;
}

export interface UploadResult {
  success: boolean;
  asset?: MediaAsset;
  errorCode?: string;
  errorMessage?: string;
}

export interface UseMediaLibraryReturn {
  assets: MediaAsset[];
  stats: MediaLibraryStats | null;
  isLoading: boolean;
  error: string | null;
  /** Process a File or Blob through canvas→WebP and store as a MediaAsset. */
  upload: (fileOrBlob: File | Blob, options?: UploadOptions) => Promise<UploadResult>;
  /** Delete an asset by id. Returns true on success. */
  deleteAsset: (id: string) => Promise<boolean>;
  /** Update alt text and/or tags of an existing asset. Returns true on success. */
  updateAlt: (id: string, alt: string, tags?: string[]) => Promise<boolean>;
  /** Filter assets by context, tags, and/or query string. */
  search: (filters: MediaSearchFilters) => Promise<MediaAsset[]>;
  /** Resolve a single media ID to its URL, or null if not found. */
  resolveUrl: (mediaId: string) => Promise<string | null>;
  /** Refresh the assets list from the server. */
  refresh: () => Promise<void>;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

/**
 * `storeId` is accepted for backward-compatibility but ignored —
 * Server Actions resolve the store from the session cookie.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useMediaLibrary(_storeId?: string): UseMediaLibraryReturn {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [stats, setStats] = useState<MediaLibraryStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Load ──────────────────────────────────────────────────────────────────────

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [data, libraryStats] = await Promise.all([
        listMediaAssets(),
        getMediaStats(),
      ]);
      setAssets(data);
      setStats(libraryStats);
    } catch {
      setError('No se pudo cargar la biblioteca de imágenes.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // ── Upload ────────────────────────────────────────────────────────────────────

  const upload = useCallback(
    async (fileOrBlob: File | Blob, options: UploadOptions = {}): Promise<UploadResult> => {
      // Normalize Blob → File so resizeAndConvert (which expects File) works.
      const file =
        fileOrBlob instanceof File
          ? fileOrBlob
          : new File([fileOrBlob], 'image.webp', { type: 'image/webp' });

      // Pre-check: reject oversized input before canvas processing.
      const context = options.context ?? 'general';
      const config = getImageSizeConfig(context);
      const inputLimit = config.maxInputBytes ?? MAX_INPUT_BYTES;

      if (file.size > inputLimit) {
        return {
          success: false,
          errorCode: 'FILE_TOO_LARGE',
          errorMessage: 'La imagen supera el límite de tamaño. Seleccioná una imagen más pequeña.',
        };
      }

      let processed: { dataUrl: string; width: number; height: number; mimetype: string; sizeBytes: number };
      try {
        processed = await resizeAndConvert(file, config.maxWidth, config.quality);
      } catch {
        return {
          success: false,
          errorCode: 'PROCESSING_FAILED',
          errorMessage: 'No se pudo procesar la imagen. Intentá con otro archivo.',
        };
      }

      const result = await uploadMediaAsset({
        base64Data: processed.dataUrl,
        filename: file.name,
        mimetype: processed.mimetype,
        size: processed.sizeBytes,
        width: processed.width,
        height: processed.height,
        context: options.context,
        alt: options.alt,
        tags: options.tags,
      });

      if (result.success) {
        await load();
        return { success: true, asset: result.data };
      }

      return {
        success: false,
        errorCode: result.error.code,
        errorMessage: result.error.message,
      };
    },
    [load]
  );

  // ── Delete ────────────────────────────────────────────────────────────────────

  const deleteAsset = useCallback(
    async (id: string): Promise<boolean> => {
      const result = await deleteMediaAsset(id);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [load]
  );

  // ── Update alt ────────────────────────────────────────────────────────────────

  const updateAlt = useCallback(
    async (id: string, alt: string, tags?: string[]): Promise<boolean> => {
      const result = await updateMediaAssetAlt(id, { alt, tags });
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [load]
  );

  // ── Search ────────────────────────────────────────────────────────────────────

  const search = useCallback(async (filters: MediaSearchFilters): Promise<MediaAsset[]> => {
    return searchMediaAssets(filters);
  }, []);

  // ── Resolve URL ───────────────────────────────────────────────────────────────

  const resolveUrl = useCallback(async (mediaId: string): Promise<string | null> => {
    return resolveMediaUrl(mediaId);
  }, []);

  return {
    assets,
    stats,
    isLoading,
    error,
    upload,
    deleteAsset,
    updateAlt,
    search,
    resolveUrl,
    refresh: load,
  };
}
