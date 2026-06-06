// Tech Premium Template — Cart Page
// Desktop: 2-col — cart items left, order summary right (sticky).
// Mobile: stacked — items + summary below.
// Cart content delegated to CartRouter (swappable variant).

import { Header } from "./Header";
import { FooterRouter } from "./FooterRouter";
import { BottomNavRouter } from "./BottomNavRouter";
import { CartRouter } from "./CartRouter";
import type { TemplateLayoutConfig } from "@/types/templates";
import type { StructuralVariants, TemplateRecipe } from "@/types/templates/structural-variants";
import type { StoreInfo, CartItem, NavTab } from "../types";

interface CartPageProps {
  store: StoreInfo;
  items: CartItem[];
  navLinks: readonly { label: string; href: string }[];
  footerServices: readonly string[];
  footerAssistance: readonly string[];
  layout?: Partial<TemplateLayoutConfig>;
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
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
  onContinueShopping?: () => void;
  onTabChange?: (tab: NavTab) => void;
  onNavLinkClick?: (href: string) => void;
}

export function CartPage({
  store,
  items,
  navLinks,
  footerServices,
  footerAssistance,
  layout,
  structuralVariants,
  recipe,
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
  onContinueShopping,
  onTabChange,
  onNavLinkClick,
}: CartPageProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

      <main className="flex-1 px-4 py-10 lg:px-[160px] lg:py-[112px]">
        <CartRouter
          items={items}
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          currencySymbol={currencySymbol}
          buttonStyle={layout?.buttonStyle}
          structuralVariants={structuralVariants}
          recipe={recipe}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onRemove={onRemove}
          onCheckout={onCheckout}
          onContinueShopping={onContinueShopping}
        />
      </main>

      <FooterRouter store={store} services={footerServices} assistance={footerAssistance} />

      <BottomNavRouter
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
      <div className="h-16 lg:hidden" />
    </div>
  );
}
