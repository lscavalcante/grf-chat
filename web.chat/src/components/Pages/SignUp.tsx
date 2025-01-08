"use client";

import { SignUpData, signUpSchema } from "@/lib/schemas/authSchema";
import { handleSignUp } from "@/lib/server/auth";
import { useAuthStore } from "@/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

export const SignUpPage = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const setUser = useAuthStore(state => state.setUser)
    const router = useRouter()

    const form = useForm<SignUpData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })


    const onSubmit = async (values: SignUpData) => {
        setLoading(true)
        const response = await handleSignUp(values)

        if (response.error) {
            setLoading(false)
            toast.error(response.error.message, { position: "top-center" })

            return;
        }

        setUser(response.data.user)
        toast.success('Autenticado com sucesso!', { position: "top-center" })
        router.push("/")
    }

    return (
        <main className="h-app flex items-center justify-center overflow-auto px-6">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Create account</CardTitle>
                    <CardDescription>Insert your name, email and password to create an account</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-3">
                                {loading
                                    ? <>
                                        {Array.from({ length: 3 }).map((_, key) => (
                                            <Skeleton key={key} className="h-10 rounded-md" />
                                        ))}
                                    </>
                                    : <>
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Ex: Lucas Santos" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Ex: teste@mail.com" />
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
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="Ex: 123456" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                }
                            </div>

                            <Button disabled={loading}>Register</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    )
}