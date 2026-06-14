"use client";

// Food Night — Checkout Page
// 2-col desktop: form (left) + order summary (right, sticky)
// Mobile: stacked, sticky CTA

import { Header } from "./Header";
import { CheckoutForm } from "./CheckoutForm";
import { OrderSummary } from "./OrderSummary";
import { BottomNav } from "./BottomNav";
import type { CartItem } from "@/lib/cart";
import type { StoreInfo, NavTab, CheckoutFormData } from "../types";
import { formatPrice } from "@/lib/format";

interface FieldErrors {
  nombre?: string;
  whatsapp?: string;
  email?: string;
  direccion?: string;
  notas?: string;
}

interface CheckoutPageProps {
  store: StoreInfo;
  items: CartItem[];
  subtotal: number;
  discount?: number;
  deliveryFee?: number;
  currencySymbol?: string;
  activeTab?: NavTab;
  formData: CheckoutFormData;
  formErrors?: FieldErrors;
  isSubmitting?: boolean;
  layout?: Record<string, unknown>;
  onFormChange?: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit?: () => void;
  activeHref?: string;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onNavLinkClick?: (href: string) => void;
}

export function CheckoutPage({
  store,
  items,
  subtotal,
  discount = 0,
  deliveryFee = 0,
  currencySymbol = "$",
  activeTab = "cart",
  formData,
  formErrors = {},
  isSubmitting = false,
  layout,
  activeHref,
  onFormChange,
  onSubmit,
  onSearchClick,
  onCartClick,
  onTabChange,
  onNavLinkClick,
}: CheckoutPageProps) {
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        cartItemCount={items.length}
        layout={layout}
        activeHref={activeHref}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onNavLinkClick={onNavLinkClick}
      />

      <main className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pt-6 pb-[calc(100px+env(safe-area-inset-bottom,0px))] md:pb-12">
        <h1 className="text-[18px] font-bold mb-6" style={{ color: "var(--t-foreground)" }}>
          Tu pedido
        </h1>

        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Form */}
          <section aria-label="Datos del pedido">
            <div
              className="p-5 rounded-[16px]"
              style={{ backgroundColor: "var(--t-card)" }}
            >
              <h2
                className="text-[14px] font-semibold mb-5"
                style={{ color: "var(--t-foreground)" }}
              >
                Datos de contacto y entrega
              </h2>

              <CheckoutForm
                data={formData}
                errors={formErrors}
                onChange={onFormChange}
              />
            </div>
          </section>

          {/* Summary + CTA */}
          <aside className="lg:sticky lg:top-6 flex flex-col gap-4">
            {/* Items recap */}
            <div
              className="p-4 rounded-[16px]"
              style={{ backgroundColor: "var(--t-card)" }}
              aria-label="Productos del pedido"
            >
              <h2
                className="text-[13px] font-semibold mb-3"
                style={{ color: "var(--t-muted)" }}
              >
                Resumen ({items.length} {items.length === 1 ? "producto" : "productos"})
              </h2>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between">
                    <span
                      className="text-[12px] font-normal truncate flex-1 pr-2"
                      style={{ color: "var(--t-muted)" }}
                    >
                      {item.quantity}× {item.name}
                      {item.variantName ? ` (${item.variantName})` : ""}
                    </span>
                    <span className="text-[12px] font-medium flex-shrink-0" style={{ color: "var(--t-foreground)" }}>
                      {formatPrice(item.price * item.quantity, currencySymbol)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              deliveryFee={deliveryFee}
              currencySymbol={currencySymbol}
              itemCount={items.length}
            />

            {/* Desktop CTA */}
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting || items.length === 0}
              className="hidden lg:flex w-full items-center justify-center gap-2 transition-opacity hover:opacity-90"
              style={{
                borderRadius: "var(--t-radius-button)",
                height: 52,
                backgroundColor: "var(--t-button-bg)",
                color: "var(--t-button-text)",
                border: "none",
                cursor: isSubmitting || items.length === 0 ? "not-allowed" : "pointer",
                fontSize: "14px",
                fontWeight: 600,
                opacity: isSubmitting || items.length === 0 ? 0.5 : 1,
              }}
              aria-label="Enviar pedido por WhatsApp"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? "Enviando…" : "ENVIAR POR WHATSAPP"}
            </button>
          </aside>
        </div>
      </main>

      {/* Mobile CTA */}
      <div
        className="md:hidden fixed left-0 right-0 z-[51] px-4 py-3"
        style={{ bottom: 72, backgroundColor: "var(--t-background)" }}
      >
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || items.length === 0}
          className="w-full flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
          style={{
            borderRadius: "var(--t-radius-button)",
            height: 52,
            backgroundColor: "var(--t-button-bg)",
            color: "var(--t-button-text)",
            border: "none",
            cursor: isSubmitting || items.length === 0 ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: 600,
            opacity: isSubmitting || items.length === 0 ? 0.5 : 1,
          }}
          aria-label="Enviar pedido por WhatsApp"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Enviando…" : "ENVIAR POR WHATSAPP"}
        </button>
      </div>

      <BottomNav
        activeTab={activeTab}
        cartItemCount={items.length}
        onTabChange={(tab) => {
          if (tab === "cart") onCartClick?.();
          else onTabChange?.(tab);
        }}
      />
    </div>
  );
}
