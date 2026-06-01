// Furniture Dark — QuantityStepper
// SIGNATURE: yellow circular ±buttons (#EFF422 via --t-primary)
// Pill container with dark bg, quantity number in center
// ALL colors via var(--t-*)

import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}

export function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
  size = "md",
}: QuantityStepperProps) {
  const isMin = quantity <= min;
  const isMax = quantity >= max;

  const containerHeight = size === "sm" ? "h-9" : "h-11";
  const btnSize = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const iconSize = size === "sm" ? 12 : 14;
  const quantityFontSize = size === "sm" ? "14px" : "16px";

  return (
    <div
      className={`inline-flex items-center gap-2 px-2 ${containerHeight} rounded-[var(--t-radius-button)]`}
      style={{ backgroundColor: "var(--t-secondary)" }}
      role="group"
      aria-label="Cantidad"
    >
      {/* Decrement */}
      <button
        type="button"
        className={`${btnSize} flex items-center justify-center rounded-full transition-opacity active:scale-95 disabled:opacity-40`}
        style={{ backgroundColor: "var(--t-primary)" }}
        onClick={onDecrement}
        disabled={isMin}
        aria-label="Disminuir cantidad"
      >
        <Minus size={iconSize} strokeWidth={3} style={{ color: "var(--t-button-text)" }} />
      </button>

      {/* Quantity display */}
      <span
        className="min-w-[24px] text-center select-none"
        style={{
          fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
          fontSize: quantityFontSize,
          fontWeight: 600,
          color: "var(--t-text-primary)",
          letterSpacing: "-0.32px",
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {quantity}
      </span>

      {/* Increment */}
      <button
        type="button"
        className={`${btnSize} flex items-center justify-center rounded-full transition-opacity active:scale-95 disabled:opacity-40`}
        style={{ backgroundColor: "var(--t-primary)" }}
        onClick={onIncrement}
        disabled={isMax}
        aria-label="Aumentar cantidad"
      >
        <Plus size={iconSize} strokeWidth={3} style={{ color: "var(--t-button-text)" }} />
      </button>
    </div>
  );
}
