import * as z from "zod"
import { phoneRegExp } from '@/lib/data'


export const RegistrationSchema = z.object({
    name: z
        .string()
        .min(2, "নাম প্রয়োজন"),

    f_name: z.
        string()
        .min(2, "পিতার নাম প্রয়োজন"),

    cc: z
        .string(),

    phoneNo: z
        .string()
        .regex(phoneRegExp, {
            message: "১১ ডিজিট মোবাইল নম্বর দিন "
        })
        .startsWith('01', {
            message: "মোবাইল নম্বর 01 দিয়ে শুরু হতে হবে"
        }),

    address_village: z
        .string()
        .min(1, "গ্রামের ঠিকানা প্রয়োজন"),

    address_home: z
        .string(),

    password: z
        .string()
        .min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),

    c_c_password: z
        .string()
        .min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),

}).refine(data => data.password === data.c_c_password, {
    message: "পাসওয়ার্ড একই হতে হবে",
    path: ["c_c_password"], // This will attach the error to the c_c_password field
})