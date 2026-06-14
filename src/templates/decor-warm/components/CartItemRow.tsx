// Decor Warm Template — Cart Item Row
// 66px linen thumbnail + product name + price + QuantityStepper + remove button.
// ZERO hardcoded colors — all via var(--t-*).

import Image from "next/image";
import { QuantityStepper } from "@/components/shared/QuantityStepper";
import type { CartItem } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

interface CartItemRowProps {
  item: CartItem;
  currencySymbol?: string;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onRemove?: () => void;
}

export function CartItemRow({
  item,
  currencySymbol = "$",
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemRowProps) {
  return (
    <div
      className="flex items-center gap-3"
      style={{
        paddingTop: 12,
        paddingBottom: 12,
        borderBottom: "1px solid var(--t-border)",
      }}
    >
      {/* Thumbnail — 66px linen bg */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{
          width: 66,
          height: 66,
          borderRadius: "var(--t-radius-category)",
          backgroundColor: "var(--t-card)",
        }}
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="66px"
            className="object-contain p-1.5"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="var(--t-border)" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p
          className="line-clamp-2 m-0"
          style={{
            color: "var(--t-muted)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          {item.name}
        </p>
        <span
          style={{
            color: "var(--t-primary)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          {formatPrice(item.price, currencySymbol)}
        </span>
      </div>

      {/* Stepper + remove */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <QuantityStepper
          quantity={item.quantity}
          min={1}
          max={99}
          onChange={(v) => {
            if (v >= item.quantity) onIncrement?.();
            else onDecrement?.();
          }}
          size="sm"
        />
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--t-muted)",
              fontFamily: "'League Spartan', sans-serif",
              fontSize: "11px",
              padding: 0,
            }}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}
