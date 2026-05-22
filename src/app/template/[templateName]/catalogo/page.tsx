// Tech Premium — Product listing page
// Route: /template/tech-premium/catalogo
// Layout (CartProvider + CSS vars + customizer) provided by parent layout.tsx.

import {
  mockStore,
  mockProducts,
  mockDiscountProducts,
  mockFilterGroups,
} from "@/templates/tech-premium/mock/data";
import { ListingShellRoute } from "@/templates/tech-premium/components/ListingShellRoute";

export default function CatalogoPage() {
  return (
    <ListingShellRoute
      store={mockStore}
      products={[...mockProducts, ...mockDiscountProducts]}
      filters={mockFilterGroups}
    />
  );
}
