'use client';

export default function StorefrontError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
      <h2 className="text-xl font-semibold">Tienda no disponible</h2>
      <p className="text-muted-foreground">No pudimos cargar esta tienda. Intentá de nuevo en unos momentos.</p>
      <button
        onClick={reset}
        className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
      >
        Reintentar
      </button>
    </div>
  );
}
