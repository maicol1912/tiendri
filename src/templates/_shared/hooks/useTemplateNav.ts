"use client";

import { useRouter, useParams } from "next/navigation";

export interface TemplateNav {
  basePath: string;
  goHome: () => void;
  goProduct: (id: string) => void;
  goListing: () => void;
  goCart: () => void;
  goSearch: () => void;
  goCheckout: () => void;
  goInfo: () => void;
}

export function useTemplateNav(): TemplateNav {
  const router = useRouter();
  const params = useParams();

  // Soporta tanto la ruta de preview (/template/[templateName])
  // como la ruta de storefront (/[slug]).
  const templateName = params["templateName"] as string | undefined;
  const slug = params["slug"] as string | undefined;
  const basePath = templateName
    ? `/template/${templateName}`
    : `/${slug ?? ""}`;

  return {
    basePath,
    goHome: () => router.push(basePath),
    goProduct: (id: string) => router.push(`${basePath}/producto/${id}`),
    goListing: () => router.push(`${basePath}/catalogo`),
    goCart: () => router.push(`${basePath}/carrito`),
    goSearch: () => router.push(`${basePath}/buscar`),
    goCheckout: () => router.push(`${basePath}/checkout`),
    goInfo: () => router.push(`${basePath}/info`),
  };
}
