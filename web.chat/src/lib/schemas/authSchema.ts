"use client"

import { z } from 'zod';

// sign in schema

export const signInSchema = z.object({
    email: z.string().email({message: 'Invalid email'}),
    password: z.string().min(1, {message: 'Password is required'})
})

export type SignInData = z.infer<typeof signInSchema>


export const signUpSchema = z.object({
    name: z.string().min(1, {message: 'Name is required'}).max(80, {message: 'Name must have less than 80 caracteres'}),
    email: z.string().email({message: 'Email is invalid'}).max(255, {message: 'Email must have less than 255 caracteres'}),
    password: z.string().min(1, {message: 'Password is required'})
})

export type SignUpData = z.infer<typeof signUpSchema>