"use client";

// Food Night — Cart Item Row
// Thumbnail + name + size label + rating + QuantityStepper + delete button

import Image from "next/image";
import { Trash2, Star } from "lucide-react";
import { QuantityStepper } from "@/components/shared/QuantityStepper";
import type { CartItem } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

interface CartItemRowProps {
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
  const lineTotal = item.price * item.quantity;

  return (
    <article
      className="flex items-start gap-3 py-4"
      style={{ borderBottom: "1px solid var(--t-border-mid)" }}
      aria-label={`Producto: ${item.name}`}
    >
      {/* Thumbnail */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{
          width: 68,
          height: 68,
          borderRadius: "var(--t-radius-card)",
          backgroundColor: "var(--t-card)",
        }}
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="68px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span style={{ fontSize: 28, opacity: 0.4 }} aria-hidden="true">🍕</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p
          className="text-[13px] font-semibold leading-snug truncate"
          style={{ color: "var(--t-foreground)" }}
        >
          {item.name}
        </p>

        {item.variantName && (
          <p className="text-[11px] font-normal" style={{ color: "var(--t-muted)" }}>
            Tamaño: {item.variantName}
          </p>
        )}

        {(item.rating ?? 0) > 0 && (
          <div className="flex items-center gap-1">
            <Star
              size={11}
              strokeWidth={0}
              fill="var(--t-accent)"
              style={{ color: "var(--t-accent)" }}
            />
            <span className="text-[11px] font-medium" style={{ color: "var(--t-muted)" }}>
              {(item.rating ?? 0).toFixed(1)}
            </span>
            {(item.reviewCount ?? 0) > 0 && (
              <span className="text-[11px] font-normal" style={{ color: "var(--t-muted)" }}>
                ({new Intl.NumberFormat("es-CO").format(item.reviewCount ?? 0)})
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <QuantityStepper
            quantity={item.quantity}
            onDecrement={() => onDecrement?.(item.productId)}
            onIncrement={() => onIncrement?.(item.productId)}
            size="sm"
          />
          <span className="text-[14px] font-bold" style={{ color: "var(--t-foreground)" }}>
            {formatPrice(lineTotal, currencySymbol)}
          </span>
        </div>
      </div>

      {/* Delete */}
      <button
        type="button"
        onClick={() => onRemove?.(item.productId)}
        className="flex-shrink-0 flex items-center justify-center transition-opacity hover:opacity-60 mt-1"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: "var(--t-card)",
          border: "none",
          cursor: "pointer",
        }}
        aria-label={`Eliminar ${item.name} del carrito`}
      >
        <Trash2 size={14} strokeWidth={2} style={{ color: "var(--t-muted)" }} />
      </button>
    </article>
  );
}
