import NextAuth, { NextAuthResult, Session } from 'next-auth'
import authConfig from '@/auth.config';
import { NextRequest, NextResponse } from 'next/server'
import {
    apiAuthPrefix,
    publicRoutes,
    authRouetes,
    DEFAULT_LOGIN_REDIRECT
} from '@/routes'
import { jwtDecode } from "jwt-decode";


const { auth } = NextAuth(authConfig) as NextAuthResult

type AppRouteHandlerFnContext = {
    params?: Record<string, string | string[]>
}

export const  authMiddleware =  auth(
    (
        req: NextRequest & { auth: Session | null },
        ctx: AppRouteHandlerFnContext
    ): Response | void => {
        const { nextUrl, auth } = req
        let { accessToken, refreshToken }: any = auth || ''

        let isAccessToken: any = !!accessToken ? jwtDecode(accessToken) : false
        isAccessToken = isAccessToken.exp * 1000 > new Date().getTime()

        let isRefreshToken: any = !!refreshToken ? jwtDecode(refreshToken) : false
        isRefreshToken = isRefreshToken.exp * 1000 > new Date().getTime()

        let isLoggedIn = isAccessToken || isRefreshToken 

        console.log(isAccessToken, isRefreshToken, isLoggedIn);


        const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
        const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
        const isAuthRoutes = authRouetes.includes(nextUrl.pathname)

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
            let callbackUrl = nextUrl.pathname
            if (nextUrl.search) {
                callbackUrl += nextUrl.search
            }
            const encodedCallbackUrl = encodeURIComponent(callbackUrl)
            return Response.redirect(new URL(`/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl))
        }

        return NextResponse.next()
    })

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}

export default authMiddleware