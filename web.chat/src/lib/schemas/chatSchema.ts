"use client";

import {z} from 'zod';

export const newChatSchema = z.object({
    email: z.string().email({message: 'Email is invalid'})
})

export type NewChatData = z.infer<typeof newChatSchema>