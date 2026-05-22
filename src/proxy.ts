import { type NextRequest, NextResponse } from "next/server";

// TODO: Uncomment and wire up Supabase session refresh once .env.local is configured
// import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  // TODO: Replace with updateSession(request) once Supabase env vars are set
  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - Public files with extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
