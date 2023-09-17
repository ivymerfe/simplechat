import { Message } from "@/api/chat";
import { OtherUser, User } from "@/api/user";
import { WsMessage } from "@/api/websocket";

type Dialogs = {user: User | OtherUser, lastMessage: Message}[];

export function loadDialogs(me: User, dlgData: any): Dialogs {
    const dialogs = [];
    for (const dlg of dlgData) {
        const dUser: OtherUser = {
            name: dlg.user.name,
            username: dlg.user.username,
            avatarUrl: dlg.user.avatarUrl
        };
        dialogs.push({
            user: dUser,
            lastMessage: {
                user: dlg.last_message.username === me.username ? me : dUser,
                date: new Date(dlg.last_message.date),
                text: dlg.last_message.text
            }
        });
    }
    dialogs.sort(function(a, b){
        return b.lastMessage.date.getTime() - a.lastMessage.date.getTime();
    });
    return dialogs;
}

export function replaceDialogMessage(dialogs: Dialogs, username: string, message: Message) {
    var replaced = false;
    for (const dialog of dialogs) {
        if (dialog.user.username === username) {
            dialog.lastMessage = message;
            replaced = true;
            break;
        }
    }
    if (!replaced) return false;
    dialogs.sort(function(a, b){
        return b.lastMessage.date.getTime() - a.lastMessage.date.getTime();
    });
    return true;
}

export function loadMessage(message: WsMessage, dialogs: Dialogs): Message | undefined {
    for (const dlg of dialogs) {
        if (dlg.user.username === message.from_user) {
            return {
                user: dlg.user,
                date: message.date,
                text: message.text
            }
        }
    }
}

export function loadChatMessages(me: User, chatUser: OtherUser, raw_messages: {username: string, date: string, text: string}[]): Message[] {
    const messages = [];
    for (const raw_message of raw_messages) {
        const user = raw_message.username === me.username ? me : raw_message.username === chatUser.username ? chatUser : null;
        if (user) {
            messages.push({user: user, date: new Date(raw_message.date), text: raw_message.text});
        }
    }
    return messages;
}
