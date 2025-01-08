import { NewChatData, newChatSchema } from "@/lib/schemas/chatSchema"
import { useChatStore } from "@/stores/chatStore"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createChat } from "@/lib/requests"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"


export const NewChat = () => {
    const { showNewChat, setChat, setShowNewChat } = useChatStore()

    const form = useForm<NewChatData>({
        resolver: zodResolver(newChatSchema),
        defaultValues: {
            email: ''
        }
    })

    const onSubmit = async (values: NewChatData) => {
        const response = await createChat(values)

        if (response.data) {
            setChat(response.data.chat)
            setShowNewChat(false)
            form.setValue('email', '')
            return;
        }

        toast.error(response.error.message, { position: 'top-center' })
    }

    return (
        <Drawer open={showNewChat} onOpenChange={setShowNewChat}>
            <DrawerContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full max-w-lg">
                        <DrawerHeader>
                            <DrawerTitle>New Chat</DrawerTitle>
                            <DrawerDescription>Insert the user email, for start a new chat</DrawerDescription>
                        </DrawerHeader>

                        <div className="p-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Ex: lucas@example.com"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DrawerFooter className="mt-8">
                            <Button type="submit">Start chat</Button>
                            <DrawerClose>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </Form>
            </DrawerContent>
        </Drawer>
    )
}