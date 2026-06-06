import dynamic from 'next/dynamic';
import type { CategoryNavVariant } from '@/types/templates';
import type { CategoryNavProps } from './types';

const IconGrid = dynamic(() => import('./IconGrid'));
const ImagePills = dynamic(() => import('./ImagePills'));
const HorizontalScroll = dynamic(() => import('./HorizontalScroll'));
const TabBar = dynamic(() => import('./TabBar'));
const Chips = dynamic(() => import('./Chips'));

export const CATEGORY_NAV_REGISTRY: Record<CategoryNavVariant, React.ComponentType<CategoryNavProps>> = {
  'icon-grid': IconGrid,
  'image-pills': ImagePills,
  'horizontal-scroll': HorizontalScroll,
  'tab-bar': TabBar,
  chips: Chips,
};

export type { CategoryNavProps } from './types';
