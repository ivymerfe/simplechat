import LoginForm from "@/components/forms/LoginForm"
import Link from "next/link"

export default function LoginPage() {
    return (
        <div className="text-center mt-32">
            <span className="text-2xl">Вход</span>
            <div className="mt-8">
                <Link
                    className="text-md"
                    href="/register"
                >
                    Нужен аккаунт?
                </Link>
            </div>
            <div className="my-20">
                <LoginForm />
            </div>
        </div>
    )
}
