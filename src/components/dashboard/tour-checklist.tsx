'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/shared/utils'
import { getChecklistState } from '@/app/(dashboard)/dashboard/_actions'
import type { ChecklistState } from '@/app/(dashboard)/dashboard/_actions'

interface ChecklistItem {
  id: string
  label: string
  href: string
  done: (state: ChecklistState, sharedViaLS: boolean) => boolean
  isComingSoon?: boolean
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'name',
    label: 'Nombre y link listos',
    href: '/dashboard',
    done: (s) => s.onboardingCompleted,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp conectado',
    href: '/dashboard',
    done: (s) => s.whatsappConnected,
  },
  {
    id: 'product',
    label: 'Agregá tu primer producto',
    href: '/dashboard/productos',
    done: (s) => s.hasProducts,
  },
  {
    id: 'share',
    label: 'Compartí el link',
    href: '/dashboard/compartir',
    done: (_s, sharedViaLS) => sharedViaLS,
  },
]

const HIDDEN_KEY = 'tiendri_checklist_hidden'
const SHARED_KEY = 'tiendri_checklist_shared'

export function TourChecklist() {
  const [state, setState] = useState<ChecklistState | null>(null)
  const [sharedViaLS, setSharedViaLS] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setHidden(localStorage.getItem(HIDDEN_KEY) === 'true')
    setSharedViaLS(localStorage.getItem(SHARED_KEY) === 'true')
    setMounted(true)

    getChecklistState().then(setState).catch(() => {
      setState({ onboardingCompleted: false, whatsappConnected: false, hasProducts: false })
    })
  }, [])

  if (!mounted || !state) return null

  const completionFlags = CHECKLIST_ITEMS.map(item => item.done(state, sharedViaLS))
  const completedCount = completionFlags.filter(Boolean).length
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
    <div className="rounded-xl border border-border bg-muted/50 shadow-sm">
      <button
        type="button"
        onClick={toggleHidden}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
        aria-expanded={!hidden}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Tu tienda en 4 pasos</span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
            {completedCount}/{totalCount}
          </span>
        </div>
        {hidden ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      <div className="mx-4 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {!hidden && (
        <ul className="mt-2 space-y-0.5 px-2 pb-3">
          {CHECKLIST_ITEMS.map((item, i) => {
            const isDone = completionFlags[i] ?? false

            return (
              <li key={item.id}>
                {isDone ? (
                  <div className="flex items-center gap-3 rounded-lg px-2 py-2 opacity-60">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-sm text-muted-foreground line-through">{item.label}</span>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted"
                  >
                    <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-sm text-foreground">{item.label}</span>
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
