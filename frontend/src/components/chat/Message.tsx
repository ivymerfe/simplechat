import { OtherUser, User } from "@/utils/api"
import formatDate from "@/utils/dateformat";
import Avatar from "../account/Avatar"

export type MessageProps = {
    user: User | OtherUser,
    date: Date,
    text: string
}

export default function Message({user, date, text}: MessageProps) {
    return (
        <div className="m-6">
            <div className="inline-block w-12 h-12 align-top"><Avatar user={user} size={48}/></div>
            <div className="inline-block w-2/4 ml-4">
                <div>
                    <span className="text-lg align-middle">{user.name}</span>
                    <span className="inline-block ml-2 text-sm align-middle text-sky-800 dark:text-sky-300">{formatDate(date, false)}</span>
                </div>
                <div className="mt-2">
                    <span>{text}</span>
                </div>
            </div>
        </div>
    )
}
