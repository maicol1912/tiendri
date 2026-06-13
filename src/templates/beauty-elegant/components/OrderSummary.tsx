// Beauty Elegant Template — Order Summary
// Compact item list + total for checkout. Purple accent.

import Image from "next/image";
import type { CheckoutOrderItem } from "../types";

interface OrderSummaryProps {
  items: CheckoutOrderItem[];
  currencySymbol?: string;
}

function formatPrice(price: number, symbol: string = "$"): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

export function OrderSummary({ items, currencySymbol = "$" }: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className="flex flex-col"
      style={{
        backgroundColor: "var(--t-background)",
        borderRadius: "20px",
        border: "1px solid var(--t-border)",
      }}
    >
      <div
        className="flex items-center justify-between px-5 pt-5 pb-3"
        style={{ borderBottom: "1px solid var(--t-border)" }}
      >
        <h2 className="text-base font-bold" style={{ color: "var(--t-foreground)", margin: 0 }}>
          Resumen del pedido
        </h2>
        <span className="text-[13px] font-medium" style={{ color: "var(--t-muted)" }}>
          {totalItems} {totalItems === 1 ? "producto" : "productos"}
        </span>
      </div>

      <div className="flex flex-col px-5 pt-3 pb-2 gap-3">
        {items.map((item, index) => (
          <div
            key={`${item.productId}-${item.variantLabel ?? index}`}
            className="flex items-center gap-3"
          >
            <div
              className="relative flex-shrink-0 overflow-hidden"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                backgroundColor: "var(--t-icon-pill-bg)",
              }}
            >
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.productName}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <rect width="20" height="20" rx="4" fill="var(--t-border)" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <p className="line-clamp-1 text-[13px] font-semibold" style={{ color: "var(--t-foreground)", margin: 0 }}>
                {item.productName}
              </p>
              <p className="text-[11px]" style={{ color: "var(--t-muted)", margin: 0 }}>
                Cant. {item.quantity}
              </p>
            </div>
            <span
              className="flex-shrink-0 text-sm font-bold"
              style={{ color: "var(--t-primary)" }}
            >
              {formatPrice(item.price * item.quantity, currencySymbol)}
            </span>
          </div>
        ))}
      </div>

      <div className="mx-5" style={{ height: "1px", backgroundColor: "var(--t-border)", margin: "8px 0" }} />

      <div className="flex items-center justify-between px-5 pb-5">
        <span className="text-[15px] font-bold" style={{ color: "var(--t-foreground)" }}>Total</span>
        <span className="text-lg font-bold" style={{ color: "var(--t-primary)" }}>
          {formatPrice(subtotal, currencySymbol)}
        </span>
      </div>
    </div>
  );
}
