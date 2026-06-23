import Link from 'next/link';

export default function StorefrontNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="max-w-md w-full mx-auto p-8 text-center">
        <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-3">
          Tienda no encontrada
        </h2>
        <p className="text-muted-foreground mb-8">
          La tienda que buscás no existe o ya no está disponible.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors text-sm font-medium"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
