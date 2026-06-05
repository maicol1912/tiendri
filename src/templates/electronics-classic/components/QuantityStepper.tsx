// Electronics Classic — Quantity Stepper
// Bordered rounded pill with - / + buttons and quantity display.
// All colors via var(--t-*). ZERO hardcoded hex.

import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  quantity: number;
  min?: number;
  productId: string;
  onQuantityChange: (productId: string, qty: number) => void;
}

export function QuantityStepper({
  quantity,
  min = 1,
  productId,
  onQuantityChange,
}: QuantityStepperProps) {
  return (
    <div
      className="flex items-center border rounded-[var(--t-radius-button)]"
      style={{ borderColor: "var(--t-surface)" }}
    >
      <button
        onClick={() => onQuantityChange(productId, Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        aria-label="Reducir cantidad"
        className="w-7 h-7 flex items-center justify-center disabled:opacity-40 transition-colors"
        style={{ color: "var(--t-text-primary)" }}
      >
        <Minus className="w-3 h-3" aria-hidden="true" />
      </button>
      <span
        className="w-8 text-center text-sm select-none font-semibold"
        aria-live="polite"
        aria-label={`Cantidad: ${quantity}`}
        style={{ color: "var(--t-text-primary)" }}
      >
        {quantity}
      </span>
      <button
        onClick={() => onQuantityChange(productId, quantity + 1)}
        aria-label="Aumentar cantidad"
        className="w-7 h-7 flex items-center justify-center transition-colors"
        style={{ color: "var(--t-text-primary)" }}
      >
        <Plus className="w-3 h-3" aria-hidden="true" />
      </button>
    </div>
  );
}
