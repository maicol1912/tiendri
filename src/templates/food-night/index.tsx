// Food Night Template — Entry Point
// Default export for templateRegistry compatibility.
// The live app renders HomeShell (and *ShellRoute variants) directly via sub-routes.

import { HomeShell } from "./components/HomeShell";
import { mockStore, mockCategories, mockProducts } from "./mock/data";

export default function FoodNightTemplate() {
  return (
    <HomeShell
      store={mockStore}
      categories={mockCategories}
      products={mockProducts}
    />
  );
}

// Named exports for direct component access
export { HomeShell } from "./components/HomeShell";
export { HomePage } from "./components/HomePage";
export { ProductDetailPage } from "./components/ProductDetailPage";
export { ProductDetailShellRoute } from "./components/ProductDetailShellRoute";
export { ProductListingPage } from "./components/ProductListingPage";
export { ListingShellRoute } from "./components/ListingShellRoute";
export { CartPage } from "./components/CartPage";
export { CartShellRoute } from "./components/CartShellRoute";
export { SearchPage } from "./components/SearchPage";
export { SearchShellRoute } from "./components/SearchShellRoute";
export { CheckoutPage } from "./components/CheckoutPage";
export { CheckoutShellRoute } from "./components/CheckoutShellRoute";
export { CartProvider, useCart } from "@/lib/cart";
export type {
  StoreInfo,
  StorefrontProduct,
  Category,
  NavTab,
  SizeOption,
  CheckoutFormData,
} from "./types";
