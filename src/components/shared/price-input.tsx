'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface PriceInputProps {
  value: number
  onChange: (value: number) => void
  label?: string
  error?: string
  currency?: string
  allowNegative?: boolean
  className?: string
  disabled?: boolean
  placeholder?: string
}

const formatter = new Intl.NumberFormat('es-CO', {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
})

function formatPrice(value: number): string {
  return formatter.format(value)
}

function parseRawValue(raw: string): number {
  const stripped = raw.replace(/[^\d-]/g, '')
  if (stripped === '' || stripped === '-') return 0
  const parsed = parseInt(stripped, 10)
  return isNaN(parsed) ? 0 : parsed
}

export function PriceInput({
  value,
  onChange,
  label,
  error,
  currency = '$',
  allowNegative = false,
  className,
  disabled,
  placeholder = '0',
}: PriceInputProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [rawValue, setRawValue] = React.useState('')

  const handleFocus = () => {
    setIsEditing(true)
    setRawValue(value === 0 ? '' : String(value))
  }

  const handleBlur = () => {
    setIsEditing(false)
    const parsed = parseRawValue(rawValue)
    const clamped = allowNegative ? parsed : Math.max(0, parsed)
    onChange(clamped)
    setRawValue('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (allowNegative) {
      if (/^-?\d*$/.test(raw)) {
        setRawValue(raw)
      }
    } else {
      if (/^\d*$/.test(raw)) {
        setRawValue(raw)
      }
    }
  }

  const displayValue = isEditing ? rawValue : (value === 0 ? '' : formatPrice(value))

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div className="relative flex items-center">
        <span className="absolute left-3 text-sm text-muted-foreground select-none pointer-events-none">
          {currency}
        </span>
        <Input
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          className="pl-7"
        />
      </div>
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  )
}
