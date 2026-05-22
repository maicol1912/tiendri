'use client'

// CreateCategorySheet — Task 5.2
// Slide-from-right sheet with form: name, slug, description, icon picker, image.
// Validates with Zod (categorySchema). On submit: create → toast → close → refresh.

import { useState, useCallback, useRef, useEffect } from 'react'
import { Loader2, Upload, X, ImageIcon } from 'lucide-react'
import { toast } from 'sonner'

import { useCategories } from '@/hooks/use-repositories'
import { categorySchema } from '@/lib/validators/category.schema'
import { useImageUpload } from '@/hooks/use-image-upload'
import type { CategoryIcon, CreateCategoryInput } from '@/types/domain'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { CategoryIconComponent, ICON_OPTIONS } from './category-icon'

interface CreateCategorySheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  storeId: string
  onCreated: () => void
}

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // remove accents
    .replace(/[^a-z0-9]+/g, '-') // non-alphanumeric to hyphens
    .replace(/^-+|-+$/g, '') // trim leading/trailing hyphens
}

export function CreateCategorySheet({
  open,
  onOpenChange,
  storeId,
  onCreated,
}: CreateCategorySheetProps) {
  const { create } = useCategories(storeId)
  const { images, addImage, removeImage, isProcessing } = useImageUpload({
    maxImages: 1,
    maxWidth: 600,
    quality: 0.8,
  })

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugManual, setSlugManual] = useState(false)
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState<CategoryIcon>('ShoppingBag')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Auto-generate slug from name (unless manually edited)
  useEffect(() => {
    if (!slugManual && name) {
      const timer = setTimeout(() => {
        setSlug(toSlug(name))
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [name, slugManual])

  const resetForm = useCallback(() => {
    setName('')
    setSlug('')
    setSlugManual(false)
    setDescription('')
    setIcon('ShoppingBag')
    setErrors({})
    // Reset images by removing all
    images.forEach((img) => removeImage(img.id))
  }, [images, removeImage])

  const handleSubmit = useCallback(async () => {
    // Validate
    const input: CreateCategoryInput = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || undefined,
      image: images[0]?.dataUrl,
      icon,
    }

    const result = categorySchema.safeParse(input)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const key = issue.path[0]
        if (typeof key === 'string') {
          fieldErrors[key] = issue.message
        }
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setSubmitting(true)
    const ok = await create(input)
    setSubmitting(false)

    if (ok) {
      toast.success(`Categoria "${input.name}" creada`)
      resetForm()
      onCreated()
    } else {
      toast.error('No se pudo crear la categoria. Verifica que el slug no este en uso.')
    }
  }, [name, slug, description, icon, images, create, resetForm, onCreated])

  const handleImageSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const error = await addImage(file)
      if (error === 'FILE_TOO_LARGE') {
        toast.error('La imagen es muy grande. Maximo 5MB.')
      } else if (error === 'MAX_IMAGES_REACHED') {
        toast.error('Solo se permite una imagen.')
      }
      // Reset input so the same file can be selected again
      if (fileInputRef.current) fileInputRef.current.value = ''
    },
    [addImage]
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Nueva categoria</SheetTitle>
          <SheetDescription>
            Crea una categoria para organizar tus productos.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 px-1">
          <div className="space-y-5 px-3 pb-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="cat-name">Nombre</Label>
              <Input
                id="cat-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Celulares"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="cat-slug">Slug</Label>
              <Input
                id="cat-slug"
                value={slug}
                onChange={(e) => {
                  setSlugManual(true)
                  setSlug(e.target.value)
                }}
                placeholder="celulares"
                aria-invalid={!!errors.slug}
              />
              <p className="text-xs text-muted-foreground">
                Se usa en la URL: /tienda/<span className="font-mono">{slug || 'slug'}</span>
              </p>
              {errors.slug && (
                <p className="text-xs text-destructive">{errors.slug}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="cat-desc">Descripcion (opcional)</Label>
                <span
                  className={cn(
                    'text-xs',
                    description.length > 110
                      ? 'text-destructive'
                      : 'text-muted-foreground'
                  )}
                >
                  {description.length}/120
                </span>
              </div>
              <Textarea
                id="cat-desc"
                value={description}
                onChange={(e) => {
                  if (e.target.value.length <= 120) {
                    setDescription(e.target.value)
                  }
                }}
                placeholder="Describe brevemente esta categoria..."
                rows={2}
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description}</p>
              )}
            </div>

            {/* Icon Picker */}
            <div className="space-y-2">
              <Label>Icono</Label>
              <TooltipProvider>
                <div className="grid grid-cols-5 gap-2">
                  {ICON_OPTIONS.map((iconName) => (
                    <Tooltip key={iconName}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setIcon(iconName)}
                          className={cn(
                            'flex size-10 items-center justify-center rounded-lg border transition-colors',
                            icon === iconName
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
                          )}
                        >
                          <CategoryIconComponent
                            name={iconName}
                            className="size-5"
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>{iconName}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
              {errors.icon && (
                <p className="text-xs text-destructive">{errors.icon}</p>
              )}
            </div>

            {/* Image */}
            <div className="space-y-2">
              <Label>Imagen (opcional)</Label>
              {images.length === 0 ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-6 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  {isProcessing ? (
                    <Loader2 className="size-6 animate-spin" />
                  ) : (
                    <Upload className="size-6" />
                  )}
                  <span className="text-xs">
                    {isProcessing ? 'Procesando...' : 'Subir imagen (1:1 recomendado)'}
                  </span>
                </button>
              ) : (
                <div className="relative w-fit">
                  <div className="size-24 overflow-hidden rounded-lg border">
                    <img
                      src={images[0].dataUrl}
                      alt="Preview"
                      className="size-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(images[0].id)}
                    className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
            </div>
          </div>
        </ScrollArea>

        <SheetFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-1.5 size-4 animate-spin" />
                Creando...
              </>
            ) : (
              'Crear categoria'
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
