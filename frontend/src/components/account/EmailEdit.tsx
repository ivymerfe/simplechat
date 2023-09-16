'use client';
import { mapErrors } from "@/api/errors";
import { User, UserApi } from "@/api/user";
import { checkEmailChange } from "@/utils/validate";
import React from "react";
import { useSWRConfig } from "swr";
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

    const { mutate } = useSWRConfig();

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
            resendCode();
        } else {
            if (!email || email === props.user.email) {
                setEmail(props.user.email);
                setEditing(false);
            } else {
                setLoading(true);
                UserApi.changeEmail(email, emailCode).then(({success, error}) => {
                    setLoading(false);
                    if (success) {
                        mutate("user");
                        setEditing(false);
                    } else {
                        setError(mapErrors(error));
                    }
                })
            }
        }
    }

    function resendCode() {
        UserApi.changeEmail().then(({success, error}) => {
            if (!success) setError(mapErrors(error));
        });
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
                    className="sm:absolute h-8 px-4 block sm:inline-block mx-auto mt-4 sm:mt-0 sm:ml-4 sm:mr-0 whitespace-nowrap text-sm"
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
                />
                <div className="relative inline-block">
                    <CustomButton
                        className="h-8 w-40"
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
