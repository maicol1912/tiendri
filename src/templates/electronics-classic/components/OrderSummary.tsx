// Electronics Classic — Order Summary
// Subtotal + shipping + total + checkout button.
// All colors via var(--t-*). ZERO hardcoded hex.
// Intl.NumberFormat — NEVER toLocaleString().

import type { CartItem } from "../types";

const fmt = new Intl.NumberFormat("en-US");

interface OrderSummaryProps {
  items: CartItem[];
  currencySymbol?: string;
  onCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD = 200000; // $200.000
const FLAT_SHIPPING = 12000; // $12.000

export function OrderSummary({ items, currencySymbol = "$", onCheckout }: OrderSummaryProps) {
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  const fmtCop = (v: number) => `${currencySymbol}${fmt.format(v)}`;

  const rows: Array<{ label: string; value: string; isTotal?: boolean }> = [
    { label: "Subtotal", value: fmtCop(subtotal) },
    {
      label: "Envío",
      value: shipping === 0 ? "Gratis" : fmtCop(shipping),
    },
    { label: "Total", value: fmtCop(total), isTotal: true },
  ];

  return (
    <div
      className="rounded-[var(--t-radius-card)] p-5 flex flex-col gap-4 border"
      style={{
        backgroundColor: "var(--t-card-bg)",
        borderColor: "var(--t-surface)",
      }}
      aria-label="Resumen del pedido"
    >
      <h2 className="font-bold text-[var(--t-text-primary)] text-base">
        Resumen del pedido
      </h2>

      <ul className="flex flex-col gap-2.5">
        {rows.map(({ label, value, isTotal }) => (
          <li
            key={label}
            className={`flex justify-between items-center ${
              isTotal ? "pt-2 border-t" : ""
            }`}
            style={isTotal ? { borderColor: "var(--t-surface)" } : undefined}
          >
            <span
              className={`text-sm ${isTotal ? "font-bold text-[var(--t-text-primary)]" : "text-[var(--t-text-secondary)]"}`}
            >
              {label}
            </span>
            <span
              className={`text-sm ${isTotal ? "font-bold text-[var(--t-primary)]" : "text-[var(--t-text-primary)]"}`}
            >
              {value}
            </span>
          </li>
        ))}
      </ul>

      {subtotal < FREE_SHIPPING_THRESHOLD && (
        <p className="text-xs" style={{ color: "var(--t-text-muted)" }}>
          Agrega {fmtCop(FREE_SHIPPING_THRESHOLD - subtotal)} más para{" "}
          <strong>envío gratis</strong>.
        </p>
      )}

      <button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full py-3 font-semibold text-sm rounded-[var(--t-radius-button)] transition-opacity disabled:opacity-50"
        style={{
          backgroundColor: "var(--t-button-bg)",
          color: "var(--t-button-text)",
        }}
        aria-label="Proceder al checkout"
      >
        Proceder al pago
      </button>
    </div>
  );
}
