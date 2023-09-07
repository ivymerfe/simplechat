'use client';
import { OtherUser } from "@/utils/api";
import Image from "next/image";
import React from "react";
import SearchResult from "./SearchResult";
import StyledInput from "./StyledInput";

export default function SearchBar() {
    const [searchText, setSearchText] = React.useState("");
    const [searchResults, setSearchResults] = React.useState<OtherUser[]>([]);
    const [searching, setSearching] = React.useState(false);

    function onSearchTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        const searchText = e.target.value;
        setSearchText(searchText);
        if (!searchText) {
            setSearchResults([]);
            return;
        }
        // Query api and set results (max = 5)

        const testFoundUser: OtherUser = {
            name: "Mike",
            username: "mikee",
            avatarUrl: "/avatars/m.png"
        }
        setSearching(true);
        setSearchResults([]);
        setTimeout(() => {
            const results = Array(5).fill(testFoundUser);
            setSearchResults(results);
            setSearching(false);
        }, 1000);
    }

    return (
        <div className="h-14 relative">
            <div className="relative ml-6">
                <StyledInput
                    className="pl-12 py-2 h-10 w-5/6 my-2"
                    placeholder="Поиск..."
                    maxLength={32}
                    value={searchText}
                    onChange={onSearchTextChange}
                />
                <Image
                    src="/icons/search.svg"
                    alt="Search"
                    width="32"
                    height="32"
                    className="absolute top-2/4 -mt-4 ml-3 dark:invert"
                />
            </div>
            <ul className="absolute top-full left-0 w-full z-50">
                {searchText && searchResults.length === 0 && <li className="bg-sky-500 dark:bg-sky-700 text-center">{searching ? "..." : "Нет результатов"}</li>}
                {searchText && searchResults.map((user, i) => <li key={i}><SearchResult user={user}/></li>)}
            </ul>
        </div>
    )
}
