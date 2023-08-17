'use client';
import { User } from "@/utils/api";
import React, { useState } from "react";
import CircleLoader from "../common/CircleLoader";
import CodeInput from "../common/CodeInput";
import CustomInput from "../common/CustomInput";
import TimerButton from "../common/TimerButton";

export default function EmailConfirmForm() {
    const [code, setCode] = useState("");
    const [timerSeconds, setTimerSeconds] = useState(30);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Get user from api
    const email = "123@gmail.com";

    // Only digits
    function onCodeInput(e: React.ChangeEvent<HTMLInputElement>) {
        e.target.value = e.target.value.replace(/[^0-9.]/g, '');
    }

    function onCodeChanged(e: React.ChangeEvent<HTMLInputElement>) {
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
        // request api
        setTimerSeconds(30);
    }

    function submitCode(code: string) {
        console.log('Code: ' + code);
        setLoading(true);
    }

    return (
        <div className="mx-auto px-8">
            <div className="text-lg">
                <span>На адрес </span><span className="text-slate-700 dark:text-slate-300">{email}</span><span> пришел код для подтверждения.</span>
                <span className="block">Введи его ниже.</span>
            </div>
            <div className="relative mt-12">
                <CodeInput
                    value={code}
                    onChange={onCodeChanged}
                />
                {loading && <div className="absolute left-full top-1 ml-6"><CircleLoader /></div>}
                {!loading && <TimerButton
                    className="sm:absolute block sm:inline mx-auto mt-10 sm:mt-1 sm:ml-4 sm:mr-0 whitespace-nowrap text-sm"
                    seconds={timerSeconds}
                    setSeconds={setTimerSeconds}
                    onClick={resendCode}
                >Отправить еще</TimerButton>}
            </div>
            <span className="block mt-4 text-red-500">{error}</span>
        </div>
    )
}
