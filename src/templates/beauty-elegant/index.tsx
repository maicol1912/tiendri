// Beauty Elegant Template — Entry Point
// Default export for templateRegistry dynamic import.

export { HomeShell as default } from "./components/HomeShell";

// Config
export { beautyElegantConfig } from "./config";
export type { BeautyElegantConfig } from "./config";

// Components
export { HomeShell } from "./components/HomeShell";
export { ProductDetailShellRoute } from "./components/ProductDetailShellRoute";
export { CartShellRoute } from "./components/CartShellRoute";
export { CheckoutShellRoute } from "./components/CheckoutShellRoute";
export { ListingShellRoute } from "./components/ListingShellRoute";
export { SearchShellRoute } from "./components/SearchShellRoute";

// Context
export { CartProvider, useCart } from "./context/CartContext";

// Mock
export * from "./mock/data";
