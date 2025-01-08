"use client";

import { deleteChat } from "@/lib/requests";
import { useChatStore } from "@/stores/chatStore";
import dayjs from "dayjs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, EllipsisVertical, Trash2 } from "lucide-react";

export const Header = () => {
    const { chat, chats, setLoading } = useChatStore()
    const userIsOnline = dayjs().subtract(5, 'minutes').isBefore(dayjs(chats?.find(item => item.id == chat?.id)?.user.last_access))

    const handleDeleteChat = async () => {
        if (!chat) return;
        setLoading(true)
        await deleteChat(chat.id);
        setLoading(false)
    }


    return (
        <div className="flex items-center gap-6 border-b bg-slate-100/80 dark:bg-slate-900/80 px-8 pr-12 h-16">
            <Avatar>
                <AvatarImage
                    src={chat?.user.avatar}
                    alt={chat?.user.name}
                />
                <AvatarFallback>{chat?.user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
                <h1 className="font-bold text-ellipsis truncate max-w-96">
                    {chat?.user.name}
                </h1>
                <small className="text-slate-500 dar:text-slate-400 block mt-0.5">
                    {userIsOnline ? 'Online' : `Last view ${dayjs(chats?.find(item => item.id == chat?.id)?.user.last_access).format('DD/MM/YYYY [ás] HH:mm')}`}
                </small>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <EllipsisVertical 
                        className="size-5 text-slate-500 dark:text-slate-400 hover:text-primary"
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleDeleteChat}>
                        <Trash2 className="mr-2 size-4"/>
                        <span>Delete chat</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}