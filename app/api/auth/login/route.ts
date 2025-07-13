import { db } from '@/drizzle/db';
import { users } from '@/drizzle/db/schema';
import { eq } from 'drizzle-orm';
import { createJWT } from '@/lib/auth';
// import { createCookie } from '@/lib/cookies';

import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  try {
    const [{ current_user }] = await db.execute('SELECT current_user;');
    console.log('Aktueller DB-User:', current_user);
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    console.log('Gefundener Benutzer:', user);
    if (!user)
      return NextResponse.json(
        { msg: 'Benutzername konnte nicht gefunden werden.' },
        { status: 401, statusText: 'Unauthorized' },
      );

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword)
      return NextResponse.json(
        { msg: 'Das eingegebene Passwort ist nicht korrekt.' },
        { status: 401, statusText: 'Unauthorized' },
      );

    const token = await createJWT({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    const response = NextResponse.redirect(
      new URL('/admin/dashboard', req.url),
    );

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 Tage
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        msg: 'Login fehlgeschlagen!',
        error,
      },
      { status: 401, statusText: 'Unauthorized' },
    );
  }
}
