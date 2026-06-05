// Fashion Template — Checkout Page
// Form: INFORMACIÓN → DIRECCIÓN DE ENVÍO → "CONTINUAR CON WHATSAPP"
// Inputs: bottom border only. Order summary sidebar on desktop.
// Monochromatic B&W. Background: var(--t-background).

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { CheckoutForm } from "./CheckoutForm";
import type { StoreInfo, CartItem, CheckoutFormData, NavTab } from "../types";

interface CheckoutPageProps {
  store: StoreInfo;
  items: CartItem[];
  totalPrice: number;
  formData: CheckoutFormData;
  activeTab: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  onBack?: () => void;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onFieldChange?: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit?: () => void;
  onTabChange?: (tab: NavTab) => void;
}

const fmt = new Intl.NumberFormat("en-US");


export function CheckoutPage({
  store,
  items,
  totalPrice,
  formData,
  activeTab,
  cartItemCount = 0,
  currencySymbol = "$",
  onBack,
  onSearchClick,
  onCartClick,
  onFieldChange,
  onSubmit,
  onTabChange,
}: CheckoutPageProps) {
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

      <main className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 pt-4 md:pt-6 pb-32 md:pb-12">
        {/* Heading */}
        <div className="flex items-center gap-3 mb-8 lg:mb-10">
          <button
            type="button"
            className="transition-opacity hover:opacity-60 border-0 bg-transparent cursor-pointer"
            onClick={onBack}
            aria-label="Volver al carrito"
          >
            <ArrowLeft
              size={18}
              strokeWidth={1.5}
              className="text-[var(--t-text-primary)]"
            />
          </button>
          <h1
            className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider text-[var(--t-text-primary)]"
            style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
          >
            CHECKOUT
          </h1>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-16 lg:items-start">
          {/* Form (left) */}
          <CheckoutForm
            formData={formData}
            onFieldChange={onFieldChange}
            onSubmit={onSubmit}
          />

          {/* Order summary (right) — desktop */}
          <div className="hidden lg:block lg:sticky lg:top-20">
            <div className="border border-[var(--t-border)] p-6 bg-[var(--t-card-bg)]">
              <h2
                className="mb-5 text-sm font-bold uppercase tracking-wider text-[var(--t-text-primary)]"
                style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
              >
                TU PEDIDO
              </h2>

              <div className="flex flex-col gap-3 mb-5">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-start gap-3">
                    <div
                      className="relative flex-shrink-0 border border-[var(--t-border)]"
                      style={{ width: "52px", height: "68px" }}
                    >
                      {item.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="52px"
                        />
                      )}
                      <span
                        className="absolute -top-1.5 -right-1.5 flex items-center justify-center bg-[var(--t-primary)] text-[var(--t-button-text)]"
                        style={{
                          width: "18px",
                          height: "18px",
                          fontSize: "9px",
                          fontFamily: "var(--font-sans, 'Inter', sans-serif)",
                        }}
                      >
                        {item.quantity}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="leading-tight line-clamp-2 text-xs text-[var(--t-text-primary)]"
                        style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)", fontWeight: 400 }}
                      >
                        {item.name}
                      </p>
                      {item.variantName && (
                        <p
                          className="text-[10px] text-[var(--t-text-secondary)] mt-0.5"
                          style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
                        >
                          {item.variantName}
                        </p>
                      )}
                    </div>

                    <span
                      className="text-sm font-medium text-[var(--t-text-primary)] flex-shrink-0"
                      style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
                    >
                      {currencySymbol}{fmt.format(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-[var(--t-border)]">
                <span
                  className="text-sm font-medium text-[var(--t-text-primary)]"
                  style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
                >
                  Total
                </span>
                <span
                  className="text-base font-bold text-[var(--t-text-primary)]"
                  style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
                >
                  {currencySymbol}{fmt.format(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-4 bg-[var(--t-background)] border-t border-[var(--t-border)]">
        <button
          type="button"
          className="w-full py-3.5 bg-[var(--t-secondary)] transition-opacity hover:opacity-80 border-0 cursor-pointer"
          style={{
            borderRadius: "var(--t-radius-button)",
            fontFamily: "var(--font-sans, 'Inter', sans-serif)",
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "var(--t-text-primary)",
          }}
          onClick={onSubmit}
        >
          CONTINUAR CON WHATSAPP
        </button>
      </div>

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
    </div>
  );
}
