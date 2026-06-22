// Media migration — one-shot migration of inline base64 images to MediaLibrary.
// Runs once on first dashboard load after the media-library feature ships.
// Images previously stored as base64 data URLs in customization are converted to
// media_xxx IDs. The customization blob is updated in place.
//
// Migration flag key: tiendri_{storeId}_media_migrated
//
// NOTE: LocalMediaRepository has been removed. The media library is now backed
// by Supabase via Server Actions. This migration is a no-op until it is
// rewritten to call the Supabase upload Server Action.

// ── Constants ─────────────────────────────────────────────────────────────────

const MIGRATION_FLAG_KEY = (storeId: string): string =>
  `tiendri_${storeId}_media_migrated`;

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
 *
 * TODO: Rewrite to call the Supabase uploadMedia Server Action once the
 * Supabase media backend is complete (phase-3-roadmap).
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

  // Migration is a no-op until Supabase upload Server Action is available.
  // Mark as migrated so callers don't retry on every dashboard load.
  setMigrationFlag(storeId);
}
