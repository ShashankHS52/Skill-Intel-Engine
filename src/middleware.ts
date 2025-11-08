
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define admin paths
  const adminPaths = ['/dashboard', '/projects', '/awareness'];
  const isAdminPath = adminPaths.some(adminPath => path.startsWith(adminPath));

  // If the user is trying to access an admin path
  if (isAdminPath) {
    // This is a simple check. In a real app, you'd verify a token.
    const isAdminAuthenticated = true; // Replace with real auth check
    if (!isAdminAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If the user is at the root and wants to go to admin, redirect to /login
  if (path === '/admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
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
     * Public pages that don't need auth checks:
     * - login
     * - register
     * - the root path itself (handled by the main logic)
     */
    '/dashboard/:path*',
    '/projects/:path*',
    '/awareness/:path*',
    '/admin',
  ],
};
