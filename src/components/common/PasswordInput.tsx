import React, { ChangeEventHandler } from 'react';
import CustomInput from './CustomInput';
import './PasswordInput.css';

type PasswordInputProps = {
    value?: string,
    visible: boolean,
    onToggleVisibility: Function,
    onChange?: ChangeEventHandler<HTMLInputElement>
}

export default function PasswordInput(props: PasswordInputProps) {
    return (
        <div className='relative inline-block w-full'>
            <CustomInput
                className='pr-10'
                type={props.visible ? "text":"password"}
                placeholder={props.visible ? "12345":"*****"}
                value={props.value}
                onChange={props.onChange}
            />
            <button
                type="button"
                className={'password_toggler' + (props.visible ? " password_toggler_visible": "")}
                onClick={() => props.onToggleVisibility(!props.visible)}
            />
        </div>
    )
}
