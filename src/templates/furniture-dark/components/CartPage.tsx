// Furniture Dark — CartPage
// Page shell: Header + CartRouter (swappable variant) + BottomNavRouter
// ALL colors via var(--t-*)

import type { StorefrontStore } from "../types";
import type { CartItem } from "../types";
import type { StructuralVariants, TemplateRecipe } from "@/types/templates/structural-variants";
import { Header } from "./Header";
import { BottomNavRouter } from "./BottomNavRouter";
import { CartRouter } from "./CartRouter";

interface CartPageProps {
  store: StorefrontStore;
  items: CartItem[];
  totalPrice: number;
  cartItemCount?: number;
  discount?: number;
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
  onSearchClick: () => void;
  onCartClick: () => void;
  onBottomNavTab: (tab: "home" | "cart" | "search" | "info") => void;
}

export function CartPage({
  store,
  items,
  totalPrice,
  cartItemCount = 0,
  discount,
  structuralVariants,
  recipe,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
  onContinueShopping,
  onSearchClick,
  onCartClick,
  onBottomNavTab,
}: CartPageProps) {
  return (
    <div
      className="min-h-screen pb-28 lg:pb-12"
      style={{ backgroundColor: "var(--t-background)" }}
    >
      <Header
        store={store}
        cartItemCount={cartItemCount}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
      />

      <CartRouter
        items={items}
        totalPrice={totalPrice}
        discount={discount}
        structuralVariants={structuralVariants}
        recipe={recipe}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onRemove={onRemove}
        onCheckout={onCheckout}
        onContinueShopping={onContinueShopping}
      />

      <BottomNavRouter
        activeTab="cart"
        cartItemCount={cartItemCount}
        onTab={onBottomNavTab}
      />
    </div>
  );
}
