import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { username, email, password, role } = body;

  const usernameTaken = await prisma.user.findFirst({
    where: { username },
  });
  const emailTaken = await prisma.user.findFirst({
    where: { email },
  });
  if (usernameTaken)
    return NextResponse.json(
      { msg: 'Der Username ist bereits vergeben.' },
      {
        status: 400,
        statusText: 'Bad Request',
      },
    );
  if (emailTaken)
    return NextResponse.json(
      { msg: 'Die E-mail ist bereits registriert.' },
      {
        status: 400,
        statusText: 'Bad Request',
      },
    );
  try {
    const hashedPw = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPw,
        email,
        role,
      },
    });
    return NextResponse.json(
      { msg: 'Neuer User erstellt.', newUser },
      { status: 201, statusText: 'Created' },
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: 'Fehler beim erstellen des neuen Users.',
        error,
      },
      { status: 422, statusText: 'Unprocessable Content' },
    );
  }
}
