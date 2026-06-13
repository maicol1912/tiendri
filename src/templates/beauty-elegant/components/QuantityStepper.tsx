"use client";

// Beauty Elegant Template — Quantity Stepper
// The +/- quantity control used in CartItemRow.
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
      className="inline-flex items-center gap-2"
      style={{
        backgroundColor: "var(--t-icon-pill-bg)",
        borderRadius: "var(--t-radius-button)",
        padding: "3px 4px",
        height: "30px",
      }}
    >
      <button
        type="button"
        aria-label="Disminuir cantidad"
        className="flex items-center justify-center"
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          backgroundColor: "var(--t-background)",
          border: "1px solid var(--t-border)",
          cursor: "pointer",
        }}
        onClick={onDecrement}
      >
        <Minus size={10} strokeWidth={2} color="var(--t-primary)" />
      </button>

      <span
        className="text-xs font-semibold text-center"
        style={{
          color: "var(--t-foreground)",
          lineHeight: "20px",
          minWidth: "16px",
        }}
      >
        {String(quantity).padStart(2, "0")}
      </span>

      <button
        type="button"
        aria-label="Aumentar cantidad"
        className="flex items-center justify-center"
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          backgroundColor: "var(--t-primary)",
          border: "none",
          cursor: "pointer",
        }}
        onClick={onIncrement}
      >
        <Plus size={10} strokeWidth={2} color="#FFFFFF" />
      </button>
    </div>
  );
}
