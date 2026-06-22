import Link from 'next/link';

export default function StorefrontNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto p-8 text-center">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Tienda no encontrada
        </h2>
        <p className="text-gray-500 mb-8">
          La tienda que buscás no existe o ya no está disponible.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
