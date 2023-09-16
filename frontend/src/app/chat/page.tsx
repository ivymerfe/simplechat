"use client";

import DialogsView from "@/components/chat/DialogsView";

export default function DialogsPage() {
    return (
        <div className="h-screen flex">
            <div className="mt-[4.5rem] flex-1 xl:mx-16 flex">
                <div className="flex-1 sm:flex-none sm:w-7/12 md:w-96">
                    <DialogsView />
                </div>
                <div className="hidden sm:block flex-1 bg-sky-400 dark:bg-sky-700"></div>
            </div>
        </div>
    )
}
