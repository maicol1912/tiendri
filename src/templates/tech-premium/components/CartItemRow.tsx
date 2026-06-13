// Tech Premium Template — Cart Item Row
// Renders: product image, name, SKU, quantity stepper (+/-), line total, remove button.
// Visual only — callbacks come as props.

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import type { CartItem } from "../types";

export interface CartItemRowProps {
  item: CartItem;
  currencySymbol?: string;
  isLast?: boolean;
  onIncrement?: (productId: string) => void;
  onDecrement?: (productId: string) => void;
  onRemove?: (productId: string) => void;
}

export function CartItemRow({
  item,
  currencySymbol = "$",
  isLast = false,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemRowProps) {
  const fmt = (price: number) =>
    `${currencySymbol}${new Intl.NumberFormat("en-US").format(price)}`;

  return (
    <div
      className={`flex gap-4 items-center py-4 ${
        !isLast ? "border-b border-[var(--t-border)]/50 pb-8" : ""
      }`}
    >
      {/* Product image */}
      <div className="relative w-[90px] h-[90px] shrink-0">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-contain"
            sizes="90px"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[var(--t-card)] rounded" />
        )}
      </div>

      {/* Info + controls */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-0 flex-1 min-w-0">
        {/* Name + SKU */}
        <div className="flex flex-col gap-2 flex-1 min-w-[106px]">
          <p className="text-base font-medium text-[var(--t-foreground)] line-clamp-2">{item.name}</p>
          <p className="text-sm text-[var(--t-foreground)]">
            #{item.productId.replace(/\D/g, "").slice(0, 14) || "00000000"}
          </p>
        </div>

        {/* Quantity + Price + Remove */}
        <div className="flex items-center gap-6 justify-end">
          {/* Quantity stepper */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-6 h-6 flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
              onClick={() => onDecrement?.(item.productId)}
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-4 h-4 text-[var(--t-foreground)]" />
            </button>
            <div className="border border-[var(--t-border)]/50 rounded px-4 py-2 min-w-[32px] text-center">
              <span className="text-base font-medium text-[var(--t-foreground)]">{item.quantity}</span>
            </div>
            <button
              type="button"
              className="w-6 h-6 flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
              onClick={() => onIncrement?.(item.productId)}
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-4 h-4 text-[var(--t-foreground)]" />
            </button>
          </div>

          {/* Price */}
          <span className="text-xl font-medium text-[var(--t-foreground)] tracking-[0.6px] whitespace-nowrap">
            {fmt(item.price * item.quantity)}
          </span>

          {/* Remove */}
          <button
            type="button"
            className="w-6 h-6 flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
            onClick={() => onRemove?.(item.productId)}
            aria-label={`Eliminar ${item.name} del carrito`}
          >
            <X className="w-5 h-5 text-[var(--t-foreground)]" />
          </button>
        </div>
      </div>
    </div>
  );
}
