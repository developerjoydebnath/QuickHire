import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Decode JWT payload without verifying (edge runtime can't use jsonwebtoken)
function decodeJwtPayload(token: string): any {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isProfileRoute = pathname.startsWith('/profile');

  // Decode role from token
  const payload = token ? decodeJwtPayload(token) : null;
  const role = payload?.role || null;

  // Authenticated users trying to access login/signup → redirect based on role
  if (token && isAuthRoute) {
    const redirectTo = role === 'admin' ? '/dashboard' : '/profile';
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  // Unauthenticated users trying to access protected routes → redirect to login
  if (!token && (isDashboardRoute || isProfileRoute)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Admin-only: /dashboard/* routes
  if (isDashboardRoute && role !== 'admin') {
    // Logged in as user but trying to access admin dashboard
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // User-only: /profile route
  if (isProfileRoute && role !== 'user') {
    // Logged in as admin but trying to access user profile
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
