'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SIGNIN_FIELDS, BackendClient } from '@/app/lib';
import { cookies } from 'next/headers';

const LoginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function loginAction(_prevState: any, formData: FormData) {
  const { username, password } = LoginFormSchema.parse({
    username: formData.get(SIGNIN_FIELDS.username),
    password: formData.get(SIGNIN_FIELDS.password),
  });

  const backendClient = BackendClient.getInstance();

  const httpResp = await backendClient.login({ username, password });
  if (httpResp.status == 401) {
    return { message: 'Invalid username or password' };
  }

  if (httpResp.status !== 200) {
    return { message: 'Server error, please try again!' };
  }

  cookies().set({
    name: 'auth-token',
    value: httpResp.headers.authorization,
    httpOnly: true,
    path: '/',
  });

  revalidatePath('/');
  redirect('/');
}

export async function logoutAction(_formData: FormData) {
  // TODO: use a const for the cookie name
  cookies().delete('auth-token');
  redirect('/');
}
