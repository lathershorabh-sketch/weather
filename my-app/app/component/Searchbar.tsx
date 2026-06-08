"use client";

import { useState, KeyboardEvent } from "react";

interface SearchbarProps {
  onSearch: (city: string) => void;
  loading?: boolean;
}

const Searchbar = ({ onSearch, loading = false }: SearchbarProps) => {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex items-center justify-center p-6">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search city..."
        disabled={loading}
        className="w-full max-w-md px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-600 text-white outline-none focus:border-blue-500 disabled:opacity-50"
      />
      <button
        onClick={handleSearch}
        disabled={loading || !value.trim()}
        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-r-lg transition-colors text-white"
      >
        {loading ? "..." : "Search"}
      </button>
    </div>
  );
};

export default Searchbar;