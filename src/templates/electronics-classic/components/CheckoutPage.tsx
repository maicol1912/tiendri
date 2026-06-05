// Electronics Classic — Checkout Page (Presentational)
// Form + order summary + WhatsApp order generation.
// All colors via var(--t-*). ZERO hardcoded hex.

import type { StorefrontStore, CartItem, CheckoutFormData } from "../types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { CheckoutForm } from "./CheckoutForm";

const fmt = new Intl.NumberFormat("en-US");

interface CheckoutPageProps {
  store: StorefrontStore;
  items: CartItem[];
  cartCount: number;
  formData: CheckoutFormData;
  isSubmitting: boolean;
  layout?: {
    headerStyle?: string;
    footerStyle?: string;
  };
  currencySymbol?: string;
  onNavigate?: (path: string) => void;
  onSearchSubmit?: (query: string) => void;
  onCartClick?: () => void;
  onFieldChange: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CheckoutPage({
  store,
  items,
  cartCount,
  formData,
  isSubmitting,
  layout,
  currencySymbol = "$",
  onNavigate,
  onSearchSubmit,
  onCartClick,
  onFieldChange,
  onSubmit,
}: CheckoutPageProps) {
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const fmtCop = (v: number) => `${currencySymbol}${fmt.format(v)}`;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={store}
        cartCount={cartCount}
        layout={layout}
        onNavigate={onNavigate}
        onSearchSubmit={onSearchSubmit}
        onCartClick={onCartClick}
      />

      <main className="max-w-4xl mx-auto px-4 md:px-6 pb-24 md:pb-12">
        <h1 className="text-xl md:text-2xl font-bold text-[var(--t-text-primary)] py-6">
          Finalizar pedido
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <CheckoutForm
            formData={formData}
            items={items}
            isSubmitting={isSubmitting}
            onFieldChange={onFieldChange}
            onSubmit={onSubmit}
          />

          {/* Order summary */}
          <div
            className="lg:w-72 shrink-0 rounded-[var(--t-radius-card)] p-5 border h-fit"
            style={{
              backgroundColor: "var(--t-card-bg)",
              borderColor: "var(--t-surface)",
            }}
            aria-label="Resumen del pedido"
          >
            <h2 className="font-bold text-[var(--t-text-primary)] text-sm mb-4">
              Resumen
            </h2>
            <ul className="flex flex-col gap-3 mb-4">
              {items.map((item) => (
                <li key={item.productId} className="flex justify-between gap-3 text-sm">
                  <span className="text-[var(--t-text-secondary)] line-clamp-2 flex-1">
                    {item.name}
                    <span className="text-[var(--t-text-muted)]"> ×{item.quantity}</span>
                  </span>
                  <span className="text-[var(--t-text-primary)] font-semibold shrink-0">
                    {fmtCop(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div
              className="flex justify-between font-bold text-sm pt-3 border-t"
              style={{ borderColor: "var(--t-surface)" }}
            >
              <span style={{ color: "var(--t-text-primary)" }}>Total</span>
              <span style={{ color: "var(--t-primary)" }}>{fmtCop(subtotal)}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer store={store} layout={layout} />
      <BottomNav cartCount={cartCount} onNavigate={onNavigate} />
    </div>
  );
}
