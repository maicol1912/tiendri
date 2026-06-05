"use client";

// Pets Classic — Cart Page
// Items list + order summary. TAX 2.5%, DELIVERY $5,000.
// PROCEED TO PAY → checkout. All colors via var(--t-*).

import Image from "next/image";
import { Trash2, ShoppingBag } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import type { PetsClassicConfig } from "../config";
import type { StoreInfo, CartItem, NavTab } from "../types";

const TAX_RATE = 0.025;
const DELIVERY_FEE = 5000;

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US").format(price);
}

interface CartPageProps {
  store: StoreInfo;
  items: CartItem[];
  layout?: PetsClassicConfig["layout"];
  activeTab?: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  onBack?: () => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onMenuClick?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onRemoveItem?: (productId: string) => void;
  onIncrementItem?: (productId: string) => void;
  onDecrementItem?: (productId: string) => void;
  onContinueShopping?: () => void;
  onCheckout?: () => void;
}

export function CartPage({
  store,
  items,
  layout,
  activeTab = "cart",
  cartItemCount = 0,
  currencySymbol = "$",
  onBack,
  onSearchClick,
  onCartClick,
  onMenuClick,
  onTabChange,
  onRemoveItem,
  onIncrementItem,
  onDecrementItem,
  onContinueShopping,
  onCheckout,
}: CartPageProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + (subtotal > 0 ? DELIVERY_FEE : 0);

  const isEmpty = items.length === 0;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--t-background)", fontFamily: "var(--t-font, Poppins, sans-serif)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onMenuClick={onMenuClick}
      />

      <main className="max-w-3xl mx-auto px-4 md:px-6 py-6 pb-32 lg:pb-8">
        <h1 style={{ fontSize: "20px", fontWeight: 700, color: "var(--t-text-primary)", marginBottom: 20 }}>
          Mi carrito
        </h1>

        {isEmpty ? (
          /* Empty state */
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <ShoppingBag size={48} style={{ color: "var(--t-border)" }} />
            <p style={{ fontSize: "16px", fontWeight: 600, color: "var(--t-text-primary)" }}>
              Tu carrito está vacío
            </p>
            <p style={{ fontSize: "13px", color: "var(--t-text-muted)" }}>
              Agrega productos para continuar con tu compra.
            </p>
            <button
              type="button"
              onClick={onContinueShopping}
              className="px-6 py-3"
              style={{
                borderRadius: "var(--t-radius-button)",
                backgroundColor: "var(--t-button-bg)",
                color: "var(--t-button-text)",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              Explorar productos
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* ── Items list ── */}
            <div className="flex-1 flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.productId}
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
                      width: 70,
                      height: 70,
                      borderRadius: "var(--t-radius-category)",
                      overflow: "hidden",
                      backgroundColor: "var(--t-surface)",
                    }}
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        sizes="70px"
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
                        onClick={() => onDecrementItem?.(item.productId)}
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
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--t-text-primary)", minWidth: 16, textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onIncrementItem?.(item.productId)}
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
                      onClick={() => onRemoveItem?.(item.productId)}
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
              ))}
            </div>

            {/* ── Order summary ── */}
            <div
              className="lg:w-72 flex-shrink-0"
              style={{
                borderRadius: "var(--t-radius-card)",
                border: "1px solid var(--t-border)",
                backgroundColor: "var(--t-card-bg)",
                padding: 20,
                height: "fit-content",
              }}
            >
              <p style={{ fontSize: "15px", fontWeight: 700, color: "var(--t-text-primary)", marginBottom: 16 }}>
                Resumen del pedido
              </p>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span style={{ fontSize: "13px", color: "var(--t-text-secondary)" }}>Subtotal</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--t-text-primary)" }}>
                    {currencySymbol}{formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontSize: "13px", color: "var(--t-text-secondary)" }}>IVA (2.5%)</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--t-text-primary)" }}>
                    {currencySymbol}{formatPrice(tax)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ fontSize: "13px", color: "var(--t-text-secondary)" }}>Domicilio</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--t-text-primary)" }}>
                    {currencySymbol}{formatPrice(DELIVERY_FEE)}
                  </span>
                </div>
              </div>

              <div
                style={{ height: 1, backgroundColor: "var(--t-border)", margin: "16px 0" }}
                aria-hidden="true"
              />

              <div className="flex justify-between mb-4">
                <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--t-text-primary)" }}>Total</span>
                <span style={{ fontSize: "15px", fontWeight: 800, color: "var(--t-primary)" }}>
                  {currencySymbol}{formatPrice(total)}
                </span>
              </div>

              <button
                type="button"
                onClick={onCheckout}
                className="w-full py-3"
                style={{
                  borderRadius: "var(--t-radius-button)",
                  backgroundColor: "var(--t-button-bg)",
                  color: "var(--t-button-text)",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                Proceder al pago
              </button>

              <button
                type="button"
                onClick={onContinueShopping}
                className="w-full py-2 mt-2"
                style={{
                  borderRadius: "var(--t-radius-button)",
                  backgroundColor: "transparent",
                  color: "var(--t-text-secondary)",
                  border: "1px solid var(--t-border)",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                Seguir comprando
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer store={store} layout={layout} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={(tab) => {
          if (tab === "cart") onCartClick?.();
          else onTabChange?.(tab);
        }}
      />
    </div>
  );
}
