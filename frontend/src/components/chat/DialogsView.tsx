'use client';
import { OtherUser, User, UserApi } from "@/api/user";
import Link from "next/link";
import Avatar from "../account/Avatar";
import DialogPreview from "./DialogPreview";
import SearchBar from "./SearchBar";
import { ChatApi, Message } from "@/api/chat";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { loadDialogs, loadMessage, replaceDialogMessage } from "@/utils";
import ChatWebSocket from "@/api/websocket";
import useSWR from 'swr';

export default function DialogsView() {
    const [dialogs, setDialogs] = useState<{user: User | OtherUser, lastMessage: Message}[]>([]);
    const dialogsRef = useRef<{user: User | OtherUser, lastMessage: Message}[]>([]);

    const router = useRouter();

    async function requestDialogs(user: User) {
        const {success, data, error} = await ChatApi.getDialogs();
        if (!success) {
            if (error === "not_verified") {
                router.push('/emailconfirm');
                return false;
            }
            alert("Не удалось получить диалоги, ошибка в консоли");
            console.error(error);
            return false;
        } else {
            dialogsRef.current = loadDialogs(user, data);
            setDialogs(dialogsRef.current);
            return true;
        }
    }

    useEffect(() => {
        UserApi.getMe().then(async (user) => {
            // We got user, request for dialogs
            // Then create websocket
            const ok = await requestDialogs(user);
            if (ok) {
                if (!window['msgSocket' as any]) {
                    (window as any).msgSocket = new ChatWebSocket();
                }
                const socket: ChatWebSocket = (window as any).msgSocket;
                socket.addMessageHandler(async (msg) => {
                    var tMsg = loadMessage(msg, dialogsRef.current);
                    if (!tMsg && (await requestDialogs(user))) { // new dialog
                        tMsg = loadMessage(msg, dialogsRef.current);
                    }
                    if (!tMsg) {
                        console.error('Failed to get message user: ', tMsg);
                    }
                    replaceDialogMessage(dialogsRef.current, msg.from_user, tMsg as Message);
                    setDialogs([...dialogsRef.current]);  // otherwise no re-render
                });
            }
        }).catch((e) => e !== "unauthorized" && console.error(e));
    }, []);

    const userCache = useSWR("user", UserApi.getMe);
    if (userCache.error === "unauthorized" && !userCache.data) {
        router.push("/login");
        return <div></div>;
    }
    if (!userCache.data) return <div></div>;
    const user: User = userCache.data;


    return (
        <div className="h-full bg-sky-400 dark:bg-sky-600 flex flex-col">
            <div className="flex-none h-16 bg-sky-300 dark:bg-sky-700">
                <div className="inline-block ml-4 my-2 w-fit align-middle">
                    <Link href="/account"><Avatar user={user} size={48}/></Link>
                </div>
                <Link
                    href="/account"
                    className="text-black dark:text-white hover:text-black dark:hover:text-white inline-block ml-4 text-lg align-middle w-3/4 truncate"
                >{user.name}</Link>
            </div>
            <div className="flex-none">
                <SearchBar />
            </div>
            <div className="flex-1 min-h-0 pb-16">
                <ul className="max-h-full max-w-full overflow-y-scroll no-scrollbar">
                    {dialogs.map((d, i) => <li key={i}><DialogPreview me={user} user={d.user} lastMessage={d.lastMessage} /></li>)}
                </ul>
            </div>
        </div>
    )
}
