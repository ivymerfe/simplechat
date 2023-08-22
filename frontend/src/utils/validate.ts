
export function validateEmail(email: string): Boolean {
    return /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email);
}

export function checkLogin(email: string, pass: string): {correct: boolean, error: string} {
    if (!email) {
        return {correct: false, error: ""}
    }
    if (!validateEmail(email)) {
        return {correct: false, error: "Некорректная почта"}
    }
    if (!pass) {
        return {correct: false, error: ""}
    }
    if (pass.length < 8) {
        return {correct: false, error: "Пароль от 8 символов"}
    }
    return {correct: true, error: ""}
}

export function validateIdentifier(id: string) {
    if (id.length < 4) {
        return {correct: false, error: "Идентификатор от 4 до 16 символов"}
    }
    if (id.match(/^\d/)) {
        return {correct: false, error: "Идентификатор не должен начинаться с цифры"}
    }
    if (id.match(/^_/)) {
        return {correct: false, error: "Идентификатор не должен начинаться с нижнего подчеркивания"}
    }
    if (!id.match(/^[a-z_0-9]*$/)) {
        return {correct: false, error: "Идентификатор должен содержать только латинские буквы [a-z], цифры и '_'"}
    }
    return {correct: true, error: ""}
}

export function checkRegister(name: string, id: string, email: string, pass: string, reppass: string): {correct: boolean, error: string} {
    if (!name) {
        return {correct: false, error: ""}
    }
    if (!id) {
        return {correct: false, error: ""}
    }
    const pre = checkLogin(email, pass);
    if (!pre.correct) return pre;
    if (pass !== reppass) {
        return {correct: false, error: "Пароли не совпадают"}
    }
    return pre;
}

export function checkPasswordReset(emailCode: string, pass: string, reppass: string) {
    if (!emailCode) {
        return {correct: false, error: ""}
    }
    if (emailCode.length < 6) {
        return {correct: false, error: "Код состоит из 6 цифр"}
    }
    if (!pass) {
        return {correct: false, error: ""}
    }
    if (pass.length < 8) {
        return {correct: false, error: "Пароль от 8 символов"}
    }
    if (pass !== reppass) {
        return {correct: false, error: "Пароли не совпадают"}
    }
    return {correct: true, error: ""}
}

export function checkEmailChange(email: string, emailCode: string) {
    if (!email) {
        return {correct: false, error: ""}
    }
    if (!validateEmail(email)) {
        return {correct: false, error: "Некорректная почта"}
    }
    if (!emailCode) {
        return {correct: false, error: ""}
    }
    if (emailCode.length < 6) {
        return {correct: false, error: "Код состоит из 6 цифр"}
    }
    return {correct: true, error: ""}
}

export function checkPasswordChange(newPass: string, newPassRep: string, oldPass: string) {
    if (!newPass) {
        return {correct: false, error: ""}
    }
    if (newPass.length < 8) {
        return {correct: false, error: "Пароль от 8 символов"}
    }
    if (newPass !== newPassRep) {
        return {correct: false, error: "Пароли не совпадают"}
    }
    if (!oldPass) {
        return {correct: false, error: ""}
    }
    if (oldPass.length < 8) {
        return {correct: false, error: "Старый пароль как минимум 8 символов"}
    }
    return {correct: true, error: ""}
}
