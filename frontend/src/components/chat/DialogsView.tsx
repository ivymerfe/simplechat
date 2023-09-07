'use client';
import { OtherUser, User } from "@/utils/api";
import Link from "next/link";
import Avatar from "../account/Avatar";
import DialogPreview from "./DialogPreview";
import { MessageProps } from "./Message";
import SearchBar from "./SearchBar";

export default function DialogsView() {
    const testUser: User = {
        name: "John",
        username: "john1234",
        email: "123@gmail.com",
        avatarUrl: "/avatars/k.png"
    }

    const testChatUser: OtherUser = {
        name: "Mike",
        username: "mikee",
        avatarUrl: "/avatars/m.png"
    }
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac condimentum erat, ut vulputate magna. Duis sed enim felis. Mauris egestas feugiat dui ut cursus. Aliquam pellentesque, arcu in pretium rhoncus, dolor elit auctor nunc, eu hendrerit enim purus ut velit. Integer eu luctus est. Donec condimentum euismod cursus. Donec et dignissim eros. Nunc lacus sem, suscipit quis orci sit amet, vulputate tristique lacus. Donec rutrum velit at nibh porta, vitae posuere nisl posuere. "
    
    const testLastMessage: MessageProps = {
        user: testUser,
        date: new Date(),
        text: loremIpsum
    }

    const sampleDialog = <DialogPreview me={testUser} user={testChatUser} lastMessage={testLastMessage}/>;
    const dialogs = Array(20).fill(sampleDialog);

    return (
        <div className="h-full bg-sky-400 dark:bg-sky-600 flex flex-col">
            <div className="flex-none h-16 bg-sky-300 dark:bg-sky-700">
                <div className="inline-block ml-4 my-2 w-fit align-middle">
                    <Link href="/account"><Avatar user={testUser} size={48}/></Link>
                </div>
                <Link
                    href="/account"
                    className="text-black dark:text-white hover:text-black dark:hover:text-white inline-block ml-4 text-lg align-middle w-3/4 truncate"
                >{testUser.name}</Link>
            </div>
            <div className="flex-none">
                <SearchBar />
            </div>
            <div className="flex-1 min-h-0 pb-16">
                <ul className="max-h-full max-w-full overflow-y-scroll no-scrollbar">
                    {dialogs.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
            </div>
        </div>
    )
}
