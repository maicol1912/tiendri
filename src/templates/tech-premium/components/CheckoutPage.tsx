// Tech Premium Template — WhatsApp Checkout Page
// Desktop: 2-col (form left, summary right sticky). Mobile: stacked.
// mode="preview" → shows CTA "¿Te gustó? Creá tu tienda" instead of WhatsApp send.
// mode="live" → sends WhatsApp message.
// Visual only — handlers come as props.

import Image from "next/image";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { CheckoutForm } from "./CheckoutForm";
import { BUTTON_STYLE_MAP } from "@/templates/_shared/style-maps";
import type { TemplateLayoutConfig } from "@/types/templates";
import type {
  StoreInfo,
  CartItem,
  NavTab,
  CheckoutFormData,
  TemplateMode,
} from "../types";

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

interface CheckoutPageProps {
  store: StoreInfo;
  items: CartItem[];
  navLinks: readonly { label: string; href: string }[];
  footerServices: readonly string[];
  footerAssistance: readonly string[];
  layout?: Partial<TemplateLayoutConfig>;
  currencySymbol?: string;
  activeTab?: NavTab;
  cartItemCount?: number;
  formData?: Partial<CheckoutFormData>;
  mode?: TemplateMode;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onFieldChange?: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onNavLinkClick?: (href: string) => void;
}


export function CheckoutPage({
  store,
  items,
  navLinks,
  footerServices,
  footerAssistance,
  layout,
  currencySymbol = "$",
  activeTab = "cart",
  cartItemCount = 0,
  formData = {},
  mode = "preview",
  onSearchClick,
  onCartClick,
  onFieldChange,
  onSubmit,
  onTabChange,
  onNavLinkClick,
}: CheckoutPageProps) {
  const whatsappBtnClass = BUTTON_STYLE_MAP[layout?.buttonStyle ?? "filled"];
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const isEmpty = items.length === 0;

  const fmt = (price: number) =>
    `${currencySymbol}${new Intl.NumberFormat("en-US").format(price)}`;

  return (
    <div className="bg-[var(--t-section-bg)] min-h-screen font-['Inter',sans-serif] flex flex-col">
      <Header
        store={store}
        navLinks={navLinks}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onNavLinkClick={onNavLinkClick}
      />

      <main className="flex-1 px-4 py-10 lg:px-[160px] lg:py-16">
        {isEmpty ? (
          <div className="flex flex-col items-center gap-4 py-20">
            <p className="text-xl font-semibold text-[var(--t-text-primary)]">No hay artículos para finalizar la compra</p>
            <p className="text-base text-[var(--t-text-secondary)]">Agregá artículos al carrito primero</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
            {/* Left: Form */}
            <CheckoutForm
              formData={formData}
              onFieldChange={onFieldChange}
              onSubmit={onSubmit}
            />

            {/* Right: Summary */}
            <aside className="lg:w-[380px] shrink-0">
              <div className="border border-[var(--t-border-light)] rounded-[10px] px-6 py-8 flex flex-col gap-6 lg:sticky lg:top-24">
                <h2 className="text-lg font-bold text-[var(--t-primary)]">Resumen del pedido</h2>

                {/* Items list */}
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 shrink-0 bg-[var(--t-card-bg)] rounded">
                        {item.imageUrl && (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-contain"
                            sizes="48px"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--t-text-primary)] truncate">{item.name}</p>
                        <p className="text-xs text-[var(--t-text-secondary)]">x{item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-[var(--t-text-primary)] shrink-0">
                        {fmt(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t border-[var(--t-border-light)] pt-4 flex items-center justify-between">
                  <span className="text-base font-semibold text-[var(--t-text-primary)]">Total</span>
                  <span className="text-base font-semibold text-[var(--t-text-primary)]">{fmt(subtotal)}</span>
                </div>

                {/* CTA */}
                {mode === "preview" ? (
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      className={`w-full py-4 text-base font-medium rounded-[var(--t-radius-button)] border cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center gap-3 ${whatsappBtnClass}`}
                      onClick={onSubmit}
                    >
                      <WhatsAppIcon />
                      Enviar por WhatsApp
                    </button>
                    <p className="text-xs text-center text-[var(--t-text-secondary)]">
                      ¿Te gustó este template?{" "}
                      <span className="text-[var(--t-text-primary)] underline cursor-pointer font-medium">
                        Creá tu tienda gratis
                      </span>
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={`w-full py-4 text-base font-medium rounded-[var(--t-radius-button)] border cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center gap-3 ${whatsappBtnClass}`}
                    onClick={onSubmit}
                  >
                    <WhatsAppIcon />
                    Enviar por WhatsApp
                  </button>
                )}
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer store={store} services={footerServices} assistance={footerAssistance} />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
      <div className="h-16 lg:hidden" />
    </div>
  );
}
