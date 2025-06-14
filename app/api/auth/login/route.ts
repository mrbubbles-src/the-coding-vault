import { createJWT } from '@/lib/auth';
import { createCookie } from '@/lib/cookies';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  const user = await prisma.user.findFirst({
    where: { username },
  });

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

  try {
    const token = await createJWT({ id: user.id, role: user.role });
    await createCookie(token);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        msg: 'Login fehlgeschlagen!',
        error,
      },
      { status: 401, statusText: 'Unauthorized' },
    );
  } finally {
    revalidatePath('/admin/dashboard');
  }
}
