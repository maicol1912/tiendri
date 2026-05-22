// Tech Premium — Search page
// Route: /template/tech-premium/buscar
// Layout (CartProvider + CSS vars + customizer) provided by parent layout.tsx.

import type { Metadata } from "next";
import {
  mockStore,
  mockProducts,
  mockDiscountProducts,
} from "@/templates/tech-premium/mock/data";
import { SearchShellRoute } from "@/templates/tech-premium/components/SearchShellRoute";

export const metadata: Metadata = {
  title: "Buscar",
  robots: { index: false, follow: true },
};

export default function BuscarPage() {
  return (
    <SearchShellRoute
      store={mockStore}
      allProducts={[...mockProducts, ...mockDiscountProducts]}
    />
  );
}
