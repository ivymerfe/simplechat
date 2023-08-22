'use client';
import { User } from "@/utils/api";
import React from "react";
import Avatar from "./Avatar";
import './InfoEdit.css';
import NameEdit from "./NameEdit";

export default function InfoEdit(props: {user: User, avatarSize: number}) {
    function removeAvatar() {
        // Alert! ask
    }

    function uploadImage() {
        // Start upload
        // Invalidate cache
    }

    return (
        <div>
            <div className="relative w-max">
                <Avatar user={props.user} size={props.avatarSize} />
                <div className="absolute w-full mt-4">
                    <NameEdit user={props.user} />
                </div>
                <div className="absolute left-full top-0 bottom-0 ml-2 my-auto h-fit">
                    <button
                        className="avatar_remove_btn m-2 dark:invert block"
                        onClick={removeAvatar}
                    />
                    <button
                        className="avatar_upload_btn m-2 dark:invert block"
                        onClick={uploadImage}
                    />
                </div>
            </div>
        </div>
    )
}
