'use client'

import { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/shared/utils'

const STEP_TITLES: Record<number, string> = {
  1: 'Tu tienda',
  2: 'Tu catálogo',
  3: 'El estilo',
  4: 'Tu marca',
}

const TOTAL_STEPS = 4

interface OnboardingShellProps {
  currentStep: number
  onNext: () => void
  onBack: () => void
  canProceed: boolean
  isSubmitting?: boolean
  error?: string | null
  children: React.ReactNode
}

export function OnboardingShell({
  currentStep,
  onNext,
  onBack,
  canProceed,
  isSubmitting = false,
  error = null,
  children,
}: OnboardingShellProps) {
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [animating, setAnimating] = useState(false)
  const prevStepRef = useRef(currentStep)

  useEffect(() => {
    if (currentStep !== prevStepRef.current) {
      setDirection(currentStep > prevStepRef.current ? 'forward' : 'backward')
      setAnimating(true)
      prevStepRef.current = currentStep
      const id = setTimeout(() => setAnimating(false), 300)
      return () => clearTimeout(id)
    }
  }, [currentStep])

  const isLastStep = currentStep === TOTAL_STEPS

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => {
            const step = i + 1
            const isPast = step < currentStep
            const isCurrent = step === currentStep
            return (
              <div
                key={step}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-all duration-300',
                  isPast && 'bg-primary',
                  isCurrent && 'bg-primary',
                  !isPast && !isCurrent && 'bg-muted'
                )}
              />
            )
          })}
        </div>

        <p className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
          Paso {currentStep} de {TOTAL_STEPS} — {STEP_TITLES[currentStep]}
        </p>
      </div>

      <div
        className={cn(
          'transition-all duration-300',
          animating && direction === 'forward' && 'opacity-0 translate-x-4',
          animating && direction === 'backward' && 'opacity-0 -translate-x-4',
          !animating && 'opacity-100 translate-x-0'
        )}
        style={{ transform: animating ? undefined : 'translateX(0)' }}
      >
        {children}
      </div>

      {error && (
        <p className="text-sm text-destructive text-center -mb-2">{error}</p>
      )}

      <div className="flex items-center justify-between gap-4 pt-2">
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            disabled={isSubmitting}
            className="text-muted-foreground hover:text-foreground px-0"
          >
            ← Anterior
          </Button>
        ) : (
          <div />
        )}

        <Button
          type="button"
          onClick={onNext}
          disabled={!canProceed || isSubmitting}
          className={cn(
            'min-w-[140px] h-12 rounded-xl font-semibold text-sm transition-all',
            canProceed && !isSubmitting
              ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          )}
        >
          {isLastStep && isSubmitting ? 'Creando tienda...' : isLastStep ? 'Crear mi tienda →' : 'Siguiente →'}
        </Button>
      </div>
    </div>
  )
}
