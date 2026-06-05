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
import {
  mockStore as petsModernMockStore,
  mockProducts as petsModernMockProducts,
} from "@/templates/pets-modern/mock/data";
import { ProductDetailShellRoute as PetsModernProductDetailShellRoute } from "@/templates/pets-modern/components/ProductDetailShellRoute";
import { ProductDetailShellRoute as ElectronicsClassicProductDetailShellRoute } from "@/templates/electronics-classic/components/ProductDetailShellRoute";
import { ProductDetailShellRoute as FurnitureDarkProductDetailShellRoute } from "@/templates/furniture-dark/components/ProductDetailShellRoute";
import {
  mockStore as beautySoftMockStore,
  mockProducts as beautySoftMockProducts,
  mockDetailProduct as beautySoftMockDetailProduct,
} from "@/templates/beauty-soft/mock/data";
import { ProductDetailShellRoute as BeautySoftProductDetailShellRoute } from "@/templates/beauty-soft/components/ProductDetailShellRoute";
import {
  mockStore as beautyElegantMockStore,
  mockProducts as beautyElegantMockProducts,
  mockDetailProduct as beautyElegantMockDetailProduct,
} from "@/templates/beauty-elegant/mock/data";
import { ProductDetailShellRoute as BeautyElegantProductDetailShellRoute } from "@/templates/beauty-elegant/components/ProductDetailShellRoute";
import {
  mockStore as decorWarmMockStore,
  mockProducts as decorWarmMockProducts,
  mockCategories as decorWarmMockCategories,
  mockDetailProduct as decorWarmMockDetailProduct,
} from "@/templates/decor-warm/mock/data";
import { ProductDetailShellRoute as DecorWarmProductDetailShellRoute } from "@/templates/decor-warm/components/ProductDetailShellRoute";
import {
  mockStore as foodNightMockStore,
  mockProducts as foodNightMockProducts,
  mockDetailProduct as foodNightMockDetailProduct,
  mockSizeOptions as foodNightMockSizeOptions,
} from "@/templates/food-night/mock/data";
import { ProductDetailShellRoute as FoodNightProductDetailShellRoute } from "@/templates/food-night/components/ProductDetailShellRoute";
import {
  mockStore as furnitureLightMockStore,
  mockProducts as furnitureLightMockProducts,
  mockDetailProduct as furnitureLightMockDetailProduct,
} from "@/templates/furniture-light/mock/data";
import { ProductDetailShellRoute as FurnitureLightProductDetailShellRoute } from "@/templates/furniture-light/components/ProductDetailShellRoute";
import {
  mockStore as petsClassicMockStore,
  mockProducts as petsClassicMockProducts,
  mockDetailProduct as petsClassicMockDetailProduct,
} from "@/templates/pets-classic/mock/data";
import { ProductDetailShellRoute as PetsClassicProductDetailShellRoute } from "@/templates/pets-classic/components/ProductDetailShellRoute";

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

  // ── Pets Modern ──────────────────────────────────────────────────────────────────
  if (templateName === "pets-modern") {
    const product = petsModernMockProducts.find(
      (p) => p.id === productId || p.slug === productId
    );

    if (!product) notFound();

    return (
      <PetsModernProductDetailShellRoute
        store={petsModernMockStore}
        product={product}
      />
    );
  }

  // ── Electronics Classic ───────────────────────────────────────────────────────
  if (templateName === "electronics-classic") {
    return <ElectronicsClassicProductDetailShellRoute productId={productId} />;
  }

  // ── Furniture Dark ────────────────────────────────────────────────────────────
  if (templateName === "furniture-dark") {
    return <FurnitureDarkProductDetailShellRoute productId={productId} />;
  }

  // ── Beauty Soft ───────────────────────────────────────────────────────────────
  if (templateName === "beauty-soft") {
    const product =
      beautySoftMockProducts.find((p) => p.id === productId || p.slug === productId) ??
      (productId === beautySoftMockDetailProduct.id || productId === beautySoftMockDetailProduct.slug
        ? beautySoftMockDetailProduct
        : null);

    if (!product) notFound();

    return (
      <BeautySoftProductDetailShellRoute
        store={beautySoftMockStore}
        product={product}
      />
    );
  }

  // ── Beauty Elegant ────────────────────────────────────────────────────────────
  if (templateName === "beauty-elegant") {
    const product =
      beautyElegantMockProducts.find((p) => p.id === productId || p.slug === productId) ??
      (productId === beautyElegantMockDetailProduct.id || productId === beautyElegantMockDetailProduct.slug
        ? beautyElegantMockDetailProduct
        : null);

    if (!product) notFound();

    const relatedProducts = beautyElegantMockProducts
      .filter((p) => p.id !== product.id)
      .slice(0, 4);

    return (
      <BeautyElegantProductDetailShellRoute
        store={beautyElegantMockStore}
        product={product}
        relatedProducts={relatedProducts}
      />
    );
  }

  // ── Decor Warm ───────────────────────────────────────────────────────────────
  if (templateName === "decor-warm") {
    const product =
      decorWarmMockProducts.find((p) => p.id === productId || p.slug === productId) ??
      (productId === decorWarmMockDetailProduct.id || productId === decorWarmMockDetailProduct.slug
        ? decorWarmMockDetailProduct
        : null);

    if (!product) notFound();

    return (
      <DecorWarmProductDetailShellRoute
        store={decorWarmMockStore}
        product={product}
        categories={decorWarmMockCategories}
      />
    );
  }

  // ── Food Night ─────────────────────────────────────────────────────────────────
  if (templateName === "food-night") {
    const product =
      foodNightMockProducts.find((p) => p.id === productId || p.slug === productId) ??
      (productId === foodNightMockDetailProduct.id || productId === foodNightMockDetailProduct.slug
        ? foodNightMockDetailProduct
        : null);

    if (!product) notFound();

    return (
      <FoodNightProductDetailShellRoute
        store={foodNightMockStore}
        product={product}
        sizeOptions={foodNightMockSizeOptions}
      />
    );
  }

  // ── Furniture Light ───────────────────────────────────────────────────────────
  if (templateName === "furniture-light") {
    const product =
      furnitureLightMockProducts.find((p) => p.id === productId || p.slug === productId) ??
      (productId === furnitureLightMockDetailProduct.id || productId === furnitureLightMockDetailProduct.slug
        ? furnitureLightMockDetailProduct
        : null);

    if (!product) notFound();

    const relatedProducts = furnitureLightMockProducts
      .filter((p) => p.id !== product.id)
      .slice(0, 4);

    return (
      <FurnitureLightProductDetailShellRoute
        store={furnitureLightMockStore}
        product={product}
        relatedProducts={relatedProducts}
      />
    );
  }

  // ── Pets Classic ──────────────────────────────────────────────────────────────
  if (templateName === "pets-classic") {
    const product =
      petsClassicMockProducts.find((p) => p.id === productId || p.slug === productId) ??
      (productId === petsClassicMockDetailProduct.id || productId === petsClassicMockDetailProduct.slug
        ? petsClassicMockDetailProduct
        : null);

    if (!product) notFound();

    return (
      <PetsClassicProductDetailShellRoute
        store={petsClassicMockStore}
        product={product}
        allProducts={petsClassicMockProducts}
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
