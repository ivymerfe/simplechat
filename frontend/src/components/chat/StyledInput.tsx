import React from "react";

export default function StyledInput(props: React.ComponentProps<"input">) {
    return (
        <input
            {...props}
            className={"text-black bg-sky-200 dark:bg-sky-800 dark:text-white placeholder:text-slate-600 dark:placeholder:text-slate-300 rounded-full outline-none " + (props.className ?? "")}
        />
    )
}
