import { Message } from "@/api/chat";
import { OtherUser, User } from "@/api/user"
import formatDate from "@/utils/dateformat";
import Avatar from "../account/Avatar"

export default function ChatMessage(props: Message) {
    return (
        <div className="m-6">
            <div className="inline-block w-12 h-12 align-top"><Avatar user={props.user} size={48}/></div>
            <div className="inline-block w-2/4 ml-4">
                <div>
                    <span className="text-lg align-middle">{props.user.name}</span>
                    <span className="inline-block ml-2 text-sm align-middle text-sky-800 dark:text-sky-300">{formatDate(props.date, false)}</span>
                </div>
                <div className="mt-2">
                    <span>{props.text}</span>
                </div>
            </div>
        </div>
    )
}
