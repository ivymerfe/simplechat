'use client'
import React, { useEffect } from "react";
import CustomInput from "../common/CustomInput";
import PasswordInput from "../common/PasswordInput";
import { checkLogin } from "@/utils/validate";
import CustomButton from "../common/CustomButton";
import CircleLoader from "../common/CircleLoader";
import Link from "next/link";
import { UserApi } from "@/api/user";
import { useRouter } from "next/navigation";
import useSWR, { useSWRConfig } from 'swr';
import TokenService from "@/api/token";

export default function LoginForm() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passVisible, setPassVisible] = React.useState(false);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const router = useRouter();
    const userCache = useSWR("user", UserApi.getMe);
    if (userCache.data && TokenService.getAccessToken()) { // logout fix
        router.push('/chat');
    }
    const { mutate } = useSWRConfig();

    const checkResult = checkLogin(email, password);

    function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
        setError("");
    }

    function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
        setError("");
    }

    function submit() {
        setLoading(true);
        UserApi.login(email, password).then(({success, error}) => {
            setLoading(false);
            if (!success) {
                if (error === 'bad_credentials') {
                    setError("Неверный логин или пароль");
                } else {
                    setError("Неизвестная ошибка (в консоли)");
                    console.log(error);
                }
            } else {
                mutate("user");
                router.push("/chat");
            }
        });
    }

    const disableForm = loading || !checkResult.correct;
    return (
        <form
            onSubmit={(e: React.FormEvent) => e.preventDefault()}
            className="flex flex-col items-center gap-4"
            onKeyUp={(e: React.KeyboardEvent) => e.key == "Enter" && !disableForm && submit()}
        >
            <label className="text-lg">Почта</label>
            <CustomInput
                type="email"
                placeholder="123@gmail.com"
                value={email}
                onChange={onEmailChange}
            />
            <label className="text-lg">Пароль</label>
            <div className="relative">
                <PasswordInput
                    visible={passVisible}
                    onToggleVisibility={setPassVisible}
                    value={password}
                    onChange={onPasswordChange}
                />
                <Link
                    className="block sm:inline-flex sm:items-center sm:absolute mt-3 sm:mt-0 sm:ml-5 sm:h-full whitespace-nowrap"
                    href="/passwordreset"
                >Забыл пароль?</Link>
            </div>
            <div className="relative">
                <CustomButton
                    className="mt-2 px-8 py-2"
                    type="button"  // иначе будет постоянно отправляться при удерживании enter
                    onClick={submit}
                    disabled={disableForm}
                >Войти
                </CustomButton>
                {loading && <div className="absolute left-full top-1/4 ml-6"><CircleLoader/></div>}
            </div>
            <span className="-mt-1 text-md text-rose-500">{checkResult.error || error}</span>
        </form>
    )
}
