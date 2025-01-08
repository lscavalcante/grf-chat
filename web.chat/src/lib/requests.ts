import { SignInData, SignUpData } from "@/lib/schemas/authSchema";
import { api } from "@/lib/api";
import { APISignIn, APISignUp } from "@/types/Auth";
import { APIUpdateUser } from "@/types/Users";
import { APICreateChats, APIDeleteChats, APIGetChats } from "@/types/Chat";
import { NewChatData } from "@/lib/schemas/chatSchema";
import { APICreateMessage, APIDeleteMessage, APIGetMessages } from "@/types/Message";


export const signIn = async (data: SignInData) => {
    return await api<APISignIn>({
        endpoint: 'accounts/sign-in',
        method: 'POST',
        withAuth: false,
        data: data
    })
}

export const signUp = async (data: SignUpData) => {
    return await api<APISignUp>({
        endpoint: 'accounts/sign-up',
        method: 'POST',
        withAuth: false,
        data: data
    })
}

export const updateUser = async (data: FormData) => {
    return await api<APIUpdateUser>({
        endpoint: 'accounts/me',
        method: 'PUT',
        data: data,
        withAttachment: true
    })
}

// Chat

export const getChats = async () => {
    return await api<APIGetChats>({
        endpoint: 'chats/'
    })
}

export const createChat = async (data: NewChatData) => {
    return await api<APICreateChats>({
        endpoint: 'chats/',
        method: 'POST',
        data: data
    })
}

export const deleteChat = async (chat_id: number) => {
    return await api<APIDeleteChats>({
        endpoint: `chats/${chat_id}/`,
        method: 'DELETE',
    })
}

export const getChatMessages = async (chat_id: number) => {
    return await api<APIGetMessages>({
        endpoint: `chats/${chat_id}/messages`
    })
}

export const createChatMessage = async (chat_id: number, data: FormData) => {
    return await api<APICreateMessage>({
        endpoint: `chats/${chat_id}/messages`,
        method: 'POST',
        data: data,
        withAttachment: true
    })
}

export const deleteChatMessage = async (chat_id: number, message_id: number) => {
    return await api<APIDeleteMessage>({
        endpoint: `chats/${chat_id}/messages/${message_id}`,
        method: 'DELETE',
    })
}