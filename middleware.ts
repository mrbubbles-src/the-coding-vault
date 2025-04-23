import { NextRequest, NextResponse } from 'next/server';
import { verifyRole } from './lib/auth';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const isSuperAdmin = await verifyRole('SUPERADMIN');
  const isModerator = await verifyRole('MODERATOR');
  const isGuest = await verifyRole('GUEST');

  if (isSuperAdmin) return NextResponse.next();

  if (pathname === '/admin/dashboard' && isModerator) {
    return NextResponse.redirect(new URL('/admin/mod/dashboard', req.url));
  }

  if (pathname === '/admin/dashboard' && isGuest) {
    return NextResponse.redirect(new URL('/admin/guest/dashboard', req.url));
  }

  return NextResponse.redirect(new URL('/admin/login', req.url));
}

export const config = {
  matcher: ['/admin/:path*'],
};
