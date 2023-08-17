import LoginForm from "@/components/forms/LoginForm"
import Link from "next/link"

export default function Login() {
    return (
        <div className="text-center">
            <span className="text-2xl">Вход</span>
            <div className="mt-8">
                <Link
                    className="text-md"
                    href="/register"
                >
                    Нужен аккаунт?
                </Link>
            </div>
            <div className="mt-20 mb-20">
                <LoginForm />
            </div>
        </div>
    )
}
