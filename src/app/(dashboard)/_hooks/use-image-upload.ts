'use client'

import { useState, useCallback } from 'react'
import { resizeAndConvert } from '@/infrastructure/repositories/local-storage/media.repository'

type ImageUploadError = 'FILE_TOO_LARGE' | 'MAX_IMAGES_REACHED'

interface UploadedImage {
  id: string
  dataUrl: string
}

interface UseImageUploadOptions {
  maxImages?: number
  maxSizeBytes?: number
  quality?: number
  maxWidth?: number
}

interface UseImageUploadReturn {
  images: UploadedImage[]
  addImage: (file: File) => Promise<ImageUploadError | null>
  removeImage: (id: string) => void
  reorderImages: (orderedIds: string[]) => void
  isProcessing: boolean
}

function generateId(): string {
  return `img_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export function useImageUpload({
  maxImages = 4,
  maxSizeBytes = 5 * 1024 * 1024,
  quality = 0.7,
  maxWidth = 800,
}: UseImageUploadOptions = {}): UseImageUploadReturn {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const addImage = useCallback(
    async (file: File): Promise<ImageUploadError | null> => {
      if (images.length >= maxImages) {
        return 'MAX_IMAGES_REACHED'
      }

      if (file.size > maxSizeBytes) {
        return 'FILE_TOO_LARGE'
      }

      setIsProcessing(true)
      try {
        const result = await resizeAndConvert(file, maxWidth, quality)
        const newImage: UploadedImage = { id: generateId(), dataUrl: result.dataUrl }
        setImages((prev) => [...prev, newImage])
        return null
      } finally {
        setIsProcessing(false)
      }
    },
    [images.length, maxImages, maxSizeBytes, maxWidth, quality]
  )

  const removeImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }, [])

  const reorderImages = useCallback((orderedIds: string[]) => {
    setImages((prev) => {
      const map = new Map(prev.map((img) => [img.id, img]))
      return orderedIds.flatMap((id) => {
        const img = map.get(id)
        return img ? [img] : []
      })
    })
  }, [])

  return { images, addImage, removeImage, reorderImages, isProcessing }
}
