'use client'
import React from "react";
import CustomInput from "../common/CustomInput";
import PasswordInput from "../common/PasswordInput";
import { validateIdentifier, checkRegister } from "@/utils/validate";
import CustomButton from "../common/CustomButton";
import CircleLoader from "../common/CircleLoader";

export default function RegisterForm() {
    const [name, setName] = React.useState("");
    const [id, setId] = React.useState("");
    const [idLoading, setIdLoading] = React.useState(false);
    const [idCorrect, setIdCorrect] = React.useState(false);
    const [idMessage, setIdMessage] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [repeatedPass, setRepeatedPass] = React.useState("");
    const [passVisible, setPassVisible] = React.useState(false);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const checkResult = checkRegister(name, id, email, password, repeatedPass);
    const idCheck = validateIdentifier(id);

    function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
        setError("");
    }

    function onIdChange(e: React.ChangeEvent<HTMLInputElement>) {
        const id = e.target.value;
        setId(id);
        setError("");
        if (validateIdentifier(id).correct) {
            console.log('Checking id: '+id)
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
    }

    return (
        <div className="mx-auto px-10 w-fit">
            <form onSubmit={onSubmit} className="flex flex-col items-center gap-4">
                <label className="text-lg">Имя</label>
                <CustomInput
                    type="text"
                    placeholder="?????"
                    value={name}
                    onChange={onNameChange}
                />
                <label className="text-lg">Идентификатор</label>
                <div className="relative w-full">
                    <CustomInput
                        type="text"
                        placeholder="?????"
                        value={id}
                        maxLength={16}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => e.target.value = e.target.value.toLowerCase()}
                        onChange={onIdChange}
                    />
                    {idLoading && <div className="absolute left-full top-1 ml-6"><CircleLoader/></div>}
                    {!idLoading && <span
                        className={"block mx-5 mt-3 max-w-sm " + (idCheck.correct && idCorrect ? "text-green-500" : "text-red-500")}
                    >
                    {id && idCheck.error ? idCheck.error : idMessage}
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
                        className="mt-2"
                        type="submit"
                        disabled={loading || !checkResult.correct || !idCheck.correct || !idCorrect}
                    >Зарегистрироваться
                    </CustomButton>
                    {loading && <div className="absolute left-full top-1/4 ml-6"><CircleLoader/></div>}
                </div>
                <span className="-mt-1 text-md text-rose-500">{checkResult.error || error}</span>
            </form>
        </div>
    )
}
