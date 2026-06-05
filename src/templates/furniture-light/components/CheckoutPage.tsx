// Furniture Light — Checkout Page
// Form left (nombre/whatsapp/dirección/email/notas), items + shipment section, order summary right
// WhatsApp CTA. ZERO hardcoded colors.

import Image from "next/image";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import type { FurnitureStoreInfo, FurnitureCheckoutFormData, FurnitureNavTab, FurnitureCartItem } from "../types";

interface CheckoutPageProps {
  store: FurnitureStoreInfo;
  items: FurnitureCartItem[];
  navLinks?: readonly { label: string; href: string }[];
  layout?: { footerStyle?: string };
  currencySymbol?: string;
  activeTab?: FurnitureNavTab;
  cartItemCount?: number;
  formData: FurnitureCheckoutFormData;
  mode?: "preview" | "live";
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onFieldChange?: (field: keyof FurnitureCheckoutFormData, value: string) => void;
  onSubmit?: () => void;
  onTabChange?: (tab: FurnitureNavTab) => void;
}

export function CheckoutPage({
  store,
  items,
  navLinks = [],
  layout,
  currencySymbol = "$",
  activeTab = "cart",
  cartItemCount = 0,
  formData,
  mode = "preview",
  onSearchClick,
  onCartClick,
  onFieldChange,
  onSubmit,
  onTabChange,
}: CheckoutPageProps) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = 15000;
  const total = subtotal + shipping;

  const fmt = (price: number) =>
    `${currencySymbol}${new Intl.NumberFormat("en-US").format(price)}`;

  const inputClass =
    "w-full px-3.5 py-3 text-sm rounded-[var(--t-radius-button)] border border-[var(--t-border-input)] bg-[var(--t-search-bg)] text-[var(--t-text-primary)] placeholder-[var(--t-text-muted)] outline-none focus:border-[var(--t-primary)] transition-colors";

  const labelClass = "block text-xs font-semibold text-[var(--t-text-primary)] mb-1";

  return (
    <div className="min-h-screen bg-[var(--t-background)]">
      <Header
        store={store}
        navLinks={navLinks as { label: string; href: string }[]}
        cartItemCount={cartItemCount}
        onCartClick={onCartClick}
        onSearchClick={onSearchClick}
      />

      <main className="pt-[60px] lg:pt-[72px] pb-10 px-5 md:px-6 lg:px-8 max-w-3xl mx-auto">
        <h1
          className="text-xl font-bold text-[var(--t-text-primary)] py-5"
          style={{ fontFamily: "var(--font-display, var(--font-sans, 'Inter', sans-serif))" }}
        >
          Finalizar pedido
        </h1>

        <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-8 lg:items-start">
          {/* Form */}
          <div className="space-y-4">
            {/* Contact info section */}
            <div
              className="p-4"
              style={{ borderRadius: "var(--t-radius-card)", border: "1px solid var(--t-border)", backgroundColor: "var(--t-background)" }}
            >
              <p className="text-sm font-bold text-[var(--t-text-primary)] mb-4">Información de contacto</p>
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Nombre completo *</label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => onFieldChange?.("nombre", e.target.value)}
                    placeholder="Tu nombre"
                    className={inputClass}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className={labelClass}>WhatsApp *</label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => onFieldChange?.("whatsapp", e.target.value)}
                    placeholder="3001234567"
                    className={inputClass}
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label className={labelClass}>Email (opcional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => onFieldChange?.("email", e.target.value)}
                    placeholder="tu@email.com"
                    className={inputClass}
                    autoComplete="email"
                  />
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div
              className="p-4"
              style={{ borderRadius: "var(--t-radius-card)", border: "1px solid var(--t-border)", backgroundColor: "var(--t-background)" }}
            >
              <p className="text-sm font-bold text-[var(--t-text-primary)] mb-4">Entrega</p>
              <div className="space-y-3">
                <div>
                  <label className={labelClass}>Dirección *</label>
                  <textarea
                    value={formData.direccion}
                    onChange={(e) => onFieldChange?.("direccion", e.target.value)}
                    placeholder="Calle, número, barrio, ciudad"
                    rows={2}
                    className={`${inputClass} resize-none`}
                    autoComplete="street-address"
                  />
                </div>
                <div>
                  <label className={labelClass}>Notas (opcional)</label>
                  <textarea
                    value={formData.notas}
                    onChange={(e) => onFieldChange?.("notas", e.target.value)}
                    placeholder="Instrucciones especiales para el envío"
                    rows={2}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </div>

            {/* Items summary */}
            <div
              className="p-4"
              style={{ borderRadius: "var(--t-radius-card)", border: "1px solid var(--t-border)", backgroundColor: "var(--t-background)" }}
            >
              <p className="text-sm font-bold text-[var(--t-text-primary)] mb-3">Productos ({items.length})</p>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-3">
                    <div
                      className="relative shrink-0 overflow-hidden"
                      style={{ width: "52px", height: "52px", borderRadius: "var(--t-radius-card)", backgroundColor: "var(--t-card-bg)" }}
                    >
                      {item.imageUrl && (
                        <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-1" sizes="52px" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[var(--t-text-primary)] line-clamp-1">{item.name}</p>
                      {item.variant && <p className="text-[10px] text-[var(--t-text-muted)]">{item.variant}</p>}
                      <p className="text-xs text-[var(--t-text-muted)]">x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-[var(--t-text-primary)] shrink-0">{fmt(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Shipment row */}
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[var(--t-border)]">
                <div
                  className="w-[52px] h-[52px] shrink-0 flex items-center justify-center"
                  style={{ borderRadius: "var(--t-radius-card)", backgroundColor: "var(--t-section-bg)" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--t-text-muted)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-[var(--t-text-primary)]">Envío estándar</p>
                  <p className="text-[10px] text-[var(--t-text-muted)]">3-5 días hábiles</p>
                </div>
                <p className="text-sm font-bold text-[var(--t-text-primary)]">{fmt(shipping)}</p>
              </div>
            </div>
          </div>

          {/* Order summary sticky */}
          <div
            className="mt-4 lg:mt-0 p-5 lg:sticky lg:top-[80px]"
            style={{
              borderRadius: "var(--t-radius-card)",
              backgroundColor: "var(--t-secondary)",
            }}
          >
            <p className="text-base font-bold text-white mb-4">Resumen</p>
            <div className="space-y-2 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Subtotal</span>
                <span className="text-white font-medium">{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Envío</span>
                <span className="text-white font-medium">{fmt(shipping)}</span>
              </div>
              <div className="h-px bg-white/10 my-2" />
              <div className="flex justify-between text-base">
                <span className="text-white font-bold">Total</span>
                <span className="text-white font-bold">{fmt(total)}</span>
              </div>
            </div>

            {mode === "preview" && (
              <p className="text-[10px] text-white/50 text-center mb-3">
                Vista previa — conectá tu número de WhatsApp para recibir pedidos reales
              </p>
            )}

            <button
              onClick={onSubmit}
              className="w-full py-3.5 font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
              style={{
                borderRadius: "var(--t-radius-button)",
                backgroundColor: "var(--t-primary)",
                color: "var(--t-button-text)",
              }}
            >
              {/* WhatsApp icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Pedir por WhatsApp
            </button>
          </div>
        </div>
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
