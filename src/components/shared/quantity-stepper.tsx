"use client";

import { Minus, Plus } from "lucide-react";

export interface QuantityStepperProps {
  quantity: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className,
}: QuantityStepperProps) {
  const canDecrement = quantity > min;
  const canIncrement = quantity < max;

  function handleDecrement() {
    if (!canDecrement) return;
    if (onDecrement) onDecrement();
    else if (onChange) onChange(quantity - 1);
  }

  function handleIncrement() {
    if (!canIncrement) return;
    if (onIncrement) onIncrement();
    else if (onChange) onChange(quantity + 1);
  }

  const btnSize = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const iconSize = size === "sm" ? 12 : 14;
  const textSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <div
      className={`inline-flex items-center gap-2 px-2 rounded-[var(--t-radius-button)] ${size === "sm" ? "h-9" : "h-11"} ${className ?? ""}`}
      style={{ backgroundColor: "var(--t-secondary)" }}
      role="group"
      aria-label="Cantidad"
    >
      <button
        type="button"
        className={`${btnSize} flex items-center justify-center rounded-full transition-opacity active:scale-95 disabled:opacity-40`}
        style={{ backgroundColor: "var(--t-primary)" }}
        onClick={handleDecrement}
        disabled={!canDecrement}
        aria-label="Disminuir cantidad"
      >
        <Minus size={iconSize} strokeWidth={3} style={{ color: "var(--t-on-primary)" }} />
      </button>

      <span
        className={`min-w-[24px] text-center select-none font-semibold ${textSize}`}
        style={{ color: "var(--t-foreground)" }}
        aria-live="polite"
        aria-atomic="true"
      >
        {quantity}
      </span>

      <button
        type="button"
        className={`${btnSize} flex items-center justify-center rounded-full transition-opacity active:scale-95 disabled:opacity-40`}
        style={{ backgroundColor: "var(--t-primary)" }}
        onClick={handleIncrement}
        disabled={!canIncrement}
        aria-label="Aumentar cantidad"
      >
        <Plus size={iconSize} strokeWidth={3} style={{ color: "var(--t-on-primary)" }} />
      </button>
    </div>
  );
}
