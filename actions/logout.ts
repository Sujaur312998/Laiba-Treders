'use server';
import { signOut } from '@/auth';
import { DEFAULT_LOGOUT_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export const LogOut=async()=>{
    try {
        // try to signOut
        console.log("hit signout");
        
        await signOut({
            redirectTo:DEFAULT_LOGOUT_REDIRECT
        })

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                default:
                    return { error: "Something went wrong!" }
            }
        }
        throw error
    }
}