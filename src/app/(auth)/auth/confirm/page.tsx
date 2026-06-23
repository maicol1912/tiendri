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
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full mx-auto p-8 text-center">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-6 text-foreground">
          <MailIcon />
        </div>

        {/* Wordmark */}
        <div className="mb-8 flex justify-center">
          <img src="/logo.png" alt="Tiendri" className="h-6" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">
          Revisá tu email
        </h1>

        <p className="text-muted-foreground mb-8 leading-relaxed">
          Te enviamos un enlace de confirmación. Revisá tu bandeja de entrada
          y hacé clic en el enlace para activar tu cuenta.
        </p>

        <p className="text-sm text-muted-foreground mb-6">
          ¿No ves el email? Revisá la carpeta de spam o correo no deseado.
        </p>

        <a
          href="/auth"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Volver al inicio de sesión
        </a>
      </div>
    </div>
  );
}
