import { db } from '@/drizzle/db';
// import { users } from '@/drizzle/db/schema';
// import { eq } from 'drizzle-orm';
import { createJWT } from '@/lib/auth';
import { createCookie } from '@/lib/cookies';

import bcrypt from 'bcryptjs';
// import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // const whoami = await db.execute(sql`SELECT current_user`);
    // console.log('[CURRENT USER]', whoami);
    const body = await req.json();
    console.log('[LOGIN BODY]', body);
    const { username, password } = body;

    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, username),
    });

    if (!user) {
      console.log('[LOGIN ERROR] Benutzer nicht gefunden');
      return NextResponse.json(
        { msg: 'Benutzername konnte nicht gefunden werden.' },
        { status: 401 },
      );
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      console.log('[LOGIN ERROR] Passwort ungültig');
      return NextResponse.json(
        { msg: 'Das eingegebene Passwort ist nicht korrekt.' },
        { status: 401 },
      );
    }

    const token = await createJWT({
      id: user.id,
      username: user.username,
      role: user.role,
    });
    await createCookie(token);

    console.log('[LOGIN SUCCESS] Token erstellt und Cookie gesetzt');
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  } catch (error) {
    console.error('[LOGIN CATCH]', error);
    return NextResponse.json(
      { msg: 'Login fehlgeschlagen!', error: String(error) },
      { status: 500 },
    );
  }
}
