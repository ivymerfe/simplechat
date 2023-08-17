import RegisterForm from "@/components/forms/RegisterForm"
import Link from "next/link"

export default function Register() {
    return (
        <div className="text-center">
            <span className="text-2xl">Регистрация</span>
            <div className="mt-8">
                <Link
                    className="text-md"
                    href="/login"
                >
                    Уже есть аккаунт?
                </Link>
            </div>
            <div className="mt-10 mb-20">
                <RegisterForm />
            </div>
        </div>
    )
}
