import React from "react";
import CustomInput from "./CustomInput";

export default function CodeInput(props: React.ComponentProps<"input">) {
    // Only digits
    function onCodeInput(e: React.ChangeEvent<HTMLInputElement>) {
        e.target.value = e.target.value.replace(/[^0-9.]/g, '');
    }

    return (
        <CustomInput
            {...props}
            className={"text-center text-lg w-44 tracking-widest inline " + (props.className ?? "")}
            type="text"
            placeholder="123456"
            maxLength={6}
            onInput={onCodeInput}
        />
    )
}
