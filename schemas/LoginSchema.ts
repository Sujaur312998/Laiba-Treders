import * as z from "zod"
import { phoneRegExp } from '@/lib/data'


export const LoginSchema = z.object({
    phoneNo: z.string().regex(phoneRegExp, {
        message: "১১ ডিজিট মোবাইল নম্বর দিন "
    }),
    password: z.string()
})