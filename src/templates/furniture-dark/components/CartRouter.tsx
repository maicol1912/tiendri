import { CART_REGISTRY } from "@/templates/_shared/cart-variants";
import type { CartVariant } from "@/types/templates";
import type { StructuralVariants, TemplateRecipe } from "@/types/templates/structural-variants";
import type { CartItem } from "../types";

interface CartRouterProps {
  items: CartItem[];
  totalPrice: number;
  discount?: number;
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

const VALID_VARIANTS = new Set<CartVariant>(["detailed", "minimal"]);

export function CartRouter({
  items,
  totalPrice,
  discount,
  structuralVariants,
  recipe,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
  onContinueShopping,
}: CartRouterProps) {
  const raw = structuralVariants?.cartVariant ?? recipe?.defaultCartVariant ?? "minimal";
  const variant: CartVariant = VALID_VARIANTS.has(raw as CartVariant)
    ? (raw as CartVariant)
    : "minimal";

  const CartComponent = CART_REGISTRY[variant];

  const sharedItems = items.map((item) => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    imageUrl: item.image ?? null,
    rating: item.rating,
  }));

  return (
    <CartComponent
      items={sharedItems}
      subtotal={totalPrice}
      discount={discount}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
      onRemove={onRemove}
      onCheckout={onCheckout}
      onContinueShopping={onContinueShopping}
    />
  );
}
