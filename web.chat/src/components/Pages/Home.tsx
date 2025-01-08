"use client"

import { useChatStore } from "@/stores/chatStore";
import Chat from "../Chat";
import Image from "next/image";
import HomeSectionBg from "@/assets/logo.svg"
import { Button } from "../ui/button";
import { Lock } from "lucide-react";

const HomePage = () => {
  const { chat, setShowNewChat } = useChatStore();

  return <div className="h-app">{
        chat ? 
        <Chat/> 
        : 
        <div className="flex flex-col items-center gap-12 py-8 h-full px-4">
            <div className="flex flex-col items-center justify-center gap-12 flex-1">
                    <Image 
                        src={HomeSectionBg} 
                        alt="Home Section"
                        width={440}
                        priority
                    />

                    <p className="text-xl max-w-xl text-center font-bold text-slate-600 dark:text-slate-300">
                        Please select a conversation to view messages or start a new chat.
                    </p>

                    <Button 
                    onClick={() => setShowNewChat(true)}
                        className="rounded-full">
                        New Chat
                    </Button>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <Lock className="size-4" strokeWidth={3}/>
                Your personal messages are protected with end-to-end encryption.
            </div>
        </div>
        }</div>;
};

export default HomePage;
