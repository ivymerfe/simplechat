import React from "react";
import CustomButton from "./CustomButton";

interface TimerButtonProps extends React.ComponentProps<"button"> {
    seconds: number,
    setSeconds: React.Dispatch<React.SetStateAction<number>>
}

export default function TimerButton({seconds, setSeconds, ...buttonProps}: TimerButtonProps) {
    React.useEffect(() => {
        if (seconds === 0) {
          return;
        }
        const timeout = setTimeout(() => {
           setSeconds((s) => s - 1);
        }, 1000);
        return () => clearTimeout(timeout);
    });
    const content = buttonProps.children ? seconds > 0 ? buttonProps.children + ` (${seconds}s)` : buttonProps.children : seconds > 0 ? seconds + 's' : '';
    return <CustomButton {...buttonProps} disabled={buttonProps.disabled || seconds > 0}>{content}</CustomButton>;
}
