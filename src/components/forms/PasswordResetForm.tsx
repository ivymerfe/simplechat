'use client';
import React, { useState } from "react";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import CircleLoader from "../common/CircleLoader";
import TimerButton from "../common/TimerButton";
import CodeInput from "../common/CodeInput";
import PasswordInput from "../common/PasswordInput";
import { checkPasswordReset, validateEmail } from "@/utils/validate";

export default function PasswordResetForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [emailAccepted, setEmailAccepted] = useState(false);
    const [emailCode, setEmailCode] = useState("");
    const [timerSeconds, setTimerSeconds] = useState(30);
    const [passVisible, setPassVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [repeatedPass, setRepeatedPass] = useState("");

    const emailCorrect = email && validateEmail(email);
    const formCheck = checkPasswordReset(emailCode, password, repeatedPass);

    function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        const email = e.target.value;
        setEmail(email);
        setError("");
        if (email && !validateEmail(email)) {
            setError("Некорректная почта")
        }
    }

    function onSubmit() {
        // Request api: check if exists and send code
        // Also set loading
        setEmailAccepted(true);
        // If email already accepted, send data
    }

    function onCodeChanged(e: React.ChangeEvent<HTMLInputElement>) {
        const code = e.target.value;
        setEmailCode(code);
        setError("");
    }

    function resendCode() {
        // request api
        setTimerSeconds(30);
    }

    function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
        setError("");
    }

    function onRepeatedPassChange(e: React.ChangeEvent<HTMLInputElement>) {
        setRepeatedPass(e.target.value);
        setError("");
    }

    const nextStep = (
        <>
            <span className="block text-lg">Код с почты</span>
            <div className="relative">
                <CodeInput
                    value={emailCode}
                    onChange={onCodeChanged}
                />
                <TimerButton
                    className="sm:absolute block sm:inline mx-auto mt-4 sm:mt-1 sm:ml-4 sm:mr-0 whitespace-nowrap text-sm"
                    seconds={timerSeconds}
                    setSeconds={setTimerSeconds}
                    onClick={resendCode}
                >Отправить еще
                </TimerButton>
            </div>
            <span className="block text-lg">Новый пароль</span>
            <PasswordInput
                visible={passVisible}
                onToggleVisibility={setPassVisible}
                value={password}
                onChange={onPasswordChange}
            />
            <label className="text-lg">Повторите пароль</label>
            <PasswordInput
                visible={passVisible}
                onToggleVisibility={setPassVisible}
                value={repeatedPass}
                onChange={onRepeatedPassChange}
            />
        </>
    )

    return (
        <div className="flex flex-col items-center gap-6">
            <span className="block text-lg">Почта</span>
            <div className="relative w-full">
                <CustomInput
                    type="email"
                    placeholder="123@gmail.com"
                    disabled={emailAccepted}
                    value={email}
                    onChange={onEmailChange}
                />
                {emailAccepted && <CustomButton
                    className="block mx-auto mt-4 sm:inline sm:absolute sm:ml-4 sm:mt-0 sm:mr-0 sm:h-full text-sm"
                    onClick={() => (setEmailAccepted(false),setEmailCode(""))}
                >
                    Изменить
                </CustomButton>}
            </div>
            {emailAccepted && nextStep}
            <div className="relative">
                <CustomButton
                    disabled={!emailCorrect || (emailAccepted && !formCheck.correct)}
                    onClick={onSubmit}
                >
                    {emailAccepted ? "Сохранить" : "Продолжить"}
                </CustomButton>
                {loading && <div className="absolute left-full top-1/4 ml-6"><CircleLoader/></div>}
            </div>
            <span className="block -mt-3 text-red-500">{(emailAccepted && formCheck.error) || error}</span>
        </div>
    )
}
