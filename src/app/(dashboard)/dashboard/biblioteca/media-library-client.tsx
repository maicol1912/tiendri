'use client';

import { useState, useCallback, useEffect } from 'react';
import { Upload, Search, HardDrive } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/shared/utils';
import {
  MediaLibraryGrid,
  MediaUploadDropzone,
} from '@/components/dashboard/media';
import { useMediaLibrary } from '@/app/(dashboard)/_hooks/use-media-library';
import { getStoreId } from '@/infrastructure/repositories';
import type { MediaAsset } from '@/types/domain';

type ViewMode = 'grid' | 'upload';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatMB(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaLibraryClient() {
  const storeId = getStoreId();
  const { assets, isLoading, upload, deleteAsset, updateAlt, search, stats } =
    useMediaLibrary(storeId);

  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isUploading, setIsUploading] = useState(false);
  const [filteredAssets, setFilteredAssets] = useState<MediaAsset[]>(assets);

  // Keep filtered assets in sync when assets or query changes
  useEffect(() => {
    if (!query.trim()) {
      setFilteredAssets(assets);
      return;
    }
    void search({ query }).then(setFilteredAssets);
  }, [assets, query, search]);

  const handleUpload = useCallback(
    async (file: File) => {
      setIsUploading(true);
      try {
        const result = await upload(file);
        if (result.success && result.asset) {
          toast.success(`"${result.asset.filename}" subida correctamente`);
          setViewMode('grid');
        } else if (!result.success) {
          toast.error(result.errorMessage ?? 'Error al subir imagen');
        }
      } finally {
        setIsUploading(false);
      }
    },
    [upload]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const asset = assets.find((a) => a.id === id);
      const ok = await deleteAsset(id);
      if (ok) {
        toast.success(`"${asset?.filename ?? 'Imagen'}" eliminada`);
      }
    },
    [assets, deleteAsset]
  );

  const handleEditAlt = useCallback(
    async (id: string, alt: string) => {
      const ok = await updateAlt(id, alt);
      if (ok) {
        toast.success('Texto alternativo actualizado');
      }
    },
    [updateAlt]
  );

  // Storage stats — use canonical shape (count/limitCount/limitBytes)
  const totalBytes = stats?.totalBytes ?? 0;
  const limitBytes = stats?.limitBytes ?? 8_388_608;
  const totalAssets = stats?.count ?? 0;
  const usagePercent = limitBytes > 0 ? totalBytes / limitBytes : 0;
  const isWarning = usagePercent >= 0.8;
  const isCritical = usagePercent >= 0.9;
  const progressValue = Math.min(usagePercent * 100, 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Biblioteca de medios
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {totalAssets === 0
              ? 'Todavía no tenés imágenes. Subí la primera para empezar.'
              : `${totalAssets} imagen${totalAssets === 1 ? '' : 'es'} · ${formatBytes(totalBytes)}`}
          </p>
        </div>

        <Button
          onClick={() => setViewMode(viewMode === 'upload' ? 'grid' : 'upload')}
          className="shrink-0 gap-2"
          variant={viewMode === 'upload' ? 'secondary' : 'default'}
        >
          <Upload className="size-4" />
          {viewMode === 'upload' ? 'Ver biblioteca' : 'Subir imagen'}
        </Button>
      </div>

      {/* Storage indicator */}
      <Card className="border-gray-200 bg-white shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-2 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <HardDrive className="size-4 shrink-0" aria-hidden="true" />
              <span>Almacenamiento de imágenes</span>
            </div>
            <span
              className={cn(
                'text-xs font-medium tabular-nums',
                isCritical
                  ? 'text-destructive'
                  : isWarning
                    ? 'text-amber-500'
                    : 'text-muted-foreground'
              )}
            >
              {formatMB(totalBytes)} / {formatMB(limitBytes)}
            </span>
          </div>
          <Progress
            value={progressValue}
            className={cn(
              'mt-2 h-1.5',
              isCritical
                ? '[&>[data-slot=progress-indicator]]:bg-destructive'
                : isWarning
                  ? '[&>[data-slot=progress-indicator]]:bg-amber-500'
                  : ''
            )}
            aria-label={`Imágenes: ${formatMB(totalBytes)} de ${formatMB(limitBytes)}`}
          />
          {isCritical && (
            <p className="mt-1 text-xs text-destructive">
              Almacenamiento casi lleno. Eliminá imágenes para liberar espacio.
            </p>
          )}
          {!isCritical && isWarning && (
            <p className="mt-1 text-xs text-amber-500">
              El almacenamiento de imágenes está casi lleno.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Upload panel */}
      {viewMode === 'upload' && (
        <div className="rounded-xl border border-dashed border-gray-300 p-6">
          <MediaUploadDropzone
            onUpload={(file) => { void handleUpload(file); }}
            isUploading={isUploading}
          />
        </div>
      )}

      {/* Search */}
      {viewMode === 'grid' && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar imágenes..."
            className="pl-9"
          />
        </div>
      )}

      {/* Grid */}
      {viewMode === 'grid' && (
        <MediaLibraryGrid
          assets={filteredAssets}
          onDelete={(id) => { void handleDelete(id); }}
          onEditAlt={(id, alt) => { void handleEditAlt(id, alt); }}
          isLoading={isLoading}
          onUploadClick={() => setViewMode('upload')}
        />
      )}
    </div>
  );
}
