import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center mt-48">
        <span className="block mt-20 text-2xl">Simplechat!</span>
        <span className="block mt-5 text-md">Простенький мессенджер на Next.js</span>
        <div className="mt-20 mx-auto flex flex-col md:flex-row w-48 md:w-auto md:max-w-md gap-20">
            <Link href="/login" className="inline-block flex-1 py-3 rounded-full bg-indigo-300 dark:bg-indigo-600 text-white hover:text-white">Вход</Link>
            <Link href="/register" className="inline-block flex-1 py-3 rounded-full bg-indigo-300 dark:bg-indigo-600 text-white hover:text-white">Регистрация</Link>
        </div>
    </div>
  )
}
