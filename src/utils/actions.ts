'use server';

import { createClient } from './supabase/supabaseServer';
import { redirect } from 'next/navigation';

export async function signUp(
  prevState: { success: boolean; message?: string } | undefined,
  formData: FormData,
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true, message: 'Check your email...' };
}

export async function signIn(
  prevState: { success: boolean; message?: string },
  formData: FormData,
) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  redirect('/');
}

export async function AuthWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/`, // تأكد من ضبط هذا في .env
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.url; // نرجع رابط التوجيه
}
