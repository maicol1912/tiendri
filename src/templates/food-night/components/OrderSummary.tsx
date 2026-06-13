"use client";

// Food Night — Order Summary Card
// Subtotal, discounts, delivery, total — compact card

interface OrderSummaryProps {
  subtotal: number;
  discount?: number;
  deliveryFee?: number;
  currencySymbol?: string;
  itemCount?: number;
}

function formatPrice(amount: number, symbol: string = "$"): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(amount)}`;
}

export function OrderSummary({
  subtotal,
  discount = 0,
  deliveryFee = 0,
  currencySymbol = "$",
  itemCount = 0,
}: OrderSummaryProps) {
  const total = subtotal - discount + deliveryFee;

  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-[16px]"
      style={{ backgroundColor: "var(--t-card)" }}
      aria-label="Resumen del pedido"
    >
      <h2 className="text-[14px] font-semibold" style={{ color: "var(--t-foreground)" }}>
        Resumen del pedido
      </h2>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-normal" style={{ color: "var(--t-muted)" }}>
            Subtotal {itemCount > 0 ? `(${itemCount} ${itemCount === 1 ? "producto" : "productos"})` : ""}
          </span>
          <span className="text-[12px] font-medium" style={{ color: "var(--t-foreground)" }}>
            {formatPrice(subtotal, currencySymbol)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-normal" style={{ color: "var(--t-muted)" }}>
              Descuento
            </span>
            <span className="text-[12px] font-medium" style={{ color: "var(--t-primary)" }}>
              -{formatPrice(discount, currencySymbol)}
            </span>
          </div>
        )}

        {deliveryFee > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-normal" style={{ color: "var(--t-muted)" }}>
              Domicilio
            </span>
            <span className="text-[12px] font-medium" style={{ color: "var(--t-foreground)" }}>
              {formatPrice(deliveryFee, currencySymbol)}
            </span>
          </div>
        )}

        <div
          style={{ height: 1, backgroundColor: "var(--t-border-light)" }}
          aria-hidden="true"
        />

        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold" style={{ color: "var(--t-foreground)" }}>
            Total
          </span>
          <span className="text-[16px] font-bold" style={{ color: "var(--t-foreground)" }}>
            {formatPrice(total, currencySymbol)}
          </span>
        </div>
      </div>
    </div>
  );
}
