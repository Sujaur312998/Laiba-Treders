'use server';
import * as z from 'zod'
import { LoginSchema } from '@/schemas/LoginSchema';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values)

    if (!validateFields.success) {
        return { error: "Invalid fields" }
    }

    const { phoneNo, password } = validateFields.data

    try {
        // try to signin
        await signIn('credentials', {
            phoneNo,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        throw error
    }


}