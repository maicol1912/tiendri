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
      <p className="text-base font-bold text-white mb-4">Resumen del pedido</p>

      {/* Voucher row */}
      <div
        className="flex items-center gap-2 mb-4 px-3 py-2.5"
        style={{
          borderRadius: "var(--t-radius-button)",
          border: "1px dashed rgba(255,255,255,0.3)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 12v10H4V12" />
          <path d="M22 7H2v5h20V7z" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
        <input
          type="text"
          placeholder="Código de cupón"
          className="flex-1 bg-transparent text-sm text-white/80 placeholder-white/40 outline-none"
        />
        <button className="text-xs font-semibold text-[var(--t-primary)]">Aplicar</button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Subtotal</span>
          <span className="text-white font-medium">{fmt(subtotal, currencySymbol)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Envío</span>
          <span className="text-white font-medium">{fmt(shipping, currencySymbol)}</span>
        </div>
        <div className="h-px bg-white/10 my-1" />
        <div className="flex justify-between text-base">
          <span className="text-white font-bold">Total</span>
          <span className="text-white font-bold">{fmt(total, currencySymbol)}</span>
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
          color: "rgba(255,255,255,0.7)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        Seguir comprando
      </button>
    </div>
  );
}
