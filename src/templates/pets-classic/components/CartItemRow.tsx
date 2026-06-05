"use client";

// Pets Classic — Cart Item Row
// Renders: product image, name, price, qty stepper, line total, remove button.
// Visual only — callbacks come as props.

import Image from "next/image";
import { Trash2 } from "lucide-react";
import type { CartItem } from "../types";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US").format(price);
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
    <div
      className="flex items-center gap-3 p-3"
      style={{
        borderRadius: "var(--t-radius-card)",
        border: "1px solid var(--t-border)",
        backgroundColor: "var(--t-card-bg)",
      }}
    >
      {/* Image */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: 80,
          height: 80,
          borderRadius: "var(--t-radius-card)",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: "var(--t-surface)" }} />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--t-text-primary)",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {item.name}
        </p>
        <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--t-primary)", marginTop: 2 }}>
          {currencySymbol}{formatPrice(item.price)}
        </p>

        {/* Qty stepper */}
        <div className="flex items-center gap-2 mt-2">
          <button
            type="button"
            onClick={() => onDecrement?.(item.productId)}
            className="flex items-center justify-center w-6 h-6"
            style={{
              borderRadius: "50%",
              border: "1px solid var(--t-border)",
              background: "none",
              cursor: "pointer",
              color: "var(--t-text-primary)",
              fontSize: "14px",
              fontWeight: 700,
            }}
            aria-label="Disminuir cantidad"
          >
            −
          </button>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--t-text-primary)",
              minWidth: 16,
              textAlign: "center",
            }}
          >
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onIncrement?.(item.productId)}
            className="flex items-center justify-center w-6 h-6"
            style={{
              borderRadius: "50%",
              backgroundColor: "var(--t-primary)",
              border: "none",
              cursor: "pointer",
              color: "var(--t-button-text)",
              fontSize: "14px",
              fontWeight: 700,
            }}
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
      </div>

      {/* Line total + remove */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--t-text-primary)" }}>
          {currencySymbol}{formatPrice(item.price * item.quantity)}
        </p>
        <button
          type="button"
          onClick={() => onRemove?.(item.productId)}
          className="flex items-center justify-center w-7 h-7"
          style={{
            borderRadius: "50%",
            border: "1px solid var(--t-border)",
            background: "none",
            cursor: "pointer",
          }}
          aria-label={`Eliminar ${item.name} del carrito`}
        >
          <Trash2 size={13} style={{ color: "var(--t-text-muted)" }} />
        </button>
      </div>
    </div>
  );
}
