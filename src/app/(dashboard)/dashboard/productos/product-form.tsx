'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { useCategories, useSubcategories } from '@/app/(dashboard)/_hooks/use-repositories'
import { getStore } from '@/app/(dashboard)/dashboard/_actions/store'
import { createProduct, updateProduct } from '@/app/(dashboard)/dashboard/_actions/products'
import { PriceInput, VariantEditor } from '@/components/shared'
import { ProductImageGallery, type GalleryImage } from './product-image-gallery'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type {
  Product,
  UIProductVariant,
  CreateProductInput,
  UpdateProductInput,
} from '@/types/domain'

interface ProductFormProps {
  /** Existing product for edit mode. Undefined for create mode. */
  product?: Product
  /** Pre-selected category (from URL param on create) */
  defaultCategoryId?: string
  /** Page title */
  title: string
}

// ── Slug generation ──────────────────────────────────────────────────────────

function toSlug(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// ── Price formatter for variant preview ──────────────────────────────────────

const priceFormatter = new Intl.NumberFormat('es-CO', {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

// ── Form ─────────────────────────────────────────────────────────────────────

export function ProductForm({
  product,
  defaultCategoryId,
  title,
}: ProductFormProps) {
  const router = useRouter()
  const isEdit = !!product

  // ── Categories & catalog mode ────────────────────────────────────────────
  const { categories } = useCategories()
  const [catalogMode, setCatalogMode] = useState<'simple' | 'nested'>('simple')

  useEffect(() => {
    async function loadCatalogMode() {
      const meta = await getStore()
      if (meta) setCatalogMode(meta.catalog_mode)
    }
    void loadCatalogMode()
  }, [])

  // ── Form state ───────────────────────────────────────────────────────────
  const [name, setName] = useState(product?.name ?? '')
  const [slug, setSlug] = useState(product?.slug ?? '')
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const [description, setDescription] = useState(product?.description ?? '')
  const [price, setPrice] = useState(product?.price ?? 0)
  const [compareAtPrice, setCompareAtPrice] = useState<number>(
    product?.compare_at_price ?? 0
  )
  const [categoryId, setCategoryId] = useState(
    product?.category_id ?? defaultCategoryId ?? ''
  )
  const [subcategoryId, setSubcategoryId] = useState(
    product?.subcategory_id ?? ''
  )
  const [available, setAvailable] = useState(product?.available ?? true)
  const [featured, setFeatured] = useState(product?.featured ?? false)
  const [isSaving, setIsSaving] = useState(false)

  // ── Images ───────────────────────────────────────────────────────────────
  const initialImages: GalleryImage[] = useMemo(
    () =>
      (product?.images ?? []).map((img) => ({
        id: img.id,
        url: img.url,
        sort_order: img.sort_order,
      })),
    [product?.images]
  )
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialImages)

  // ── Variants ─────────────────────────────────────────────────────────────
  const initialVariants: UIProductVariant[] = useMemo(
    () =>
      (product?.variants ?? []).map((v) => ({
        id: v.id,
        name: v.name,
        priceModifier: v.price_modifier,
      })),
    [product?.variants]
  )
  const [variants, setVariants] = useState<UIProductVariant[]>(initialVariants)

  // ── Subcategories (only if nested mode + category selected) ──────────────
  const { subcategories } = useSubcategories(categoryId || '__none__')

  // ── Auto-slug from name ──────────────────────────────────────────────────
  useEffect(() => {
    if (!slugManuallyEdited && !isEdit) {
      const timeout = setTimeout(() => {
        setSlug(toSlug(name))
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [name, slugManuallyEdited, isEdit])

  // Reset subcategory when category changes
  useEffect(() => {
    if (!isEdit) {
      setSubcategoryId('')
    }
  }, [categoryId, isEdit])

  // ── Validation ───────────────────────────────────────────────────────────
  const [submitted, setSubmitted] = useState(false)

  const errors = useMemo(() => {
    const e: Record<string, string> = {}
    if (name.trim().length < 2) e.name = 'El nombre debe tener al menos 2 caracteres'
    if (!slug.trim()) e.slug = 'El slug es obligatorio'
    if (description.length > 300)
      e.description = `Máximo 300 caracteres (${description.length}/300)`
    if (price <= 0) e.price = 'El precio debe ser mayor a 0'
    if (compareAtPrice > 0 && compareAtPrice <= price)
      e.compareAtPrice = 'El precio de comparación debe ser mayor al precio actual'
    if (!categoryId) e.categoryId = 'Seleccioná una categoría'
    return e
  }, [name, slug, description, price, compareAtPrice, categoryId])

  const visibleErrors = submitted ? errors : {}
  const isValid = Object.keys(errors).length === 0

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setSubmitted(true)
      if (!isValid) return

      setIsSaving(true)

      const imageData = galleryImages.map((img) => ({
        url: img.url,
        sort_order: img.sort_order,
      }))

      const variantData = variants
        .filter((v) => v.name.trim() !== '')
        .map((v) => ({
          name: v.name,
          price_modifier: v.priceModifier,
        }))

      if (isEdit && product) {
        const input: UpdateProductInput = {
          name: name.trim(),
          slug: slug.trim(),
          description: description.trim(),
          price,
          compare_at_price: compareAtPrice > 0 ? compareAtPrice : null,
          category_id: categoryId,
          subcategory_id:
            catalogMode === 'nested' && subcategoryId
              ? subcategoryId
              : null,
          available,
          featured,
          images: imageData,
          variants: variantData,
        }
        const result = await updateProduct(product.id, input)
        setIsSaving(false)
        if (result.success) {
          toast.success('Producto actualizado correctamente')
          router.push('/dashboard/productos')
        } else {
          toast.error(result.error.message)
        }
      } else {
        const input: CreateProductInput = {
          name: name.trim(),
          slug: slug.trim(),
          description: description.trim(),
          price,
          compare_at_price: compareAtPrice > 0 ? compareAtPrice : null,
          category_id: categoryId,
          subcategory_id:
            catalogMode === 'nested' && subcategoryId
              ? subcategoryId
              : null,
          available,
          featured,
          images: imageData,
          variants: variantData,
        }
        const result = await createProduct(input)
        setIsSaving(false)
        if (result.success) {
          toast.success('Producto creado correctamente')
          router.push('/dashboard/productos')
        } else {
          toast.error(result.error.message)
        }
      }
    },
    [
      isValid,
      isEdit,
      product,
      name,
      slug,
      description,
      price,
      compareAtPrice,
      categoryId,
      subcategoryId,
      catalogMode,
      available,
      featured,
      galleryImages,
      variants,
      router,
    ]
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => router.push('/dashboard/productos')}
          aria-label="Volver a productos"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Left column: main fields */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Información general</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="product-name">Nombre</Label>
                <Input
                  id="product-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Audifonos Bluetooth Pro"
                  aria-invalid={!!visibleErrors.name}
                />
                {visibleErrors.name && (
                  <p className="text-xs text-destructive">{visibleErrors.name}</p>
                )}
              </div>

              {/* Slug */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="product-slug">
                  Slug{' '}
                  <span className="text-xs text-muted-foreground font-normal">
                    (URL amigable)
                  </span>
                </Label>
                <Input
                  id="product-slug"
                  value={slug}
                  onChange={(e) => {
                    setSlugManuallyEdited(true)
                    setSlug(e.target.value)
                  }}
                  placeholder="audifonos-bluetooth-pro"
                  aria-invalid={!!visibleErrors.slug}
                />
                {visibleErrors.slug && (
                  <p className="text-xs text-destructive">{visibleErrors.slug}</p>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="product-description">Descripción</Label>
                  <span
                    className={`text-xs ${
                      description.length > 300
                        ? 'text-destructive'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {description.length}/300
                  </span>
                </div>
                <Textarea
                  id="product-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe tu producto..."
                  maxLength={300}
                  rows={3}
                  aria-invalid={!!visibleErrors.description}
                />
                {visibleErrors.description && (
                  <p className="text-xs text-destructive">
                    {visibleErrors.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Precio</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PriceInput
                  value={price}
                  onChange={setPrice}
                  label="Precio"
                  error={visibleErrors.price}
                />
                <PriceInput
                  value={compareAtPrice}
                  onChange={setCompareAtPrice}
                  label="Precio de comparación"
                  error={visibleErrors.compareAtPrice}
                  placeholder="Opcional"
                />
              </div>
              {compareAtPrice > 0 && compareAtPrice > price && (
                <p className="text-xs text-muted-foreground">
                  Se mostrará como: <s>${priceFormatter.format(compareAtPrice)}</s>{' '}
                  <span className="font-medium text-foreground">
                    ${priceFormatter.format(price)}
                  </span>
                </p>
              )}
            </CardContent>
          </Card>

          {/* Category & Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Organización</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <Label>Categoría</Label>
                <Select value={categoryId} onValueChange={setCategoryId}>
                  <SelectTrigger
                    className="w-full"
                    aria-invalid={!!visibleErrors.categoryId}
                  >
                    <SelectValue placeholder="Seleccioná una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {visibleErrors.categoryId && (
                  <p className="text-xs text-destructive">
                    {visibleErrors.categoryId}
                  </p>
                )}
              </div>

              {/* Subcategory (nested mode only) */}
              {catalogMode === 'nested' && categoryId && (
                <div className="flex flex-col gap-1.5">
                  <Label>Subcategoría</Label>
                  <Select
                    value={subcategoryId}
                    onValueChange={setSubcategoryId}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccioná una subcategoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategories.map((sub) => (
                        <SelectItem key={sub.id} value={sub.id}>
                          {sub.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Toggles */}
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="product-available">Disponible</Label>
                  <Switch
                    id="product-available"
                    checked={available}
                    onCheckedChange={setAvailable}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="product-featured">Destacado</Label>
                  <Switch
                    id="product-featured"
                    checked={featured}
                    onCheckedChange={setFeatured}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column: images + variants */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Imágenes</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductImageGallery
                initialImages={initialImages}
                onChange={setGalleryImages}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Variantes</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <VariantEditor variants={variants} onChange={setVariants} />

              {/* Price preview for variants */}
              {variants.length > 0 && price > 0 && (
                <div className="flex flex-col gap-1.5 rounded-lg bg-muted/50 p-3">
                  <span className="text-xs font-medium text-muted-foreground">
                    Vista previa de precios
                  </span>
                  {variants
                    .filter((v) => v.name.trim() !== '')
                    .map((v) => {
                      const total = price + v.priceModifier
                      return (
                        <div
                          key={v.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span>{v.name}</span>
                          <span className="tabular-nums font-medium">
                            ${priceFormatter.format(price)}{' '}
                            {v.priceModifier >= 0 ? '+' : ''}
                            {priceFormatter.format(v.priceModifier)} ={' '}
                            <span className="text-foreground">
                              ${priceFormatter.format(total)}
                            </span>
                          </span>
                        </div>
                      )
                    })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Submit bar */}
      <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/dashboard/productos')}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={!isValid || isSaving} className="gap-1.5">
          {isSaving ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="size-4" />
              {isEdit ? 'Guardar cambios' : 'Crear producto'}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
