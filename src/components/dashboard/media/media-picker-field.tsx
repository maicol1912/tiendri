'use client';

import { useState, useCallback, useEffect } from 'react';
import { ImageIcon, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/shared/utils';
import { MediaPickerDialog } from './media-picker-dialog';
import { useMediaLibrary } from '@/app/(dashboard)/_hooks/use-media-library';

interface MediaPickerFieldProps {
  value: string | null;
  onChange: (mediaId: string | null) => void;
  label?: string;
  aspectRatio?: string;
  description?: string;
  className?: string;
}

export function MediaPickerField({
  value,
  onChange,
  label,
  aspectRatio,
  description,
  className,
}: MediaPickerFieldProps) {
  const { resolveUrl } = useMediaLibrary();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setResolvedUrl(null);
      return;
    }
    void resolveUrl(value).then(setResolvedUrl);
  }, [value, resolveUrl]);

  const handleSelect = useCallback(
    (mediaId: string) => {
      onChange(mediaId);
    },
    [onChange]
  );

  const handleRemove = useCallback(() => {
    onChange(null);
  }, [onChange]);

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <p className="text-sm font-medium leading-none">{label}</p>
      )}

      {value && resolvedUrl ? (
        <div className="group relative overflow-hidden rounded-lg border border-border">
          {/* Thumbnail */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolvedUrl}
            alt="Imagen seleccionada"
            className={cn(
              'w-full object-cover',
              aspectRatio ? '' : 'max-h-48'
            )}
            style={aspectRatio ? { aspectRatio } : undefined}
          />

          {/* Action overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => setDialogOpen(true)}
              className="gap-1.5 text-xs"
            >
              <RefreshCw className="size-3.5" />
              Cambiar
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={handleRemove}
              className="gap-1.5 text-xs"
            >
              <X className="size-3.5" />
              Quitar
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border px-4 py-8 text-muted-foreground transition-colors hover:border-muted-foreground hover:text-foreground"
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-muted">
            <ImageIcon className="size-5" />
          </div>
          <span className="text-sm font-medium">Elegir imagen</span>
          {aspectRatio && (
            <span className="text-xs text-muted-foreground">
              Relación de aspecto recomendada: {aspectRatio}
            </span>
          )}
        </button>
      )}

      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      <MediaPickerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSelect={handleSelect}
      />
    </div>
  );
}
