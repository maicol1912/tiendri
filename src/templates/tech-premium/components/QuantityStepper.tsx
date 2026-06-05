// Tech Premium Template — Quantity Stepper
// Generic +/- stepper used in cart item rows.
// Visual only — value and callbacks come as props.

import { Minus, Plus } from "lucide-react";

export interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export function QuantityStepper({
  value,
  min = 1,
  onIncrement,
  onDecrement,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="w-6 h-6 flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
        onClick={onDecrement}
        disabled={value <= min}
        aria-label="Disminuir cantidad"
      >
        <Minus className="w-4 h-4 text-[var(--t-text-primary)]" />
      </button>
      <div className="border border-[var(--t-border-mid)]/50 rounded px-4 py-2 min-w-[32px] text-center">
        <span className="text-base font-medium text-[var(--t-text-primary)]">{value}</span>
      </div>
      <button
        type="button"
        className="w-6 h-6 flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
        onClick={onIncrement}
        aria-label="Aumentar cantidad"
      >
        <Plus className="w-4 h-4 text-[var(--t-text-primary)]" />
      </button>
    </div>
  );
}
