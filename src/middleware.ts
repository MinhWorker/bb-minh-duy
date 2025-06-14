// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from '../lib/auth';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('session')?.value;
  const { pathname } = req.nextUrl;

  // Paths that require authentication
  const protectedAdminPaths = ['/admin']; // Add other protected API routes as needed

  const isProtectedAdminPath = protectedAdminPaths.some(path => pathname.startsWith(path));

  // If trying to access protected path
  if (isProtectedAdminPath) {
    if (!token) {
      // If no token, redirect to sign-in page for admin routes
      if (pathname.startsWith('/admin')) {
        const signinUrl = new URL('/signin', req.url); // Assuming your sign-in page is /signin
        return NextResponse.redirect(signinUrl);
      }
      // For API routes, just return unauthorized
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const session = await verifySessionToken(token);

    if (!session) {
      // If token is invalid, clear cookie and redirect/unauthorize
      const response = NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      response.cookies.delete('session'); // Clear invalid session cookie
      if (pathname.startsWith('/admin')) {
        const signinUrl = new URL('/signin', req.url);
        return NextResponse.redirect(signinUrl);
      }
      return response;
    }

    // If valid session, continue to the requested path
    return NextResponse.next();
  }

  // Allow unauthenticated access to other paths (e.g., public product page, sign-in page)
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*', // Protects all paths under /admin
    '/api/categories/:path*', // Protects all paths under /api/categories
    '/api/auth/signout', // If you add a signout endpoint
  ],
};
