import dynamic from "next/dynamic";
import type { CartVariant } from "@/types/templates";
import type { CartPageProps } from "./types";

const DetailedCart = dynamic(() =>
  import("./DetailedCart").then((m) => m.DetailedCart)
) as React.ComponentType<CartPageProps>;

const MinimalCart = dynamic(() =>
  import("./MinimalCart").then((m) => m.MinimalCart)
) as React.ComponentType<CartPageProps>;

export const CART_REGISTRY: Record<CartVariant, React.ComponentType<CartPageProps>> = {
  detailed: DetailedCart,
  minimal: MinimalCart,
};

export type { CartPageProps, SharedCartItem } from "./types";
