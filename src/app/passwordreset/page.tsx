import PasswordResetForm from "@/components/forms/PasswordResetForm";

export default function PasswordReset() {
    return (
        <div className="text-center">
            <span className="text-2xl">Смена пароля</span>
            <div className="mt-28 mb-20">
                <PasswordResetForm />
            </div>
        </div>
    )
}
