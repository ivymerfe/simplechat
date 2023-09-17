'use client';
import { ChatApi, Message } from "@/api/chat";
import { OtherUser, User, UserApi } from "@/api/user";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../account/Avatar";
import ChatInput from "./ChatInput";
import useSWR from 'swr';
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ChatWebSocket from "@/api/websocket";
import { loadChatMessages } from "@/utils";
import ChatMessage from "./ChatMessage";

export default function ChatView(props: {username: string}) {
    const messageListRef = useRef<HTMLUListElement>(null);
    const [chatUser, setChatUser] = useState<OtherUser>();
    const [messages, setMessages] = useState<Message[]>([]);
    const router = useRouter();

    useEffect(() => {
        messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight)
    }, [messages]);

    useEffect(() => {
        UserApi.getMe().then((me) => {
            ChatApi.getChat(props.username).then(({success, data, error}) => {
                if (!success) {
                    if (error === "not_verified") {
                        router.push('/emailconfirm');
                    } else {
                        // Dont care what error
                        router.push('/chat');
                    }
                } else {
                    const chatUser = data.user as OtherUser;
                    const messages = loadChatMessages(me, chatUser, data.messages);
                    setChatUser(chatUser);
                    setMessages(messages);
                    // @ts-ignore
                    if (!window['msgSocket']) {
                        // @ts-ignore
                        window['msgSocket'] = new ChatWebSocket();
                    }
                    // @ts-ignore
                    const socket: ChatWebSocket = window['msgSocket'];
                    socket.addMessageHandler((msg) => {
                        if (msg.from_user === chatUser.username) {
                            const tMsg = {user: chatUser, date: msg.date, text: msg.text};
                            setMessages([...messages, tMsg]);
                        }
                    })
                }
            });
        }).catch((e) => e !== "unauthorized" && console.error(e));
    }, []);

    const userCache = useSWR("user", UserApi.getMe);
    if (userCache.error === "unauthorized" && !userCache.data) {
        router.push("/login");
        return <div></div>;
    }
    if (!userCache.data) return <div></div>;
    const user: User = userCache.data;
    if (!chatUser) return <div></div>;

    function sendMessage(message: string) {
        // @ts-ignore
        if (window["msgSocket"]) {
            // @ts-ignore
            const socket: ChatWebSocket = window["msgSocket"];
            const chatUser2 = chatUser as OtherUser;
            socket.sendMessage(chatUser2.username, message);
            setMessages([...messages, {user: user, date: new Date(), text: message}]);
        }
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
                <ul ref={messageListRef} className="max-h-full overflow-y-scroll no-scrollbar">
                    {messages.map((m, i) => <li key={i}><ChatMessage user={m.user} date={m.date} text={m.text} /></li>)}
                </ul>
            </div>
            <div className="flex-[0.09]">
                <div className="mx-8 mt-1 mb-1">
                    <ChatInput sendMessage={sendMessage}/>
                </div>
            </div>
        </div>
    )
}
