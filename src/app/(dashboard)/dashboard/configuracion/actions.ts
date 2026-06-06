// localStorage persistence helpers for /dashboard/configuracion
// Replaces the old Supabase Server Actions.
// All functions run on the client — no "use server" directive.

import type { StoreCustomization } from '@/types/templates/store-customization';
import type { BrandingConfig, ContentConfig, BusinessConfig } from '@/types/templates/customization-sections';
import type { ThemeCustomization } from '@/types/templates/store-customization';

// ── Shared types ──────────────────────────────────────────────────────────────

interface ActionError {
  code: string;
  message: string;
  field?: string;
}

export type ActionResult<T = undefined> =
  | { success: true; data?: T }
  | { success: false; error: ActionError };

// ── Storage key ───────────────────────────────────────────────────────────────

export const CUSTOMIZATION_STORAGE_KEY = 'tiendri_demo-store_customization';

// ── Read / write helpers ──────────────────────────────────────────────────────

export function readCustomization(): StoreCustomization {
  try {
    const raw = localStorage.getItem(CUSTOMIZATION_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StoreCustomization;
  } catch {
    // Corrupted — start fresh
  }
  return { templateId: 'tech-premium' };
}

function writeCustomization(data: StoreCustomization): ActionResult {
  try {
    localStorage.setItem(CUSTOMIZATION_STORAGE_KEY, JSON.stringify(data));
    return { success: true };
  } catch {
    return {
      success: false,
      error: { code: 'STORAGE_ERROR', message: 'Error al guardar los cambios. Intentá de nuevo.' },
    };
  }
}

// ── Section updaters ──────────────────────────────────────────────────────────

export function updateBranding(branding: BrandingConfig): ActionResult {
  const current = readCustomization();
  return writeCustomization({
    ...current,
    branding: { ...(current.branding ?? {}), ...branding },
  });
}

export function updateContent(content: ContentConfig): ActionResult {
  const current = readCustomization();
  return writeCustomization({
    ...current,
    content: { ...(current.content ?? {}), ...content },
  });
}

export function updateBusiness(business: BusinessConfig): ActionResult {
  const current = readCustomization();
  return writeCustomization({
    ...current,
    business: { ...(current.business ?? {}), ...business },
  });
}

export function updateTheme(theme: ThemeCustomization): ActionResult {
  const current = readCustomization();
  return writeCustomization({
    ...current,
    theme: { ...(current.theme ?? {}), ...theme },
  });
}

export function updateStructuralVariants(variants: import('@/types/templates/structural-variants').StructuralVariants): ActionResult {
  const current = readCustomization();
  return writeCustomization({
    ...current,
    layout: {
      ...(current.layout ?? {}),
      structuralVariants: {
        ...(current.layout?.structuralVariants ?? {}),
        ...variants,
      },
    },
  });
}

// ── Image helpers ─────────────────────────────────────────────────────────────

/** Resize a File and return a base64 WebP data URL for localStorage storage. */
export function fileToDataUrl(file: File, maxWidth = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const scale = img.width > maxWidth ? maxWidth / img.width : 1;
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas not supported'));
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas toBlob failed'));
            return;
          }
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error('FileReader failed'));
          reader.readAsDataURL(blob);
        },
        'image/webp',
        0.85
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image'));
    };

    img.src = objectUrl;
  });
}
