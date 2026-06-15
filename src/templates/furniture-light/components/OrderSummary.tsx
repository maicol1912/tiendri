// Furniture Light — Order Summary
// Dark navy card: voucher/coupon row, subtotal, shipping, total, checkout CTA.
// ZERO hardcoded colors — all via var(--t-*).

import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  currencySymbol?: string;
  buttonStyle?: string;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
}

function fmt(price: number, symbol: string): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

export function OrderSummary({
  subtotal,
  shipping,
  total,
  currencySymbol = "$",
  buttonStyle,
  onCheckout,
  onContinueShopping,
}: OrderSummaryProps) {
  const btnClass = BUTTON_STYLE_MAP[(buttonStyle as keyof typeof BUTTON_STYLE_MAP) ?? "filled"];
  return (
    <div
      className="p-5 mt-2"
      style={{
        borderRadius: "var(--t-radius-card)",
        backgroundColor: "var(--t-secondary)",
      }}
    >
      <p className="text-base font-bold mb-4" style={{ color: "var(--t-on-secondary)" }}>Resumen del pedido</p>

      {/* Voucher row */}
      <div
        className="flex items-center gap-2 mb-4 px-3 py-2.5"
        style={{
          borderRadius: "var(--t-radius-button)",
          border: "1px dashed color-mix(in srgb, var(--t-on-secondary) 30%, transparent)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="color-mix(in srgb, var(--t-on-secondary) 70%, transparent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 12v10H4V12" />
          <path d="M22 7H2v5h20V7z" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
        <input
          type="text"
          placeholder="Código de cupón"
          className="flex-1 bg-transparent text-sm outline-none"
          style={{
            color: "color-mix(in srgb, var(--t-on-secondary) 80%, transparent)",
          }}
        />
        <button className="text-xs font-semibold text-[var(--t-primary)]">Aplicar</button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span style={{ color: "color-mix(in srgb, var(--t-on-secondary) 70%, transparent)" }}>Subtotal</span>
          <span className="font-medium" style={{ color: "var(--t-on-secondary)" }}>{fmt(subtotal, currencySymbol)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: "color-mix(in srgb, var(--t-on-secondary) 70%, transparent)" }}>Envío</span>
          <span className="font-medium" style={{ color: "var(--t-on-secondary)" }}>{fmt(shipping, currencySymbol)}</span>
        </div>
        <div className="h-px my-1" style={{ backgroundColor: "color-mix(in srgb, var(--t-on-secondary) 10%, transparent)" }} />
        <div className="flex justify-between text-base">
          <span className="font-bold" style={{ color: "var(--t-on-secondary)" }}>Total</span>
          <span className="font-bold" style={{ color: "var(--t-on-secondary)" }}>{fmt(total, currencySymbol)}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className={`w-full py-3.5 text-base font-bold transition-all hover:opacity-90 active:scale-[0.98] border ${btnClass}`}
        style={{ borderRadius: "var(--t-radius-button)" }}
      >
        Continuar al pago
      </button>

      <button
        type="button"
        onClick={onContinueShopping}
        className="w-full py-2.5 mt-2 text-sm font-medium transition-opacity hover:opacity-80"
        style={{
          borderRadius: "var(--t-radius-button)",
          backgroundColor: "transparent",
          color: "color-mix(in srgb, var(--t-on-secondary) 70%, transparent)",
          border: "1px solid color-mix(in srgb, var(--t-on-secondary) 20%, transparent)",
        }}
      >
        Seguir comprando
      </button>
    </div>
  );
}
