import { NextRequest, NextResponse } from 'next/server';
import { verifyRole } from './lib/auth';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isSuperAdmin = await verifyRole('SUPERADMIN');
  const isModerator = await verifyRole('MODERATOR');
  const isGuest = await verifyRole('GUEST');

  if (isSuperAdmin) return NextResponse.next();

  if (pathname.startsWith('/moderator') && isModerator)
    return NextResponse.next();

  if ((pathname.startsWith('/guest') && isGuest) || isModerator)
    return NextResponse.next();

  return NextResponse.redirect(new URL('/', req.url));
}
