// Tech Premium — Product detail page
// Route: /template/tech-premium/producto/[productId]
// Layout (CartProvider + CSS vars + customizer) provided by parent layout.tsx.

import { notFound } from "next/navigation";
import {
  mockStore,
  mockProducts,
  mockDiscountProducts,
  mockDetailProduct,
  mockSpecBadges,
  mockReviews,
  mockRatingDistribution,
} from "@/templates/tech-premium/mock/data";
import { ProductDetailShellRoute } from "@/templates/tech-premium/components/ProductDetailShellRoute";

interface ProductDetailPageProps {
  params: Promise<{ templateName: string; productId: string }>;
}

export default async function ProductoPage({ params }: ProductDetailPageProps) {
  const { productId } = await params;

  // Find product in mock data — falls back to mockDetailProduct for demo IDs
  const allProducts = [...mockProducts, ...mockDiscountProducts];
  const product =
    allProducts.find((p) => p.id === productId || p.slug === productId) ??
    (productId === mockDetailProduct.id || productId === mockDetailProduct.slug
      ? mockDetailProduct
      : null);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <ProductDetailShellRoute
      store={mockStore}
      product={product}
      relatedProducts={relatedProducts}
      specBadges={mockSpecBadges}
      reviews={mockReviews}
      overallRating={4.9}
      totalReviews={125}
      ratingDistribution={mockRatingDistribution}
    />
  );
}
