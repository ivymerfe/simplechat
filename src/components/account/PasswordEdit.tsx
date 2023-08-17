'use client';
import { User } from "@/utils/api";
import { checkPasswordChange } from "@/utils/validate";
import React from "react";
import CircleLoader from "../common/CircleLoader";
import CustomButton from "../common/CustomButton";
import PasswordInput from "../common/PasswordInput";

export default function PasswordEdit(props: {user: User}) {
    const [oldPassword, setOldPass] = React.useState("");
    const [newPass, setNewPass] = React.useState("");
    const [repeatedNewPass, setRepeatedNewPass] = React.useState("");
    const [passVisible, setPassVisible] = React.useState(false);
    const [error, setError] = React.useState("");
    const [editing, setEditing] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const checkResult = checkPasswordChange(newPass, repeatedNewPass, oldPassword);

    function onNewPassChange(e: React.ChangeEvent<HTMLInputElement>) {
        setNewPass(e.target.value);
        setError("");
    }

    function onRepNewPassChange(e: React.ChangeEvent<HTMLInputElement>) {
        setRepeatedNewPass(e.target.value);
        setError("");
    }

    function onOldPassChange(e: React.ChangeEvent<HTMLInputElement>) {
        setOldPass(e.target.value);
        setError("");
    }

    function buttonAction() {
        if (!editing) {
            setEditing(true);
        } else {
            if (!newPass) {
                setEditing(false);
                return;
            }
            // Send new password
            setLoading(true);
            setTimeout(() => {
                setError("error");
                setLoading(false);
            }, 1000)
        }
    }

    const editElements = (
        <>
            <label className="block mt-4">Повтори пароль</label>
            <div className="mt-4">
                <PasswordInput
                    className="inline-block h-8 disabled:bg-slate-200"
                    value={repeatedNewPass}
                    visible={passVisible}
                    onToggleVisibility={setPassVisible}
                    disabled={!editing}
                    onChange={onRepNewPassChange}
                />
            </div>
            <label className="block mt-4">Старый пароль</label>
            <div className="mt-4">
                <PasswordInput
                    className="inline-block h-8 disabled:bg-slate-200"
                    value={oldPassword}
                    visible={passVisible}
                    onToggleVisibility={setPassVisible}
                    disabled={!editing}
                    onChange={onOldPassChange}
                />
            </div>
        </>
    )

    return (
        <div className="inline-block text-md relative">
            <div className="flex gap-4 flex-wrap justify-center sm:justify-normal">
                <PasswordInput
                    className="inline-block h-8 disabled:bg-slate-200"
                    value={newPass}
                    visible={passVisible}
                    onToggleVisibility={setPassVisible}
                    disabled={!editing}
                    onChange={onNewPassChange}
                />
                <div className="relative inline-block">
                    <CustomButton
                        className="py-0 h-8 w-40"
                        disabled={editing && !!newPass && (loading || !checkResult.correct)}
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
            >{editing && (checkResult.error || error)}</span>
        </div>
    )
}
