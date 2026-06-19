import type { Metadata } from "next";
import type { ProductLike } from "./json-ld";

export function generateProductMetadata(
  product: ProductLike,
  storeName: string,
): Metadata {
  const productImage = product.images[0]?.url ?? "";
  const formattedPrice = `$${new Intl.NumberFormat("es-CO").format(product.price)}`;
  const description = `${product.name} por ${formattedPrice}. ${product.description ?? "Comprá ahora en " + storeName + "."}`;

  return {
    title: `${product.name} | ${storeName}`,
    description,
    openGraph: {
      title: `${product.name} | ${storeName}`,
      description,
      images: productImage ? [{ url: productImage }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${storeName}`,
      description: `${product.name} por ${formattedPrice}.`,
      images: productImage ? [productImage] : [],
    },
  };
}

export function generateCatalogMetadata(storeName: string): Metadata {
  const description = `Explorá el catálogo completo de ${storeName}. Todos los productos disponibles.`;

  return {
    title: `Catálogo | ${storeName}`,
    description,
    openGraph: {
      title: `Catálogo | ${storeName}`,
      description,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `Catálogo | ${storeName}`,
      description,
    },
  };
}
