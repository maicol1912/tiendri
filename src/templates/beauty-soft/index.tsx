// Beauty Soft Template — Entry Point
// Default export for templateRegistry compatibility.
// Live app renders HomeShell (and *ShellRoute variants) directly via sub-routes.

import { HomeShell } from "./components/HomeShell";
import { mockStore, mockCategories, mockProducts, mockHeroBanner } from "./mock/data";

export default function BeautySoftTemplate() {
  return (
    <HomeShell
      store={mockStore}
      categories={mockCategories}
      products={mockProducts}
      heroBanner={mockHeroBanner}
    />
  );
}

// Named component exports
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
export { CartProvider, useCart } from "./context/CartContext";
export type { BeautySoftProduct, BeautySoftCategory, HeroBannerData, NavTab, CheckoutOrderItem } from "./types";
