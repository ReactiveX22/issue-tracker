import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session)
      return NextResponse.redirect(new URL('/api/auth/signin', request.url));
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/issues/:path*',
};
