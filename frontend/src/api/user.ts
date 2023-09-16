import { AxiosError } from "axios"
import axiosInstance from "./api"
import TokenService from "./token"

export type User = {
    name: string,
    username: string,
    email: string,
    avatarUrl: string | null
}

export type OtherUser = {
    name: string,
    username: string,
    avatarUrl: string | null
}


export class UserApi {
    static async login(email: string, password: string) {
        try {
            const rs = await axiosInstance.post("auth/token/", { email, password });
            TokenService.setAccessToken(rs.data.access);
            TokenService.setRefreshToken(rs.data.refresh);
            return {success: true}
        } catch (e: any) {
            if (e.response?.status === 401) {
                return {success: false, error: "bad_credentials"}
            }
            return {success: false, error: e}
        }
    }

    static logout() {
        TokenService.setAccessToken(null);
        TokenService.setRefreshToken(null);
    }

    static async register(username: string, email: string, password: string, name: string) {
        try {
            const rs = await axiosInstance.post("auth/register/", { username, email, password, name });
            return {success: true}
        } catch (e) {
            return {success: false, error: e}
        }
    }

    static async authorizedGet(url: string) {
        try {
            const rs = await axiosInstance.get(url);
            return {success: true, data: rs.data}
        } catch (e: any) {
            if (e.response?.status === 401) {
                UserApi.logout();
                return {success: false, error: "unauthorized"}
            }
            return {success: false, data: e.response?.data, error: e}
        }
    }

    static async authorizedPost(url: string, data?: any) {
        try {
            const rs = await axiosInstance.post(url, data);
            return {success: true, data: rs.data}
        } catch (e: any) {
            if (e.response?.status === 401) {
                UserApi.logout();
                return {success: false, error: "unauthorized"}
            }
            return {success: false, data: e.response?.data, error: e}
        }
    }

    static async getMe(): Promise<User> {
        try {
            const rs = await UserApi.authorizedGet("auth/me/");
            if (!rs.data) throw "unauthorized";
            const user = rs.data;
            return {
                name: user.name,
                username: user.username,
                email: user.email,
                avatarUrl: user.avatarUrl
            }
        } catch {
            throw "unauthorized";
        }
    }

    static async checkUsername(username: string) {
        try {
            return {response: await axiosInstance.post("auth/check_username/", { username })};
        } catch (e: any) {
            if (e.response?.status === 400) {
                return {error: 'invalid_username'}
            }
            return {error: e}
        }
    }

    static async sendCode() {
        return await UserApi.authorizedPost("auth/send_code/"); 
    }

    static async checkCode(code: string) {
        return await UserApi.authorizedPost("auth/check_code/", { code });
    }

    static async changeName(name: string) {
        return await UserApi.authorizedPost("auth/change_name/", { name });
    }

    static async changeAvatar(avatarUrl: string) {
        return await UserApi.authorizedPost("auth/change_avatar/", { avatarUrl });
    }

    static async changeUsername(username: string) {
        return await UserApi.authorizedPost("auth/change_username/", { username });
    }

    static async changePassword(new_password: string, old_password: string) {
        return await UserApi.authorizedPost("auth/change_password/", { new_password, old_password });
    }

    static async changeEmail(new_email?: string, email_code?: string) {
        return await UserApi.authorizedPost("auth/change_email/", { new_email, email_code });
    }

    static async passwordReset(email: string, new_password?: string, email_code?: string) {
        return await UserApi.authorizedPost("auth/password_reset/", { email, new_password, email_code });
    }
}
