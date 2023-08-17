'use client';
import { User } from "@/utils/api";
import { validateIdentifier } from "@/utils/validate";
import React from "react";
import CircleLoader from "../common/CircleLoader";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";

export default function IdentifierEdit(props: {user: User}) {
    const [id, setId] = React.useState(props.user.id);
    const [editing, setEditing] = React.useState(false);
    const [idCorrect, setIdCorrect] = React.useState(false);
    const [idMessage, setIdMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const idCheck = validateIdentifier(id);

    function onIdChange(e: React.ChangeEvent<HTMLInputElement>) {
        const id = e.target.value;
        setId(e.target.value);
        if (validateIdentifier(id).correct) {
            setLoading(true);
            setIdCorrect(false);
            setIdMessage("");

            // Check if available
            setTimeout(() => {
                setLoading(false);
                setIdCorrect(true);
                setIdMessage("Свободен!");
            }, 1000);
        }
    }

    function buttonAction() {
        if (!editing) {
            setEditing(true);
            setIdMessage("");
        } else {
            setEditing(false);
            if (!id || id === props.user.id) {
                setId(props.user.id);
            } else {
                // Submit new identifier
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
                        placeholder={props.user.id}
                        value={id}
                        disabled={!editing}
                        onChange={onIdChange}
                        maxLength={16}
                    />
                </div>
                <CustomButton
                    className="inline-block py-0 w-40"
                    disabled={editing && !!id && id !== props.user.id && !(idCheck.correct && idCorrect)}
                    onClick={buttonAction}
                >
                    {editing ? "Сохранить": "Изменить"}
                </CustomButton>
            </div>
            <span
                className={"absolute left-0 right-0 text-center md:text-left top-full " + (idCheck.correct && idCorrect ? "text-green-500" : "text-red-500")}
            >{editing && (idCheck.error || idMessage)}</span>
        </div>
    )
}
