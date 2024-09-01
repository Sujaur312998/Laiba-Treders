"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "./CardWrapper";
import { LoginSchema } from "@/schemas/LoginSchema";
import { Button } from "@/components/ui/button";
import { TbLoader3 } from "react-icons/tb";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { login } from '@/actions/login';
import { cn } from "@/lib/utils";

const formData = {
    headerDescription: 'Welcome Back',
    headerTitle: 'Laiba Treders',
    backButtonHref: '/register',
    backButtonLevel: 'Create an Account'
}

const SignInForm = () => {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            phoneNo: "",
            password: ""
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('');
        setSuccess('');
        startTransition(() => {
            login(values);
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <CardWrapper
                headerDescription={formData.headerDescription}
                headerTitle={formData.headerTitle}
                backButtonHref={formData.backButtonHref}
                backButtonLevel={formData.backButtonLevel}
                showSocial
            >
                {
                    isPending && (
                        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                            <TbLoader3 className="text-5xl text-rose-600 animate-spin blur-0" />
                        </div>
                    )
                }

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className={
                            cn("space-y-6", isPending ? 'blur-sm' : '')
                        }
                    >



                        <FormField
                            control={form.control}
                            name="phoneNo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>মোবাইল নম্বর</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="0 1 7 * * * * * * *"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className='w-full' type="submit" disabled={isPending}>Submit</Button>
                    </form>
                </Form>
            </CardWrapper>
        </div>
    );
};

export default SignInForm;
