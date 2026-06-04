"use client";

// Decor Warm Template — Quantity Stepper
// 24px peach circle buttons with - / + glyphs. Enforces min/max bounds.

interface QuantityStepperProps {
  quantity: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  size?: "sm" | "md";
}

export function QuantityStepper({
  quantity,
  min = 1,
  max = 99,
  onChange,
  size = "sm",
}: QuantityStepperProps) {
  const btnSize = size === "sm" ? 24 : 30;
  const fontSize = size === "sm" ? 12 : 14;
  const countFontSize = size === "sm" ? 14 : 16;

  const canDecrement = quantity > min;
  const canIncrement = quantity < max;

  return (
    <div className="flex items-center gap-3">
      {/* Decrement */}
      <button
        type="button"
        disabled={!canDecrement}
        onClick={() => { if (canDecrement) onChange(quantity - 1); }}
        style={{
          width: btnSize,
          height: btnSize,
          borderRadius: "50%",
          backgroundColor: canDecrement ? "var(--t-peach)" : "var(--t-border)",
          border: "none",
          cursor: canDecrement ? "pointer" : "not-allowed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background-color 0.15s ease",
        }}
        aria-label="Reducir cantidad"
      >
        <span
          aria-hidden="true"
          style={{
            color: "#FFFFFF",
            fontSize,
            fontWeight: 600,
            lineHeight: 1,
            marginTop: -1,
          }}
        >
          −
        </span>
      </button>

      {/* Count */}
      <span
        style={{
          color: "var(--t-dark-mode)",
          fontFamily: "'Poppins', sans-serif",
          fontSize: countFontSize,
          fontWeight: 500,
          minWidth: 18,
          textAlign: "center",
        }}
      >
        {quantity}
      </span>

      {/* Increment */}
      <button
        type="button"
        disabled={!canIncrement}
        onClick={() => { if (canIncrement) onChange(quantity + 1); }}
        style={{
          width: btnSize,
          height: btnSize,
          borderRadius: "50%",
          backgroundColor: canIncrement ? "var(--t-peach)" : "var(--t-border)",
          border: "none",
          cursor: canIncrement ? "pointer" : "not-allowed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "background-color 0.15s ease",
        }}
        aria-label="Aumentar cantidad"
      >
        <span
          aria-hidden="true"
          style={{
            color: "#FFFFFF",
            fontSize,
            fontWeight: 600,
            lineHeight: 1,
            marginTop: -1,
          }}
        >
          +
        </span>
      </button>
    </div>
  );
}
