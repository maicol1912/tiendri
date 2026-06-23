import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-6xl font-bold tracking-tight">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">Página no encontrada</p>
      <p className="mt-2 text-sm text-muted-foreground/60">
        La página que buscás no existe o fue movida.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
