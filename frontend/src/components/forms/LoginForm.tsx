'use client'
import React from "react";
import CustomInput from "../common/CustomInput";
import PasswordInput from "../common/PasswordInput";
import { checkLogin } from "@/utils/validate";
import CustomButton from "../common/CustomButton";
import CircleLoader from "../common/CircleLoader";
import Link from "next/link";
import { UserApi } from "@/api/user";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passVisible, setPassVisible] = React.useState(false);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const router = useRouter();

    const checkResult = checkLogin(email, password);

    function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
        setError("");
    }

    function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
        setError("");
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        // Request api
        UserApi.login(email, password).then((result) => {
            setLoading(false);
            if (!result.success) {
                if (result.error === 'bad_credentials') {
                    setError("Неверный логин или пароль");
                } else {
                    setError("Неизвестная ошибка (в консоли)");
                    console.log(result.error);
                }
            } else {
                router.push("/chat")
            }
        })
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col items-center gap-4">
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
                    type="submit"
                    disabled={loading || !checkResult.correct}
                >Войти
                </CustomButton>
                {loading && <div className="absolute left-full top-1/4 ml-6"><CircleLoader/></div>}
            </div>
            <span className="-mt-1 text-md text-rose-500">{checkResult.error || error}</span>
        </form>
    )
}
