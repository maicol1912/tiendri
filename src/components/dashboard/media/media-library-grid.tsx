'use client';

import { ImageIcon, Upload } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import type { MediaAsset } from '@/types/domain';
import { MediaItemCard } from './media-item-card';

interface MediaLibraryGridProps {
  assets: MediaAsset[];
  onDelete: (id: string) => void;
  onEditAlt: (id: string, alt: string) => void;
  isLoading?: boolean;
  /** When true, cards are selectable — clicking fires onSelect */
  selectable?: boolean;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  /** Called when empty-state CTA is clicked */
  onUploadClick?: () => void;
}

const SKELETON_COUNT = 10;

export function MediaLibraryGrid({
  assets,
  onDelete,
  onEditAlt,
  isLoading = false,
  selectable = false,
  selectedId,
  onSelect,
  onUploadClick,
}: MediaLibraryGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div key={i} className="aspect-square w-full overflow-hidden rounded-lg">
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 py-16 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-gray-100">
          <ImageIcon className="size-7 text-gray-400" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            No tenés imágenes todavía
          </p>
          <p className="text-xs text-muted-foreground">
            Subí tu primera imagen para empezar a construir tu biblioteca
          </p>
        </div>
        {onUploadClick && (
          <Button
            variant="outline"
            size="sm"
            onClick={onUploadClick}
            className="gap-2"
          >
            <Upload className="size-4" />
            Subir imagen
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {assets.map((asset) => (
        <MediaItemCard
          key={asset.id}
          asset={asset}
          onDelete={onDelete}
          onEditAlt={onEditAlt}
          selectable={selectable}
          selected={selectedId === asset.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
