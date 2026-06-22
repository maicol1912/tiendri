import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revisá tu email | Tiendri",
  robots: { index: false, follow: false },
};

/* ─── Mail icon ─── */
function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function AuthConfirmPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full mx-auto p-8 text-center">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 text-white">
          <MailIcon />
        </div>

        {/* Wordmark */}
        <p className="font-sora text-base font-semibold lowercase tracking-tight text-white mb-8">
          tiendri<span className="text-blue-500">.</span>
        </p>

        <h1 className="text-2xl font-bold text-white mb-3">
          Revisá tu email
        </h1>

        <p className="text-gray-400 mb-8 leading-relaxed">
          Te enviamos un enlace de confirmación. Revisá tu bandeja de entrada
          y hacé clic en el enlace para activar tu cuenta.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          ¿No ves el email? Revisá la carpeta de spam o correo no deseado.
        </p>

        <a
          href="/auth"
          className="text-sm text-gray-500 hover:text-white transition-colors"
        >
          ← Volver al inicio de sesión
        </a>
      </div>
    </div>
  );
}
