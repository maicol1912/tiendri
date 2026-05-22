// Biblioteca de medios — Server Component shell
// Lazy-imports the client component to keep the initial bundle lean.

import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { MediaLibraryClient } from './media-library-client';

export const metadata = {
  title: 'Biblioteca de medios',
};

function LoadingFallback() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-9 w-32" />
      </div>
      <Skeleton className="h-9 w-full max-w-sm" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export default function BibliotecaPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MediaLibraryClient />
    </Suspense>
  );
}
