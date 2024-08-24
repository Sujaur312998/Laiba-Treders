import Credentials from 'next-auth/providers/credentials'
import Facebook from "next-auth/providers/facebook"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from '@/schemas/LoginSchema'
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'

export default {
    providers: [
        Google,
        Facebook,
        Credentials({
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
                                name:true,
                                role: true,
                                hash_password: true,
                            },
                        })
                        if (user) {
                            const checkPassword = await bcrypt.compare(password, user.hash_password)
                            if(checkPassword){
                                delete user.hash_password
                                return user
                            }else{
                                return null
                            }
                        }
                    } catch (error) {
                        return null
                    }
                }
                return null
            }
        })
    ]
} satisfies NextAuthConfig