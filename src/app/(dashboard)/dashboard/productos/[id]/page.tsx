'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { getRepositories } from '@/infrastructure/repositories'
import { ConfirmDialog } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { ProductForm } from '../product-form'
import type { Product } from '@/types/domain'

export default function EditProductoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()

  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  // Delete state
  const [showDelete, setShowDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    async function load() {
      const { products } = getRepositories()
      const data = await products.getById('demo-store', id)
      if (data) {
        setProduct(data)
      } else {
        setNotFound(true)
      }
      setIsLoading(false)
    }
    void load()
  }, [id])

  const handleDelete = async () => {
    setIsDeleting(true)
    const { products } = getRepositories()
    const result = await products.delete('demo-store', id)
    setIsDeleting(false)
    if (result.success) {
      toast.success('Producto eliminado correctamente')
      router.push('/dashboard/productos')
    } else {
      toast.error(result.error.message)
    }
    setShowDelete(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (notFound || !product) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <p className="text-sm text-muted-foreground">
          Producto no encontrado
        </p>
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard/productos')}
        >
          Volver a productos
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <ProductForm
        product={product}
        title={`Editar: ${product.name}`}
      />

      {/* Danger zone */}
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-medium text-destructive">
              Zona de peligro
            </h3>
            <p className="text-xs text-muted-foreground">
              Eliminar este producto es una acción irreversible.
            </p>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => setShowDelete(true)}
            className="gap-1.5"
          >
            <Trash2 className="size-4" />
            Eliminar producto
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={showDelete}
        onOpenChange={setShowDelete}
        title="Eliminar producto"
        description={`¿Estás seguro de que querés eliminar "${product.name}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        onConfirm={handleDelete}
        variant="destructive"
        loading={isDeleting}
      />
    </div>
  )
}
