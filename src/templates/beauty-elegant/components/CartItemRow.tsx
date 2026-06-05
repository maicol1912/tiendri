"use client";

// Beauty Elegant Template — Cart Item Row
// Glassmorphic purple tint card. Thumbnail + name + price + quantity counter.

import Image from "next/image";
import { QuantityStepper } from "./QuantityStepper";
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

          <QuantityStepper
            quantity={item.quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        </div>
      </div>
    </div>
  );
}
