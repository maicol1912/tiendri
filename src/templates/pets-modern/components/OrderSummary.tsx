// Pet V3 Template — Order Summary
// Renders: subtotal, shipping note, total, checkout CTA button.
// Visual only — callback comes as prop.

import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import type { ButtonStyle } from "@/types/templates";

function formatPrice(price: number, symbol: string): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

export interface OrderSummaryProps {
  totalPrice: number;
  currencySymbol?: string;
  buttonStyle?: ButtonStyle;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
}

export function OrderSummary({
  totalPrice,
  currencySymbol = "$",
  buttonStyle,
  onCheckout,
  onContinueShopping,
}: OrderSummaryProps) {
  const ctaClass = BUTTON_STYLE_MAP[buttonStyle ?? "filled"];
  return (
    <div className="mt-6 lg:mt-0 lg:w-[380px] lg:sticky lg:top-24">
      <div className="border border-[var(--t-border)] rounded-[var(--t-radius-card)] p-5">
        <h3 className="text-[var(--t-text-primary)] text-lg font-bold mb-4">
          Resumen del pedido
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[var(--t-text-muted)]">Subtotal</span>
            <span className="text-[var(--t-text-primary)] font-medium">
              {formatPrice(totalPrice, currencySymbol)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[var(--t-text-muted)]">Envio</span>
            <span className="text-[var(--t-primary)] font-medium">Via WhatsApp</span>
          </div>
          <div className="border-t border-[var(--t-border)] pt-3 flex items-center justify-between">
            <span className="text-[var(--t-text-primary)] text-base font-bold">Total</span>
            <span className="text-[var(--t-text-primary)] text-lg font-bold">
              {formatPrice(totalPrice, currencySymbol)}
            </span>
          </div>
        </div>

        <button
          onClick={onCheckout}
          className={`w-full mt-5 h-[56px] text-base font-bold uppercase rounded-[var(--t-radius-button)] transition-colors hover:opacity-90 active:opacity-80 border ${ctaClass}`}
        >
          Continuar al checkout
        </button>

        <button
          type="button"
          onClick={onContinueShopping}
          className="w-full mt-2 h-[44px] text-sm font-medium rounded-[var(--t-radius-button)] transition-colors hover:opacity-80"
          style={{
            backgroundColor: "transparent",
            color: "var(--t-text-secondary)",
            border: "1px solid var(--t-border)",
          }}
        >
          Seguir comprando
        </button>
      </div>
    </div>
  );
}
