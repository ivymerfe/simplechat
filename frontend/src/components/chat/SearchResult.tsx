import { OtherUser } from "@/utils/api";
import Avatar from "@/components/account/Avatar";
import Link from "next/link";

export default function SearchResult({user}: {user: OtherUser}) {
    return (
        <div className="h-16 w-full pt-3 bg-sky-500 hover:bg-sky-300 dark:bg-sky-700 dark:hover:bg-sky-800">
            <Link href={`/chat/${user.username}`} className="text-black dark:text-white hover:text-black dark:hover:text-white block w-full h-full">
                <div className="inline-block w-fit ml-3 align-middle"><Avatar user={user} size={40}/></div>
                <span className="inline-block align-middle ml-3 text-lg">{user.name}</span>
                <span className="inline-block align-middle ml-5 text-md text-blue-800 dark:text-blue-300">{'@'+user.username}</span>
            </Link>
        </div>
    )
}
