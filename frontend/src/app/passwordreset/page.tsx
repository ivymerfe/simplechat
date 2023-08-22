import PasswordResetForm from "@/components/forms/PasswordResetForm";

export default function PasswordResetPage() {
    return (
        <div className="text-center mt-48">
            <span className="text-2xl">Смена пароля</span>
            <div className="mt-28 mb-10">
                <PasswordResetForm />
            </div>
        </div>
    )
}
