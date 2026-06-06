import { CART_REGISTRY } from '@/templates/_shared/cart-variants';
import type { CartVariant, ButtonStyle } from '@/types/templates';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';
import type { CartItem } from '../context/CartContext';
import { decorWarmConfig } from '../config';

interface CartRouterProps {
  items: CartItem[];
  subtotal: number;
  shipping?: number;
  tax?: number;
  currencySymbol?: string;
  buttonStyle?: ButtonStyle;
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
  onIncrement?: (productId: string) => void;
  onDecrement?: (productId: string) => void;
  onRemove?: (productId: string) => void;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
}

const VALID_VARIANTS = new Set<CartVariant>(['detailed', 'minimal']);

export function CartRouter({
  items,
  subtotal,
  shipping,
  tax,
  currencySymbol,
  buttonStyle,
  structuralVariants,
  recipe,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
  onContinueShopping,
}: CartRouterProps) {
  const raw =
    structuralVariants?.cartVariant ??
    recipe?.defaultCartVariant ??
    decorWarmConfig.recipe.defaultCartVariant;
  const variant: CartVariant = VALID_VARIANTS.has(raw as CartVariant) ? (raw as CartVariant) : 'minimal';

  const CartComponent = CART_REGISTRY[variant];

  const sharedItems = items.map((item) => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    imageUrl: item.imageUrl ?? null,
    variantName: null,
  }));

  return (
    <CartComponent
      items={sharedItems}
      subtotal={subtotal}
      shipping={shipping}
      tax={tax}
      currencySymbol={currencySymbol}
      buttonStyle={buttonStyle}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
      onRemove={onRemove}
      onCheckout={onCheckout}
      onContinueShopping={onContinueShopping}
    />
  );
}
