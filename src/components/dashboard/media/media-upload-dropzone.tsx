'use client';

import { useCallback, useRef, useState } from 'react';
import { Upload, Loader2, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
type AcceptedMimeType = (typeof ACCEPTED_TYPES)[number];

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5 MB

interface MediaUploadDropzoneProps {
  onUpload: (file: File) => void | Promise<void>;
  isUploading?: boolean;
  maxSizeBytes?: number;
  className?: string;
}

function isAcceptedType(type: string): type is AcceptedMimeType {
  return ACCEPTED_TYPES.includes(type as AcceptedMimeType);
}

export function MediaUploadDropzone({
  onUpload,
  isUploading = false,
  maxSizeBytes = DEFAULT_MAX_SIZE,
  className,
}: MediaUploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateAndUpload = useCallback(
    async (file: File) => {
      setError(null);

      if (!isAcceptedType(file.type)) {
        setError('Solo se aceptan imágenes JPEG, PNG o WebP.');
        return;
      }

      if (file.size > maxSizeBytes) {
        const maxMB = Math.round(maxSizeBytes / (1024 * 1024));
        setError(`La imagen supera el límite de ${maxMB} MB`);
        return;
      }

      await onUpload(file);
    },
    [maxSizeBytes, onUpload]
  );

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      e.target.value = '';
      await validateAndUpload(file);
    },
    [validateAndUpload]
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (!file) return;
      await validateAndUpload(file);
    },
    [validateAndUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <div className={cn('space-y-2', className)}>
      <div
        role="button"
        tabIndex={isUploading ? -1 : 0}
        aria-disabled={isUploading}
        aria-label="Zona de subida de imágenes. Arrastrá o hacé clic para seleccionar."
        onClick={() => !isUploading && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !isUploading) {
            inputRef.current?.click();
          }
        }}
        onDrop={(e) => { void handleDrop(e); }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          'flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors duration-150',
          isUploading
            ? 'cursor-not-allowed border-gray-300 bg-gray-50 opacity-60'
            : isDragging
              ? 'border-primary bg-primary/5 cursor-copy'
              : 'border-gray-300 bg-gray-50 cursor-pointer hover:border-gray-400 hover:bg-gray-100'
        )}
      >
        {isUploading ? (
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        ) : (
          <div className="flex size-12 items-center justify-center rounded-full bg-gray-200">
            {isDragging ? (
              <Upload className="size-6 text-primary" />
            ) : (
              <ImageIcon className="size-6 text-gray-500" />
            )}
          </div>
        )}

        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            {isUploading
              ? 'Subiendo imagen...'
              : isDragging
                ? 'Soltá la imagen acá'
                : 'Arrastrá una imagen o hacé clic para seleccionar'}
          </p>
          {!isUploading && (
            <p className="text-xs text-muted-foreground">
              JPEG, PNG o WebP · Máximo {Math.round(maxSizeBytes / (1024 * 1024))} MB
            </p>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        className="hidden"
        onChange={(e) => { void handleFileChange(e); }}
        disabled={isUploading}
      />

      {error && (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
