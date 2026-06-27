'use client';

import { useState, useCallback } from 'react';
import { Trash2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/shared/utils';
import type { MediaAsset } from '@/types/domain';
import { MediaDeleteDialog } from './media-delete-dialog';
import { formatBytes } from '@/shared/format';

interface MediaItemCardProps {
  asset: MediaAsset;
  onDelete: (id: string) => void;
  onEditAlt: (id: string, alt: string) => void;
  /** When true, card is in selectable mode — clicking the card fires onSelect */
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export function MediaItemCard({
  asset,
  onDelete,
  onEditAlt,
  selectable = false,
  selected = false,
  onSelect,
}: MediaItemCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditingAlt, setIsEditingAlt] = useState(false);
  const [altDraft, setAltDraft] = useState(asset.alt);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      onDelete(asset.id);
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  }, [asset.id, onDelete]);

  const handleAltSubmit = useCallback(() => {
    onEditAlt(asset.id, altDraft);
    setIsEditingAlt(false);
  }, [asset.id, altDraft, onEditAlt]);

  const handleAltKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleAltSubmit();
      if (e.key === 'Escape') {
        setAltDraft(asset.alt);
        setIsEditingAlt(false);
      }
    },
    [asset.alt, handleAltSubmit]
  );

  const handleCardClick = useCallback(() => {
    if (selectable && onSelect) {
      onSelect(asset.id);
    }
  }, [selectable, onSelect, asset.id]);

  return (
    <>
      <div
        className={cn(
          'group relative overflow-hidden rounded-lg border bg-card transition-all duration-150',
          selectable
            ? 'cursor-pointer hover:border-primary/50'
            : 'border-border',
          selected && 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
        )}
        onClick={handleCardClick}
        role={selectable ? 'button' : undefined}
        tabIndex={selectable ? 0 : undefined}
        onKeyDown={
          selectable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') handleCardClick();
              }
            : undefined
        }
        aria-pressed={selectable ? selected : undefined}
        aria-label={selectable ? `Seleccionar ${asset.filename}` : undefined}
      >
        {/* Thumbnail */}
        <div className="aspect-square w-full overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset.url}
            alt={asset.alt || asset.filename}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Selected check */}
        {selected && (
          <div className="absolute left-2 top-2 z-10">
            <CheckCircle2 className="size-5 text-primary drop-shadow-sm" />
          </div>
        )}

        {/* Hover overlay — not shown in selectable mode (click = select, not actions) */}
        {!selectable && (
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            <div className="p-2">
              {/* Filename + size */}
              <p className="truncate text-xs font-medium text-white">
                {asset.filename}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {formatBytes(asset.size)}
              </p>

              {/* Alt text inline edit */}
              <div className="mt-1">
                {isEditingAlt ? (
                  <input
                    autoFocus
                    type="text"
                    value={altDraft}
                    onChange={(e) => setAltDraft(e.target.value)}
                    onKeyDown={handleAltKeyDown}
                    onBlur={handleAltSubmit}
                    className="w-full rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-foreground outline-none focus:border-primary"
                    placeholder="Texto alternativo..."
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingAlt(true);
                    }}
                    className="truncate text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Editar texto alternativo"
                    title="Editar texto alternativo"
                  >
                    {asset.alt ? `Alt: ${asset.alt}` : '+ Agregar texto alt'}
                  </button>
                )}
              </div>
            </div>

            {/* Delete button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteDialog(true);
              }}
              aria-label={`Eliminar ${asset.filename}`}
              className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-md bg-destructive/90 text-destructive-foreground transition-colors hover:bg-destructive"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        )}

        {/* Alt text badge — always visible */}
        {asset.alt && (
          <div className="absolute bottom-1 left-1 z-10 hidden group-hover:hidden">
            {/* Hidden in hover mode (shown in overlay) */}
          </div>
        )}

        {/* Selectable overlay delete button */}
        {selectable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteDialog(true);
            }}
            aria-label={`Eliminar ${asset.filename}`}
            className="absolute right-1.5 top-1.5 z-10 flex size-6 items-center justify-center rounded-md bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive"
          >
            <Trash2 className="size-3" />
          </button>
        )}
      </div>

      <MediaDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        filename={asset.filename}
        onConfirm={() => { void handleDelete(); }}
        isDeleting={isDeleting}
      />
    </>
  );
}
