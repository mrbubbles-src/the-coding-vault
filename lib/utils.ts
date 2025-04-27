import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { logoutUser } from './auth';
import { redirect } from 'next/navigation';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function handleLogout() {
  try {
    const res = await logoutUser();
    const data = await res?.json();
    if (data?.message === 'Logout erfolgreich') {
      redirect('/');
    }
  } catch (error) {
    console.error(error);
  }
}
