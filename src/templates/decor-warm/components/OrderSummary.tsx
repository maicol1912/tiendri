// Decor Warm Template — Order Summary
// Fixed bottom panel: Subtotal / Envío / Total rows + peach pill CTA.
// ZERO hardcoded colors — all via var(--t-*).

import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import { formatPrice } from "@/lib/format";

interface OrderSummaryProps {
  subtotal: number;
  total: number;
  currencySymbol?: string;
  buttonStyle?: string;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
}

export function OrderSummary({
  subtotal,
  total,
  currencySymbol = "$",
  buttonStyle,
  onCheckout,
  onContinueShopping,
}: OrderSummaryProps) {
  const btnClass = BUTTON_STYLE_MAP[(buttonStyle as keyof typeof BUTTON_STYLE_MAP) ?? "filled"];
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex flex-col gap-2 px-4 md:px-6 pt-4"
      style={{
        backgroundColor: "var(--t-background)",
        paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
        borderTop: "1px solid var(--t-border)",
      }}
    >
      {/* Price rows */}
      <div className="flex flex-col gap-1 max-w-3xl mx-auto w-full">
        <div className="flex justify-between">
          <span
            style={{
              color: "var(--t-muted)",
              fontFamily: "'League Spartan', sans-serif",
              fontSize: "13px",
              fontWeight: 300,
            }}
          >
            Subtotal
          </span>
          <span
            style={{
              color: "var(--t-foreground)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            {formatPrice(subtotal, currencySymbol)}
          </span>
        </div>
        <div className="flex justify-between">
          <span
            style={{
              color: "var(--t-muted)",
              fontFamily: "'League Spartan', sans-serif",
              fontSize: "13px",
              fontWeight: 300,
            }}
          >
            Envío
          </span>
          <span
            style={{
              color: "var(--t-primary)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            Gratis
          </span>
        </div>
        <div className="flex justify-between pt-1" style={{ borderTop: "1px solid var(--t-border)" }}>
          <span
            style={{
              color: "var(--t-foreground)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            Total
          </span>
          <span
            style={{
              color: "var(--t-primary)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            {formatPrice(total, currencySymbol)}
          </span>
        </div>
      </div>

      {/* Check Out — 207×45px peach pill */}
      <div className="max-w-3xl mx-auto w-full flex flex-col items-center gap-2 mt-1">
        <button
          type="button"
          className={`border ${btnClass}`}
          style={{
            width: 207,
            height: 45,
            fontFamily: "'Poppins', sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            borderRadius: "var(--t-radius-button)",
            cursor: "pointer",
          }}
          onClick={onCheckout}
        >
          Hacer pedido
        </button>

        {/* Seguir comprando — text link */}
        <button
          type="button"
          style={{
            backgroundColor: "transparent",
            color: "var(--t-muted)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            border: "none",
            cursor: "pointer",
            padding: "4px 0",
          }}
          onClick={onContinueShopping}
        >
          Seguir comprando
        </button>
      </div>
    </div>
  );
}
