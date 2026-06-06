import { CHECKOUT_REGISTRY } from '@/templates/_shared/checkout-variants';
import type { CheckoutVariant } from '@/types/templates';
import type { StructuralVariants, TemplateRecipe } from '@/types/templates/structural-variants';
import type { DetailedCheckoutProps, CheckoutMode } from '@/templates/_shared/checkout-variants/types';
import type { CartItem } from '@/types/cart';
import { beautyElegantConfig } from '../config';

interface CheckoutRouterProps {
  items: CartItem[];
  currencySymbol?: string;
  mode?: CheckoutMode;
  isSubmitting?: boolean;
  formData?: DetailedCheckoutProps['formData'];
  onFieldChange?: DetailedCheckoutProps['onFieldChange'];
  onSubmit?: () => void;
  structuralVariants?: StructuralVariants;
  recipe?: TemplateRecipe;
}

const VALID_VARIANTS = new Set<CheckoutVariant>(['detailed', 'minimal']);

export function CheckoutRouter({
  items,
  currencySymbol = '$',
  mode = 'preview',
  isSubmitting = false,
  formData,
  onFieldChange,
  onSubmit,
  structuralVariants,
  recipe,
}: CheckoutRouterProps) {
  const raw =
    structuralVariants?.checkoutVariant ??
    recipe?.defaultCheckoutVariant ??
    beautyElegantConfig.recipe.defaultCheckoutVariant;
  const variant: CheckoutVariant = VALID_VARIANTS.has(raw as CheckoutVariant)
    ? (raw as CheckoutVariant)
    : 'minimal';

  const CheckoutComponent = CHECKOUT_REGISTRY[variant] as React.ComponentType<DetailedCheckoutProps>;
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CheckoutComponent
      items={items.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        imageUrl: i.imageUrl,
      }))}
      subtotal={subtotal}
      currencySymbol={currencySymbol}
      mode={mode}
      isSubmitting={isSubmitting}
      formData={formData}
      onFieldChange={onFieldChange}
      onSubmit={onSubmit}
    />
  );
}
