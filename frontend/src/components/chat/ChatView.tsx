'use client';
import { OtherUser } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../account/Avatar";
import ChatInput from "./ChatInput";
import MessagesView from "./MessagesView";

export default function ChatView(props: {username: string}) {
    // Get avatar and name of peer user
    const chatUser: OtherUser = {
        name: "Michael",
        username: props.username,
        avatarUrl: null
    }

    function sendMessage(message: string) {
        // Send message
        console.log(message);
    }

    return (
        <div className="h-full bg-sky-300 dark:bg-sky-700 flex flex-col">
            <div className="flex-none h-16 bg-sky-400 dark:bg-sky-600">
                <Link className="inline-block lg:hidden ml-4 mr-2 my-2 p-2 align-middle rounded-full bg-opacity-0 hover:bg-opacity-50 bg-blue-500" href="/chat">
                    <Image
                        src="/icons/left.svg"
                        alt="Close"
                        width="32"
                        height="32"
                    />
                </Link>
                <div className="inline-block mx-4 my-2 align-middle">
                    <div className="inline-block w-fit align-middle">
                        <Avatar user={chatUser} size={48}/>
                    </div>
                    <span className="inline-block ml-4 text-lg align-middle">{chatUser.name}</span>
                </div>
            </div>
            <div className="flex-1 min-h-0">
                <MessagesView chatUser={chatUser} />
            </div>
            <div className="flex-[0.09]">
                <div className="mx-8 mt-1 mb-1">
                    <ChatInput sendMessage={sendMessage}/>
                </div>
            </div>
        </div>
    )
}
