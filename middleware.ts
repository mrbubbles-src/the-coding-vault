import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT, verifyRole } from './lib/auth';
import { getCookie } from './lib/cookies';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname === '/admin/login') {
    const token = await getCookie('token');

    if (token) {
      const user = await verifyJWT(token);

      if (user.role === 'SUPERADMIN') {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }

      if (user.role === 'MODERATOR') {
        return NextResponse.redirect(new URL('/admin/mod/dashboard', req.url));
      }

      if (user.role === 'GUEST') {
        return NextResponse.redirect(
          new URL('/admin/guest/dashboard', req.url),
        );
      }
    }

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
