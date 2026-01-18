import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/signup')
    const isAdminPage = request.nextUrl.pathname.startsWith('/admin')
    const isAccountPage = request.nextUrl.pathname.startsWith('/account')

    // Redirect authenticated users away from auth pages
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/account', request.url))
    }

    // Redirect unauthenticated users to login
    if ((isAdminPage || isAccountPage) && !token) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Check admin access
    if (isAdminPage && token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/account/:path*', '/login', '/signup'],
}
