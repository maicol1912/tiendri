// Furniture Dark — CheckoutPage
// Presentational: 2-col desktop; form left + order summary right
// ALL text Spanish Colombian; ALL colors via var(--t-*)

import type { CartItem, CheckoutFormData } from "../types";
import type { StorefrontStore } from "../types";
import type { StructuralVariants, TemplateRecipe } from "@/types/templates/structural-variants";
import { Header } from "./Header";
import { CheckoutRouter } from "./CheckoutRouter";

interface CheckoutPageProps {
  store: StorefrontStore;
  items: CartItem[];
  totalPrice: number;
  formData: CheckoutFormData;
  isSubmitting?: boolean;
  cartItemCount?: number;
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  onSearchClick: () => void;
  onCartClick: () => void;
}

export function CheckoutPage({
  store,
  items,
  totalPrice,
  formData,
  isSubmitting = false,
  cartItemCount = 0,
  structuralVariants,
  recipe,
  onChange,
  onSubmit,
  onBack,
  onSearchClick,
  onCartClick,
}: CheckoutPageProps) {
  return (
    <div
      className="min-h-screen pb-12"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
      />

      <CheckoutRouter
        items={items}
        totalPrice={totalPrice}
        isSubmitting={isSubmitting}
        formData={formData}
        onFieldChange={onChange}
        onSubmit={onSubmit}
        onBack={onBack}
        structuralVariants={structuralVariants}
        recipe={recipe}
      />
    </div>
  );
}
