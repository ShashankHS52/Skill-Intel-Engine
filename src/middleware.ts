
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // If the user is trying to access an admin path
  if (path.startsWith('/admin') && path !== '/admin/login') {
    // This is a simple check. In a real app, you'd verify a token.
    const isAdminAuthenticated = true; // Replace with real auth check
    if (!isAdminAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Redirect from / to /register/identity for citizen flow
  // if (path === '/') {
  //   return NextResponse.redirect(new URL('/register/identity', request.url));
  // }
  
  // All other requests pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Public pages that don't need auth checks are handled by the logic above.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
