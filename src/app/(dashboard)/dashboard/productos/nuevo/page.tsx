'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { ProductForm } from '../product-form'

function NuevoProductoContent() {
  const searchParams = useSearchParams()
  const categoryId = searchParams.get('categoryId') ?? undefined

  return (
    <ProductForm
      title="Nuevo producto"
      defaultCategoryId={categoryId}
    />
  )
}

export default function NuevoProductoPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Cargando...</div>}>
      <NuevoProductoContent />
    </Suspense>
  )
}
