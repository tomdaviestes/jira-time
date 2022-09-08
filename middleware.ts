// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function clearCookies(res: NextResponse) {
  res.headers.set("Set-Cookie", `jiraHost=; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Path=/; SameSite=Strict;`);
  res.headers.set("Set-Cookie", `accountId=; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Path=/; SameSite=Strict;`);
  res.headers.set("Set-Cookie", `jiraApiKey=; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Path=/; SameSite=Strict;`);
  res.headers.set("Set-Cookie", `clockworkApiKey=; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Path=/; SameSite=Strict;`);
  return res;
}

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/api/login") {
    return NextResponse.next();
  }

  const jiraHost = req.cookies.get('jiraHost');
  const accountId = req.cookies.get('accountId');
  const jiraApiKey = req.cookies.get('jiraApiKey');
  const clockworkApiKey = req.cookies.get('clockworkApiKey');

  if (req.nextUrl.pathname === '/logout' || !jiraHost || !accountId || !jiraApiKey || !clockworkApiKey) {
    if (req.nextUrl.pathname === '/login') {
      return clearCookies(NextResponse.next());
    }

    return clearCookies(NextResponse.redirect(new URL('/login', req.url)));
  }
  
  if (req.nextUrl.pathname === '/login') {
    return clearCookies(NextResponse.redirect(new URL('/', req.url)));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/(logout|login)?",
    "/api(\/.*)?",
  ],
}
