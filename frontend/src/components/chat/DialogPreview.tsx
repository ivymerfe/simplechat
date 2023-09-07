import { OtherUser, User } from "@/utils/api"
import formatDate from "@/utils/dateformat"
import Link from "next/link"
import Avatar from "../account/Avatar"
import { MessageProps } from "./Message"

export type DialogPreviewProps = {
    me: User,
    user: User | OtherUser,
    lastMessage: MessageProps | null
}

export default function DialogPreview({me, user, lastMessage}: DialogPreviewProps) {
    return (
        <div className="h-20 px-4 pt-4 hover:backdrop-brightness-75">
            <Link href={`/chat/${user.username}`} className="text-black dark:text-white hover:text-black dark:hover:text-white block w-full h-full">
                <div className="inline-block w-12 h-12 align-top"><Avatar user={user} size={48}/></div>
                <div className="inline-block w-3/4 ml-3">
                    <div>
                        <span className="inline-block text-lg w-full truncate">{user.name}</span>
                    </div>
                    {lastMessage && <div>
                        <span className="align-middle text-sm text-sky-900 dark:text-sky-300">{formatDate(lastMessage.date, true)}</span>
                        <span
                            className="inline-block ml-2 w-3/4 align-middle truncate"
                        >{lastMessage.user === me ? "(Вы) " + lastMessage.text : lastMessage.text}</span>
                    </div>}
                </div>
            </Link>
        </div>
    )
}
