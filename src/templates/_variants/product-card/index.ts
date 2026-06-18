import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { ProductCardSlotProps, ProductCardVariant } from './types';

export const PRODUCT_CARD_REGISTRY: Record<ProductCardVariant, ComponentType<ProductCardSlotProps>> = {
  BELOW_IMAGE: dynamic(() => import('./BELOW_IMAGE')),
  OVERLAY_BOTTOM: dynamic(() => import('./OVERLAY_BOTTOM')),
  OVERLAY_FULL: dynamic(() => import('./OVERLAY_FULL')),
  SIDE_BY_SIDE: dynamic(() => import('./SIDE_BY_SIDE')),
  WITH_DESCRIPTION: dynamic(() => import('./WITH_DESCRIPTION')),
};

export type { ProductCardSlotProps, ProductCardVariant } from './types';
