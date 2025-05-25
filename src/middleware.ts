import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          res = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
        },
      },
    },
  );
  console.log('Cookies:', request.cookies.getAll());

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log({ user: user });
  if (user && request.nextUrl.pathname === '/register') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!user && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/register', request.url));
  }
  return res;
}

export const config = {
  matcher: ['/', '/photos'],
};
