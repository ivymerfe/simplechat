'use client';
import { mapErrors } from "@/api/errors";
import { User, UserApi } from "@/api/user";
import { validateUsername } from "@/utils/validate";
import React from "react";
import { useSWRConfig } from "swr";
import CircleLoader from "../common/CircleLoader";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";

export default function UsernameEdit(props: {user: User}) {
    const [username, setUsername] = React.useState(props.user.username);
    const [editing, setEditing] = React.useState(false);
    const [correct, setCorrect] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const { mutate } = useSWRConfig();

    const check = validateUsername(username);

    function onUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        const username = e.target.value;
        setUsername(username);
        if (validateUsername(username).correct) {
            setLoading(true);
            setCorrect(false);
            setMessage("");

            UserApi.checkUsername(username).then(({response, error}) => {
                setLoading(false);
                if (error) {
                    if (error === 'invalid_username') {
                        setMessage("Некорректное имя пользователя")
                    } else {
                        setMessage(mapErrors(error));
                    }
                } else {
                    if (response?.data?.used === false) {
                        setCorrect(true);
                        setMessage("Имя пользователя свободно!");
                    } else if (response?.data?.used) {
                        setCorrect(false);
                        setMessage("Имя пользователя занято!");
                    } else {
                        setCorrect(false);
                        setMessage("Неправильный ответ сервера");
                        console.error(response);
                    }
                }
            });
        }
    }

    function buttonAction() {
        if (!editing) {
            setEditing(true);
            setMessage("");
        } else {
            setEditing(false);
            if (!username || username === props.user.username) {
                setUsername(props.user.username);
            } else {
                setLoading(true);
                UserApi.changeUsername(username).then(({success, error}) => {
                    setLoading(false);
                    if (success) {
                        mutate("user");
                        setEditing(false);
                    } else {
                        setCorrect(false);
                        setMessage(mapErrors(error));
                    }
                });
            }
        }
    }

    return (
        <div className="inline-block text-md relative">
            <div className="flex gap-4 flex-wrap justify-center sm:justify-normal">
                <div className="relative inline-block">
                    {loading && <div className="absolute -left-10 bottom-0 h-8 my-auto"><CircleLoader /></div>}
                    <CustomInput
                        className="h-8 disabled:bg-slate-200"
                        type="text"
                        placeholder={props.user.username}
                        value={username}
                        disabled={!editing}
                        onChange={onUsernameChange}
                        maxLength={16}
                    />
                </div>
                <CustomButton
                    className="inline-block h-8 w-40"
                    disabled={editing && !!username && username !== props.user.username && !(check.correct && correct)}
                    onClick={buttonAction}
                >
                    {editing ? "Сохранить": "Изменить"}
                </CustomButton>
            </div>
            <span
                className={"absolute left-0 right-0 text-center md:text-left top-full " + (check.correct && correct ? "text-green-500" : "text-red-500")}
            >{editing && (check.error || message)}</span>
        </div>
    )
}
