import Credentials from 'next-auth/providers/credentials'
import Facebook from "next-auth/providers/facebook"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from '@/schemas/LoginSchema'
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import { jwtDecode } from "jwt-decode";

const secret: any = process.env.AUTH_SECRET


export default {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                phoneNo: { label: 'Phone no', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const validateFields = LoginSchema.safeParse(credentials)
                if (validateFields.success) {
                    const { phoneNo, password } = validateFields.data
                    try {
                        const user = await prisma.user.findUnique({
                            where: {
                                phoneNo: parseInt(phoneNo)
                            },
                            select: {
                                id: true,
                                name: true,
                                role: true,
                                hash_password: true,
                            },
                        })
                        if (user) {
                            const checkPassword = await bcrypt.compare(password, user.hash_password)
                            if (checkPassword) {
                                delete user.hash_password
                                return user
                            } else {
                                return null
                            }
                        }
                    } catch (error) {
                        return null
                    }
                }
                return null
            }
        }),
        Google,
        Facebook
    ],
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async jwt({ token, user, account }) {

            if (user) {
                token.accessToken = jwt.sign(
                    { userId: user.id }, secret, { expiresIn: 1 * 60 }
                )

                token.refreshToken = jwt.sign(
                    { userId: user.id }, secret, { expiresIn: 20 * 60 }
                );
            }

            return token;
        },

        async session({ session, token }) {
            // let accessToken: any = token.accessToken
            // let refreshToken: any = token.refreshToken

            // if (accessToken) {
            //     accessToken = jwtDecode(accessToken)
            //     if (!(accessToken?.exp * 1000 > new Date().getTime())) {
            //         //TODO REFRESH TOKEN
            //         refreshToken = jwtDecode(refreshToken)
            //         if (refreshToken?.exp * 1000 > new Date().getTime()) {
            //             // TOKEN GENERATE WITH REFRESH TOKEN
            //             token.accessToken = jwt.sign(
            //                 { userId: token.sub }, secret, { expiresIn: 10 * 60 }
            //             )
            //             // token.refreshToken = jwt.sign(
            //             //     { userId: token.sub }, secret, { expiresIn: 30 * 60 }
            //             // )
            //         }
            //     }
            // }
            const sessionUserId = {
                ...session.user,
                id: token.sub
            }
            const sessonToken = {
                ...session,
                user: sessionUserId,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            }


            return sessonToken
        }
    }
} satisfies NextAuthConfig