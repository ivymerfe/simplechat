import EmailConfirmForm from "@/components/forms/EmailConfirmForm";

export default function EmailConfirmPage() {
    return (
        <div className="text-center mt-48">
            <span className="text-2xl">Подтверждение почты</span>
            <div className="mt-20 mb-10">
                <EmailConfirmForm />
            </div>
        </div>
    )
}
