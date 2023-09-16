'use client';
import { User, UserApi } from "@/api/user";
import EmailEdit from "./EmailEdit";
import UsernameEdit from "./UsernameEdit";
import InfoEdit from "./InfoEdit";
import PasswordEdit from "./PasswordEdit";
import { useRouter } from "next/navigation";
import useSWR from 'swr';

export default function AccountView() {
    const router = useRouter();
    const userCache = useSWR("user", UserApi.getMe);
    if (userCache.error === "unauthorized" && !userCache.data) {  // not undefined == no user
        router.push('/login');
        return <div></div>;
    }
    if (!userCache.data) return <div></div>;
    const user = userCache.data;
    console.log(user);

    function logout() {
        UserApi.logout();
        router.push('/login');
    }

    return (
        <div className="mb-16 flex flex-col md:flex-row gap-32 justify-center items-center md:items-start">
            <div className="flex-initial mx-16">
                <InfoEdit user={user} avatarSize={150} />
            </div>
            <div className="flex-initial mx-8 flex flex-col gap-y-6 md:gap-y-12 text-center md:text-left text-lg">
                <div>
                    <label className="inline-block mx-auto w-64 align-top">Имя пользователя: </label>
                    <UsernameEdit user={user} />
                </div>
                <div className="mt-4">
                    <label className="inline-block mx-auto w-64 align-top">Почта: </label>
                    <EmailEdit user={user} />
                </div>
                <div className="mt-4">
                    <label className="inline-block mx-auto w-64 align-top">Пароль: </label>
                    <PasswordEdit user={user} />
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
