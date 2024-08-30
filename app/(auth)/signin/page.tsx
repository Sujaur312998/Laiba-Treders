import SignInForm from '@/components/auth/signin-form'
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Signin",
    description: "Welcome Back to Laiba Treders",
};


const signin = () => {
    return (
        <SignInForm />
    )
}

export default signin