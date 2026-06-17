// Furniture Light — Cart Item Row
// Bordered card: image + name + variant + price + delete + quantity stepper.
// ZERO hardcoded colors — all via var(--t-*).

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { QuantityStepper } from "@/components/shared/QuantityStepper";
import type { CartItem } from "@/lib/cart";

interface CartItemRowProps {
  item: CartItem;
  currencySymbol?: string;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onRemove?: () => void;
}

function fmt(price: number, symbol: string): string {
  return `${symbol}${new Intl.NumberFormat("es-CO").format(price)}`;
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
      className="flex gap-3 p-3"
      style={{
        borderRadius: "var(--t-radius-card)",
        border: "1px solid var(--t-border)",
        backgroundColor: "var(--t-background)",
      }}
    >
      {/* Image */}
      <div
        className="relative shrink-0 overflow-hidden"
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "var(--t-radius-card)",
          backgroundColor: "var(--t-card)",
        }}
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-contain p-1.5"
            sizes="72px"
          />
        ) : (
          <div className="absolute inset-0 bg-[var(--t-card)]" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--t-foreground)] line-clamp-2 leading-tight">{item.name}</p>
        {item.variantName && (
          <p className="text-xs text-[var(--t-muted)] mt-0.5">{item.variantName}</p>
        )}
        <p className="text-sm font-bold text-[var(--t-primary)] mt-1">
          {fmt(item.price * item.quantity, currencySymbol)}
        </p>
      </div>

      {/* Qty controls */}
      <div className="flex flex-col items-end justify-between shrink-0">
        <button
          onClick={onRemove}
          aria-label={`Eliminar ${item.name}`}
          className="text-[var(--t-muted)] hover:text-[var(--t-primary)] transition-colors"
        >
          <Trash2 size={14} />
        </button>
        <QuantityStepper
          quantity={item.quantity}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      </div>
    </div>
  );
}
