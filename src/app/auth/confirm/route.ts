import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next');
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        // remove(name, options) {
        //   cookieStore.set({ name, value: '', ...options });
        // },
      },
    },
  );

  if (token_hash && type && next) {
    const validTypes = [
      'sms',
      'email',
      'phone',
      'magiclink',
      'signup',
      'invite',
      'recovery',
      'email_change',
    ];
    if (validTypes.includes(type)) {
      const { error } = await supabase.auth.verifyOtp({
        type: type as any,
        token_hash,
      });
      if (!error) {
        console.log({ error: error });
        return NextResponse.redirect(next);
      }
    }
  }
  return NextResponse.redirect('/error');
}
