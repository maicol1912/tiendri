"use client";

// Food Night Template — Navigation Hook

import { useRouter, useParams } from "next/navigation";

export const TEMPLATE_BASE = "food-night";

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
  const templateName = (params["templateName"] as string) ?? TEMPLATE_BASE;
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
