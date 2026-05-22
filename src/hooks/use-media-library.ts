'use client';

// Media Library hook — follows use-repositories.ts pattern.
// Manages state + calls MediaRepository; repository is not exposed to consumers.
// Canvas→WebP pipeline lives in LocalMediaRepository (consolidated from 3 duplicates).

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getRepositories, getStoreId } from '@/lib/repositories';
import { resizeAndConvert } from '@/lib/repositories/local-storage/media.repository';
import type {
  MediaAsset,
  MediaLibraryStats,
  MediaSearchFilters,
  MediaAssetContext,
} from '@/types/domain';

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_INPUT_BYTES = 5 * 1024 * 1024; // 5 MB raw input guard (before resize)
const RESIZE_MAX_WIDTH = 800;
const RESIZE_QUALITY = 0.7;

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
  /** Process a File through canvas→WebP and store as a MediaAsset. */
  upload: (file: File, options?: UploadOptions) => Promise<UploadResult>;
  /** Delete an asset by id. Returns true on success. */
  deleteAsset: (id: string) => Promise<boolean>;
  /** Update alt text and/or tags of an existing asset. Returns true on success. */
  updateAlt: (id: string, alt: string, tags?: string[]) => Promise<boolean>;
  /** Filter assets by context, tags, and/or query string. */
  search: (filters: MediaSearchFilters) => Promise<MediaAsset[]>;
  /** Resolve a single media ID to its URL, or null if not found. */
  resolveUrl: (mediaId: string) => Promise<string | null>;
  /** Refresh the assets list from storage. */
  refresh: () => Promise<void>;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useMediaLibrary(storeId?: string): UseMediaLibraryReturn {
  const resolvedStoreId = storeId ?? getStoreId();

  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [stats, setStats] = useState<MediaLibraryStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const repo = useMemo(() => getRepositories().media, []);

  // ── Load ─────────────────────────────────────────────────────────────────────

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [data, libraryStats] = await Promise.all([
        repo.list(resolvedStoreId),
        repo.getStats(resolvedStoreId),
      ]);
      setAssets(data);
      setStats(libraryStats);
    } catch {
      setError('No se pudo cargar la biblioteca de imágenes.');
    } finally {
      setIsLoading(false);
    }
  }, [resolvedStoreId, repo]);

  useEffect(() => {
    void load();
  }, [load]);

  // ── Upload ───────────────────────────────────────────────────────────────────

  const upload = useCallback(
    async (file: File, options: UploadOptions = {}): Promise<UploadResult> => {
      // Pre-check: reject oversized input before canvas processing
      if (file.size > MAX_INPUT_BYTES) {
        return {
          success: false,
          errorCode: 'FILE_TOO_LARGE',
          errorMessage: 'La imagen supera el límite de 5 MB. Seleccioná una imagen más pequeña.',
        };
      }

      let processed: { dataUrl: string; width: number; height: number; mimetype: string };
      try {
        processed = await resizeAndConvert(file, RESIZE_MAX_WIDTH, RESIZE_QUALITY);
      } catch {
        return {
          success: false,
          errorCode: 'PROCESSING_FAILED',
          errorMessage: 'No se pudo procesar la imagen. Intentá con otro archivo.',
        };
      }

      const result = await repo.upload(resolvedStoreId, {
        filename: file.name,
        alt: options.alt ?? '',
        url: processed.dataUrl,
        mimetype: processed.mimetype,
        size: processed.dataUrl.length, // byte count of the stored string
        width: processed.width,
        height: processed.height,
        context: options.context,
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
    [resolvedStoreId, repo, load]
  );

  // ── Delete ───────────────────────────────────────────────────────────────────

  const deleteAsset = useCallback(
    async (id: string): Promise<boolean> => {
      const result = await repo.delete(resolvedStoreId, id);
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [resolvedStoreId, repo, load]
  );

  // ── Update alt ───────────────────────────────────────────────────────────────

  const updateAlt = useCallback(
    async (id: string, alt: string, tags?: string[]): Promise<boolean> => {
      const result = await repo.updateAlt(resolvedStoreId, id, { alt, tags });
      if (result.success) {
        await load();
        return true;
      }
      setError(result.error.message);
      return false;
    },
    [resolvedStoreId, repo, load]
  );

  // ── Search ───────────────────────────────────────────────────────────────────

  const search = useCallback(
    async (filters: MediaSearchFilters): Promise<MediaAsset[]> => {
      return repo.search(resolvedStoreId, filters);
    },
    [resolvedStoreId, repo]
  );

  // ── Resolve URL ───────────────────────────────────────────────────────────────

  const resolveUrl = useCallback(
    async (mediaId: string): Promise<string | null> => {
      return repo.resolveUrl(resolvedStoreId, mediaId);
    },
    [resolvedStoreId, repo]
  );

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
