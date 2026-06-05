// Pets Classic Template — Public Entry Point
// Barrel exports for use in routing and integration files.

export { HomeShell } from "./components/HomeShell";
export { CartShellRoute } from "./components/CartShellRoute";
export { SearchShellRoute } from "./components/SearchShellRoute";
export { CheckoutShellRoute } from "./components/CheckoutShellRoute";
export { ListingShellRoute } from "./components/ListingShellRoute";
export { ProductDetailShellRoute } from "./components/ProductDetailShellRoute";
export { CartProvider } from "./context/CartContext";
export { petsClassicConfig } from "./config";
export { petsClassicPalettes } from "./palettes";
export { TEMPLATE_BASE } from "./hooks/useTemplateNav";
export type { PetsClassicConfig } from "./config";
export type { StoreInfo, PetsClassicProduct, PetsClassicCategory } from "./types";
