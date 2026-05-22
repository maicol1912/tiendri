// Tech Premium Template — Cart Page
// Desktop: 2-col — cart items left, order summary right (sticky).
// Mobile: stacked — items + summary below.
// Visual only — handlers come as props.

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import type { StoreInfo, CartItem, NavTab } from "../types";

interface CartPageProps {
  store: StoreInfo;
  items: CartItem[];
  navLinks: readonly { label: string; href: string }[];
  footerServices: readonly string[];
  footerAssistance: readonly string[];
  shipping?: number;
  tax?: number;
  currencySymbol?: string;
  activeTab?: NavTab;
  cartItemCount?: number;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onIncrement?: (productId: string) => void;
  onDecrement?: (productId: string) => void;
  onRemove?: (productId: string) => void;
  onCheckout?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onNavLinkClick?: (href: string) => void;
}

export function CartPage({
  store,
  items,
  navLinks,
  footerServices,
  footerAssistance,
  shipping = 29,
  tax = 50,
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
  onNavLinkClick,
}: CartPageProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + tax + shipping;
  const isEmpty = items.length === 0;

  const fmt = (price: number) =>
    `${currencySymbol}${new Intl.NumberFormat("en-US").format(price)}`;

  return (
    <div className="bg-white min-h-screen font-['Inter',sans-serif] flex flex-col">
      {/* Header */}
      <Header
        store={store}
        navLinks={navLinks}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onNavLinkClick={onNavLinkClick}
      />

      {/* Main content */}
      <main className="flex-1 px-4 py-10 lg:px-[160px] lg:py-[112px]">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center gap-6 py-20">
            <p className="text-xl font-semibold text-black">Tu carrito está vacío</p>
            <p className="text-base text-[var(--t-text-secondary)]">Explorá los productos y agregá artículos a tu carrito</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left: Cart items */}
            <div className="flex flex-col gap-10 flex-1 min-w-0">
              <h1 className="text-2xl font-semibold text-black">Carrito de compras</h1>

              <div className="flex flex-col gap-10">
                {items.map((item, idx) => (
                  <div
                    key={item.productId}
                    className={`flex gap-4 items-center py-4 ${
                      idx < items.length - 1 ? "border-b border-[var(--t-border)]/50 pb-8" : ""
                    }`}
                  >
                    {/* Product image */}
                    <div className="relative w-[90px] h-[90px] shrink-0">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-contain"
                          sizes="90px"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-[var(--t-card-bg)] rounded" />
                      )}
                    </div>

                    {/* Info + controls */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-0 flex-1 min-w-0">
                      {/* Name + SKU */}
                      <div className="flex flex-col gap-2 flex-1 min-w-[106px]">
                        <p className="text-base font-medium text-black line-clamp-2">{item.name}</p>
                        <p className="text-sm text-black">#{item.productId.replace(/\D/g, "").slice(0, 14) || "00000000"}</p>
                      </div>

                      {/* Quantity + Price + Remove */}
                      <div className="flex items-center gap-6 justify-end">
                        {/* Quantity stepper */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="w-6 h-6 flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
                            onClick={() => onDecrement?.(item.productId)}
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-4 h-4 text-black" />
                          </button>
                          <div className="border border-[var(--t-border-mid)]/50 rounded px-4 py-2 min-w-[32px] text-center">
                            <span className="text-base font-medium text-black">{item.quantity}</span>
                          </div>
                          <button
                            type="button"
                            className="w-6 h-6 flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
                            onClick={() => onIncrement?.(item.productId)}
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-4 h-4 text-black" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xl font-medium text-black tracking-[0.6px] whitespace-nowrap">
                          {fmt(item.price * item.quantity)}
                        </span>

                        {/* Remove */}
                        <button
                          type="button"
                          className="w-6 h-6 flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
                          onClick={() => onRemove?.(item.productId)}
                          aria-label={`Eliminar ${item.name} del carrito`}
                        >
                          <X className="w-5 h-5 text-black" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Order Summary */}
            <aside className="lg:w-[400px] xl:w-[440px] shrink-0">
              <div className="border border-[var(--t-border-light)] rounded-[10px] px-8 py-10 lg:px-16 lg:py-14 flex flex-col gap-10 lg:sticky lg:top-24">
                <h2 className="text-xl font-bold text-[var(--t-primary)]">Resumen del pedido</h2>

                <div className="flex flex-col gap-12">
                  {/* Promo fields */}
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6">
                      {/* Discount code */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[var(--t-text-subtle)]">
                          Código de descuento / Código promo
                        </label>
                        <div className="border border-[var(--t-border-input)]/50 rounded-[7px] px-4 py-4">
                          <span className="text-sm text-[var(--t-text-muted)] tracking-[-0.07px]">Código</span>
                        </div>
                      </div>

                      {/* Bonus card */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[var(--t-text-subtle)]">
                          Número de tu tarjeta de bonos
                        </label>
                        <div className="flex items-center border border-[var(--t-border-input)]/50 rounded-[7px] px-4 py-4">
                          <span className="flex-1 text-sm text-[var(--t-text-muted)] tracking-[-0.07px]">Ingresá el número de tarjeta</span>
                          <button
                            type="button"
                            className="px-2 py-2 border border-[var(--t-primary)] rounded-[6px] text-xs font-medium text-[var(--t-primary)] bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            Aplicar
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Prices */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-medium text-black tracking-[0.48px]">Subtotal</span>
                        <span className="text-base font-medium text-black tracking-[0.48px]">
                          {fmt(subtotal)}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-base text-[var(--t-text-subtle)]">Impuestos estimados</span>
                          <span className="text-base font-medium text-black tracking-[0.48px]">
                            {fmt(tax)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-base text-[var(--t-text-subtle)]">Envío y manejo estimado</span>
                          <span className="text-base font-medium text-black tracking-[0.48px]">
                            {fmt(shipping)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-base font-medium text-black tracking-[0.48px]">Total</span>
                        <span className="text-base font-medium text-black tracking-[0.48px]">
                          {fmt(total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout button */}
                  <button
                    type="button"
                    className="w-full py-4 bg-[var(--t-button-bg)] text-[var(--t-button-text)] text-base font-medium rounded-[var(--t-radius-button)] border-none cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={onCheckout}
                  >
                    Finalizar compra
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer store={store} services={footerServices} assistance={footerAssistance} />

      {/* Bottom nav — mobile */}
      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
      <div className="h-16 lg:hidden" />
    </div>
  );
}
