import type { User } from "@/utils/api";
import Image from "next/image";

export default function Avatar(props: {user: User, size: number}) {
    const user = props.user;

    return (
        <div className="rounded-full w-fit relative bg-slate-100 dark:bg-slate-900">
            <Image
                src={user.avatarUrl}
                alt="Avatar"
                width={props.size}
                height={props.size}
                className="mx-auto rounded-full dark:invert"
            />
        </div>
    )
}
