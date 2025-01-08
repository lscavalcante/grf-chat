import { useTheme } from "next-themes";
import { ChangeEvent, useRef, useState } from "react"
import { toast } from "sonner";
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data";
import { Laugh, Mic, Paperclip,  SendHorizonal, Trash, X } from "lucide-react";
import { BounceLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
    onSendMessage: (data: { text?: string, attachment?: File | null, audio?: Blob | null }) => void
}


export const Footer = ({ onSendMessage }: Props) => {
    const [emojiPicker, setEmojiPicker] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([])
    const [messageValue, setMessageValue] = useState('')
    const [messageAttachment, setMessageAttachment] = useState<File | null>(null)

    const theme = useTheme()

    const mediaRecorder = useRef<MediaRecorder | null>(null)

    const handleToogleEmojiPicker = () => setEmojiPicker(!emojiPicker)

    const handleEmojiSelect = (data: { native: string }) => {
        setMessageValue(`${messageValue} ${data.native}`)
    }

    // Avenida Navarro de Andrade 1565 Horto florestal - Jundiaí

    const handleUploadAttachment = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0)
        if (file) setMessageAttachment(file)
    }

    const handleStartRecording = async () => {
        let stream: MediaStream | null = null;

        if ('MediaRecorder' in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false
                })

                stream = streamData
            } catch (error) {
                toast.error("Enable your mic permission", { position: 'top-center' })
                return;
            }
        } else {
            toast.error("Your browser don't have suport to record audio", { position: 'top-center' })
        }

        if (!stream) return;

        setIsRecording(true)

        const media = new MediaRecorder(stream, {
            mimeType: 'audio/webm'
        })

        mediaRecorder.current = media;
        mediaRecorder.current.start();

        const localAudioChunks: Blob[] = [];

        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === 'undefined' || event.data.size === 0) return;
            localAudioChunks.push(event.data);
        }

        setAudioChunks(localAudioChunks)

    }

    const handleSendRecording = () => {
        if (!mediaRecorder.current) return;

        setIsRecording(false)

        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })

            onSendMessage({ audio: audioBlob })
            setAudioChunks([])
        }

        mediaRecorder.current.stream.getTracks().forEach(track => track.stop())
    }

    const handleDeleteRecording = () => {
        if (!mediaRecorder.current) return;

        setIsRecording(false)

        mediaRecorder.current.stop()
        mediaRecorder.current.stream.getTracks().forEach(track => track.stop())
    }

    const handleSendMessage = () => {
        onSendMessage({ text: messageValue, attachment: messageAttachment })

        setMessageAttachment(null)
        setMessageValue("")
    }

    return (
        <div>
            <div className={`fixed ml-2 ${emojiPicker ? "opacity-100 bottom-16" : "-bottom-[440px] opacity-0 duration-300"}`}>
                <Picker
                    data={data}
                    theme={theme.theme}
                    onEmojiSelect={handleEmojiSelect}
                />
            </div>
            {messageAttachment &&
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 bg-slate-100/80 dark:bg-slate900/80 px-10 py-2 border-t">
                    <p className="text-xs">
                        File loaded: {messageAttachment.name} - {messageAttachment.type}
                    </p>
                    <X
                        onClick={() => setMessageAttachment(null)}
                        className="size-4 hover:text-primary cursor-pointer"
                    />
                </div>
            }

            <div className="flex items-center gap-4 border-t bg-slate-100/80 dark:bg-slate-900/80 px-8 py-2.5">
                {isRecording ?
                    <div className="flex items-center gap-5">
                        <Button variant={'ghost'} size={'icon'} title="Stop audio" onClick={handleDeleteRecording}>
                            <Trash className="size-5 text-slate-500 dark:text-slate-300" />
                        </Button>

                        <div className="text-sm text-slate-500 dark:text-slate-300 flex items-center gap-2">
                            <BounceLoader color="#f13434b3" />
                            Recording ...
                        </div>

                        <Button className="ml-6" size={'sm'} title="Send message" onClick={handleSendRecording}>
                            <SendHorizonal className="text-slate-100" />
                        </Button>
                    </div>
                    :
                    <>
                        <div className="flex items-center gap-2.5">
                            <Button variant={'ghost'} size={'icon'} title="Emoji" onClick={handleToogleEmojiPicker}>
                                <Laugh className="text-slate-500 dark:text-slate-300" />
                            </Button>

                            <Button variant={'ghost'} size={'icon'} title="Attachment" onClick={() => document.getElementById('attachment')?.click()}>
                                <Paperclip className="text-slate-500 dark:text-slate-300" />
                            </Button>
                            <Input type="file" className="hidden" id="attachment" onChange={handleUploadAttachment} />
                        </div>

                        <div className="flex-1">
                            <Input
                                value={messageValue}
                                onChange={e => setMessageValue(e.target.value)}
                                placeholder="Write your message..."
                            />
                        </div>

                        <div>
                            {!messageValue && !messageAttachment ?
                                <Button size={'icon'} title="Record message" onClick={handleStartRecording}>
                                    <Mic className="text-slate-100" />
                                </Button>
                                :
                                <Button size={'icon'} title="Record message" onClick={handleSendMessage}>
                                    <SendHorizonal className="text-slate-100" />
                                </Button>
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    )


}