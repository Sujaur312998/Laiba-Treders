import RegisterForm from "@/components/auth/register-form"
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Register",
    description: "Become a Proud Member of Laiba Treders",
};

const Register=()=>{
    return(
        <RegisterForm />
    )
}

export default Register