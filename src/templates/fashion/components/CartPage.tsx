// Fashion Template — Cart Page (Bolsa de Compras)
// Two tabs (CARRITO, FAVORITOS) → Cart items list → Order summary
// Empty state: "TU CARRITO ESTÁ VACÍO" with "SEGUIR COMPRANDO" button.
// Monochromatic B&W. Background: var(--t-background).

import Image from "next/image";
import { ArrowLeft, Minus, Plus, X, RotateCw } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import type { StoreInfo, CartItem, NavTab } from "../types";

interface CartPageProps {
  store: StoreInfo;
  items: CartItem[];
  totalPrice: number;
  activeTab: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  onBack?: () => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onProductClick?: (productId: string) => void;
  onRemoveItem?: (productId: string) => void;
  onIncrementItem?: (productId: string) => void;
  onDecrementItem?: (productId: string) => void;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
  onTabChange?: (tab: NavTab) => void;
}

function formatPrice(price: number, symbol = "$"): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

export function CartPage({
  store,
  items,
  totalPrice,
  activeTab,
  cartItemCount = 0,
  currencySymbol = "$",
  onBack,
  onSearchClick,
  onCartClick,
  onRemoveItem,
  onIncrementItem,
  onDecrementItem,
  onCheckout,
  onContinueShopping,
  onTabChange,
}: CartPageProps) {
  return (
    <div
      className="min-h-screen bg-[var(--t-background)]"
      style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
      />

      <main className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 pt-4 md:pt-6 pb-[140px] lg:pb-12">
        {/* Back button */}
        <button
          type="button"
          className="flex items-center gap-1 mb-4 transition-opacity hover:opacity-60 bg-transparent border-0 p-0 cursor-pointer"
          onClick={onBack}
          aria-label="Volver"
        >
          <ArrowLeft
            size={16}
            strokeWidth={1.5}
            className="text-[var(--t-text-primary)]"
          />
        </button>

        {/* Tab header: CARRITO / FAVORITOS */}
        <div className="flex gap-6 mb-8">
          <span
            className="cursor-pointer text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-[1.5px] text-[var(--t-text-primary)]"
            style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
          >
            CARRITO
          </span>
          <span
            className="cursor-pointer text-lg md:text-xl lg:text-2xl font-normal uppercase tracking-[1.5px] text-[var(--t-text-muted)]"
            style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
          >
            FAVORITOS
          </span>
        </div>

        {items.length === 0 ? (
          /* Empty cart */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p
              className="mb-2 text-lg md:text-xl font-bold uppercase tracking-wider text-[var(--t-text-primary)]"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
            >
              TU CARRITO ESTÁ VACÍO
            </p>
            <p
              className="mb-8 text-sm md:text-base text-[var(--t-text-secondary)]"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)", fontWeight: 400 }}
            >
              Explora nuestra tienda y encuentra algo que te guste.
            </p>
            <button
              type="button"
              className="px-8 py-3 bg-[var(--t-secondary)] transition-opacity hover:opacity-80 border-0 cursor-pointer"
              style={{
                borderRadius: "var(--t-radius-button)",
                fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "var(--t-text-primary)",
              }}
              onClick={onContinueShopping}
            >
              SEGUIR COMPRANDO
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* Cart items */}
            <div className="flex-1 space-y-6">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4">
                  {/* Product photo with X close */}
                  <div className="relative flex-shrink-0">
                    <div className="relative border border-[var(--t-border)] overflow-hidden w-[140px] h-[170px] md:w-[180px] md:h-[214px]">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 140px, 180px"
                        />
                      ) : (
                        <div className="w-full h-full bg-[var(--t-background)] flex items-center justify-center">
                          <span className="text-[var(--t-text-muted)] text-[10px]">
                            IMG
                          </span>
                        </div>
                      )}
                    </div>
                    {/* X close button */}
                    <button
                      type="button"
                      className="absolute top-2 right-2 w-6 h-6 bg-[var(--t-card-bg)]/80 flex items-center justify-center transition-opacity hover:opacity-60 border-0 cursor-pointer"
                      onClick={() => onRemoveItem?.(item.productId)}
                      aria-label={`Eliminar ${item.name}`}
                    >
                      <X
                        size={14}
                        strokeWidth={1.5}
                        className="text-[var(--t-text-primary)]"
                      />
                    </button>
                  </div>

                  {/* Product info + controls */}
                  <div className="flex-1 min-w-0 py-1">
                    <p
                      className="leading-tight text-xs md:text-sm text-[var(--t-text-muted)]"
                      style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)", fontWeight: 400 }}
                    >
                      {item.name}
                    </p>
                    {item.variantName && (
                      <p
                        className="leading-tight text-[13px] md:text-sm font-semibold text-[var(--t-text-primary)]"
                        style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
                      >
                        {item.variantName}
                      </p>
                    )}
                    <p
                      className="mt-1 text-sm md:text-base font-medium text-[var(--t-text-primary)]"
                      style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
                    >
                      {formatPrice(item.price * item.quantity, currencySymbol)}
                    </p>

                    {/* Quantity controls + refresh */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex items-center border border-[var(--t-border)]">
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-[var(--t-secondary)] border-0 cursor-pointer bg-transparent"
                          onClick={() => onDecrementItem?.(item.productId)}
                          aria-label="Reducir cantidad"
                        >
                          <Minus size={12} strokeWidth={1.5} className="text-[var(--t-text-primary)]" />
                        </button>
                        <span
                          className="w-8 text-center text-[13px] font-medium text-[var(--t-text-primary)] border-x border-[var(--t-border)]"
                          style={{
                            fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                            lineHeight: "32px",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-[var(--t-secondary)] border-0 cursor-pointer bg-transparent"
                          onClick={() => onIncrementItem?.(item.productId)}
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={12} strokeWidth={1.5} className="text-[var(--t-text-primary)]" />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center border border-[var(--t-border)] transition-opacity hover:opacity-60 bg-transparent cursor-pointer"
                        aria-label="Actualizar"
                      >
                        <RotateCw
                          size={14}
                          strokeWidth={1.5}
                          className="text-[var(--t-text-secondary)]"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue shopping link */}
              <button
                type="button"
                className="mt-4 transition-opacity hover:opacity-60 bg-transparent border-0 p-0 cursor-pointer"
                onClick={onContinueShopping}
                style={{
                  fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                  fontSize: "11px",
                  fontWeight: 400,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "var(--t-text-secondary)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Seguir Comprando
              </button>
            </div>

            {/* Order summary — sticky sidebar on desktop */}
            <div className="mt-8 lg:mt-0 lg:w-[380px] lg:sticky lg:top-24 hidden lg:block">
              <div className="border border-[var(--t-border)] p-6 bg-[var(--t-card-bg)]">
                <h3
                  className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--t-text-primary)]"
                  style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
                >
                  RESUMEN DEL PEDIDO
                </h3>
                <div className="flex justify-between py-3 border-b border-[var(--t-border)]">
                  <span
                    className="text-sm text-[var(--t-text-secondary)]"
                    style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
                  >
                    Total ({cartItemCount}{" "}
                    {cartItemCount === 1 ? "artículo" : "artículos"})
                  </span>
                  <span
                    className="text-base font-bold text-[var(--t-text-primary)]"
                    style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
                  >
                    {formatPrice(totalPrice, currencySymbol)}
                  </span>
                </div>
                <button
                  type="button"
                  className="w-full py-3.5 mt-5 bg-[var(--t-secondary)] transition-opacity hover:opacity-80 border-0 cursor-pointer"
                  style={{
                    borderRadius: "var(--t-radius-button)",
                    fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    color: "var(--t-text-primary)",
                  }}
                  onClick={onCheckout}
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile/tablet sticky checkout bar — sits ABOVE the bottom nav */}
      {items.length > 0 && (
        <div className="lg:hidden fixed bottom-[60px] left-0 right-0 z-40 bg-[var(--t-card-bg)] border-t border-[var(--t-border)] px-4 py-3 flex items-center justify-between">
          <div>
            <p
              className="text-xs text-[var(--t-text-secondary)]"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
            >
              Total
            </p>
            <p
              className="text-lg font-bold text-[var(--t-text-primary)]"
              style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
            >
              {formatPrice(totalPrice, currencySymbol)}
            </p>
          </div>
          <button
            type="button"
            className="bg-[var(--t-secondary)] px-8 py-3 transition-opacity hover:opacity-80 border-0 cursor-pointer"
            style={{
              borderRadius: "var(--t-radius-button)",
              fontFamily: "var(--font-sans, 'Inter', sans-serif)",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--t-text-primary)",
            }}
            onClick={onCheckout}
          >
            CHECKOUT
          </button>
        </div>
      )}

      <Footer store={store} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
    </div>
  );
}
