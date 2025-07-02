import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhook(.*)',
]);

const vividMiddleware = clerkMiddleware(async (auth, req) => {
  // ✅ 1. Protect routes if not public
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  // ✅ 2. Handle upgrade redirect
  const upgraded = req.nextUrl.searchParams.get('upgraded');
  if (upgraded === 'true') {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    url.searchParams.delete('upgraded');

    const response = NextResponse.redirect(url);
    response.cookies.set('upgrade-flag', 'true', {
      path: '/',
      httpOnly: true,
    });
    return response;
  }

  return NextResponse.next();
});

export default vividMiddleware;

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
