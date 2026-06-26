import { useEffect, useRef } from "react";

interface SearchBarProps {
    searchText: string;
    setSearchText: (value: string) => void;
}

const SearchBar = ({ searchText, setSearchText }: SearchBarProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="flex items-center border rounded-lg px-4 py-2 justify-between bg-surface mb-4">
            <input
                ref={inputRef}
                type="text"
                placeholder="Search blogs..."
                className="outline-none bg-transparent w-full"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;