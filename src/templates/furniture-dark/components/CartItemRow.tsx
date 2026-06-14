// Furniture Dark — CartItemRow
// 80×80 thumbnail + name + rating + price + QuantityStepper + remove
// ALL colors via var(--t-*)

import Image from "next/image";
import { X, Star } from "lucide-react";
import type { CartItem } from "@/lib/cart";
import { QuantityStepper } from "@/components/shared/QuantityStepper";
import { formatPriceCurrency as formatPrice } from "@/lib/format";

interface CartItemRowProps {
  item: CartItem;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export function CartItemRow({ item, onIncrement, onDecrement, onRemove }: CartItemRowProps) {
  return (
    <div
      className="flex gap-3 py-4"
      style={{ borderBottom: "1px solid var(--t-border)" }}
    >
      {/* Thumbnail */}
      <div
        className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
        style={{ backgroundColor: "var(--t-card)" }}
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="80px"
            className="object-contain p-1"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "var(--t-card)" }}
          >
            <span className="text-[var(--t-muted)] text-xs">Sin img</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        {/* Rating */}
        {item.rating !== undefined && (
          <div className="flex items-center gap-1">
            <Star size={10} fill="var(--t-accent)" style={{ color: "var(--t-accent)" }} />
            <span
              className="text-[var(--t-muted)]"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              {item.rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Name */}
        <p
          className="text-[var(--t-foreground)] line-clamp-2 leading-tight"
          style={{
            fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "-0.28px",
          }}
        >
          {item.name}
        </p>

        {/* Price */}
        <p
          className="text-[var(--t-foreground)] font-bold"
          style={{
            fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
            fontSize: "15px",
            fontWeight: 700,
          }}
        >
          {formatPrice(item.price * item.quantity)}
        </p>

        {/* Stepper row */}
        <div className="flex items-center justify-between mt-1">
          <QuantityStepper
            quantity={item.quantity}
            onIncrement={() => onIncrement(item.productId)}
            onDecrement={() => onDecrement(item.productId)}
            size="sm"
          />

          {/* Remove */}
          <button
            type="button"
            className="flex items-center justify-center w-7 h-7 rounded-full transition-opacity hover:opacity-80"
            style={{ backgroundColor: "var(--t-surface)" }}
            onClick={() => onRemove(item.productId)}
            aria-label={`Eliminar ${item.name}`}
          >
            <X size={13} strokeWidth={2} className="text-[var(--t-muted)]" />
          </button>
        </div>
      </div>
    </div>
  );
}
