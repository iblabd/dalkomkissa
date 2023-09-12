import createMiddleware from 'next-intl/middleware';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/lib/database.types';

export default async function middleware(req: NextRequest) {
  const handleI18nRouting = createMiddleware({
    locales: ['en', 'id'],
    defaultLocale: 'en',
  });
  const res = handleI18nRouting(req);
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();

  return res;
}

export const config = {
  matcher: ['/((?!api|auth|_next|.*\\..*).*)'],
};
