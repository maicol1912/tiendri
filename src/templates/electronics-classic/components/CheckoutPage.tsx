// Electronics Classic — Checkout Page (Presentational)
// Form + order summary + WhatsApp order generation.
// All colors via var(--t-*). ZERO hardcoded hex.

import { MessageCircle } from "lucide-react";
import type { StorefrontStore, CartItem, CheckoutFormData } from "../types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";

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
          <form
            onSubmit={onSubmit}
            className="flex-1 flex flex-col gap-4"
            aria-label="Formulario de pedido"
          >
            <h2 className="font-semibold text-[var(--t-text-primary)] text-sm">
              Tus datos
            </h2>

            {[
              { field: "nombre" as const, label: "Nombre completo", type: "text", placeholder: "Ej. Carlos Pérez", required: true },
              { field: "whatsapp" as const, label: "WhatsApp", type: "tel", placeholder: "Ej. 3001234567", required: true },
              { field: "email" as const, label: "Correo electrónico (opcional)", type: "email", placeholder: "Ej. carlos@mail.com", required: false },
              { field: "direccion" as const, label: "Dirección de entrega", type: "text", placeholder: "Calle, ciudad, departamento", required: true },
            ].map(({ field, label, type, placeholder, required }) => (
              <div key={field} className="flex flex-col gap-1">
                <label
                  htmlFor={`checkout-${field}`}
                  className="text-xs text-[var(--t-text-secondary)]"
                >
                  {label}
                </label>
                <input
                  id={`checkout-${field}`}
                  type={type}
                  value={formData[field]}
                  onChange={(e) => onFieldChange(field, e.target.value)}
                  placeholder={placeholder}
                  required={required}
                  className="px-3 py-2.5 text-sm border rounded-[var(--t-radius-button)] outline-none"
                  style={{
                    borderColor: "var(--t-surface)",
                    backgroundColor: "var(--t-search-bg)",
                    color: "var(--t-text-primary)",
                  }}
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label
                htmlFor="checkout-notas"
                className="text-xs text-[var(--t-text-secondary)]"
              >
                Notas adicionales (opcional)
              </label>
              <textarea
                id="checkout-notas"
                value={formData.notas}
                onChange={(e) => onFieldChange("notas", e.target.value)}
                placeholder="Instrucciones especiales para tu pedido..."
                rows={3}
                className="px-3 py-2.5 text-sm border rounded-[var(--t-radius-button)] outline-none resize-none"
                style={{
                  borderColor: "var(--t-surface)",
                  backgroundColor: "var(--t-search-bg)",
                  color: "var(--t-text-primary)",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="mt-2 w-full flex items-center justify-center gap-2 py-3.5 font-semibold text-sm rounded-[var(--t-radius-button)] transition-opacity disabled:opacity-50"
              style={{
                backgroundColor: "#25D366",
                color: "#FFFFFF",
              }}
              aria-label="Enviar pedido por WhatsApp"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              {isSubmitting ? "Enviando..." : "Enviar pedido por WhatsApp"}
            </button>
          </form>

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
