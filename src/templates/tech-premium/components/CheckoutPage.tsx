// Tech Premium Template — WhatsApp Checkout Page
// Desktop: 2-col (form left, summary right sticky). Mobile: stacked.
// mode="preview" → shows CTA "¿Te gustó? Creá tu tienda" instead of WhatsApp send.
// mode="live" → sends WhatsApp message.
// Visual only — handlers come as props.

import { Header } from "./Header";
import { FooterRouter } from "./FooterRouter";
import { BottomNavRouter } from "./BottomNavRouter";
import { CheckoutRouter } from "./CheckoutRouter";
import type { TemplateLayoutConfig } from "@/types/templates";
import type { StructuralVariants, TemplateRecipe } from "@/types/templates/structural-variants";
import type {
  StoreInfo,
  CartItem,
  NavTab,
  CheckoutFormData,
  TemplateMode,
} from "../types";

interface CheckoutPageProps {
  store: StoreInfo;
  items: CartItem[];
  navLinks: readonly { label: string; href: string }[];
  footerServices: readonly string[];
  footerAssistance: readonly string[];
  layout?: Partial<TemplateLayoutConfig>;
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
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
  structuralVariants,
  recipe,
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
        <CheckoutRouter
          items={items}
          currencySymbol={currencySymbol}
          mode={mode}
          formData={formData}
          onFieldChange={onFieldChange}
          onSubmit={onSubmit}
          structuralVariants={structuralVariants}
          recipe={recipe}
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
