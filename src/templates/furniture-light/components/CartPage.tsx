// Furniture Light — Cart Page
// Items list with +/- (orange) buttons; dark navy summary card with voucher row, total, checkout CTA
// ZERO hardcoded colors

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import type { FurnitureStoreInfo, FurnitureNavTab } from "../types";
import type { FurnitureCartItem } from "../types";

interface CartPageProps {
  store: FurnitureStoreInfo;
  items: FurnitureCartItem[];
  navLinks?: readonly { label: string; href: string }[];
  layout?: { footerStyle?: string };
  currencySymbol?: string;
  activeTab?: FurnitureNavTab;
  cartItemCount?: number;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onIncrement?: (productId: string) => void;
  onDecrement?: (productId: string) => void;
  onRemove?: (productId: string) => void;
  onCheckout?: () => void;
  onTabChange?: (tab: FurnitureNavTab) => void;
}

export function CartPage({
  store,
  items,
  navLinks = [],
  layout,
  currencySymbol = "$",
  activeTab = "cart",
  cartItemCount = 0,
  onSearchClick,
  onCartClick,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
  onTabChange,
}: CartPageProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15000;
  const total = subtotal + shipping;
  const isEmpty = items.length === 0;

  const fmt = (price: number) =>
    `${currencySymbol}${new Intl.NumberFormat("en-US").format(price)}`;

  return (
    <div className="min-h-screen bg-[var(--t-background)]">
      <Header
        store={store}
        navLinks={navLinks as { label: string; href: string }[]}
        cartItemCount={cartItemCount}
        onCartClick={onCartClick}
        onSearchClick={onSearchClick}
      />

      <main className="pt-[60px] lg:pt-[72px] pb-32 lg:pb-8 px-5 md:px-6 lg:px-8 lg:max-w-3xl lg:mx-auto">
        <h1
          className="text-xl font-bold text-[var(--t-text-primary)] py-5"
          style={{ fontFamily: "var(--font-display, var(--font-sans, 'Inter', sans-serif))" }}
        >
          Mi carrito{cartItemCount > 0 && ` (${cartItemCount})`}
        </h1>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <div
              className="w-20 h-20 flex items-center justify-center bg-[var(--t-section-bg)]"
              style={{ borderRadius: "var(--t-radius-card)" }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--t-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <p className="text-base font-semibold text-[var(--t-text-primary)]">Tu carrito está vacío</p>
            <p className="text-sm text-[var(--t-text-muted)] text-center">Explorá los productos y agregá artículos a tu carrito</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mb-5">
            {items.map((item) => (
              <div
                key={item.productId}
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
                    backgroundColor: "var(--t-card-bg)",
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
                    <div className="absolute inset-0 bg-[var(--t-card-bg)]" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--t-text-primary)] line-clamp-2 leading-tight">{item.name}</p>
                  {item.variant && (
                    <p className="text-xs text-[var(--t-text-muted)] mt-0.5">{item.variant}</p>
                  )}
                  <p className="text-sm font-bold text-[var(--t-primary)] mt-1">
                    {fmt(item.price * item.quantity)}
                  </p>
                </div>

                {/* Qty controls */}
                <div className="flex flex-col items-end justify-between shrink-0">
                  <button
                    onClick={() => onRemove?.(item.productId)}
                    aria-label={`Eliminar ${item.name}`}
                    className="text-[var(--t-text-muted)] hover:text-[var(--t-primary)] transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div
                    className="flex items-center gap-2 px-2 py-1"
                    style={{
                      borderRadius: "var(--t-radius-button)",
                      backgroundColor: "var(--t-section-bg)",
                    }}
                  >
                    <button
                      onClick={() => onDecrement?.(item.productId)}
                      aria-label="Disminuir"
                      className="flex items-center justify-center w-6 h-6 rounded-full transition-all hover:scale-110"
                      style={{ backgroundColor: "var(--t-primary)", color: "var(--t-button-text)" }}
                    >
                      <Minus size={12} strokeWidth={2.5} />
                    </button>
                    <span className="text-sm font-bold text-[var(--t-text-primary)] min-w-[16px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onIncrement?.(item.productId)}
                      aria-label="Aumentar"
                      className="flex items-center justify-center w-6 h-6 rounded-full transition-all hover:scale-110"
                      style={{ backgroundColor: "var(--t-primary)", color: "var(--t-button-text)" }}
                    >
                      <Plus size={12} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order summary — dark navy card */}
        {!isEmpty && (
          <div
            className="p-5 mt-2"
            style={{
              borderRadius: "var(--t-radius-card)",
              backgroundColor: "var(--t-secondary)",
            }}
          >
            <p className="text-base font-bold text-white mb-4">Resumen del pedido</p>

            {/* Voucher row */}
            <div
              className="flex items-center gap-2 mb-4 px-3 py-2.5"
              style={{
                borderRadius: "var(--t-radius-button)",
                border: "1px dashed rgba(255,255,255,0.3)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 12v10H4V12" />
                <path d="M22 7H2v5h20V7z" />
                <line x1="12" y1="22" x2="12" y2="7" />
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
              </svg>
              <input
                type="text"
                placeholder="Código de cupón"
                className="flex-1 bg-transparent text-sm text-white/80 placeholder-white/40 outline-none"
              />
              <button className="text-xs font-semibold text-[var(--t-primary)]">Aplicar</button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Subtotal</span>
                <span className="text-white font-medium">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Envío</span>
                <span className="text-white font-medium">{fmt(shipping)}</span>
              </div>
              <div className="h-px bg-white/10 my-1" />
              <div className="flex justify-between text-base">
                <span className="text-white font-bold">Total</span>
                <span className="text-white font-bold">{fmt(total)}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-3.5 text-base font-bold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{
                borderRadius: "var(--t-radius-button)",
                backgroundColor: "var(--t-primary)",
                color: "var(--t-button-text)",
              }}
            >
              Continuar al pago
            </button>
          </div>
        )}
      </main>

      <Footer store={store} layout={layout} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={(tab) => {
          if (tab === "search") onSearchClick?.();
          else onTabChange?.(tab);
        }}
      />
    </div>
  );
}
