"use client";

// Food Night — Quantity Stepper (bordered circles)

import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  quantity?: number;
  min?: number;
  size?: "sm" | "md";
  onDecrement?: () => void;
  onIncrement?: () => void;
}

export function QuantityStepper({
  quantity = 1,
  min = 1,
  size = "md",
  onDecrement,
  onIncrement,
}: QuantityStepperProps) {
  const btnSize = size === "sm" ? 26 : 32;
  const iconSize = size === "sm" ? 12 : 14;
  const textSize = size === "sm" ? "text-[12px]" : "text-[14px]";

  return (
    <div className="flex items-center gap-3" role="group" aria-label="Cantidad">
      <button
        type="button"
        onClick={onDecrement}
        disabled={quantity <= min}
        className="flex items-center justify-center"
        style={{
          width: btnSize,
          height: btnSize,
          borderRadius: "50%",
          backgroundColor: "transparent",
          border: quantity <= min ? "1px solid var(--t-text-muted)" : "1px solid var(--t-border)",
          color: quantity <= min ? "var(--t-text-muted)" : "var(--t-text-primary)",
          cursor: quantity <= min ? "not-allowed" : "pointer",
        }}
        aria-label="Disminuir cantidad"
      >
        <Minus size={iconSize} strokeWidth={2} />
      </button>

      <span
        className={`w-6 text-center ${textSize} font-semibold select-none`}
        style={{ color: "var(--t-text-primary)" }}
        aria-live="polite"
        aria-label={`Cantidad: ${quantity}`}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrement}
        className="flex items-center justify-center"
        style={{
          width: btnSize,
          height: btnSize,
          borderRadius: "50%",
          backgroundColor: "transparent",
          border: "1px solid var(--t-border)",
          color: "var(--t-text-primary)",
          cursor: "pointer",
        }}
        aria-label="Aumentar cantidad"
      >
        <Plus size={iconSize} strokeWidth={2} />
      </button>
    </div>
  );
}
