import dynamic from 'next/dynamic';
import type { HeaderVariant } from '@/types/templates';
import type { HeaderProps } from './types';

const MinimalDark = dynamic(() => import('./MinimalDark')) as React.ComponentType<HeaderProps>;
const LocationGreeting = dynamic(() => import('./LocationGreeting')) as React.ComponentType<HeaderProps>;
const MultiTier = dynamic(() => import('./MultiTier')) as React.ComponentType<HeaderProps>;
const Notification = dynamic(() => import('./Notification')) as React.ComponentType<HeaderProps>;
const Glassmorphic = dynamic(() => import('./Glassmorphic')) as React.ComponentType<HeaderProps>;
const ColorAccented = dynamic(() => import('./ColorAccented')) as React.ComponentType<HeaderProps>;

export const HEADER_REGISTRY: Record<HeaderVariant, React.ComponentType<HeaderProps>> = {
  'minimal-dark': MinimalDark,
  'location-greeting': LocationGreeting,
  'multi-tier': MultiTier,
  notification: Notification,
  glassmorphic: Glassmorphic,
  'color-accented': ColorAccented,
};

export type { HeaderProps } from './types';
