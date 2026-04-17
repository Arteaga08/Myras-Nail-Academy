import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PATHS = ['/dashboard', '/courses', '/users', '/orders', '/categories', '/audit']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))

  if (!isProtected) return NextResponse.next()

  const hasSession = request.cookies.has('mna_session')

  if (!hasSession) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/courses/:path*', '/users/:path*', '/orders/:path*', '/categories/:path*', '/audit/:path*'],
}
