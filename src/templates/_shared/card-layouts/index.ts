import dynamic from 'next/dynamic';
import type { CardContentLayout } from '@/types/templates';
import type { CardLayoutProps } from './types';

const BelowImage = dynamic(() => import('./BelowImage'));
const OverlayBottom = dynamic(() => import('./OverlayBottom'));
const OverlayFull = dynamic(() => import('./OverlayFull'));
const SideBySide = dynamic(() => import('./SideBySide'));
const DarkElevated = dynamic(() => import('./DarkElevated'));
const LifestyleBackground = dynamic(() => import('./LifestyleBackground'));
const FeaturedAnimated = dynamic(() => import('./FeaturedAnimated'));
const GlassmorphicDiscount = dynamic(() => import('./GlassmorphicDiscount'));
const ActionButtons = dynamic(() => import('./ActionButtons'));
const MasonryVariant = dynamic(() => import('./MasonryVariant'));

export const CARD_LAYOUT_REGISTRY: Record<CardContentLayout, React.ComponentType<CardLayoutProps>> = {
  'below-image': BelowImage,
  'overlay-bottom': OverlayBottom,
  'overlay-full': OverlayFull,
  'side-by-side': SideBySide,
  'dark-elevated': DarkElevated,
  'lifestyle-background': LifestyleBackground,
  'featured-animated': FeaturedAnimated,
  'glassmorphic-discount': GlassmorphicDiscount,
  'action-buttons': ActionButtons,
  'masonry-variant': MasonryVariant,
};

export type { CardLayoutProps } from './types';
