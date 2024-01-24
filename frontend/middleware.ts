import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    !pathname.startsWith('/login') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/-')
  ) {
    const authToken = request.cookies.get('auth-token');

    if (!authToken) {
      // redirect to login page
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (pathname.startsWith('/login')) {
    const authToken = request.cookies.get('auth-token');

    if (authToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (pathname.startsWith('/logout')) {
    const res = NextResponse.redirect(new URL('/', request.url));
    res.cookies.delete('auth-token');

    return res;
  }
}
