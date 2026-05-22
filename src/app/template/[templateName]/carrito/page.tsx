// Tech Premium — Cart page
// Route: /template/tech-premium/carrito
// Layout (CartProvider + CSS vars + customizer) provided by parent layout.tsx.

import type { Metadata } from "next";
import { mockStore } from "@/templates/tech-premium/mock/data";
import { CartShellRoute } from "@/templates/tech-premium/components/CartShellRoute";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CarritoPage() {
  return <CartShellRoute store={mockStore} />;
}
