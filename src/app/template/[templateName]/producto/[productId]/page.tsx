// Tech Premium — Product detail page
// Route: /template/tech-premium/producto/[productId]
// Layout (CartProvider + CSS vars + customizer) provided by parent layout.tsx.

import type { Metadata } from "next";
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

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { productId } = await params;

  const allProducts = [...mockProducts, ...mockDiscountProducts];
  const product =
    allProducts.find((p) => p.id === productId || p.slug === productId) ??
    (productId === mockDetailProduct.id || productId === mockDetailProduct.slug
      ? mockDetailProduct
      : null);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  const productImage = product.images[0]?.url ?? "";
  const formattedPrice = `$${new Intl.NumberFormat("es-CO").format(product.price)}`;

  return {
    title: `${product.name} | ${mockStore.name}`,
    description: `${product.name} por ${formattedPrice}. ${product.description ?? "Comprá ahora en " + mockStore.name + "."}`,
    openGraph: {
      title: `${product.name} | ${mockStore.name}`,
      description: `${product.name} por ${formattedPrice}. ${product.description ?? "Comprá ahora en " + mockStore.name + "."}`,
      images: productImage ? [{ url: productImage }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${mockStore.name}`,
      description: `${product.name} por ${formattedPrice}.`,
      images: productImage ? [productImage] : [],
    },
  };
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

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? `${product.name} disponible en ${mockStore.name}.`,
    image: product.images[0]?.url ?? "",
    offers: {
      "@type": "Offer",
      price: String(product.price),
      priceCurrency: "COP",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    ...(product.rating != null && product.reviewCount != null
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: String(product.rating),
            reviewCount: String(product.reviewCount),
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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
    </>
  );
}
