import { updateSession } from '@/infrastructure/supabase/middleware';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);

  if (!user) {
    const loginUrl = new URL('/auth', request.url);
    loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/onboarding/:path*',
  ],
};
