import type { User } from "@/utils/api";
import Image from "next/image";

export default function Avatar(props: {user: User, size: number}) {
    const user = props.user;
    const url = user.avatarUrl ?? 'icons/user.svg';
    const imgClass = user.avatarUrl ? "mx-auto rounded-full" : "mx-auto rounded-full dark:invert";

    return (
        <div className="rounded-full bg-slate-100 dark:bg-slate-900">
            <Image
                src={url}
                alt="Avatar"
                width={props.size}
                height={props.size}
                className={imgClass}
            />
        </div>
    )
}
