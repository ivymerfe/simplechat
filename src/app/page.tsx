import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
        <span className="block mt-20 text-2xl">Simplechat!</span>
        <span className="block mt-5 text-md">Простенький мессенджер на Next.js</span>
        <div className="mt-20 mx-auto flex flex-row max-w-md space-x-20">
            <Link href="/login" className="inline-block flex-1 py-3 rounded-full bg-indigo-300 dark:bg-indigo-600">Вход</Link>
            <Link href="/register" className="inline-block flex-1 py-3 rounded-full bg-indigo-300 dark:bg-indigo-600">Регистрация</Link>
        </div>
    </div>
  )
}
