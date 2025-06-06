import { verifyJWT } from '@/lib/auth';
import { getCookie } from '@/lib/cookies';
import { NextResponse } from 'next/server';

export async function GET() {
  const token = await getCookie('token');
  if (!token) {
    return NextResponse.json(null);
  }
  const user = await verifyJWT(token);
  if (!user) {
    return NextResponse.json(null);
  }
  console.log('User from auth/user route:', user);
  return NextResponse.json({ user });
}
