import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const role = req.auth?.user?.role as string | undefined

  const isCustomerRoute = 
    nextUrl.pathname.startsWith('/portal') || 
    nextUrl.pathname.startsWith('/booking')
  
  const isAdminRoute = 
    nextUrl.pathname.startsWith('/dashboard') || 
    nextUrl.pathname.startsWith('/bookings') ||
    nextUrl.pathname.startsWith('/customers') ||
    nextUrl.pathname.startsWith('/services') ||
    nextUrl.pathname.startsWith('/staff') ||
    nextUrl.pathname.startsWith('/analytics') ||
    nextUrl.pathname.startsWith('/promotions') ||
    nextUrl.pathname.startsWith('/settings')

  const isAuthRoute = 
    nextUrl.pathname.startsWith('/login') || 
    nextUrl.pathname.startsWith('/register') || 
    nextUrl.pathname.startsWith('/forgot-password') || 
    nextUrl.pathname.startsWith('/reset-password')

  // Redirect unauthenticated users from protected routes
  if (isCustomerRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  // Redirect non-admins from admin routes
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', nextUrl))
    }
    if (role !== 'ADMIN' && role !== 'MANAGER' && role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/portal', nextUrl))
    }
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    if (role === 'ADMIN' || role === 'MANAGER' || role === 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', nextUrl))
    } else {
      return NextResponse.redirect(new URL('/portal', nextUrl))
    }
  }

  return NextResponse.next()
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)'],
}
