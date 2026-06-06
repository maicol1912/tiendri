import dynamic from 'next/dynamic';
import type { BottomNavVariant } from '@/types/templates/primitives';
import type { BottomNavProps } from './types';

const FlatSolid = dynamic(() => import('./FlatSolid')) as React.ComponentType<BottomNavProps>;
const FrostedGlass = dynamic(() => import('./FrostedGlass')) as React.ComponentType<BottomNavProps>;
const RoundedTop = dynamic(() => import('./RoundedTop')) as React.ComponentType<BottomNavProps>;

export const BOTTOM_NAV_REGISTRY: Record<BottomNavVariant, React.ComponentType<BottomNavProps>> = {
  'flat-solid': FlatSolid,
  'frosted-glass': FrostedGlass,
  'rounded-top': RoundedTop,
};

export type { BottomNavProps, BottomNavTab } from './types';
