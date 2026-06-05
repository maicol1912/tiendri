// Pet V3 Template — Quantity Stepper
// Generic +/- stepper. Used in ProductDetailPage.
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
  onIncrement,
  onDecrement,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onDecrement}
        className="w-10 h-10 flex items-center justify-center text-[var(--t-text-primary)] hover:text-[var(--t-primary)] transition-colors"
        aria-label="Disminuir cantidad"
      >
        <Minus className="w-5 h-5" />
      </button>
      <div className="w-[46px] h-[46px] flex items-center justify-center border border-[var(--t-border)] rounded-[var(--t-radius-button)]">
        <span className="text-[var(--t-text-primary)] text-lg font-medium">
          {value}
        </span>
      </div>
      <button
        onClick={onIncrement}
        className="w-10 h-10 flex items-center justify-center text-[var(--t-text-primary)] hover:text-[var(--t-primary)] transition-colors"
        aria-label="Aumentar cantidad"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
}
