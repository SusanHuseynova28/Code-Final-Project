import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();


  if (url.pathname === '/') {
    url.pathname = '/home'; 
    return NextResponse.redirect(url);
  }

  
  const blockedPaths = ['/listview', '/drowerfilter', '/about', '/shop', '/contact', '/faq'];

  if (blockedPaths.includes(url.pathname) && !req.headers.get('referer')) {

    url.pathname = '/home'; 
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
