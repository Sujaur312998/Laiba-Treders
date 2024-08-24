import NextAuth, { NextAuthResult, Session } from 'next-auth'
import authConfig from '@/auth.config';
import { NextRequest, NextResponse } from 'next/server'
import {
    apiAuthPrefix,
    publicRoutes,
    authRouetes,
    DEFAULT_LOGIN_REDIRECT
} from '@/routes'

const { auth } = NextAuth(authConfig) as NextAuthResult

type AppRouteHandlerFnContext = {
    params?: Record<string, string | string[]>
}

export const authMiddleware = auth(
    (
        req: NextRequest & { auth: Session | null },
        ctx: AppRouteHandlerFnContext
    ): Response | void => {
        // console.log('auth middleware: ', req.nextUrl)

        const { nextUrl } = req
        const isLoggedIn = !!req.auth

        const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
        const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
        const isAuthRoutes = authRouetes.includes(nextUrl.pathname)

        // console.log("isLoggedIn", isLoggedIn);
        // console.log("isApiAuthRoute", isApiAuthRoute);
        // console.log("isPublicRoutes", isPublicRoutes);
        // console.log("isAuthRoutes", isAuthRoutes);


        if (isApiAuthRoute) {
            return NextResponse.next()
        }

        if (isAuthRoutes) {
            if (isLoggedIn) {
                return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
            }
            return NextResponse.next()
        }


        if (!isLoggedIn && !isPublicRoutes) {
            console.log(nextUrl.search);

            let callbackUrl = nextUrl.pathname
            if (nextUrl.search) {
                callbackUrl += nextUrl.search
            }
            const encodedCallbackUrl = encodeURIComponent(callbackUrl)
            return Response.redirect(new URL(`/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl))
        }

        return NextResponse.next()
    })



// export function middleware2(req: NextRequest) {
//     console.log('middleware2: ', req.nextUrl)

//     const currentUser = req.cookies.get('currentUser')?.value

//     if (
//         protectedRoutes.includes(req.nextUrl.pathname) &&
//         (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
//     ) {
//         req.cookies.delete('currentUser')
//         const response = NextResponse.redirect(new URL('/login', req.url))
//         response.cookies.delete('currentUser')

//         return response
//     }

//     if (authRoutes.includes(req.nextUrl.pathname) && currentUser) {
//         return NextResponse.redirect(new URL('/profile', req.url))
//     }
// }


export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}

export default authMiddleware