import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Refresh session if expired
  await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Extension API CORS handling
  // Allows browser extensions to access /api/extension/* endpoints
  if (pathname.startsWith('/api/extension/') || pathname.startsWith('/api/v1/extension/')) {
    const origin = request.headers.get('origin')

    // Only allow requests from browser extensions
    if (origin?.startsWith('chrome-extension://') || origin?.startsWith('moz-extension://')) {
      // Set CORS headers for extension origins
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      response.headers.set(
        'Access-Control-Allow-Headers',
        'Authorization, Content-Type, X-API-Version'
      )
      response.headers.set('Access-Control-Allow-Credentials', 'false')
      response.headers.set('Access-Control-Max-Age', '86400') // 24 hours

      // Handle preflight OPTIONS request
      if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
          status: 204,
          headers: response.headers,
        })
      }
    } else {
      // Reject non-extension origins
      return new NextResponse(
        'CORS policy: Extension API only accessible from browser extensions',
        { status: 403 }
      )
    }
  }

  // Protected routes
  const protectedRoutes = ['/dashboard', '/settings', '/profile']
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Auth routes
  const authRoutes = ['/login', '/signup']
  const isAuthRoute = authRoutes.includes(pathname)

  // Get user session
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users from auth routes
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/profile/:path*',
    '/login',
    '/signup',
  ],
}