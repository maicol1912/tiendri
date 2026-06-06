import type { ButtonStyle } from "@/types/templates";

export interface SharedCartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
  variantName?: string | null;
  rating?: number;
}

export interface CartPageProps {
  items: SharedCartItem[];
  subtotal: number;
  tax?: number;
  shipping?: number;
  discount?: number;
  currencySymbol?: string;
  buttonStyle?: ButtonStyle;
  onIncrement?: (productId: string) => void;
  onDecrement?: (productId: string) => void;
  onRemove?: (productId: string) => void;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
}
