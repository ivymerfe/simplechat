import { OtherUser, User, UserApi } from "./user"

export type Message = {
    user: User | OtherUser,
    date: Date,
    text: string
}

export class ChatApi {
    static async verifiedGet(url: string) {
        const result = await UserApi.authorizedGet(url);
        if (result.error && result.error.response?.status === 403  && result.data?.detail === "user_not_verified") {
            return {success: false, data: result.data, error: "not_verified"}
        }
        return result;
    }

    static async verifiedPost(url: string, data?: any) {
        const result = await UserApi.authorizedPost(url, data);
        if (result.error && result.error.response?.status === 403  && result.data?.detail === "user_not_verified") {
            return {success: false, data: result.data, error: "not_verified"}
        }
        return result;
    }

    static async findUsers(query: string) {
        return await ChatApi.verifiedPost("chat/find/", { query });
    }

    static async getDialogs() {
        return await ChatApi.verifiedGet("chat/dialogs/");
    }

    static async getChat(user: string) {
        return await ChatApi.verifiedPost("chat/user/", { user });
    }

    static async sendMessage(to_user: string, text: string) {
        return await ChatApi.verifiedPost("chat/send_message/", { to_user, text });
    }
}
