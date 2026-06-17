// Fashion Template — Cart Item Row
// Product image with X close button, name, variant, price, quantity stepper + refresh.
// Monochromatic B&W. All colors via var(--t-*). ZERO hardcoded hex.

import Image from "next/image";
import { Minus, Plus, X, RotateCw } from "lucide-react";
import type { CartItem } from "../types";

const fmt = new Intl.NumberFormat("es-CO");

interface CartItemRowProps {
  item: CartItem;
  currencySymbol?: string;
  onRemove?: (productId: string) => void;
  onIncrement?: (productId: string) => void;
  onDecrement?: (productId: string) => void;
}

export function CartItemRow({
  item,
  currencySymbol = "$",
  onRemove,
  onIncrement,
  onDecrement,
}: CartItemRowProps) {
  const lineTotal = `${currencySymbol}${fmt.format(item.price * item.quantity)}`;

  return (
    <div className="flex gap-4">
      {/* Product photo with X close */}
      <div className="relative flex-shrink-0">
        <div className="relative border border-[var(--t-border)] overflow-hidden w-[140px] h-[170px] md:w-[180px] md:h-[214px]">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 140px, 180px"
            />
          ) : (
            <div className="w-full h-full bg-[var(--t-background)] flex items-center justify-center">
              <span className="text-[var(--t-muted)] text-[10px]">
                IMG
              </span>
            </div>
          )}
        </div>
        {/* X close button */}
        <button
          type="button"
          className="absolute top-2 right-2 w-6 h-6 bg-[var(--t-surface)]/80 flex items-center justify-center transition-opacity hover:opacity-60 border-0 cursor-pointer"
          onClick={() => onRemove?.(item.productId)}
          aria-label={`Eliminar ${item.name}`}
        >
          <X
            size={14}
            strokeWidth={1.5}
            className="text-[var(--t-foreground)]"
          />
        </button>
      </div>

      {/* Product info + controls */}
      <div className="flex-1 min-w-0 py-1">
        <p
          className="leading-tight text-xs md:text-sm text-[var(--t-muted)]"
          style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)", fontWeight: 400 }}
        >
          {item.name}
        </p>
        {item.variantName && (
          <p
            className="leading-tight text-[13px] md:text-sm font-semibold text-[var(--t-foreground)]"
            style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
          >
            {item.variantName}
          </p>
        )}
        <p
          className="mt-1 text-sm md:text-base font-medium text-[var(--t-foreground)]"
          style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
        >
          {lineTotal}
        </p>

        {/* Quantity controls + refresh */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center border border-[var(--t-border)]">
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-[var(--t-secondary)] border-0 cursor-pointer bg-transparent"
              onClick={() => onDecrement?.(item.productId)}
              aria-label="Reducir cantidad"
            >
              <Minus size={12} strokeWidth={1.5} className="text-[var(--t-foreground)]" />
            </button>
            <span
              className="w-8 text-center text-[13px] font-medium text-[var(--t-foreground)] border-x border-[var(--t-border)]"
              style={{
                fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                lineHeight: "32px",
              }}
            >
              {item.quantity}
            </span>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-[var(--t-secondary)] border-0 cursor-pointer bg-transparent"
              onClick={() => onIncrement?.(item.productId)}
              aria-label="Aumentar cantidad"
            >
              <Plus size={12} strokeWidth={1.5} className="text-[var(--t-foreground)]" />
            </button>
          </div>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center border border-[var(--t-border)] transition-opacity hover:opacity-60 bg-transparent cursor-pointer"
            aria-label="Actualizar"
          >
            <RotateCw
              size={14}
              strokeWidth={1.5}
              className="text-[var(--t-muted)]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
