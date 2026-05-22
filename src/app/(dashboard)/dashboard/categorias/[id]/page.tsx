'use client'

// Category Edit Page — Task 5.3
// Pre-populated form with save/delete. Shows subcategories panel for nested mode.

import { useState, useCallback, useEffect, useRef, use } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Loader2,
  Trash2,
  Upload,
  X,
  Save,
} from 'lucide-react'
import { toast } from 'sonner'

import { useCategories } from '@/hooks/use-repositories'
import {
  getStoreId,
  getStoreRepository,
  getProductRepository,
} from '@/lib/repositories'
import { categorySchema } from '@/lib/validators/category.schema'
import { useImageUpload } from '@/hooks/use-image-upload'
import type { CategoryIcon, UpdateCategoryInput } from '@/types/domain'
import type { StoreMeta } from '@/lib/repositories/interfaces'
import { ConfirmDialog } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { CategoryIconComponent, ICON_OPTIONS } from '../category-icon'
import { SubcategoriesPanel } from './subcategories-panel'

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function CategoryEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const storeId = getStoreId()
  const { categories, isLoading, update, remove, refresh } = useCategories(storeId)

  const category = categories.find((c) => c.id === id)

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugManual, setSlugManual] = useState(true) // start manual since editing
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState<CategoryIcon>('ShoppingBag')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [productCount, setProductCount] = useState(0)
  const [storeMeta, setStoreMeta] = useState<StoreMeta | null>(null)

  const { images, addImage, removeImage, isProcessing } = useImageUpload({
    maxImages: 1,
    maxWidth: 600,
    quality: 0.8,
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const initialized = useRef(false)

  // Populate form when category loads
  useEffect(() => {
    if (category && !initialized.current) {
      setName(category.name)
      setSlug(category.slug)
      setDescription(category.description ?? '')
      setIcon(category.icon)
      initialized.current = true
    }
  }, [category])

  // Load store meta and product count
  useEffect(() => {
    const loadMeta = async () => {
      const storeRepo = getStoreRepository()
      const meta = await storeRepo.get(storeId)
      setStoreMeta(meta)

      const productRepo = getProductRepository()
      const count = await productRepo.countByCategory(storeId, id)
      setProductCount(count)
    }
    void loadMeta()
  }, [storeId, id])

  // Auto-generate slug from name
  useEffect(() => {
    if (!slugManual && name) {
      const timer = setTimeout(() => {
        setSlug(toSlug(name))
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [name, slugManual])

  const handleSave = useCallback(async () => {
    const input: UpdateCategoryInput = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || undefined,
      image: images[0]?.dataUrl ?? category?.image,
      icon,
    }

    // If image was removed and no new one was added
    if (images.length === 0 && !category?.image) {
      input.image = undefined
    }

    const result = categorySchema.safeParse({
      ...input,
      name: input.name ?? '',
      slug: input.slug ?? '',
      icon: input.icon ?? 'ShoppingBag',
    })
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
    const ok = await update(id, input)
    setSubmitting(false)

    if (ok) {
      toast.success('Categoria actualizada')
      void refresh()
    } else {
      toast.error('No se pudo actualizar la categoria')
    }
  }, [name, slug, description, icon, images, category, update, id, refresh])

  const handleDelete = useCallback(async () => {
    setDeleteLoading(true)
    const ok = await remove(id)
    setDeleteLoading(false)
    if (ok) {
      toast.success('Categoria eliminada')
      router.push('/dashboard/categorias')
    } else {
      toast.error('No se pudo eliminar la categoria')
    }
  }, [remove, id, router])

  const handleImageSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const error = await addImage(file)
      if (error === 'FILE_TOO_LARGE') {
        toast.error('La imagen es muy grande. Maximo 5MB.')
      }
      if (fileInputRef.current) fileInputRef.current.value = ''
    },
    [addImage]
  )

  // Loading
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    )
  }

  // Not found
  if (!category) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard/categorias')}>
          <ArrowLeft className="mr-1.5 size-4" />
          Volver
        </Button>
        <p className="text-sm text-muted-foreground">Categoria no encontrada.</p>
      </div>
    )
  }

  const currentImage = images[0]?.dataUrl ?? category.image

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => router.push('/dashboard/categorias')}
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Editar categoria
            </h1>
            <p className="text-sm text-muted-foreground">{category.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteOpen(true)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="mr-1.5 size-4" />
            Eliminar
          </Button>
          <Button size="sm" onClick={handleSave} disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-1.5 size-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="mr-1.5 size-4" />
                Guardar
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nombre</Label>
            <Input
              id="edit-name"
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
            <Label htmlFor="edit-slug">Slug</Label>
            <Input
              id="edit-slug"
              value={slug}
              onChange={(e) => {
                setSlugManual(true)
                setSlug(e.target.value)
              }}
              placeholder="celulares"
              aria-invalid={!!errors.slug}
            />
            <p className="text-xs text-muted-foreground">
              URL: /tienda/<span className="font-mono">{slug || 'slug'}</span>
            </p>
            {errors.slug && (
              <p className="text-xs text-destructive">{errors.slug}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="edit-desc">Descripcion (opcional)</Label>
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
              id="edit-desc"
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
              <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
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
                            : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground'
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
            {!currentImage ? (
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
                  {isProcessing
                    ? 'Procesando...'
                    : 'Subir imagen (1:1 recomendado)'}
                </span>
              </button>
            ) : (
              <div className="relative w-fit">
                <div className="size-24 overflow-hidden rounded-lg border">
                  <img
                    src={currentImage}
                    alt="Preview"
                    className="size-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (images[0]) {
                      removeImage(images[0].id)
                    }
                    // Clear original image by saving with undefined
                  }}
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
      </div>

      {/* Subcategories Panel */}
      <SubcategoriesPanel
        storeId={storeId}
        categoryId={id}
        catalogMode={storeMeta?.catalog_mode ?? 'simple'}
      />

      {/* Delete Confirm */}
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Eliminar categoria"
        description={`Se eliminara la categoria "${category.name}" y ${productCount} producto(s) asociado(s). Esta accion no se puede deshacer.`}
        confirmText="Eliminar"
        variant="destructive"
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </div>
  )
}
