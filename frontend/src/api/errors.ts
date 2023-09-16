
export const ERRORS_MAP: any = {
    'bad_credentials': 'Неверный логин или пароль',
    'invalid_code': 'Неверный код',
    'user_not_found': 'Пользователь не найден',
    'username:unique': 'Имя пользователя уже используется',
    'email:unique': 'Почта уже используется',
    'password:password_too_short': 'Слишком короткий пароль',
    'password:password_too_common': 'Слишком простой пароль',
    'invalid_old_password': 'Неверный старый пароль',
    'new_password:password_too_short': 'Слишком короткий пароль',
    'new_password:password_too_common': 'Слишком простой пароль',
    'email:blank': 'Нужно ввести почту',
    'email:invalid': 'Некорректная почта',
    'new_email:used': 'Почта уже используется',
    'password:blank': 'Нужно ввести пароль'
}

export function mapErrors(error: any) {
    // Only first error
    if (!error.response?.data?.errors) {
        console.log(error);
        return "Неизвестная ошибка (в консоли)";
    }
    const firstError = error.response.data.errors[0];
    if (!(firstError in ERRORS_MAP)) {
        return "Неизвестная ошибка: " + firstError;
    } 
    return ERRORS_MAP[firstError];
}
