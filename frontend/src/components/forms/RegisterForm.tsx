'use client'
import React from "react";
import CustomInput from "../common/CustomInput";
import PasswordInput from "../common/PasswordInput";
import { validateUsername, checkRegister } from "@/utils/validate";
import CustomButton from "../common/CustomButton";
import CircleLoader from "../common/CircleLoader";

export default function RegisterForm() {
    const [name, setName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [usernameLoading, setUsernameLoading] = React.useState(false);
    const [usernameCorrect, setUsernameCorrect] = React.useState(false);
    const [usernameMessage, setUsernameMessage] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repeatedPass, setRepeatedPass] = React.useState("");
    const [passVisible, setPassVisible] = React.useState(false);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const checkResult = checkRegister(name, username, email, password, repeatedPass);
    const usernameCheck = validateUsername(username);

    function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
        setError("");
    }

    function onUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const username = e.target.value;
        setUsername(username);
        setError("");
        if (validateUsername(username).correct) {
            console.log('Checking id: '+username)
            // Set loading and request api
            // Do not cache!
        }
    }

    function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
        setError("");
    }

    function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
        setError("");
    }

    function onRepeatedPassChange(e: React.ChangeEvent<HTMLInputElement>) {
        setRepeatedPass(e.target.value);
        setError("");
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        // Request api
        console.log(password)
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col items-center gap-4">
            <label className="text-lg">Имя</label>
            <CustomInput
                type="text"
                placeholder="?????"
                value={name}
                maxLength={64}
                onChange={onNameChange}
            />
            <label className="text-lg">Имя пользователя</label>
            <div className="relative">
                <CustomInput
                    type="text"
                    placeholder="?????"
                    value={username}
                    maxLength={16}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.value = e.target.value.toLowerCase()}
                    onChange={onUsernameChange}
                />
                {usernameLoading && <div className="absolute left-full top-1 ml-6"><CircleLoader/></div>}
                {!usernameLoading && <span
                    className={"block mx-5 mt-3 max-w-sm " + (usernameCheck.correct && usernameCorrect ? "text-green-500" : "text-red-500")}
                >
                {username && usernameCheck.error ? usernameCheck.error : usernameMessage}
                </span>}
            </div>
            <label className="text-lg">Почта</label>
            <CustomInput
                type="email"
                placeholder="123@gmail.com"
                value={email}
                onChange={onEmailChange}
            />
            <label className="text-lg">Пароль</label>
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
            <div className="relative">
                <CustomButton
                    className="mt-2 px-8 py-2"
                    type="submit"
                    disabled={loading || !checkResult.correct || !usernameCheck.correct || !usernameCorrect}
                >Зарегистрироваться
                </CustomButton>
                {loading && <div className="absolute left-full top-1 ml-6"><CircleLoader/></div>}
            </div>
            <span className="-mt-1 text-md text-rose-500">{checkResult.error || error}</span>
        </form>
    )
}
