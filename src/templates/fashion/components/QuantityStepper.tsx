// Fashion Template — Quantity Stepper
// Inline bordered +/- control with quantity display in the middle.
// Monochromatic B&W. All colors via var(--t-*). ZERO hardcoded hex.

import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  quantity: number;
  min?: number;
  onDecrement: () => void;
  onIncrement: () => void;
}

export function QuantityStepper({
  quantity,
  min = 1,
  onDecrement,
  onIncrement,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center border border-[var(--t-border)]">
      <button
        type="button"
        className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-[var(--t-secondary)] border-0 cursor-pointer bg-transparent"
        onClick={onDecrement}
        disabled={quantity <= min}
        aria-label="Reducir cantidad"
      >
        <Minus size={12} strokeWidth={1.5} className="text-[var(--t-foreground)]" />
      </button>
      <span
        className="w-8 text-center text-[13px] font-medium text-[var(--t-foreground)] border-x border-[var(--t-border)]"
        style={{
          fontFamily: "var(--font-sans, 'Inter', sans-serif)",
          lineHeight: "32px",
        }}
      >
        {quantity}
      </span>
      <button
        type="button"
        className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-[var(--t-secondary)] border-0 cursor-pointer bg-transparent"
        onClick={onIncrement}
        aria-label="Aumentar cantidad"
      >
        <Plus size={12} strokeWidth={1.5} className="text-[var(--t-foreground)]" />
      </button>
    </div>
  );
}
