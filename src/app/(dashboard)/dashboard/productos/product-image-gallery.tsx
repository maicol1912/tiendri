'use client'

import { useState, useRef, useCallback } from 'react'
import { X, Plus, ImageIcon, ChevronUp, ChevronDown, GripVertical, Loader2 } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { Button } from '@/components/ui/button'
import { cn } from '@/shared/utils'
import { resizeAndConvert } from '@/shared/image-processing'
import { getImageSizeConfig } from '@/shared/image-size-config'
import { uploadMediaAsset, deleteMediaAsset } from '@/app/(dashboard)/dashboard/_actions/media'
import { ImageCropperDialog, ASPECT_RATIOS } from '@/components/shared/image-cropper-dialog'

// ── Types ────────────────────────────────────────────────────────────────────

export interface GalleryImage {
  id: string
  url: string
  sort_order: number
}

interface ProductImageGalleryProps {
  /** Current images already saved on the product */
  initialImages?: GalleryImage[]
  /** Called whenever images change (add, remove, reorder) */
  onChange: (images: GalleryImage[]) => void
  /** Maximum images allowed */
  maxImages?: number
}

// ── Sortable thumbnail ───────────────────────────────────────────────────────

function SortableThumbnail({
  image,
  onRemove,
}: {
  image: GalleryImage
  onRemove: (id: string) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative aspect-square rounded-lg border border-border overflow-hidden bg-muted"
    >
      <img
        src={image.url}
        alt="Imagen del producto"
        className="size-full object-cover"
      />

      {/* Drag handle (desktop) */}
      <button
        type="button"
        className="absolute top-1 left-1 hidden md:flex size-6 items-center justify-center rounded bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
        aria-label="Arrastrar para reordenar"
        {...listeners}
        {...attributes}
      >
        <GripVertical className="size-3" />
      </button>

      {/* Delete button */}
      <button
        type="button"
        onClick={() => onRemove(image.id)}
        className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
        aria-label="Eliminar imagen"
      >
        <X className="size-3" />
      </button>
    </div>
  )
}

// ── Mobile thumbnail (no DnD, uses up/down) ──────────────────────────────────

function MobileThumbnail({
  image,
  index,
  total,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  image: GalleryImage
  index: number
  total: number
  onRemove: (id: string) => void
  onMoveUp: (index: number) => void
  onMoveDown: (index: number) => void
}) {
  return (
    <div className="relative flex items-center gap-2">
      <div className="flex flex-col gap-0.5">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => onMoveUp(index)}
          disabled={index === 0}
          aria-label="Mover arriba"
        >
          <ChevronUp className="size-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => onMoveDown(index)}
          disabled={index === total - 1}
          aria-label="Mover abajo"
        >
          <ChevronDown className="size-3" />
        </Button>
      </div>
      <div className="group relative aspect-square w-20 rounded-lg border border-border overflow-hidden bg-muted shrink-0">
        <img
          src={image.url}
          alt="Imagen del producto"
          className="size-full object-cover"
        />
        <button
          type="button"
          onClick={() => onRemove(image.id)}
          className="absolute top-0.5 right-0.5 flex size-5 items-center justify-center rounded-full bg-black/50 text-white hover:bg-destructive"
          aria-label="Eliminar imagen"
        >
          <X className="size-3" />
        </button>
      </div>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export function ProductImageGallery({
  initialImages = [],
  onChange,
  maxImages = 4,
}: ProductImageGalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>(() =>
    [...initialImages].sort((a, b) => a.sort_order - b.sort_order)
  )

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Cropper state
  const [cropSrc, setCropSrc] = useState<string | null>(null)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Notify parent
  const updateImages = useCallback(
    (newImages: GalleryImage[]) => {
      setImages(newImages)
      onChange(newImages)
    },
    [onChange]
  )

  // File selection: open cropper instead of processing immediately
  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      if (images.length >= maxImages) return

      const config = getImageSizeConfig('product')
      if (file.size > config.maxInputBytes) return

      const objectUrl = URL.createObjectURL(file)
      setCropSrc(objectUrl)
      setPendingFile(file)

      // Reset input so the same file can be selected again
      if (fileInputRef.current) fileInputRef.current.value = ''
    },
    [images, maxImages]
  )

  // Called when user confirms crop — resize then upload to Supabase Storage
  const handleCropComplete = useCallback(
    async (croppedBlob: Blob) => {
      setCropSrc(null)
      setIsUploading(true)
      try {
        const config = getImageSizeConfig('product')
        const fileName = pendingFile?.name ?? 'image.webp'
        const file = new File([croppedBlob], fileName, { type: 'image/webp' })
        const processed = await resizeAndConvert(file, config.maxWidth, config.quality)

        const result = await uploadMediaAsset({
          filename: processed.mimetype === 'image/webp'
            ? fileName.replace(/\.[^.]+$/, '.webp')
            : fileName,
          base64Data: processed.dataUrl,
          mimetype: processed.mimetype,
          size: processed.sizeBytes,
          width: processed.width,
          height: processed.height,
          context: 'product',
        })

        if (result.success && result.data) {
          const newImage: GalleryImage = {
            id: result.data.id,
            url: result.data.url,
            sort_order: images.length,
          }
          updateImages([...images, newImage])
        }
      } catch (err) {
        console.error('Upload failed:', err)
      } finally {
        setIsUploading(false)
        setPendingFile(null)
      }
    },
    [pendingFile, images, updateImages]
  )

  // Called when user cancels crop
  const handleCropCancel = useCallback(() => {
    if (cropSrc) URL.revokeObjectURL(cropSrc)
    setCropSrc(null)
    setPendingFile(null)
  }, [cropSrc])

  const handleRemove = useCallback(
    (id: string) => {
      // Fire-and-forget delete from Supabase Storage for media assets
      if (id.startsWith('media_')) {
        deleteMediaAsset(id).catch(() => {})
      }

      const filtered = images
        .filter((img) => img.id !== id)
        .map((img, i) => ({ ...img, sort_order: i }))
      updateImages(filtered)
    },
    [images, updateImages]
  )

  // DnD (desktop)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return

      const oldIndex = images.findIndex((img) => img.id === active.id)
      const newIndex = images.findIndex((img) => img.id === over.id)
      if (oldIndex === -1 || newIndex === -1) return

      const reordered = arrayMove(images, oldIndex, newIndex).map(
        (img, i) => ({ ...img, sort_order: i })
      )
      updateImages(reordered)
    },
    [images, updateImages]
  )

  // Mobile move
  const handleMoveUp = useCallback(
    (index: number) => {
      if (index === 0) return
      const reordered = arrayMove(images, index, index - 1).map(
        (img, i) => ({ ...img, sort_order: i })
      )
      updateImages(reordered)
    },
    [images, updateImages]
  )

  const handleMoveDown = useCallback(
    (index: number) => {
      if (index === images.length - 1) return
      const reordered = arrayMove(images, index, index + 1).map(
        (img, i) => ({ ...img, sort_order: i })
      )
      updateImages(reordered)
    },
    [images, updateImages]
  )

  const canAdd = images.length < maxImages
  const isBusy = isUploading

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-foreground">
              Imágenes del producto
            </span>
            <span className="text-xs text-muted-foreground">
              {images.length} de {maxImages} imágenes
            </span>
          </div>

          {isUploading && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Loader2 className="size-3 animate-spin" />
              Subiendo...
            </div>
          )}
        </div>

        {/* Desktop: sortable grid */}
        <div className="hidden md:block">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={images.map((img) => img.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-2 gap-3">
                {images.map((image) => (
                  <SortableThumbnail
                    key={image.id}
                    image={image}
                    onRemove={handleRemove}
                  />
                ))}

                {/* Add button */}
                {canAdd && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isBusy}
                    className={cn(
                      'flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 text-muted-foreground transition-colors hover:border-primary hover:text-primary',
                      isBusy && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    {isBusy ? (
                      <div className="flex flex-col items-center gap-1.5">
                        <Loader2 className="size-5 animate-spin" />
                        <span className="text-xs">Subiendo...</span>
                      </div>
                    ) : (
                      <>
                        <Plus className="size-6" />
                        <span className="text-xs">Agregar imagen</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Mobile: list with up/down */}
        <div className="md:hidden flex flex-col gap-2">
          {images.map((image, index) => (
            <MobileThumbnail
              key={image.id}
              image={image}
              index={index}
              total={images.length}
              onRemove={handleRemove}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
            />
          ))}

          {canAdd && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isBusy}
              className="gap-1.5 w-fit"
            >
              {isBusy ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Subiendo...
                </>
              ) : (
                <>
                  <Plus className="size-4" />
                  Agregar imagen
                </>
              )}
            </Button>
          )}
        </div>

        {/* Empty state */}
        {images.length === 0 && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isBusy}
            className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border bg-muted/20 py-10 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ImageIcon className="size-8" />
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-medium">
                {isBusy ? 'Subiendo...' : 'Agregar imágenes'}
              </span>
              <span className="text-xs">
                Máximo {maxImages} imágenes. JPG, PNG o WebP.
              </span>
            </div>
          </button>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          aria-hidden="true"
        />
      </div>

      {/* Image cropper dialog */}
      <ImageCropperDialog
        open={cropSrc !== null}
        onClose={handleCropCancel}
        imageSrc={cropSrc ?? ''}
        aspectRatio={ASPECT_RATIOS.product}
        onCropComplete={handleCropComplete}
      />
    </>
  )
}
