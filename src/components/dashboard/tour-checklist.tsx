'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChecklistItem {
  id: string
  label: string
  href: string
  completedKey: string
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'name',
    label: 'Nombre y link listos',
    href: '/dashboard',
    completedKey: 'tiendri_onboarding_completed',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp conectado',
    href: '/dashboard',
    completedKey: 'tiendri_onboarding_completed',
  },
  {
    id: 'product',
    label: 'Agregá tu primer producto',
    href: '/dashboard/productos',
    completedKey: 'tiendri_checklist_product',
  },
  {
    id: 'share',
    label: 'Compartí el link',
    href: '/dashboard/compartir',
    completedKey: 'tiendri_checklist_shared',
  },
  {
    id: 'order',
    label: 'Recibí tu primer pedido',
    href: '#',
    completedKey: 'tiendri_checklist_order',
  },
]

const HIDDEN_KEY = 'tiendri_checklist_hidden'

function readCompletedState(): Record<string, boolean> {
  const result: Record<string, boolean> = {}
  for (const item of CHECKLIST_ITEMS) {
    result[item.id] = localStorage.getItem(item.completedKey) === 'true'
  }
  return result
}

export function TourChecklist() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({})
  const [hidden, setHidden] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setCompleted(readCompletedState())
    setHidden(localStorage.getItem(HIDDEN_KEY) === 'true')
    setMounted(true)
  }, [])

  if (!mounted) return null

  const completedCount = Object.values(completed).filter(Boolean).length
  const totalCount = CHECKLIST_ITEMS.length
  const allDone = completedCount === totalCount

  if (allDone) return null

  const progressPercent = Math.round((completedCount / totalCount) * 100)

  function toggleHidden() {
    const next = !hidden
    setHidden(next)
    localStorage.setItem(HIDDEN_KEY, String(next))
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 shadow-sm">
      {/* Header */}
      <button
        type="button"
        onClick={toggleHidden}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        aria-expanded={!hidden}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">Tu tienda en 5 pasos</span>
          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
            {completedCount}/{totalCount}
          </span>
        </div>
        {hidden ? (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        )}
      </button>

      {/* Progress bar */}
      <div className="mx-4 h-1.5 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Items */}
      {!hidden && (
        <ul className="mt-2 space-y-0.5 px-2 pb-3">
          {CHECKLIST_ITEMS.map(item => {
            const isDone = completed[item.id] ?? false

            return (
              <li key={item.id}>
                {isDone || item.href === '#' ? (
                  <div
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-2 py-2',
                      isDone ? 'opacity-60' : 'opacity-40'
                    )}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    ) : (
                      <Circle className="h-4 w-4 shrink-0 text-gray-400" />
                    )}
                    <span
                      className={cn(
                        'text-sm',
                        isDone ? 'text-gray-400 line-through' : 'text-gray-400'
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-gray-100"
                  >
                    <Circle className="h-4 w-4 shrink-0 text-gray-400" />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
