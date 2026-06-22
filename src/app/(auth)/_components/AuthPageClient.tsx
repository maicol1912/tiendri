"use client";

import { useState, useCallback, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/infrastructure/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

/* ─── Google SVG icon ─── */
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* ─── Eye toggle icons ─── */
function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </svg>
  );
}

/* ─── Types ─── */
type AuthMode = "login" | "register";

type AuthPageClientProps = {
  initialMode: AuthMode;
  urlError?: string;
};

/* ─── Component ─── */
export function AuthPageClient({ initialMode, urlError }: AuthPageClientProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(urlError === "auth-code-error" ? "Error al verificar el código de acceso. Intenta de nuevo." : null);
  const [success, setSuccess] = useState<string | null>(null);

  const isRegister = mode === "register";

  /* ─── Forgot password ─── */
  const handleForgotPassword = async () => {
    if (!email) {
      toast.error('Ingresá tu email primero');
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    setLoading(false);
    if (resetError) {
      toast.error('Error al enviar el email de recuperación');
    } else {
      toast.success('Revisá tu email para restablecer tu contraseña');
    }
  };

  /* ─── Mode toggle ─── */
  const toggleMode = useCallback(
    (newMode: AuthMode) => {
      setMode(newMode);
      setError(null);
      setSuccess(null);
      setPassword("");
      setConfirmPassword("");
      router.push(newMode === "register" ? "/auth?mode=register" : "/auth", {
        scroll: false,
      });
    },
    [router],
  );

  /* ─── Validation ─── */
  const validate = (): string | null => {
    if (!email.trim()) return "El correo electrónico es obligatorio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Ingresa un correo electrónico válido.";
    if (password.length < 6)
      return "La contraseña debe tener al menos 6 caracteres.";
    if (isRegister && password !== confirmPassword)
      return "Las contraseñas no coinciden.";
    return null;
  };

  /* ─── Submit ─── */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      if (isRegister) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
          },
        });

        if (signUpError) {
          setError(mapAuthError(signUpError.message));
          return;
        }

        setSuccess(
          "Revisa tu correo electrónico para confirmar tu cuenta.",
        );
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(mapAuthError(signInError.message));
          return;
        }

        router.push("/dashboard");
      }
    } catch {
      setError("Ocurrió un error inesperado. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  /* ─── Google OAuth ─── */
  const handleGoogleAuth = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
      },
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row overflow-hidden bg-white">

      {/* Dark branding panel — slides between sides on desktop */}
      <div
        className={[
          "hidden md:flex flex-col justify-between",
          "absolute inset-y-0 w-[45%] z-20",
          "bg-gradient-to-br from-[#0a0a14] via-[#0d1025] to-[#111638]",
          "transition-all duration-700 ease-in-out",
          isRegister ? "left-[55%] rounded-l-[40px]" : "left-0 rounded-r-[40px]",
        ].join(" ")}
      >
        <div className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15)_0%,transparent_70%)]" />

        <div className="relative z-10 p-10">
          <span className="font-sora text-xl font-semibold lowercase tracking-tight text-white">
            tiendri<span className="text-blue-500">.</span>
          </span>
        </div>

        <div className="relative z-10 flex flex-1 items-center px-10">
          <p className="text-4xl lg:text-5xl font-light text-white/90 italic leading-tight">
            {isRegister ? (
              <>
                Comenzá tu
                <br />
                negocio digital
                <br />
                hoy mismo.
              </>
            ) : (
              <>
                Bienvenido
                <br />
                de vuelta.
              </>
            )}
          </p>
        </div>

        <div className="p-8" />
      </div>

      {/* Form panel — shifts right on login, stays left on register */}
      <div
        className={[
          "w-full md:w-[55%] min-h-screen",
          "flex items-center justify-center",
          "transition-all duration-700 ease-in-out",
          isRegister ? "md:ml-0" : "md:ml-[45%]",
        ].join(" ")}
      >
        <div className="w-full max-w-[400px] px-6 md:px-0 py-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            {isRegister ? "Crea tu cuenta" : "Inicia sesión"}
          </h1>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Contraseña
                </Label>
                {!isRegister && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {isRegister && (
              <div className="space-y-1.5">
                <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                  Confirmar contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-11 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/20 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                    aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition-colors"
            >
              {loading
                ? "Cargando..."
                : isRegister
                  ? "Crear cuenta"
                  : "Iniciar sesión"}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-400">o continúa con</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleAuth}
            className="h-11 w-full rounded-lg border border-blue-100 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition-colors gap-3"
          >
            <GoogleIcon />
            Continuar con Google
          </Button>

          <p className="mt-6 text-center text-sm text-gray-500">
            {isRegister ? "¿Ya tenés cuenta? " : "¿No tenés cuenta? "}
            <button
              type="button"
              onClick={() => toggleMode(isRegister ? "login" : "register")}
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              {isRegister ? "Iniciá sesión" : "Registrate gratis"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Error mapper ─── */
function mapAuthError(message: string): string {
  if (message.includes("Invalid login credentials"))
    return "Correo o contraseña incorrectos.";
  if (message.includes("User already registered"))
    return "Este correo ya está registrado. Intenta iniciar sesión.";
  if (message.includes("Password should be at least 6 characters"))
    return "La contraseña debe tener al menos 6 caracteres.";
  if (message.includes("Email not confirmed"))
    return "Debes confirmar tu correo electrónico antes de iniciar sesión.";
  if (message.includes("Too many requests"))
    return "Demasiados intentos. Espera un momento antes de intentar de nuevo.";
  return message;
}
