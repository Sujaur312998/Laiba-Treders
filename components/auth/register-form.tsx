"use client";
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CardWrapper from '@/components/auth/CardWrapper'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { villageName, host } from "@/lib/data";
import { Input } from "@/components/ui/input"
import { RegistrationSchema } from '@/schemas/RegistrationSchema'
import axios from 'axios'
import Swal from 'sweetalert2';
import { TbLoader3 } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { useState } from "react";

const formData = {
    headerDescription: 'Be a Proud Member',
    headerTitle: 'Laiba Treders',
    backButtonHref: '/signin',
    backButtonLevel: 'Already have an account?'
}

const Toast = Swal.mixin({
    toast: true,
    showConfirmButton: true,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

const successToast = (data: any) => {
    Toast.fire({
        title: 'Success!',
        text: data,
        icon: 'success',
        confirmButtonText: 'OK',
    });
}
const failedToast = ({ msg }: any) => {
    Toast.fire({
        title: "Invalid Action!",
        text: msg,
        icon: "question"
    });
}

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
    const form = useForm<z.infer<typeof RegistrationSchema>>({
        resolver: zodResolver(RegistrationSchema),
        defaultValues: {
            name: "",
            f_name: "",
            cc: '+88',
            phoneNo: "",
            address_village: "",
            address_home: "",
            password: "",
            c_c_password: ""
        }
    })

    const createUser = (data: z.infer<typeof RegistrationSchema>) => {
        try {
            axios.post(`${host}/api/auth/createUser`, data)
                .then(res => {
                    setIsLoading(false)
                    successToast(res.data.message)
                    form.reset()
                })
                .catch(err => {
                    setIsLoading(false)
                    failedToast({ msg: err.response?.data.message })
                })
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = (values: z.infer<typeof RegistrationSchema>) => {
        setIsLoading(true)
        try {
            axios.post('/api/auth/checkUserPhoneNo', { phoneNo: values.phoneNo })
                .then((res) => {
                    if (res.status === 200) {
                        createUser(values)
                    }
                })
                .catch(err => {
                    setIsLoading(false)
                    failedToast({ msg: err.response?.data.message })
                })

        } catch ({ error }: any) {
            failedToast({ msg: error.response?.data.message })
            console.error('Network error:', error);
        }
    }
    return (
        <div>
            <CardWrapper
                headerDescription={formData.headerDescription}
                headerTitle={formData.headerTitle}
                backButtonHref={formData.backButtonHref}
                backButtonLevel={formData.backButtonLevel}
                showSocial
            >

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className={
                            cn("space-y-2", isLoading ? 'blur-sm' : '')
                        }>

                        {
                            isLoading && (
                                <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                                    <TbLoader3 className="text-6xl text-rose-600 animate-spin" />
                                </div>
                            )
                        }

                        {/* গ্রাহকের নাম */}

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>গ্রাহকের নাম</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="লুৎফর রহমান"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* গ্রাহকের পিতার নাম */}

                        <FormField
                            control={form.control}
                            name="f_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>গ্রাহকের পিতার বা স্বামীর নাম</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="বদিরুদ্দিন"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        {/*  মোবাইল নম্বর  */}

                        <div className="flex gap-2">
                            <div className="w-1/3">
                                <FormField
                                    control={form.control}
                                    name="cc"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> কোড </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled
                                                    placeholder=" +88 "
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="w-2/3">
                                <FormField
                                    control={form.control}
                                    name="phoneNo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> মোবাইল নম্বর </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="0 1 7 * * * * * * *"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/*  */}

                        <div >
                            <Label>ঠিকানা</Label>

                            <div className="md:flex gap-2  space-y-3 md:space-y-0">
                                <div className="md:w-1/3 ">
                                    <FormField
                                        control={form.control}
                                        name="address_village"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <select {...field}
                                                        className='border-2 rounded-md w-full h-9 focus:outline-double '
                                                    >
                                                        {
                                                            villageName?.map((item, index) => {
                                                                return <option
                                                                    key={index}
                                                                    hidden={item.hidden}
                                                                    value={item.value}
                                                                >
                                                                    {item.village}
                                                                </option>
                                                            })
                                                        }
                                                    </select>

                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="md:w-2/3">
                                    <FormField
                                        control={form.control}
                                        name="address_home"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="বাড়ির ঠিকানা"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>


                            </div>


                        </div>

                        {/* পাসওয়ার্ড */}

                        <div className="md:flex gap-2">

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>পাসওয়ার্ড</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="******"
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* পাসওয়ার্ড নিশ্চিত করুন */}

                            <FormField
                                control={form.control}
                                name="c_c_password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>পাসওয়ার্ড নিশ্চিত করুন</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="******"
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button className='w-full' type="submit">Submit</Button>
                    </form>
                </Form>

            </CardWrapper>
        </div>
    )
}

export default RegisterForm