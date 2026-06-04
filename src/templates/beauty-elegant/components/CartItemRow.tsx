"use client";

// Beauty Elegant Template — Cart Item Row
// Glassmorphic purple tint card. Thumbnail + name + price + quantity counter.

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import type { CartItem } from "../types";

interface CartItemRowProps {
  item: CartItem;
  currencySymbol?: string;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onRemove?: () => void;
}

function formatPrice(price: number, symbol: string = "$"): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

export function CartItemRow({
  item,
  currencySymbol = "$",
  onIncrement,
  onDecrement,
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
            alt={item.productName}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "var(--t-surface)" }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="28" height="28" rx="6" fill="var(--t-border)" />
            </svg>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 min-w-0 py-0.5">
        <p
          className="line-clamp-1 text-sm font-semibold"
          style={{ color: "var(--t-text-primary)", lineHeight: "20px", margin: 0 }}
        >
          {item.productName}
        </p>

        {item.description && (
          <p
            className="line-clamp-1 text-xs font-normal"
            style={{ color: "var(--t-text-muted)", lineHeight: "16px", margin: "2px 0 0 0" }}
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

          <div
            className="inline-flex items-center gap-2"
            style={{
              backgroundColor: "var(--t-icon-pill-bg)",
              borderRadius: "var(--t-radius-button)",
              padding: "3px 4px",
              height: "30px",
            }}
          >
            <button
              type="button"
              aria-label="Disminuir cantidad"
              className="flex items-center justify-center"
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: "var(--t-section-bg)",
                border: "1px solid var(--t-border-input)",
                cursor: "pointer",
              }}
              onClick={onDecrement}
            >
              <Minus size={10} strokeWidth={2} color="var(--t-primary)" />
            </button>

            <span
              className="text-xs font-semibold text-center"
              style={{
                color: "var(--t-text-primary)",
                lineHeight: "20px",
                minWidth: "16px",
              }}
            >
              {String(item.quantity).padStart(2, "0")}
            </span>

            <button
              type="button"
              aria-label="Aumentar cantidad"
              className="flex items-center justify-center"
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: "var(--t-primary)",
                border: "none",
                cursor: "pointer",
              }}
              onClick={onIncrement}
            >
              <Plus size={10} strokeWidth={2} color="#FFFFFF" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
