'use server';

import { signIn, signOut } from '@/lib/auth';
import { AuthError } from 'next-auth';

type LoginOptions = {
  email: string;
  password: string;
};

export async function login({ email, password }: LoginOptions) {
  try {
    await signIn('credentials', {
      redirectTo: '/',
      email,
      password,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, error: 'Invalid email or password.' };
        default:
          return { success: false, error: 'Something went wrong.' };
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({
    redirectTo: '/',
  });
}
