'use client';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">Algo salió mal</h2>
      <p className="text-muted-foreground">Ocurrió un error inesperado en el panel.</p>
      <button
        onClick={reset}
        className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
