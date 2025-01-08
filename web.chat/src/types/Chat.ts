
import { Message } from "@/types/Message"
import { User } from "@/types/Users"

export type Chat = {
    id: number,
    last_message: Message | null,
    unseen_count: number,
    user: User,
    viewed_at: string | null,
    created_at: string
}

export type APIGetChats = {
    chats: Chat[]
}

export type APICreateChats = {
    chat: Chat
}

export type APIDeleteChats = {
    success: boolean
}

export type UpdateChatEvent = {
    type?: 'delete',
    query: {
        chat_id?: number,
        users: number[]
    }
}
