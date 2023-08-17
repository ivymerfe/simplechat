import React from 'react'

export default function CustomInput(props: React.ComponentProps<"input">) {
    return (
        <input
            {...props}
            className={"px-4 py-2 outline-none text-black text-md rounded-lg box-border w-full " + (props.className ?? "")}
        />
    )
}