'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// LOGIN SEGURO CON NEXT-AUTH
export async function loginAction(formData) {
  try {
    await signIn('credentials', formData);
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, error: 'Credenciales inválidas.' };
        default:
          return { success: false, error: 'Error de autenticación.' };
      }
    }
    throw error; // Rethrow redirect
  }
}

export async function logoutAction() {
  cookies().delete('session_user');
  redirect('/login');
}

export async function getSession() {
  const session = cookies().get('session_user');
  if (!session) return null;
  return JSON.parse(session.value);
}
