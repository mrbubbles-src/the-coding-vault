import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './lib/auth';
import { getCookie } from './lib/cookies';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const token = await getCookie('token');
  if (!token) return NextResponse.redirect(new URL('/admin/login', req.url));

  let user;
  try {
    user = await verifyJWT(token);
  } catch {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  if (pathname.startsWith('/admin/login') && user)
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
