// Shared canvas → WebP image processing pipeline.
// Extracted from media.repository.ts so any module can resize/convert images
// without depending on the storage layer.

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ResizeAndConvertResult {
  dataUrl: string;
  width: number;
  height: number;
  mimetype: string;
}

// ── Defaults ──────────────────────────────────────────────────────────────────

const DEFAULT_MAX_WIDTH = 800;
const DEFAULT_QUALITY = 0.7;

// ── Pipeline ──────────────────────────────────────────────────────────────────

export async function resizeAndConvert(
  file: File,
  maxWidth: number = DEFAULT_MAX_WIDTH,
  quality: number = DEFAULT_QUALITY
): Promise<ResizeAndConvertResult> {
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
