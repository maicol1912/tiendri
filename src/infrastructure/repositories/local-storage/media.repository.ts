// localStorage implementation of MediaRepository.
// Canonical location for the canvas→WebP resize pipeline (consolidated from 3
// duplicate implementations in use-image-upload.ts, branding-tab, category-sheet).
//
// Error codes (tiendri-rules.md §3.2):
//   MAX_MEDIA_REACHED   — store already has 100 assets
//   MEDIA_LIBRARY_FULL  — total stored bytes ≥ 8 MB
//   MEDIA_NOT_FOUND     — asset id unknown

import type {
  MediaAsset,
  CreateMediaAssetInput,
  UpdateMediaAssetInput,
  MediaLibraryStats,
  MediaSearchFilters,
  ActionResult,
} from '@/types/domain';
import type { MediaRepository } from '../interfaces';

// ── Constants ─────────────────────────────────────────────────────────────────

const LIMIT_COUNT = 100;
const LIMIT_BYTES = 8_388_608; // 8 MB
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB raw input size guard
const RESIZE_MAX_WIDTH = 800;
const RESIZE_QUALITY = 0.7;

// ── Canvas → WebP pipeline ────────────────────────────────────────────────────
// Exported so external callers (e.g. migration module) can reuse it without
// going through the repository API.

export async function resizeAndConvert(
  file: File,
  maxWidth: number = RESIZE_MAX_WIDTH,
  quality: number = RESIZE_QUALITY
): Promise<{ dataUrl: string; width: number; height: number; mimetype: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const scale = img.width > maxWidth ? maxWidth / img.width : 1;
      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context unavailable'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      const tryWebP = (): void => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onload = () =>
                resolve({
                  dataUrl: reader.result as string,
                  width,
                  height,
                  mimetype: 'image/webp',
                });
              reader.onerror = () => reject(new Error('FileReader failed'));
              reader.readAsDataURL(blob);
            } else {
              tryPNG();
            }
          },
          'image/webp',
          quality
        );
      };

      const tryPNG = (): void => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onload = () =>
                resolve({
                  dataUrl: reader.result as string,
                  width,
                  height,
                  mimetype: 'image/png',
                });
              reader.onerror = () => reject(new Error('FileReader failed'));
              reader.readAsDataURL(blob);
            } else {
              reject(new Error('Canvas toBlob failed for both WebP and PNG'));
            }
          },
          'image/png'
        );
      };

      tryWebP();
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Image load failed'));
    };

    img.src = objectUrl;
  });
}

// ── Storage helpers ───────────────────────────────────────────────────────────

function storageKey(storeId: string): string {
  return `tiendri_${storeId}_media`;
}

function readAll(storeId: string): MediaAsset[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(storageKey(storeId));
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as MediaAsset[];
  } catch {
    return [];
  }
}

function writeAll(storeId: string, assets: MediaAsset[]): void {
  localStorage.setItem(storageKey(storeId), JSON.stringify(assets));
}

function err(code: string, message: string): ActionResult<never> {
  return { success: false, error: { code, message } };
}

// ── Repository ────────────────────────────────────────────────────────────────

export class LocalMediaRepository implements MediaRepository {
  async upload(
    storeId: string,
    input: CreateMediaAssetInput
  ): Promise<ActionResult<MediaAsset>> {
    // Raw input size guard (before processing)
    if (input.size > MAX_UPLOAD_BYTES) {
      return err(
        'FILE_TOO_LARGE',
        'La imagen supera el límite de 5 MB. Seleccioná una imagen más pequeña.'
      );
    }

    const all = readAll(storeId);

    // Enforce count limit
    if (all.length >= LIMIT_COUNT) {
      return err(
        'MAX_MEDIA_REACHED',
        `Tu biblioteca ya tiene ${LIMIT_COUNT} imágenes. Eliminá algunas para continuar.`
      );
    }

    // Enforce total bytes limit
    const totalBytes = all.reduce((acc, a) => acc + a.size, 0);
    const incomingSize = input.size;
    if (totalBytes + incomingSize > LIMIT_BYTES) {
      return err(
        'MEDIA_LIBRARY_FULL',
        'No hay espacio suficiente en tu biblioteca (máximo 8 MB). Eliminá imágenes para liberar espacio.'
      );
    }

    const asset: MediaAsset = {
      id: `media_${crypto.randomUUID()}`,
      store_id: storeId,
      filename: input.filename,
      alt: input.alt ?? '',
      url: input.url,
      mimetype: input.mimetype,
      size: input.size,
      width: input.width,
      height: input.height,
      context: input.context ?? 'general',
      tags: input.tags ?? [],
      created_at: new Date().toISOString(),
    };

    writeAll(storeId, [...all, asset]);
    return { success: true, data: asset };
  }

  async list(storeId: string): Promise<MediaAsset[]> {
    return readAll(storeId).sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  async search(
    storeId: string,
    filters: MediaSearchFilters
  ): Promise<MediaAsset[]> {
    let assets = await this.list(storeId);

    if (filters.context !== undefined) {
      assets = assets.filter((a) => a.context === filters.context);
    }

    if (filters.tags && filters.tags.length > 0) {
      const required = filters.tags;
      assets = assets.filter((a) =>
        required.every((tag) => a.tags.includes(tag))
      );
    }

    if (filters.query && filters.query.trim() !== '') {
      const q = filters.query.trim().toLowerCase();
      assets = assets.filter(
        (a) =>
          a.filename.toLowerCase().includes(q) ||
          a.alt.toLowerCase().includes(q)
      );
    }

    return assets;
  }

  async getById(storeId: string, id: string): Promise<MediaAsset | null> {
    const all = readAll(storeId);
    return all.find((a) => a.store_id === storeId && a.id === id) ?? null;
  }

  async updateAlt(
    storeId: string,
    id: string,
    input: UpdateMediaAssetInput
  ): Promise<ActionResult<MediaAsset>> {
    const all = readAll(storeId);
    const idx = all.findIndex((a) => a.store_id === storeId && a.id === id);

    if (idx === -1) {
      return err('MEDIA_NOT_FOUND', 'Imagen no encontrada.');
    }

    const updated: MediaAsset = {
      ...all[idx],
      ...(input.alt !== undefined ? { alt: input.alt } : {}),
      ...(input.tags !== undefined ? { tags: input.tags } : {}),
    };

    const next = [...all];
    next[idx] = updated;
    writeAll(storeId, next);

    return { success: true, data: updated };
  }

  async delete(storeId: string, id: string): Promise<ActionResult<void>> {
    const all = readAll(storeId);
    const exists = all.some((a) => a.store_id === storeId && a.id === id);

    if (!exists) {
      return err('MEDIA_NOT_FOUND', 'Imagen no encontrada.');
    }

    writeAll(
      storeId,
      all.filter((a) => !(a.store_id === storeId && a.id === id))
    );
    return { success: true, data: undefined };
  }

  async getStats(storeId: string): Promise<MediaLibraryStats> {
    const all = readAll(storeId);
    const totalBytes = all.reduce((acc, a) => acc + a.size, 0);
    return {
      count: all.length,
      totalBytes,
      limitBytes: LIMIT_BYTES,
      limitCount: LIMIT_COUNT,
    };
  }

  async resolveUrl(storeId: string, mediaId: string): Promise<string | null> {
    const asset = await this.getById(storeId, mediaId);
    return asset?.url ?? null;
  }

  async resolveUrls(
    storeId: string,
    mediaIds: string[]
  ): Promise<Map<string, string>> {
    const all = readAll(storeId);
    const lookup = new Map(all.map((a) => [a.id, a.url]));
    const result = new Map<string, string>();

    for (const id of mediaIds) {
      const url = lookup.get(id);
      if (url !== undefined) {
        result.set(id, url);
      }
    }

    return result;
  }
}
