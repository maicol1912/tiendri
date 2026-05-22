// Tech Premium — Checkout page
// Route: /template/tech-premium/checkout
// Layout (CartProvider + CSS vars + customizer) provided by parent layout.tsx.

import { mockStore } from "@/templates/tech-premium/mock/data";
import { CheckoutShellRoute } from "@/templates/tech-premium/components/CheckoutShellRoute";

export default function CheckoutPage() {
  return <CheckoutShellRoute store={mockStore} mode="preview" />;
}
