'use client'

import * as React from 'react'
import { HardDrive } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

const TOTAL_BYTES = 5 * 1024 * 1024 // 5 MB
const WARNING_THRESHOLD = 0.8
const CRITICAL_THRESHOLD = 0.9

interface StorageUsage {
  usedBytes: number
  totalBytes: number
  percentage: number
}

function estimateLocalStorageUsage(storeId: string): StorageUsage {
  if (typeof window === 'undefined') {
    return { usedBytes: 0, totalBytes: TOTAL_BYTES, percentage: 0 }
  }

  const prefix = `tiendri_${storeId}_`
  let usedBytes = 0

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(prefix)) {
      const value = localStorage.getItem(key) ?? ''
      // Each UTF-16 character is 2 bytes in memory; localStorage uses UTF-16
      usedBytes += (key.length + value.length) * 2
    }
  }

  const percentage = usedBytes / TOTAL_BYTES

  return {
    usedBytes,
    totalBytes: TOTAL_BYTES,
    percentage,
  }
}

function formatMB(bytes: number): string {
  return (bytes / (1024 * 1024)).toFixed(1)
}

interface StorageIndicatorProps {
  storeId: string
  className?: string
}

export function StorageIndicator({ storeId, className }: StorageIndicatorProps) {
  const [usage, setUsage] = React.useState<StorageUsage>({
    usedBytes: 0,
    totalBytes: TOTAL_BYTES,
    percentage: 0,
  })

  React.useEffect(() => {
    setUsage(estimateLocalStorageUsage(storeId))
  }, [storeId])

  const isCritical = usage.percentage >= CRITICAL_THRESHOLD
  const isWarning = usage.percentage >= WARNING_THRESHOLD

  const progressValue = Math.min(usage.percentage * 100, 100)

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <HardDrive className="size-4 shrink-0" aria-hidden="true" />
          <span>Almacenamiento local</span>
        </div>
        <span
          className={cn(
            'text-xs font-medium tabular-nums',
            isCritical ? 'text-destructive' : isWarning ? 'text-amber-500' : 'text-muted-foreground'
          )}
        >
          {formatMB(usage.usedBytes)} MB / {formatMB(TOTAL_BYTES)} MB
        </span>
      </div>

      <Progress
        value={progressValue}
        className={cn(
          'h-1.5',
          isCritical
            ? '[&>[data-slot=progress-indicator]]:bg-destructive'
            : isWarning
              ? '[&>[data-slot=progress-indicator]]:bg-amber-500'
              : ''
        )}
        aria-label={`Almacenamiento usado: ${formatMB(usage.usedBytes)} de ${formatMB(TOTAL_BYTES)} MB`}
      />

      {isCritical && (
        <p className="text-xs text-destructive">
          Almacenamiento casi lleno. Eliminá productos o imágenes para liberar espacio.
        </p>
      )}
      {!isCritical && isWarning && (
        <p className="text-xs text-amber-500">
          El almacenamiento está casi lleno. Considerá limpiar imágenes no usadas.
        </p>
      )}
    </div>
  )
}

export { estimateLocalStorageUsage }
export type { StorageUsage }
