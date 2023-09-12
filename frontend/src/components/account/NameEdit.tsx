import { User } from "@/api/user";
import React from "react";
import './NameEdit.css';

export default function NameEdit(props: {user: User}) {
    const [name, setName] = React.useState(props.user.name);
    const [editingName, setEditingName] = React.useState(false);

    function fixNameSize(e: React.ChangeEvent<HTMLInputElement>) {
        e.target.style.width = Math.min(20, e.target.value.length) + 'ch';
    }

    function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);

    }

    function onKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
         //key code for enter
        if (e.key === "Enter") {
            e.preventDefault();
            // @ts-ignore
            e.target.blur();
        }
    }

    function confirmName(e: React.FocusEvent<HTMLInputElement>) {
        const newName = e.target.value;
        if (!newName) {
            setName(props.user.name);
        } else {
            // Send new name to api and update user.name
        }
        setEditingName(false);
    }

    return (
        <div className="relative">
            <input
                className="h-7 min-w-[4rem] w-16 bg-transparent border-none focus:outline-none text-center text-lg truncate"
                disabled={!editingName}
                value={name}
                type="text"
                maxLength={64}
                onInput={fixNameSize}
                onChange={onNameChange}
                onBlur={confirmName}
                onKeyUp={onKeyUp}
            />
            {!editingName && <button
                className="absolute name_edit_btn dark:invert ml-2"
                onClick={() => setEditingName(true)}
            />}
        </div>
    )
}
