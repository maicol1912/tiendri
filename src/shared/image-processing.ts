// Shared canvas → WebP image processing pipeline.
// Extracted from media.repository.ts so any module can resize/convert images
// without depending on the storage layer.

import type { ImageSizeConfig } from '@/shared/image-size-config';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ResizeAndConvertResult {
  dataUrl: string;
  blob: Blob;
  width: number;
  height: number;
  mimetype: string;
  sizeBytes: number;
}

// ── Defaults ──────────────────────────────────────────────────────────────────

const DEFAULT_MAX_WIDTH = 800;
const DEFAULT_QUALITY = 0.7;

// ── Pipeline ──────────────────────────────────────────────────────────────────

export async function resizeAndConvert(
  file: File,
  maxWidth: number = DEFAULT_MAX_WIDTH,
  quality: number = DEFAULT_QUALITY,
  config?: ImageSizeConfig
): Promise<ResizeAndConvertResult> {
  // config overrides explicit maxWidth/quality when provided
  const resolvedMaxWidth = config?.maxWidth ?? maxWidth;
  const resolvedQuality = config?.quality ?? quality;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const scale = img.width > resolvedMaxWidth ? resolvedMaxWidth / img.width : 1;
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
              reader.onloadend = () =>
                resolve({
                  dataUrl: reader.result as string,
                  blob,
                  width,
                  height,
                  mimetype: 'image/webp',
                  sizeBytes: blob.size,
                });
              reader.onerror = () => reject(new Error('FileReader failed'));
              reader.readAsDataURL(blob);
            } else {
              tryPNG();
            }
          },
          'image/webp',
          resolvedQuality
        );
      };

      const tryPNG = (): void => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reader = new FileReader();
              reader.onloadend = () =>
                resolve({
                  dataUrl: reader.result as string,
                  blob,
                  width,
                  height,
                  mimetype: 'image/png',
                  sizeBytes: blob.size,
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
