import React, { ChangeEventHandler } from 'react';
import CustomInput from './CustomInput';
import './PasswordInput.css';

interface PasswordInputProps extends React.ComponentProps<"input"> {
    visible: boolean,
    onToggleVisibility: Function,
}

export default function PasswordInput({visible, onToggleVisibility, ...inputProps}: PasswordInputProps) {
    return (
        <div className='relative inline-block'>
            <CustomInput
                {...inputProps}
                className={'pr-10 ' + (inputProps.className ?? "")}
                type={visible ? "text":"password"}
                placeholder={visible ? "12345":"*****"}
                maxLength={64}
            />
            <button
                type="button"
                className={'password_toggler' + (visible ? " password_toggler_visible": "")}
                onClick={() => onToggleVisibility(!visible)}
            />
        </div>
    )
}
