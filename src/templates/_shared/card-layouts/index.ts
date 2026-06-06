import dynamic from 'next/dynamic';
import type { CardContentLayout } from '@/types/templates';
import type { CardLayoutProps } from './types';

const BelowImage = dynamic(() => import('./BelowImage'));
const OverlayBottom = dynamic(() => import('./OverlayBottom'));
const OverlayFull = dynamic(() => import('./OverlayFull'));
const SideBySide = dynamic(() => import('./SideBySide'));
const DarkElevated = dynamic(() => import('./DarkElevated'));

export const CARD_LAYOUT_REGISTRY: Record<CardContentLayout, React.ComponentType<CardLayoutProps>> = {
  'below-image': BelowImage,
  'overlay-bottom': OverlayBottom,
  'overlay-full': OverlayFull,
  'side-by-side': SideBySide,
  'dark-elevated': DarkElevated,
};

export type { CardLayoutProps } from './types';
