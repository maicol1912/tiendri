// Tech Premium — Cart page
// Route: /template/tech-premium/carrito
// Layout (CartProvider + CSS vars + customizer) provided by parent layout.tsx.

import { mockStore } from "@/templates/tech-premium/mock/data";
import { CartShellRoute } from "@/templates/tech-premium/components/CartShellRoute";

export default function CarritoPage() {
  return <CartShellRoute store={mockStore} />;
}
