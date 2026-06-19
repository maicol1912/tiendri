// Media migration — one-shot migration of inline base64 images to MediaLibrary.
// Runs once on first dashboard load after the media-library feature ships.
// Images previously stored as base64 data URLs in customization are converted to
// media_xxx IDs. The customization blob is updated in place.
//
// Migration flag key: tiendri_{storeId}_media_migrated

import { LocalMediaRepository } from '@/infrastructure/repositories/local-storage/media.repository';
import { getByPath, setByPath } from '@/catalog/config-path-utils';

// ── Constants ─────────────────────────────────────────────────────────────────

const MIGRATION_FLAG_KEY = (storeId: string): string =>
  `tiendri_${storeId}_media_migrated`;

const CUSTOMIZATION_KEY = (storeId: string): string =>
  `tiendri_${storeId}_customization`;

/** Dot-paths to scalar image fields inside StoreCustomization */
const SCALAR_IMAGE_FIELDS: string[] = [
  'branding.logo',
  'branding.favicon',
  'content.heroBanner.image',
  'content.offersBanner.desktopImage',
  'content.offersBanner.mobileImage',
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function isBase64DataUrl(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('data:image/');
}

function isMediaId(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('media_');
}

function setMigrationFlag(storeId: string): void {
  try {
    localStorage.setItem(MIGRATION_FLAG_KEY(storeId), 'true');
  } catch {
    // localStorage unavailable — ignore
  }
}

// ── Migration ─────────────────────────────────────────────────────────────────

/**
 * Migrate all inline base64 images in the store's customization blob to the
 * MediaLibrary. Each base64 value is stored as a new MediaAsset and the field
 * is replaced with the resulting media ID.
 *
 * Safe to call multiple times — subsequent calls are no-ops (migration flag).
 */
export async function migrateInlineImagesToMediaLibrary(storeId: string): Promise<void> {
  if (typeof window === 'undefined') return;

  // Already migrated — skip
  try {
    const flag = localStorage.getItem(MIGRATION_FLAG_KEY(storeId));
    if (flag) return;
  } catch {
    return;
  }

  // Read customization blob
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(CUSTOMIZATION_KEY(storeId));
  } catch {
    setMigrationFlag(storeId);
    return;
  }

  if (!raw) {
    setMigrationFlag(storeId);
    return;
  }

  let customization: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      setMigrationFlag(storeId);
      return;
    }
    customization = parsed as Record<string, unknown>;
  } catch {
    setMigrationFlag(storeId);
    return;
  }

  const repo = new LocalMediaRepository();
  let dirty = false;

  // ── Migrate scalar image fields ───────────────────────────────────────────

  for (const fieldPath of SCALAR_IMAGE_FIELDS) {
    const value = getByPath(customization, fieldPath);

    if (!isBase64DataUrl(value) || isMediaId(value)) continue;

    // Capture the narrowed string in a local variable so TS keeps the type
    const dataUrl: string = value;

    // Derive a context hint from the path
    const context = fieldPath.startsWith('branding.logo')
      ? 'logo'
      : fieldPath.startsWith('branding')
        ? 'general'
        : 'banner';

    const result = await repo.upload(storeId, {
      filename: `migrated-${fieldPath.replace(/\./g, '-')}.webp`,
      alt: '',
      url: dataUrl,
      mimetype: detectMimeType(dataUrl),
      size: dataUrl.length,
      width: 0,
      height: 0,
      context,
      tags: ['migrated'],
    });

    if (result.success) {
      customization = setByPath(customization, fieldPath, result.data.id);
      dirty = true;
    }
  }

  // ── Migrate promotional banners array ─────────────────────────────────────

  const bannersValue = getByPath(customization, 'content.promotionalBanners');
  if (Array.isArray(bannersValue)) {
    const banners = bannersValue as unknown[];
    let bannersDirty = false;
    const migratedBanners: unknown[] = [];

    for (const banner of banners) {
      if (
        banner !== null &&
        typeof banner === 'object' &&
        !Array.isArray(banner)
      ) {
        const bannerObj = banner as Record<string, unknown>;
        const imgValue = bannerObj['image'];

        if (isBase64DataUrl(imgValue) && !isMediaId(imgValue)) {
          const imgDataUrl: string = imgValue;
          const result = await repo.upload(storeId, {
            filename: 'migrated-promotional-banner.webp',
            alt: '',
            url: imgDataUrl,
            mimetype: detectMimeType(imgDataUrl),
            size: imgDataUrl.length,
            width: 0,
            height: 0,
            context: 'banner',
            tags: ['migrated'],
          });

          if (result.success) {
            migratedBanners.push({ ...bannerObj, image: result.data.id });
            bannersDirty = true;
            continue;
          }
        }

        migratedBanners.push(banner);
      } else {
        migratedBanners.push(banner);
      }
    }

    if (bannersDirty) {
      customization = setByPath(customization, 'content.promotionalBanners', migratedBanners);
      dirty = true;
    }
  }

  // ── Persist updated customization ─────────────────────────────────────────

  if (dirty) {
    try {
      localStorage.setItem(CUSTOMIZATION_KEY(storeId), JSON.stringify(customization));
    } catch {
      // Storage write failed — do not set flag so it retries next time
      return;
    }
  }

  setMigrationFlag(storeId);
}

// ── Mime detection ────────────────────────────────────────────────────────────

function detectMimeType(dataUrl: string): string {
  const match = /^data:(image\/[a-z+]+);base64,/.exec(dataUrl);
  return match?.[1] ?? 'image/webp';
}
