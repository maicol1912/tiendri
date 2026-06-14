"use client";

// Beauty Elegant Template — Cart Item Row
// Glassmorphic purple tint card. Thumbnail + name + price + quantity counter.

import Image from "next/image";
import { Trash2 } from "lucide-react";
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
      className="flex items-start gap-3 p-3"
      style={{
        backgroundColor: "var(--t-icon-pill-bg)",
        borderRadius: "20px",
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "var(--t-radius-card)",
        }}
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "var(--t-icon-pill-bg)" }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="28" height="28" rx="6" fill="var(--t-border-light)" />
            </svg>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 min-w-0 py-0.5">
        <p
          className="line-clamp-1 text-sm font-semibold"
          style={{ color: "var(--t-foreground)", lineHeight: "20px", margin: 0 }}
        >
          {item.name}
        </p>

        {item.description && (
          <p
            className="line-clamp-1 text-xs font-normal"
            style={{ color: "var(--t-muted)", lineHeight: "16px", margin: "2px 0 0 0" }}
          >
            {item.description}
          </p>
        )}

        {/* Price + quantity counter */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-2">
          <span
            className="text-[15px] font-bold"
            style={{ color: "var(--t-primary)", lineHeight: "20px" }}
          >
            {formatPrice(item.price, currencySymbol)}
          </span>

          <div className="flex items-center gap-2">
            <QuantityStepper
              quantity={item.quantity}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
            <button
              type="button"
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 36,
                height: 36,
                borderRadius: "var(--t-radius-card)",
                backgroundColor: "var(--t-card)",
                border: "none",
                cursor: "pointer",
                color: "var(--t-muted)",
                transition: "color 0.2s ease, background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--t-primary)";
                e.currentTarget.style.backgroundColor = "var(--t-border)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--t-muted)";
                e.currentTarget.style.backgroundColor = "var(--t-card)";
              }}
              onClick={onRemove}
              aria-label={`Eliminar ${item.name} del carrito`}
            >
              <Trash2 size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
