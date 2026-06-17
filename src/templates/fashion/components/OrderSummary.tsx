// Fashion Template — Order Summary
// Shows total item count, total price, and CHECKOUT button.
// Used as sticky desktop sidebar in CartPage.
// Monochromatic B&W. All colors via var(--t-*). ZERO hardcoded hex.

const fmt = new Intl.NumberFormat("es-CO");

interface OrderSummaryProps {
  totalPrice: number;
  cartItemCount: number;
  currencySymbol?: string;
  onCheckout?: () => void;
}

export function OrderSummary({
  totalPrice,
  cartItemCount,
  currencySymbol = "$",
  onCheckout,
}: OrderSummaryProps) {
  const fmtPrice = (v: number) => `${currencySymbol}${fmt.format(v)}`;

  return (
    <div className="border border-[var(--t-border)] p-6 bg-[var(--t-surface)]">
      <h3
        className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--t-foreground)]"
        style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
      >
        RESUMEN DEL PEDIDO
      </h3>
      <div className="flex justify-between py-3 border-b border-[var(--t-border)]">
        <span
          className="text-sm text-[var(--t-muted)]"
          style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
        >
          Total ({cartItemCount}{" "}
          {cartItemCount === 1 ? "artículo" : "artículos"})
        </span>
        <span
          className="text-base font-bold text-[var(--t-foreground)]"
          style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
        >
          {fmtPrice(totalPrice)}
        </span>
      </div>
      <button
        type="button"
        className="w-full py-3.5 mt-5 bg-[var(--t-secondary)] transition-opacity hover:opacity-80 border-0 cursor-pointer"
        style={{
          borderRadius: "var(--t-radius-button)",
          fontFamily: "var(--font-sans, 'Inter', sans-serif)",
          fontSize: "12px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "var(--t-foreground)",
        }}
        onClick={onCheckout}
      >
        CHECKOUT
      </button>
    </div>
  );
}
