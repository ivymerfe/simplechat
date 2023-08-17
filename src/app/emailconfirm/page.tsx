import EmailConfirmForm from "@/components/forms/EmailConfirmForm";

export default function EmailConfirm() {
    return (
        <div className="text-center">
            <span className="text-2xl">Подтверждение почты</span>
            <div className="mt-20 mb-20">
                <EmailConfirmForm />
            </div>
        </div>
    )
}
