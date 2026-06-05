// Electronics Classic — Cart Item Row
// Thumbnail + name + price + qty stepper + remove.
// All colors via var(--t-*). ZERO hardcoded hex.
// Intl.NumberFormat — NEVER toLocaleString().

import Image from "next/image";
import { Trash2 } from "lucide-react";
import type { CartItem } from "../types";
import { QuantityStepper } from "./QuantityStepper";

const fmt = new Intl.NumberFormat("en-US");

interface CartItemRowProps {
  item: CartItem;
  currencySymbol?: string;
  onQuantityChange: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItemRow({
  item,
  currencySymbol = "$",
  onQuantityChange,
  onRemove,
}: CartItemRowProps) {
  const lineTotal = `${currencySymbol}${fmt.format(item.price * item.quantity)}`;
  const unitPrice = `${currencySymbol}${fmt.format(item.price)}`;

  return (
    <article
      className="flex gap-3 py-4 border-b last:border-b-0"
      style={{ borderColor: "var(--t-surface)" }}
      aria-label={item.name}
    >
      {/* Thumbnail */}
      <div
        className="relative w-20 h-20 shrink-0 rounded-[var(--t-radius-card)] overflow-hidden"
        style={{ backgroundColor: "var(--t-surface)" }}
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="80px"
            className="object-contain"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[var(--t-text-muted)] text-xs">Sin imagen</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p className="text-[var(--t-text-primary)] text-sm font-semibold leading-tight line-clamp-2">
          {item.name}
        </p>
        {item.variantName && (
          <p className="text-[var(--t-text-muted)] text-xs">{item.variantName}</p>
        )}
        <p className="text-[var(--t-text-muted)] text-xs">{unitPrice} c/u</p>

        {/* Qty stepper + total + remove */}
        <div className="flex items-center justify-between gap-3 mt-1 flex-wrap">
          {/* Stepper */}
          <QuantityStepper
            productId={item.productId}
            quantity={item.quantity}
            onQuantityChange={onQuantityChange}
          />

          <div className="flex items-center gap-3">
            {/* Line total */}
            <p className="text-[var(--t-primary)] font-bold text-sm">{lineTotal}</p>
            {/* Remove */}
            <button
              onClick={() => onRemove(item.productId)}
              aria-label={`Eliminar ${item.name} del carrito`}
              className="p-1.5 rounded hover:opacity-70 transition-opacity"
              style={{ color: "var(--t-text-muted)" }}
            >
              <Trash2 className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
