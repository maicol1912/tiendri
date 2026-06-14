"use client";

// Furniture Dark — CartSummary
// Voucher input (dark pill) + subtotal + discount + total in yellow
// ALL colors via var(--t-*)

import { useState } from "react";
import { formatPriceCurrency as formatPrice } from "@/lib/format";

interface CartSummaryProps {
  subtotal: number;
  discount?: number;
  onCheckout: () => void;
  onContinueShopping?: () => void;
}

export function CartSummary({ subtotal, discount = 0, onCheckout, onContinueShopping }: CartSummaryProps) {
  const [voucher, setVoucher] = useState("");
  const total = subtotal - discount;

  return (
    <div
      className="rounded-[var(--t-radius-card)] p-5 flex flex-col gap-4"
      style={{ backgroundColor: "var(--t-border)" }}
    >
      {/* Voucher input */}
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-[var(--t-radius-button)]"
        style={{ backgroundColor: "var(--t-surface)" }}
      >
        <input
          type="text"
          value={voucher}
          onChange={(e) => setVoucher(e.target.value)}
          placeholder="Código de descuento"
          className="flex-1 bg-transparent outline-none text-[var(--t-foreground)] placeholder:text-[var(--t-muted)]"
          style={{
            fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
            fontSize: "14px",
          }}
        />
        <button
          type="button"
          className="text-[var(--t-primary)] font-semibold text-sm flex-shrink-0"
          style={{ fontFamily: "var(--font-body, 'Urbanist', sans-serif)" }}
          aria-label="Aplicar código"
        >
          Aplicar
        </button>
      </div>

      {/* Line items */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "14px",
              color: "var(--t-text-secondary)",
            }}
          >
            Subtotal
          </span>
          <span
            className="text-[var(--t-foreground)] font-medium"
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            {formatPrice(subtotal)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "14px",
                color: "var(--t-text-secondary)",
              }}
            >
              Descuento
            </span>
            <span
              className="font-medium"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--t-primary)",
              }}
            >
              -{formatPrice(discount)}
            </span>
          </div>
        )}

        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid var(--t-border)" }}
        >
          <span
            className="text-[var(--t-foreground)] font-semibold"
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            Total
          </span>
          <span
            className="font-bold"
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--t-primary)",
            }}
          >
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Checkout button */}
      <button
        type="button"
        className="w-full py-4 rounded-[var(--t-radius-button)] font-bold transition-opacity hover:opacity-90 active:scale-95 mt-1"
        style={{
          backgroundColor: "var(--t-primary)",
          color: "var(--t-on-primary)",
          fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
          fontSize: "14px",
          fontWeight: 700,
          letterSpacing: "0.04em",
        }}
        onClick={onCheckout}
      >
        IR AL CHECKOUT
      </button>

      {/* Seguir comprando */}
      <button
        type="button"
        className="w-full py-2.5 rounded-[var(--t-radius-button)] transition-opacity hover:opacity-80"
        style={{
          backgroundColor: "transparent",
          color: "var(--t-muted)",
          fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
          fontSize: "13px",
          fontWeight: 500,
          border: "1px solid var(--t-border)",
          letterSpacing: "-0.26px",
        }}
        onClick={onContinueShopping}
      >
        Seguir comprando
      </button>
    </div>
  );
}
