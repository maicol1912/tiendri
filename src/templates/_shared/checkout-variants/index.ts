import dynamic from 'next/dynamic';
import type { CheckoutVariant } from '@/types/templates';
import type { DetailedCheckoutProps, MinimalCheckoutProps } from './types';

const DetailedCheckout = dynamic(() => import('./DetailedCheckout'));
const MinimalCheckout = dynamic(() => import('./MinimalCheckout'));

export const CHECKOUT_REGISTRY: Record<CheckoutVariant, React.ComponentType<DetailedCheckoutProps> | React.ComponentType<MinimalCheckoutProps>> = {
  detailed: DetailedCheckout as React.ComponentType<DetailedCheckoutProps>,
  minimal: MinimalCheckout as React.ComponentType<MinimalCheckoutProps>,
};

export type { DetailedCheckoutProps, MinimalCheckoutProps } from './types';
