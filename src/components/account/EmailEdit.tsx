'use client';
import { User } from "@/utils/api";
import { checkEmailChange } from "@/utils/validate";
import React from "react";
import CircleLoader from "../common/CircleLoader";
import CodeInput from "../common/CodeInput";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import TimerButton from "../common/TimerButton";

export default function EmailEdit(props: {user: User}) {
    const [email, setEmail] = React.useState(props.user.email);
    const [editing, setEditing] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [emailCode, setEmailCode] = React.useState("");
    const [timerSeconds, setTimerSeconds] = React.useState(30);

    const check = checkEmailChange(email, emailCode);

    function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
        setError("");
    }

    function onCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
        const code = e.target.value;
        setEmailCode(code);
        setError("");
    }

    function buttonAction() {
        if (!editing) {
            setEditing(true);
            // Send code
        } else {
            if (!email || email === props.user.email) {
                setEmail(props.user.email);
                setEditing(false);
            } else {
                // Change email
                setLoading(true);
                setTimeout(() => {
                    setError("dddd");
                    setLoading(false);
                }, 1000);
            }
        }
    }

    function resendCode() {
        // api
        setTimerSeconds(30);
    }

    const editElements = (
        <>
            <label className="block mt-4">Код с почты</label>
            <div className="relative mt-4">
                <CodeInput
                    className="inline-block h-8 w-28"
                    value={emailCode}
                    onChange={onCodeChange}
                />
                <TimerButton
                    className="sm:absolute py-0 h-8 block sm:inline-block mx-auto mt-4 sm:mt-0 sm:ml-4 sm:mr-0 whitespace-nowrap text-sm"
                    seconds={timerSeconds}
                    setSeconds={setTimerSeconds}
                    onClick={resendCode}
                >Отправить еще
                </TimerButton>
            </div>
        </>
    );

    return (
        <div className="inline-block text-md relative">
            <div className="flex gap-4 flex-wrap justify-center sm:justify-normal">
                <CustomInput
                    className="inline-block h-8 disabled:bg-slate-200"
                    type="text"
                    placeholder={props.user.email}
                    value={email}
                    disabled={!editing}
                    onChange={onEmailChange}
                    maxLength={16}
                />
                <div className="relative inline-block">
                    <CustomButton
                        className="py-0 h-8 w-40"
                        disabled={editing && !!email && email !== props.user.email && (loading || !check.correct)}
                        onClick={buttonAction}
                    >
                        {editing ? "Сохранить": "Изменить"}
                    </CustomButton>
                    {loading && <div className="absolute left-full top-0 ml-4"><CircleLoader /></div>}
                </div>
            </div>
            {editing && editElements}
            <span
                className="absolute left-0 right-0 text-center md:text-left top-full mt-2 text-red-500"
            >{editing && (check.error || error)}</span>
        </div>
    )
}
