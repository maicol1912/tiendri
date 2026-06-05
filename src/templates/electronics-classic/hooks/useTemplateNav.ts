"use client";

// Electronics Classic Template — Navigation Hook
// Centralizes all route construction for the template preview.

import { useCallback } from "react";
import { useRouter } from "next/navigation";

export const TEMPLATE_BASE = "/template/electronics-classic";

export function useTemplateNav() {
  const router = useRouter();

  const goHome = useCallback(() => {
    router.push(TEMPLATE_BASE);
  }, [router]);

  const goProduct = useCallback(
    (productId: string) => {
      router.push(`${TEMPLATE_BASE}/producto/${productId}`);
    },
    [router]
  );

  const goListing = useCallback(() => {
    router.push(`${TEMPLATE_BASE}/catalogo`);
  }, [router]);

  const goCart = useCallback(() => {
    router.push(`${TEMPLATE_BASE}/carrito`);
  }, [router]);

  const goSearch = useCallback(() => {
    router.push(`${TEMPLATE_BASE}/buscar`);
  }, [router]);

  const goCheckout = useCallback(() => {
    router.push(`${TEMPLATE_BASE}/checkout`);
  }, [router]);

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  const goInfo = useCallback(() => {
    router.push(`${TEMPLATE_BASE}/info`);
  }, [router]);

  return {
    goHome,
    goProduct,
    goListing,
    goCart,
    goSearch,
    goCheckout,
    goBack,
    goInfo,
  };
}
