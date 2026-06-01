// Product detail page — supports tech-premium and fashion templates.
// Route: /template/[templateName]/producto/[productId]
// Layout bypass is active for non-tech-premium (shells own their CartProvider).

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  mockStore as tpMockStore,
  mockProducts as tpMockProducts,
  mockDiscountProducts as tpMockDiscountProducts,
  mockDetailProduct as tpMockDetailProduct,
  mockSpecBadges,
  mockReviews,
  mockRatingDistribution,
} from "@/templates/tech-premium/mock/data";
import { ProductDetailShellRoute as TechPremiumProductDetailShellRoute } from "@/templates/tech-premium/components/ProductDetailShellRoute";
import {
  mockStore as fashionMockStore,
  mockProducts as fashionMockProducts,
  mockDiscountProducts as fashionMockDiscountProducts,
  mockDetailProduct as fashionMockDetailProduct,
} from "@/templates/fashion/mock/data";
import { ProductDetailShellRoute as FashionProductDetailShellRoute } from "@/templates/fashion/components/ProductDetailShellRoute";

interface ProductDetailPageProps {
  params: Promise<{ templateName: string; productId: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { templateName, productId } = await params;

  if (templateName === "fashion") {
    const allProducts = [...fashionMockProducts, ...fashionMockDiscountProducts];
    const product =
      allProducts.find((p) => p.id === productId || p.slug === productId) ??
      (productId === fashionMockDetailProduct.id || productId === fashionMockDetailProduct.slug
        ? fashionMockDetailProduct
        : null);

    if (!product) return { title: "Producto no encontrado" };

    const productImage = product.images[0]?.url ?? "";
    const formattedPrice = `$${new Intl.NumberFormat("es-CO").format(product.price)}`;

    return {
      title: `${product.name} | ${fashionMockStore.name}`,
      description: `${product.name} por ${formattedPrice}. ${product.description ?? "Comprá ahora en " + fashionMockStore.name + "."}`,
      openGraph: {
        title: `${product.name} | ${fashionMockStore.name}`,
        description: `${product.name} por ${formattedPrice}. ${product.description ?? "Comprá ahora en " + fashionMockStore.name + "."}`,
        images: productImage ? [{ url: productImage }] : [],
        type: "website",
      },
    };
  }

  // Default: tech-premium
  const allProducts = [...tpMockProducts, ...tpMockDiscountProducts];
  const product =
    allProducts.find((p) => p.id === productId || p.slug === productId) ??
    (productId === tpMockDetailProduct.id || productId === tpMockDetailProduct.slug
      ? tpMockDetailProduct
      : null);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  const productImage = product.images[0]?.url ?? "";
  const formattedPrice = `$${new Intl.NumberFormat("es-CO").format(product.price)}`;

  return {
    title: `${product.name} | ${tpMockStore.name}`,
    description: `${product.name} por ${formattedPrice}. ${product.description ?? "Comprá ahora en " + tpMockStore.name + "."}`,
    openGraph: {
      title: `${product.name} | ${tpMockStore.name}`,
      description: `${product.name} por ${formattedPrice}. ${product.description ?? "Comprá ahora en " + tpMockStore.name + "."}`,
      images: productImage ? [{ url: productImage }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${tpMockStore.name}`,
      description: `${product.name} por ${formattedPrice}.`,
      images: productImage ? [productImage] : [],
    },
  };
}

export default async function ProductoPage({ params }: ProductDetailPageProps) {
  const { templateName, productId } = await params;

  // ── Fashion ──────────────────────────────────────────────────────────────────
  if (templateName === "fashion") {
    const allProducts = [...fashionMockProducts, ...fashionMockDiscountProducts];
    const product =
      allProducts.find((p) => p.id === productId || p.slug === productId) ??
      (productId === fashionMockDetailProduct.id || productId === fashionMockDetailProduct.slug
        ? fashionMockDetailProduct
        : null);

    if (!product) notFound();

    return (
      <FashionProductDetailShellRoute
        store={fashionMockStore}
        product={product}
      />
    );
  }

  // ── Tech Premium (default) ────────────────────────────────────────────────────
  const allProducts = [...tpMockProducts, ...tpMockDiscountProducts];
  const product =
    allProducts.find((p) => p.id === productId || p.slug === productId) ??
    (productId === tpMockDetailProduct.id || productId === tpMockDetailProduct.slug
      ? tpMockDetailProduct
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
    description: product.description ?? `${product.name} disponible en ${tpMockStore.name}.`,
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
      <TechPremiumProductDetailShellRoute
        store={tpMockStore}
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
