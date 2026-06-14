// Furniture Dark — Template entry point
// Exports the config and all shell components needed by routing.

export { furnitureDarkConfig } from "./config";
export { furnitureDarkConfigSchema } from "./config-schema";
export { HomeShell } from "./components/HomeShell";
export { ProductDetailShellRoute } from "./components/ProductDetailShellRoute";
export { CartShellRoute } from "./components/CartShellRoute";
export { CheckoutShellRoute } from "./components/CheckoutShellRoute";
export { ListingShellRoute } from "./components/ListingShellRoute";
export { SearchShellRoute } from "./components/SearchShellRoute";
export { CartProvider } from "@/lib/cart";
