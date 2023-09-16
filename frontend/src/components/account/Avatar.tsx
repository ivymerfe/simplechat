import type { OtherUser, User } from "@/api/user";
import Image from "next/image";

export default function Avatar(props: {user: User | OtherUser, size: number}) {
    const user = props.user;
    const url = user.avatarUrl ? user.avatarUrl : '/icons/user.svg';
    var imgClass = "mx-auto rounded-full text-center";
    if (!user.avatarUrl) {
        imgClass += " dark:invert";
    }

    return (
        <div className="rounded-full bg-slate-100 dark:bg-slate-900">
            <Image
                src={url}
                alt="Ava"
                width={props.size}
                height={props.size}
                className={imgClass}
            />
        </div>
    )
}
