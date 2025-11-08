import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // If the user is at the root, but not the new citizen homepage, redirect them to the citizen homepage.
  if (path === '/') {
     return NextResponse.redirect(new URL('/', request.url));
  }
  
  if (path.startsWith('/dashboard') || path.startsWith('/projects') || path.startsWith('/awareness')) {
    // This is a simple check. In a real app, you'd verify a token.
    const isAdminAuthenticated = true; // Replace with real auth check
    if (!isAdminAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

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
     * - login
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
    '/',
  ],
};
