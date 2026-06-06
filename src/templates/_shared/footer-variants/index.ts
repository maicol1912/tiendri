import dynamic from 'next/dynamic';
import type { FooterVariant } from '@/types/templates';
import type { FooterProps } from './types';

const ThreeColumn = dynamic(() => import('./ThreeColumn')) as React.ComponentType<FooterProps>;
const CompactRow = dynamic(() => import('./CompactRow')) as React.ComponentType<FooterProps>;
const SocialIcons = dynamic(() => import('./SocialIcons')) as React.ComponentType<FooterProps>;

export const FOOTER_REGISTRY: Record<FooterVariant, React.ComponentType<FooterProps>> = {
  'three-column': ThreeColumn,
  'compact-row': CompactRow,
  'social-icons': SocialIcons,
};

export type { FooterProps } from './types';
