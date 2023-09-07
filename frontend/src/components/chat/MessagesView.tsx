import { OtherUser } from "@/utils/api";
import Message from "./Message";

export default function MessagesView(props: {chatUser: OtherUser}) {
    const testUser: OtherUser = {
        name: "Mike",
        username: "mikee",
        avatarUrl: "/avatars/k.png"
    }
    const date = new Date();
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac condimentum erat, ut vulputate magna. Duis sed enim felis. Mauris egestas feugiat dui ut cursus. Aliquam pellentesque, arcu in pretium rhoncus, dolor elit auctor nunc, eu hendrerit enim purus ut velit. Integer eu luctus est. Donec condimentum euismod cursus. Donec et dignissim eros. Nunc lacus sem, suscipit quis orci sit amet, vulputate tristique lacus. Donec rutrum velit at nibh porta, vitae posuere nisl posuere. "
    const messages = Array(40).fill(<Message user={testUser} date={date} text={loremIpsum}/>);
    // Добавить отображение даты

    return (
        <ul className="max-h-full overflow-y-scroll no-scrollbar">
            {messages.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
    )
}
