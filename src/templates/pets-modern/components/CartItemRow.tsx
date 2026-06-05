// Pet V3 Template — Cart Item Row
// Renders: product image, name, line total, quantity stepper, remove button.
// Visual only — callbacks come as props.

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "../types";

function formatPrice(price: number, symbol: string): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

export interface CartItemRowProps {
  item: CartItem;
  currencySymbol?: string;
  onIncrement?: (productId: string) => void;
  onDecrement?: (productId: string) => void;
  onRemove?: (productId: string) => void;
}

export function CartItemRow({
  item,
  currencySymbol = "$",
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemRowProps) {
  return (
    <div className="flex items-center gap-4 p-3 border border-[var(--t-border)] rounded-[var(--t-radius-card)]">
      {/* Image */}
      <div className="relative w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] bg-[var(--t-surface)] rounded-[var(--t-radius-button)] overflow-hidden flex-shrink-0">
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-contain p-2"
            sizes="100px"
          />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-[var(--t-text-primary)] text-sm font-medium line-clamp-2">
          {item.name}
        </h3>
        <p className="text-[var(--t-text-primary)] text-base font-bold mt-1">
          {formatPrice(item.price * item.quantity, currencySymbol)}
        </p>

        {/* Quantity stepper */}
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => onDecrement?.(item.productId)}
            className="w-8 h-8 flex items-center justify-center rounded-[var(--t-radius-button)] border border-[var(--t-border)] text-[var(--t-text-primary)] hover:border-[var(--t-primary)] transition-colors"
            aria-label="Disminuir"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="text-[var(--t-text-primary)] text-sm font-medium w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => onIncrement?.(item.productId)}
            className="w-8 h-8 flex items-center justify-center rounded-[var(--t-radius-button)] border border-[var(--t-border)] text-[var(--t-text-primary)] hover:border-[var(--t-primary)] transition-colors"
            aria-label="Aumentar"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={() => onRemove?.(item.productId)}
        className="p-2 text-[var(--t-text-muted)] hover:text-red-500 transition-colors flex-shrink-0"
        aria-label="Eliminar producto"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
