// Electronics Classic Template — Entry Point
// Default export for templateRegistry compatibility.
// The live app renders HomeShell directly via sub-routes.

import { HomeShell } from "./components/HomeShell";

export default function ElectronicsClassicTemplate() {
  return <HomeShell />;
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
export { CheckoutPage } from "./components/CheckoutPage";
export { CheckoutShellRoute } from "./components/CheckoutShellRoute";
export { SearchShellRoute } from "./components/SearchShellRoute";
export { StoreInfoPage } from "./components/StoreInfoPage";
export { StoreInfoShellRoute } from "./components/StoreInfoShellRoute";
export { CartProvider, useCart } from "./context/CartContext";
export { electronicsClassicConfig } from "./config";
export type { ElectronicsClassicConfig } from "./config";
export { electronicsClassicConfigSchema } from "./config-schema";
