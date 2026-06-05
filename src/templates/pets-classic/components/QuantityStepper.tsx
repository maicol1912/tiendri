"use client";

// Pets Classic — Quantity Stepper
// Generic +/- stepper. Used in ProductDetailPage (desktop + mobile).
// Visual only — value and callbacks come as props.

export interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  /** Button size in px. Defaults to 10 (w-10 h-10). Pass 9 for mobile (w-9 h-9). */
  buttonSize?: number;
  /** Display value width. Defaults to 10 (w-10). Pass 8 for mobile (w-8). */
  valueWidth?: number;
  /** Font size for display value. Defaults to "14px". */
  fontSize?: string;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export function QuantityStepper({
  value,
  min = 1,
  buttonSize = 10,
  valueWidth = 10,
  fontSize = "14px",
  onIncrement,
  onDecrement,
}: QuantityStepperProps) {
  const isAtMin = value <= min;

  return (
    <div
      className="flex items-center"
      style={{
        border: "1px solid var(--t-border)",
        borderRadius: "var(--t-radius-button)",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={onDecrement}
        disabled={isAtMin}
        className={`flex items-center justify-center w-${buttonSize} h-${buttonSize}`}
        style={{
          background: "none",
          border: "none",
          cursor: isAtMin ? "not-allowed" : "pointer",
          color: isAtMin ? "var(--t-border)" : "var(--t-text-primary)",
          fontSize: "18px",
          fontWeight: 700,
        }}
        aria-label="Disminuir cantidad"
      >
        −
      </button>
      <span
        className={`w-${valueWidth} text-center`}
        style={{ fontSize, fontWeight: 600, color: "var(--t-text-primary)" }}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        className={`flex items-center justify-center w-${buttonSize} h-${buttonSize}`}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--t-text-primary)",
          fontSize: "18px",
          fontWeight: 700,
        }}
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
}
