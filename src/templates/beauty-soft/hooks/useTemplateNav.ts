"use client";

// Beauty Soft Template — Navigation Hook
// Centralizes all navigation so components never construct URL strings manually.

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

export const TEMPLATE_BASE = "beauty-soft";

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
    goInfo: () => router.push(`${basePath}/info`),
  };
}
