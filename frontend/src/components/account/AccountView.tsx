'use client';
import { User } from "@/utils/api";
import EmailEdit from "./EmailEdit";
import UsernameEdit from "./UsernameEdit";
import InfoEdit from "./InfoEdit";
import PasswordEdit from "./PasswordEdit";

export default function AccountView() {
    // get data from swr
    // get user class
    const testUser: User = {
        name: "John",
        username: "john1234",
        email: "123@gmail.com",
        avatarUrl: null
    }

    function logout() {
        // Call api
    }

    return (
        <div className="mb-16 flex flex-col md:flex-row gap-32 justify-center items-center md:items-start">
            <div className="flex-initial mx-16">
                <InfoEdit user={testUser} avatarSize={150} />
            </div>
            <div className="flex-initial mx-8 flex flex-col gap-y-6 md:gap-y-12 text-center md:text-left text-lg">
                <div>
                    <label className="inline-block mx-auto w-64 align-top">Имя пользователя: </label>
                    <UsernameEdit user={testUser} />
                </div>
                <div className="mt-4">
                    <label className="inline-block mx-auto w-64 align-top">Почта: </label>
                    <EmailEdit user={testUser} />
                </div>
                <div className="mt-4">
                    <label className="inline-block mx-auto w-64 align-top">Пароль: </label>
                    <PasswordEdit user={testUser} />
                </div>
                <div className="mt-12">
                    <button
                        className="px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 active:bg-rose-800"
                        onClick={logout}
                    >Выйти из аккаунта</button>
                </div>
            </div>
        </div>
    )
}
