// Decor Warm Template — Cart Page (Presentational)
// Item list with 66px linen thumbnails + QuantityStepper.
// Price breakdown: Subtotal / Envío / Total.
// Full-width peach pill CTA at bottom.
// ZERO hardcoded colors — all via var(--t-*).

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { QuantityStepper } from "./QuantityStepper";
import { BottomNav } from "./BottomNav";
import type { CartItem } from "../context/CartContext";
import type { DecorWarmNavTab } from "../types";

function formatPrice(price: number, symbol = "$") {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

function CartItemRow({
  item,
  currencySymbol = "$",
  onIncrement,
  onDecrement,
  onRemove,
}: {
  item: CartItem;
  currencySymbol?: string;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onRemove?: () => void;
}) {
  return (
    <div
      className="flex items-center gap-3"
      style={{
        paddingTop: 12,
        paddingBottom: 12,
        borderBottom: "1px solid var(--t-border)",
      }}
    >
      {/* Thumbnail — 66px linen bg */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{
          width: 66,
          height: 66,
          borderRadius: "var(--t-radius-category)",
          backgroundColor: "var(--t-surface)",
        }}
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="66px"
            className="object-contain p-1.5"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="var(--t-border)" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p
          className="line-clamp-2 m-0"
          style={{
            color: "var(--t-text-secondary)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          {item.name}
        </p>
        <span
          style={{
            color: "var(--t-primary)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          {formatPrice(item.price, currencySymbol)}
        </span>
      </div>

      {/* Stepper + remove */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <QuantityStepper
          quantity={item.quantity}
          min={1}
          max={99}
          onChange={(v) => {
            if (v >= item.quantity) onIncrement?.();
            else onDecrement?.();
          }}
          size="sm"
        />
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--t-text-muted)",
              fontFamily: "'League Spartan', sans-serif",
              fontSize: "11px",
              padding: 0,
            }}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}

interface CartPageProps {
  items: CartItem[];
  totalPrice: number;
  currencySymbol?: string;
  onBack?: () => void;
  onGoHome?: () => void;
  onCheckout?: () => void;
  onIncrement?: (productId: string) => void;
  onDecrement?: (productId: string) => void;
  onRemove?: (productId: string) => void;
  onTabChange?: (tab: DecorWarmNavTab) => void;
}

export function CartPage({
  items,
  totalPrice,
  currencySymbol = "$",
  onBack,
  onGoHome,
  onCheckout,
  onIncrement,
  onDecrement,
  onRemove,
  onTabChange,
}: CartPageProps) {
  const isEmpty = items.length === 0;
  const TAX_RATE = 0;
  const DELIVERY = 0;
  const subtotal = totalPrice;
  const total = subtotal + TAX_RATE + DELIVERY;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--t-background)" }}>
      {/* ── Header ── */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 py-3"
        style={{
          backgroundColor: "var(--t-header-bg)",
          borderBottom: "1px solid var(--t-nav-border)",
        }}
      >
        <button
          type="button"
          className="flex items-center justify-center"
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            backgroundColor: "var(--t-surface)",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Volver"
          onClick={onBack}
        >
          <ArrowLeft size={18} style={{ color: "var(--t-dark-mode)" }} />
        </button>

        <span
          style={{
            color: "var(--t-dark-mode)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          Mi carrito
        </span>

        <div style={{ width: 38 }} aria-hidden="true" />
      </div>

      {/* ── Main ── */}
      <main
        className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-6 pt-4"
        style={{
          paddingBottom: isEmpty
            ? "calc(80px + env(safe-area-inset-bottom, 0px))"
            : "calc(220px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--t-surface)" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                  stroke="var(--t-primary)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line x1="3" y1="6" x2="21" y2="6" stroke="var(--t-primary)" strokeWidth="1.75" />
                <path
                  d="M16 10a4 4 0 0 1-8 0"
                  stroke="var(--t-primary)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p
              style={{
                color: "var(--t-dark-mode)",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Tu carrito está vacío
            </p>
            <p
              style={{
                color: "var(--t-text-muted)",
                fontFamily: "'League Spartan', sans-serif",
                fontSize: "14px",
                margin: 0,
              }}
            >
              Agrega productos para continuar
            </p>
            <button
              type="button"
              style={{
                backgroundColor: "var(--t-peach)",
                color: "#FFFFFF",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "var(--t-radius-button)",
                border: "none",
                cursor: "pointer",
                padding: "12px 28px",
              }}
              onClick={onGoHome}
            >
              Ver productos
            </button>
          </div>
        ) : (
          <div>
            {items.map((item) => (
              <CartItemRow
                key={item.productId}
                item={item}
                currencySymbol={currencySymbol}
                onIncrement={() => onIncrement?.(item.productId)}
                onDecrement={() => onDecrement?.(item.productId)}
                onRemove={() => onRemove?.(item.productId)}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Price breakdown + CTA (fixed bottom) ── */}
      {!isEmpty && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 flex flex-col gap-2 px-4 md:px-6 pt-4"
          style={{
            backgroundColor: "var(--t-background)",
            paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
            borderTop: "1px solid var(--t-border)",
          }}
        >
          {/* Price rows */}
          <div className="flex flex-col gap-1 max-w-3xl mx-auto w-full">
            <div className="flex justify-between">
              <span
                style={{
                  color: "var(--t-text-secondary)",
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  color: "var(--t-dark-mode)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                {formatPrice(subtotal, currencySymbol)}
              </span>
            </div>
            <div className="flex justify-between">
              <span
                style={{
                  color: "var(--t-text-secondary)",
                  fontFamily: "'League Spartan', sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                }}
              >
                Envío
              </span>
              <span
                style={{
                  color: "var(--t-primary)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                Gratis
              </span>
            </div>
            <div className="flex justify-between pt-1" style={{ borderTop: "1px solid var(--t-border)" }}>
              <span
                style={{
                  color: "var(--t-dark-mode)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                Total
              </span>
              <span
                style={{
                  color: "var(--t-primary)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "16px",
                  fontWeight: 700,
                }}
              >
                {formatPrice(total, currencySymbol)}
              </span>
            </div>
          </div>

          {/* Check Out — 207×45px peach pill */}
          <div className="max-w-3xl mx-auto w-full flex justify-center mt-1">
            <button
              type="button"
              style={{
                width: 207,
                height: 45,
                backgroundColor: "var(--t-peach)",
                color: "#FFFFFF",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                borderRadius: "var(--t-radius-button)",
                border: "none",
                cursor: "pointer",
              }}
              onClick={onCheckout}
            >
              Hacer pedido
            </button>
          </div>
        </div>
      )}

      <BottomNav
        activeTab="cart"
        cartItemCount={items.reduce((s, i) => s + i.quantity, 0)}
        onTabChange={onTabChange}
      />
    </div>
  );
}
