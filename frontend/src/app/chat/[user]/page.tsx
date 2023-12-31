"use client";
import ChatView from "@/components/chat/ChatView";
import DialogsView from "@/components/chat/DialogsView";

export default function ChatPage({params}: {params: {user: string}}) {
    return (
        <div className="h-screen flex">
            <div className="mt-[4.5rem] flex-1 xl:mx-16 flex min-w-0">
                <div className="hidden lg:block w-96">
                    <DialogsView />
                </div>
                <div className="flex-1 min-w-0">
                    <ChatView username={params.user} />
                </div>
            </div>
        </div>
    )
}
