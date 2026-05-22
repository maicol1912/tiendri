// Media components barrel — re-exports all dashboard media components.
// Import from here in pages and other components.

export { MediaItemCard } from './media-item-card';
export { MediaLibraryGrid } from './media-library-grid';
export { MediaUploadDropzone } from './media-upload-dropzone';
export { MediaPickerDialog } from './media-picker-dialog';
export { MediaPickerField } from './media-picker-field';
export { MediaDeleteDialog } from './media-delete-dialog';

// Hook — re-export canonical hook for pages that need direct media library access
export { useMediaLibrary } from '@/hooks/use-media-library';

// Types — re-export canonical types from @/types/domain
export type { MediaAsset, MediaAssetContext, MediaLibraryStats, MediaSearchFilters } from '@/types/domain';
