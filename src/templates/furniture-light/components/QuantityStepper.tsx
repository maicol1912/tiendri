// Furniture Light — Quantity Stepper
// Orange +/- quantity controls used in CartItemRow.
// ZERO hardcoded colors — all via var(--t-*).

import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  quantity: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityStepperProps) {
  return (
    <div
      className="flex items-center gap-2 px-2 py-1"
      style={{
        borderRadius: "var(--t-radius-button)",
        backgroundColor: "var(--t-section-bg)",
      }}
    >
      <button
        onClick={onDecrement}
        aria-label="Disminuir"
        className="flex items-center justify-center w-6 h-6 rounded-full transition-all hover:scale-110"
        style={{ backgroundColor: "var(--t-primary)", color: "var(--t-button-text)" }}
      >
        <Minus size={12} strokeWidth={2.5} />
      </button>
      <span className="text-sm font-bold text-[var(--t-text-primary)] min-w-[16px] text-center">
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        aria-label="Aumentar"
        className="flex items-center justify-center w-6 h-6 rounded-full transition-all hover:scale-110"
        style={{ backgroundColor: "var(--t-primary)", color: "var(--t-button-text)" }}
      >
        <Plus size={12} strokeWidth={2.5} />
      </button>
    </div>
  );
}
