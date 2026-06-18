"use client";

// _core/pages/CoreCartPage.tsx
// Layout estructural del carrito.
// Lista de ítems + resumen del pedido + botón de checkout.
// NO gestiona estado — todo viene como props del shell.

import React, { memo } from "react";
import Image from "next/image";
import { ChevronLeft, Minus, Plus, Trash2 } from "lucide-react";
import { resolveStyleTokens } from "./style-tokens";
import { formatPrice } from "@/lib/format";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { CartItem } from "@/types/cart";

interface CoreCartPageProps {
  config: ResolvedStoreConfig;
  items: CartItem[];
  totalPrice: number;
  currencySymbol?: string;
  updateQuantity: (productId: string, delta: number, variantName?: string | null) => void;
  removeItem: (productId: string, variantName?: string | null) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export const CoreCartPage = memo(function CoreCartPage({
  config,
  items,
  totalPrice,
  currencySymbol = "$",
  updateQuantity,
  removeItem,
  onCheckout,
  onContinueShopping,
}: CoreCartPageProps) {
  const { buttonClass } = resolveStyleTokens(config);
  const isEmpty = items.length === 0;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      {/* ── Header móvil con botón volver ─────────────────────────────── */}
      <header
        className="md:hidden sticky top-0 z-30"
        style={{
          backgroundColor: "var(--t-background)",
          borderBottom: "1px solid var(--t-border)",
        }}
      >
        <div className="flex items-center gap-3 px-4 h-14 relative">
          <button
            type="button"
            onClick={onContinueShopping}
            className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0"
            style={{ background: "var(--t-background)", border: "1px solid var(--t-border)", cursor: "pointer" }}
            aria-label="Volver"
          >
            <ChevronLeft size={20} style={{ color: "var(--t-foreground)" }} aria-hidden="true" />
          </button>
          <p
            className="absolute left-1/2 -translate-x-1/2 text-base font-bold"
            style={{ color: "var(--t-foreground)", margin: 0 }}
          >
            Mi carrito
          </p>
        </div>
      </header>

      <main
        className="flex-1 max-w-5xl mx-auto w-full px-4 md:px-6 pt-5"
        style={{
          paddingBottom: isEmpty
            ? "24px"
            : "calc(260px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        {/* ── Estado vacío ─────────────────────────────────────────────── */}
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: "var(--t-background)", border: "1px solid var(--t-border)" }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                  stroke="var(--t-primary)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                  stroke="var(--t-primary)"
                  strokeWidth="1.75"
                />
                <path
                  d="M16 10a4 4 0 0 1-8 0"
                  stroke="var(--t-primary)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-base font-semibold" style={{ color: "var(--t-foreground)", margin: 0 }}>
                Tu carrito está vacío
              </p>
              <p className="text-sm" style={{ color: "var(--t-muted)", margin: 0 }}>
                Agrega productos para continuar
              </p>
            </div>
            <button
              type="button"
              onClick={onContinueShopping}
              className={`px-6 py-3 text-sm font-semibold ${buttonClass}`}
              style={{ borderRadius: "var(--t-radius-button, 9999px)", cursor: "pointer" }}
            >
              Ver productos
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* ── Lista de ítems ─────────────────────────────────────── */}
            <div className="flex-1 flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.variantName ?? ""}`}
                  className="flex items-center gap-3 p-3"
                  style={{
                    background: "var(--t-background)",
                    borderRadius: "var(--t-radius-card, 16px)",
                    border: "1px solid var(--t-border)",
                  }}
                >
                  {/* Imagen */}
                  <div
                    className="relative w-16 h-16 flex-shrink-0 overflow-hidden"
                    style={{
                      borderRadius: "var(--t-radius-card, 12px)",
                      background: "var(--t-background)",
                    }}
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain"
                        sizes="64px"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ color: "var(--t-border)" }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <p
                      className="text-sm font-bold truncate"
                      style={{ color: "var(--t-foreground)", margin: 0 }}
                    >
                      {item.name}
                    </p>
                    {item.variantName && (
                      <p
                        className="text-xs truncate"
                        style={{ color: "var(--t-muted)", margin: 0 }}
                      >
                        {item.variantName}
                      </p>
                    )}
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--t-primary)", margin: 0 }}
                    >
                      {formatPrice(item.price * item.quantity, currencySymbol)}
                    </p>
                  </div>

                  {/* Control de cantidad + trash */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId, item.variantName)}
                      aria-label={`Eliminar ${item.name}`}
                      className="p-1"
                      style={{ background: "transparent", border: "none", cursor: "pointer" }}
                    >
                      <Trash2
                        size={14}
                        style={{ color: "var(--t-muted)" }}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      className="flex items-center"
                      style={{
                        background: "var(--t-foreground)",
                        borderRadius: "9999px",
                        overflow: "hidden",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, -1, item.variantName)}
                        disabled={item.quantity <= 1}
                        className="w-7 h-7 flex items-center justify-center disabled:opacity-40"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--t-background)",
                        }}
                        aria-label="Disminuir cantidad"
                      >
                        <Minus size={12} aria-hidden="true" />
                      </button>
                      <span
                        className="w-7 text-center text-xs font-semibold"
                        style={{ color: "var(--t-background)" }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, 1, item.variantName)}
                        className="w-7 h-7 flex items-center justify-center"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--t-background)",
                        }}
                        aria-label="Aumentar cantidad"
                      >
                        <Plus size={12} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Resumen desktop ──────────────────────────────────────── */}
            <aside
              className="hidden lg:flex flex-col w-[360px] flex-shrink-0 sticky self-start"
              style={{ top: "80px" }}
            >
              <div
                className="flex flex-col gap-4 p-6"
                style={{
                  background: "var(--t-background)",
                  borderRadius: "var(--t-radius-card, 16px)",
                  border: "1px solid var(--t-border)",
                }}
              >
                <h2 className="sr-only">Resumen del pedido</h2>

                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold" style={{ color: "var(--t-foreground)" }}>
                    Total
                  </span>
                  <span className="text-lg font-bold" style={{ color: "var(--t-foreground)" }}>
                    {formatPrice(totalPrice, currencySymbol)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onCheckout}
                  className="w-full py-3.5 text-sm font-bold"
                  style={{
                    background: "var(--t-primary)",
                    color: "var(--t-on-primary)",
                    borderRadius: "9999px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Finalizar pedido
                </button>

                <button
                  type="button"
                  onClick={onContinueShopping}
                  className="w-full py-3 text-sm font-medium"
                  style={{
                    background: "transparent",
                    color: "var(--t-foreground)",
                    borderRadius: "9999px",
                    border: "1px solid var(--t-border)",
                    cursor: "pointer",
                  }}
                >
                  Seguir comprando
                </button>
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* ── Barra de checkout fija (mobile) ──────────────────────────────── */}
      {!isEmpty && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
          style={{
            paddingBottom: "calc(70px + env(safe-area-inset-bottom, 0px))",
            borderTop: "1px solid var(--t-border)",
            backgroundColor: "var(--t-background)",
          }}
        >
          <div className="max-w-5xl mx-auto px-4 pt-3 pb-2 flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-sm font-semibold" style={{ color: "var(--t-foreground)" }}>
                Total
              </span>
              <span className="text-base font-bold" style={{ color: "var(--t-foreground)" }}>
                {formatPrice(totalPrice, currencySymbol)}
              </span>
            </div>
            <button
              type="button"
              onClick={onCheckout}
              className={`w-full py-3.5 text-base font-bold ${buttonClass}`}
              style={{
                borderRadius: "var(--t-radius-button, 9999px)",
                cursor: "pointer",
              }}
            >
              Finalizar pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
});
