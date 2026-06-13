// Furniture Dark — StickyBottomBar
// Mobile-only sticky bottom bar: quantity stepper + yellow CTA button
// Background: var(--t-border) = #242424
// ALL colors via var(--t-*)

import { QuantityStepper } from "./QuantityStepper";

interface StickyBottomBarProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onAddToCart: () => void;
  label?: string;
}

export function StickyBottomBar({
  quantity,
  onIncrement,
  onDecrement,
  onAddToCart,
  label = "AGREGAR AL CARRITO",
}: StickyBottomBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center gap-3 px-5 py-4 lg:hidden"
      style={{
        backgroundColor: "var(--t-border)",
        borderTop: "1px solid var(--t-border)",
        paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <QuantityStepper
        quantity={quantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        size="md"
      />

      <button
        type="button"
        className="flex-1 py-3.5 rounded-[var(--t-radius-button)] font-bold transition-opacity hover:opacity-90 active:scale-95"
        style={{
          backgroundColor: "var(--t-primary)",
          color: "var(--t-on-primary)",
          fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.04em",
        }}
        onClick={onAddToCart}
        aria-label={label}
      >
        {label}
      </button>
    </div>
  );
}
