import React, { ChangeEventHandler } from 'react';
import CustomInput from './CustomInput';
import './PasswordInput.css';

interface PasswordInputProps extends React.ComponentProps<"input"> {
    visible: boolean,
    onToggleVisibility: Function,
}

export default function PasswordInput(props: PasswordInputProps) {
    return (
        <div className='relative inline-block'>
            <CustomInput
                className={'pr-10 ' + (props.className ?? "")}
                type={props.visible ? "text":"password"}
                placeholder={props.visible ? "12345":"*****"}
            />
            <button
                type="button"
                className={'password_toggler' + (props.visible ? " password_toggler_visible": "")}
                onClick={() => props.onToggleVisibility(!props.visible)}
            />
        </div>
    )
}
