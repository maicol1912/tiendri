// Furniture Dark — OrderSummary
// var(--t-spec-badge-bg) = #242424 card; total in yellow
// ALL colors via var(--t-*)

import Image from "next/image";
import type { CartItem } from "@/lib/cart";
import { formatPriceCurrency as formatPrice } from "@/lib/format";

interface OrderSummaryProps {
  items: CartItem[];
  totalPrice: number;
}

export function OrderSummary({ items, totalPrice }: OrderSummaryProps) {
  return (
    <div
      className="rounded-[var(--t-radius-card)] p-5 flex flex-col gap-4"
      style={{ backgroundColor: "var(--t-spec-badge-bg)" }}
    >
      <h3
        className="text-[var(--t-foreground)]"
        style={{
          fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
          fontSize: "16px",
          fontWeight: 700,
          letterSpacing: "-0.48px",
        }}
      >
        Resumen del pedido
      </h3>

      {/* Item list */}
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center gap-3">
            {/* Thumbnail */}
            <div
              className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"
              style={{ backgroundColor: "var(--t-card)" }}
            >
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              ) : null}
            </div>

            {/* Name + qty */}
            <div className="flex-1 min-w-0">
              <p
                className="text-[var(--t-foreground)] line-clamp-1"
                style={{
                  fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                {item.name}
              </p>
              <p
                className="text-[var(--t-muted)] mt-0.5"
                style={{
                  fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  fontSize: "12px",
                }}
              >
                × {item.quantity}
              </p>
            </div>

            {/* Price */}
            <p
              className="text-[var(--t-foreground)] font-semibold flex-shrink-0"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div
        className="flex items-center justify-between pt-3"
        style={{ borderTop: "1px solid var(--t-border)" }}
      >
        <span
          className="text-[var(--t-foreground)] font-semibold"
          style={{
            fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
            fontSize: "15px",
            fontWeight: 600,
          }}
        >
          Total
        </span>
        <span
          className="font-bold"
          style={{
            fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
            fontSize: "22px",
            fontWeight: 700,
            color: "var(--t-primary)",
          }}
        >
          {formatPrice(totalPrice)}
        </span>
      </div>
    </div>
  );
}
