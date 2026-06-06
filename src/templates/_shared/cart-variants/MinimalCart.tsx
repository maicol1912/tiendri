"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, X, Star, ShoppingBag } from "lucide-react";
import type { CartPageProps } from "./types";

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function MinimalQuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
}: {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  const isMin = quantity <= 1;
  const isMax = quantity >= 99;

  return (
    <div
      className="inline-flex items-center gap-2 px-2 h-9 rounded-[var(--t-radius-button)]"
      style={{ backgroundColor: "var(--t-secondary)" }}
      role="group"
      aria-label="Cantidad"
    >
      <button
        type="button"
        className="w-7 h-7 flex items-center justify-center rounded-full transition-opacity active:scale-95 disabled:opacity-40"
        style={{ backgroundColor: "var(--t-primary)" }}
        onClick={onDecrement}
        disabled={isMin}
        aria-label="Disminuir cantidad"
      >
        <Minus size={12} strokeWidth={3} style={{ color: "var(--t-button-text)" }} />
      </button>

      <span
        className="min-w-[24px] text-center select-none"
        style={{
          fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
          fontSize: "14px",
          fontWeight: 600,
          color: "var(--t-text-primary)",
          letterSpacing: "-0.32px",
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {quantity}
      </span>

      <button
        type="button"
        className="w-7 h-7 flex items-center justify-center rounded-full transition-opacity active:scale-95 disabled:opacity-40"
        style={{ backgroundColor: "var(--t-primary)" }}
        onClick={onIncrement}
        disabled={isMax}
        aria-label="Aumentar cantidad"
      >
        <Plus size={12} strokeWidth={3} style={{ color: "var(--t-button-text)" }} />
      </button>
    </div>
  );
}

function MinimalCartItemRow({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: {
  item: CartPageProps["items"][number];
  onIncrement?: (productId: string) => void;
  onDecrement?: (productId: string) => void;
  onRemove?: (productId: string) => void;
}) {
  return (
    <div
      className="flex gap-3 py-4"
      style={{ borderBottom: "1px solid var(--t-border-mid)" }}
    >
      <div
        className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
        style={{ backgroundColor: "var(--t-card-bg)" }}
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
            style={{ backgroundColor: "var(--t-surface)" }}
          >
            <span className="text-[var(--t-text-muted)] text-xs">Sin img</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        {item.rating !== undefined && (
          <div className="flex items-center gap-1">
            <Star size={10} fill="var(--t-rating-star)" style={{ color: "var(--t-rating-star)" }} />
            <span
              className="text-[var(--t-text-muted)]"
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

        <p
          className="text-[var(--t-text-primary)] line-clamp-2 leading-tight"
          style={{
            fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "-0.28px",
          }}
        >
          {item.name}
        </p>

        <p
          className="text-[var(--t-text-primary)] font-bold"
          style={{
            fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
            fontSize: "15px",
            fontWeight: 700,
          }}
        >
          {formatPrice(item.price * item.quantity)}
        </p>

        <div className="flex items-center justify-between mt-1">
          <MinimalQuantityStepper
            quantity={item.quantity}
            onIncrement={() => onIncrement?.(item.productId)}
            onDecrement={() => onDecrement?.(item.productId)}
          />

          <button
            type="button"
            className="flex items-center justify-center w-7 h-7 rounded-full transition-opacity hover:opacity-80"
            style={{ backgroundColor: "var(--t-surface)" }}
            onClick={() => onRemove?.(item.productId)}
            aria-label={`Eliminar ${item.name}`}
          >
            <X size={13} strokeWidth={2} className="text-[var(--t-text-secondary)]" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MinimalCartSummary({
  subtotal,
  discount = 0,
  onCheckout,
  onContinueShopping,
}: {
  subtotal: number;
  discount?: number;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
}) {
  const [voucher, setVoucher] = useState("");
  const total = subtotal - discount;

  return (
    <div
      className="rounded-[var(--t-radius-card)] p-5 flex flex-col gap-4"
      style={{ backgroundColor: "var(--t-border-light)" }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-[var(--t-radius-button)]"
        style={{ backgroundColor: "var(--t-surface)" }}
      >
        <input
          type="text"
          value={voucher}
          onChange={(e) => setVoucher(e.target.value)}
          placeholder="Código de descuento"
          className="flex-1 bg-transparent outline-none text-[var(--t-text-primary)] placeholder:text-[var(--t-text-muted)]"
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

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span
            className="text-[var(--t-text-secondary)]"
            style={{
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "14px",
            }}
          >
            Subtotal
          </span>
          <span
            className="text-[var(--t-text-primary)] font-medium"
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
              className="text-[var(--t-text-secondary)]"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "14px",
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
          style={{ borderTop: "1px solid var(--t-border-mid)" }}
        >
          <span
            className="text-[var(--t-text-primary)] font-semibold"
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

      <button
        type="button"
        className="w-full py-4 rounded-[var(--t-radius-button)] font-bold transition-opacity hover:opacity-90 active:scale-95 mt-1"
        style={{
          backgroundColor: "var(--t-button-bg)",
          color: "var(--t-button-text)",
          fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
          fontSize: "14px",
          fontWeight: 700,
          letterSpacing: "0.04em",
        }}
        onClick={onCheckout}
      >
        IR AL CHECKOUT
      </button>

      <button
        type="button"
        className="w-full py-2.5 rounded-[var(--t-radius-button)] transition-opacity hover:opacity-80"
        style={{
          backgroundColor: "transparent",
          color: "var(--t-text-secondary)",
          fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
          fontSize: "13px",
          fontWeight: 500,
          border: "1px solid var(--t-border-mid)",
          letterSpacing: "-0.26px",
        }}
        onClick={onContinueShopping}
      >
        Seguir comprando
      </button>
    </div>
  );
}

export function MinimalCart({
  items,
  subtotal,
  discount = 0,
  buttonStyle: _buttonStyle,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
  onContinueShopping,
}: CartPageProps) {
  const isEmpty = items.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6">
      <h1
        className="text-[var(--t-text-primary)] mb-6"
        style={{
          fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
          fontSize: "26px",
          fontWeight: 700,
          letterSpacing: "-0.78px",
        }}
      >
        Carrito
      </h1>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-20 gap-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--t-surface)" }}
          >
            <ShoppingBag size={32} strokeWidth={1.5} className="text-[var(--t-text-muted)]" />
          </div>
          <div className="text-center">
            <p
              className="text-[var(--t-text-primary)] font-semibold"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Tu carrito está vacío
            </p>
            <p
              className="mt-2 text-[var(--t-text-muted)]"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "14px",
              }}
            >
              Agrega productos para continuar
            </p>
          </div>
          <button
            type="button"
            className="px-6 py-3.5 rounded-[var(--t-radius-button)] font-bold transition-opacity hover:opacity-90 border"
            style={{
              backgroundColor: "var(--t-button-bg)",
              color: "var(--t-button-text)",
              fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
              fontSize: "14px",
              fontWeight: 700,
              borderColor: "var(--t-border-mid)",
            }}
            onClick={onContinueShopping}
          >
            Ver catálogo
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <div className="flex-1 lg:w-[60%]">
            {items.map((item) => (
              <MinimalCartItemRow
                key={item.productId}
                item={item}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onRemove={onRemove}
              />
            ))}
          </div>

          <div className="mt-6 lg:mt-0 lg:w-[40%] lg:flex-shrink-0">
            <MinimalCartSummary
              subtotal={subtotal}
              discount={discount}
              onCheckout={onCheckout}
              onContinueShopping={onContinueShopping}
            />
          </div>
        </div>
      )}
    </div>
  );
}
