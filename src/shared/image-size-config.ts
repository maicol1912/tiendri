export type ImageContext = 'logo' | 'product' | 'category' | 'banner' | 'general';

export interface ImageSizeConfig {
  maxWidth: number;
  quality: number;
  maxInputBytes: number;
  aspectRatio: number;
}

export const IMAGE_SIZE_MAP: Record<ImageContext, ImageSizeConfig> = {
  logo:     { maxWidth: 400,  quality: 0.85, maxInputBytes: 5 * 1024 * 1024,  aspectRatio: 1 },
  product:  { maxWidth: 1200, quality: 0.8,  maxInputBytes: 10 * 1024 * 1024, aspectRatio: 1 },
  category: { maxWidth: 800,  quality: 0.8,  maxInputBytes: 5 * 1024 * 1024,  aspectRatio: 4/3 },
  banner:   { maxWidth: 1600, quality: 0.75, maxInputBytes: 10 * 1024 * 1024, aspectRatio: 16/9 },
  general:  { maxWidth: 800,  quality: 0.7,  maxInputBytes: 5 * 1024 * 1024,  aspectRatio: 1 },
};

export function getImageSizeConfig(context?: string): ImageSizeConfig {
  if (context && context in IMAGE_SIZE_MAP) {
    return IMAGE_SIZE_MAP[context as ImageContext];
  }
  return IMAGE_SIZE_MAP.general;
}
