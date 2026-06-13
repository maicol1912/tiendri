import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { CategoryNavPattern } from '@/types/templates/primitives';
import type { CategoryNavProps } from './types';

const HorizontalScroll = dynamic(() => import('./HorizontalScroll'));
const Grid = dynamic(() => import('./Grid'));
const Tabs = dynamic(() => import('./Tabs'));
const Chips = dynamic(() => import('./Chips'));

export const CATEGORY_NAV_REGISTRY: Record<CategoryNavPattern, ComponentType<CategoryNavProps>> = {
  'horizontal-scroll': HorizontalScroll,
  'grid': Grid,
  'tabs': Tabs,
  'chips': Chips,
};

export type { CategoryNavProps } from './types';
