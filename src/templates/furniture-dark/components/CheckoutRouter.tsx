import { CHECKOUT_REGISTRY } from '@/templates/_shared/checkout-variants';
import type { CheckoutVariant } from '@/types/templates';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';
import type { MinimalCheckoutProps } from '@/templates/_shared/checkout-variants';
import type { CartItem } from '../types';

interface CheckoutRouterProps {
  items: CartItem[];
  totalPrice: number;
  currencySymbol?: string;
  isSubmitting?: boolean;
  formData?: MinimalCheckoutProps['formData'];
  onFieldChange?: MinimalCheckoutProps['onFieldChange'];
  onSubmit?: () => void;
  onBack?: () => void;
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
}

const VALID_VARIANTS = new Set<CheckoutVariant>(['detailed', 'minimal']);

export function CheckoutRouter({
  items,
  totalPrice,
  currencySymbol = '$',
  isSubmitting = false,
  formData,
  onFieldChange,
  onSubmit,
  onBack,
  structuralVariants,
  recipe,
}: CheckoutRouterProps) {
  const raw = structuralVariants?.checkoutVariant ?? recipe?.defaultCheckoutVariant ?? 'minimal';
  const variant: CheckoutVariant = VALID_VARIANTS.has(raw as CheckoutVariant)
    ? (raw as CheckoutVariant)
    : 'minimal';

  const CheckoutComponent = CHECKOUT_REGISTRY[variant] as React.ComponentType<MinimalCheckoutProps>;

  return (
    <CheckoutComponent
      items={items.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        imageUrl: i.image ?? null,
      }))}
      subtotal={totalPrice}
      currencySymbol={currencySymbol}
      isSubmitting={isSubmitting}
      formData={formData}
      onFieldChange={onFieldChange}
      onSubmit={onSubmit}
      onBack={onBack}
    />
  );
}
