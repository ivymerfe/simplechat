import React from "react";

export default function CustomButton(props: React.ComponentProps<"button">) {
    return (
        <button
            {...props}
            className={"px-8 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 active:bg-indigo-800 text-white " + (props.className ?? "")}
        />
    )
}
