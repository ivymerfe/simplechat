'use client';
import React from 'react';
import './ChatInput.css';

export default function ChatInput({sendMessage}: {sendMessage: (message: string) => void}) {

    function maybeSendMessage(e: React.KeyboardEvent<HTMLSpanElement>) {
        if (e.key === "Enter" && !e.shiftKey) { // Allow multiline input
            // @ts-ignore
            const message = e.target.innerText.trim();
            if (message) {
                sendMessage(message);
            }
            // @ts-ignore
            e.target.innerText = "";
            // no newline
            e.preventDefault();
        }
    }

    return (
        <span
            className="block px-8 w-full md:w-3/4 py-3 chat_input max-h-20 break-words overflow-y-scroll no-scrollbar text-black bg-sky-200 dark:bg-sky-800 dark:text-white"
            contentEditable={true}
            data-ph="Сообщение..."
            onKeyDown={maybeSendMessage}
        />
    )
}
