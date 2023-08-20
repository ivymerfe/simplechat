import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-blue-400 dark:bg-slate-900">
            <div className="ml-6 my-4">
                <Image
                    src="/icons/logo.png"
                    alt="Logo"
                    width="40"
                    height="40"
                    className="dark:invert inline-block"
                />
                <Link href="/chat" className="ml-4 text-xl align-middle text-black hover:text-black dark:text-white dark:hover:text-white">Simplechat!</Link>
            </div>
        </header>
    )
}
