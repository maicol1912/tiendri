// Furniture Light — Checkout Page
// Form left (nombre/whatsapp/dirección/email/notas), items + shipment section, order summary right
// WhatsApp CTA. ZERO hardcoded colors.

import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { CheckoutForm } from "./CheckoutForm";
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

        <CheckoutForm
          items={items}
          currencySymbol={currencySymbol}
          formData={formData}
          mode={mode}
          onFieldChange={onFieldChange}
          onSubmit={onSubmit}
        />
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
