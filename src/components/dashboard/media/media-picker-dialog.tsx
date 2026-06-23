'use client';

import { useState, useCallback, useEffect } from 'react';
import { Search, Upload, Images } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MediaLibraryGrid } from './media-library-grid';
import { MediaUploadDropzone } from './media-upload-dropzone';
import { useMediaLibrary } from '@/app/(dashboard)/_hooks/use-media-library';

type TabKey = 'biblioteca' | 'subir';

interface MediaPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (mediaId: string) => void;
}

export function MediaPickerDialog({
  open,
  onOpenChange,
  onSelect,
}: MediaPickerDialogProps) {
  const { assets, isLoading, upload, deleteAsset, updateAlt, search } =
    useMediaLibrary();

  const [activeTab, setActiveTab] = useState<TabKey>('biblioteca');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [filteredAssets, setFilteredAssets] = useState(assets);

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
          setSelectedId(result.asset.id);
          setActiveTab('biblioteca');
        }
      } finally {
        setIsUploading(false);
      }
    },
    [upload]
  );

  const handleSelect = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const handleConfirm = useCallback(() => {
    if (!selectedId) return;
    onSelect(selectedId);
    onOpenChange(false);
    // Reset internal state
    setSelectedId(null);
    setQuery('');
    setActiveTab('biblioteca');
  }, [selectedId, onSelect, onOpenChange]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        setSelectedId(null);
        setQuery('');
        setActiveTab('biblioteca');
      }
      onOpenChange(open);
    },
    [onOpenChange]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[90vh] w-full max-w-3xl flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="shrink-0 border-b border-border px-6 py-4">
          <DialogTitle className="flex items-center gap-2">
            <Images className="size-5 text-muted-foreground" />
            Biblioteca de medios
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as TabKey)}
          className="flex min-h-0 flex-1 flex-col"
        >
          <TabsList className="mx-6 mt-4 mb-2 shrink-0 self-start">
            <TabsTrigger value="biblioteca">Biblioteca</TabsTrigger>
            <TabsTrigger value="subir">Subir nueva</TabsTrigger>
          </TabsList>

          {/* Biblioteca tab */}
          <TabsContent
            value="biblioteca"
            className="mt-0 flex min-h-0 flex-1 flex-col px-6 pb-4"
          >
            {/* Search */}
            <div className="relative mb-4 shrink-0">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nombre o texto alt..."
                className="pl-9"
              />
            </div>

            {/* Grid — scrollable */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <MediaLibraryGrid
                assets={filteredAssets}
                onDelete={(id) => { void deleteAsset(id); }}
                onEditAlt={(id, alt) => { void updateAlt(id, alt); }}
                isLoading={isLoading}
                selectable
                selectedId={selectedId}
                onSelect={handleSelect}
                onUploadClick={() => setActiveTab('subir')}
              />
            </div>
          </TabsContent>

          {/* Upload tab */}
          <TabsContent
            value="subir"
            className="mt-0 flex flex-1 flex-col justify-center px-6 pb-4"
          >
            <MediaUploadDropzone
              onUpload={(file) => { void handleUpload(file); }}
              isUploading={isUploading}
            />
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Al subir la imagen, se agregará a tu biblioteca y se seleccionará automáticamente.
            </p>
          </TabsContent>
        </Tabs>

        <DialogFooter className="shrink-0 border-t border-border px-6 py-4">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedId}
          >
            Seleccionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
