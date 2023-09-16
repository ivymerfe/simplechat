'use client';
import { mapErrors } from "@/api/errors";
import { User, UserApi } from "@/api/user";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CircleLoader from "../common/CircleLoader";
import CodeInput from "../common/CodeInput";
import TimerButton from "../common/TimerButton";
import useSWR from 'swr';

export default function EmailConfirmForm() {
    const [code, setCode] = useState("");
    const [timerSeconds, setTimerSeconds] = useState(30);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const userCache = useSWR("user", UserApi.getMe);
    const email = userCache.data?.email || "";

    useEffect(() => resendCode(), []);

    function onCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
        const code = e.target.value;
        setCode(code);
        if (code.length === 0) {
            setError("");
        } else if (code.length < 6) {
            setError("Код состоит из 6 цифр");
        } else {
            setError("");
            submitCode(code);
        }
    }

    function resendCode() {
        UserApi.sendCode().then(({success, data, error}) => {
            if (!success) {
                if (error === "unauthorized") {
                    router.push('/login')
                }
                else if (data?.errors?.includes("already_verified")) {
                    router.push('/chat');
                } else {
                    setError(mapErrors(error));
                }
            }
        });
        setTimerSeconds(30);
    }

    function submitCode(code: string) {
        console.log('Code: ' + code);
        setLoading(true);
        UserApi.checkCode(code).then(({success, error}) => {
            if (success) {
                router.push('/chat');
            }
            else {
                setError(mapErrors(error));
            }
        });
    }

    return (
        <div className="mx-auto px-8">
            {email && <div className="text-lg">
                <span>На адрес </span><span className="text-slate-700 dark:text-slate-300">{email}</span><span> пришел код для подтверждения.</span>
                <span className="block">Введи его ниже.</span>
            </div>}
            <div className="relative mt-12 mx-auto w-fit">
                <CodeInput
                    value={code}
                    onChange={onCodeChange}
                />
                {loading && <div className="absolute left-full top-1 ml-6"><CircleLoader /></div>}
                {!loading && <TimerButton
                    className="sm:absolute block px-4 py-3 sm:inline mx-auto mt-10 sm:mt-0 sm:ml-4 sm:mr-0 whitespace-nowrap text-sm"
                    seconds={timerSeconds}
                    setSeconds={setTimerSeconds}
                    onClick={resendCode}
                >Отправить еще</TimerButton>}
            </div>
            <span className="block mt-4 text-red-500">{error}</span>
        </div>
    )
}
