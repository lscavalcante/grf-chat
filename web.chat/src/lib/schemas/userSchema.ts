'use client'

import { z } from 'zod';

export const updateUserSchema = z.object({
    name: z.string().min(1).max(80),
    email: z.string().email().max(254),
    // verify is value that user digit is null or not
    password: z.string().min(1).max(255).refine(value => !value),
    confirm_password: z.string()
    // se o data password for igual confirm password eu nao vou mostrar a mensagem
}).refine(data => data.password === data.confirm_password, {
    message: 'Confirm password is not equal to password',
    path: ['confirm_password']
})

export type UpdateUserData = z.infer<typeof updateUserSchema>