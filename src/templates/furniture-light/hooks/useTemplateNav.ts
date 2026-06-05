"use client";

// Furniture Light — Navigation Hook
// Centralizes all navigation. Never construct URL strings in components.

import { useRouter, useParams } from "next/navigation";

export const TEMPLATE_BASE = "furniture-light";

export interface TemplateNav {
  basePath: string;
  goHome: () => void;
  goProduct: (id: string) => void;
  goListing: () => void;
  goCart: () => void;
  goSearch: () => void;
  goCheckout: () => void;
}

export function useTemplateNav(): TemplateNav {
  const router = useRouter();
  const params = useParams();
  const templateName = params["templateName"] as string;
  const basePath = `/template/${templateName}`;

  return {
    basePath,
    goHome: () => router.push(basePath),
    goProduct: (id: string) => router.push(`${basePath}/producto/${id}`),
    goListing: () => router.push(`${basePath}/catalogo`),
    goCart: () => router.push(`${basePath}/carrito`),
    goSearch: () => router.push(`${basePath}/buscar`),
    goCheckout: () => router.push(`${basePath}/checkout`),
  };
}
