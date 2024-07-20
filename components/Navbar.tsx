"use client";
import React, { useEffect, useState } from "react";
import { CircleDollarSign, Moon, Sun, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { coinSymbols } from "@/lib/coinSymbols";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setSuggestions([]);
    } else {
      const filteredSuggestions = coinSymbols.filter((symbol) =>
        symbol.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  }, [searchInput]);

  const handleSearchInputChange = (e: any) => {
    setSearchInput(e.target.value);
  };

  const handleSuggestionClick = (symbol: string) => {
    router.push(`/Coin/${symbol}`);
    setSearchInput("");
    setSuggestions([]);
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="bg-black dark:bg-white flex justify-between items-center w-full md:w-[85%] lg:w-[90%] xl:w-[95%] rounded-full fixed top-5 left-1/2 transform -translate-x-1/2 py-3 md:py-4 lg:py-6 z-10 px-4 md:px-6 lg:px-8">
      <div className="text-white dark:text-black text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold flex items-center gap-2">
        <CircleDollarSign
          size={24}
          className="md:w-8 lg:w-10"
          color="#22C55E"
        />
        <span className="hidden sm:inline">CRYPTO TRACKER</span>
      </div>
      <div
        className={`${
          isSearchOpen ? "flex" : "hidden"
        } md:flex items-center relative`}
      >
        <input
          autoComplete="off"
          type="text"
          placeholder="Search your favourite coin"
          className="px-4 py-2 w-full md:w-64 lg:w-80 xl:w-96 bg-white dark:bg-black dark:text-white placeholder-opacity-65 rounded-full focus-visible:outline-none text-sm md:text-base"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-lg">
            {suggestions.map((symbol) => (
              <li
                key={symbol}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => handleSuggestionClick(symbol)}
              >
                {symbol}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-white dark:text-black"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search size={24} />
        </button>
        <button
          className="text-2xl md:text-3xl lg:text-4xl hover:cursor-pointer"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {resolvedTheme === "dark" ? (
            <Moon size={24} className="md:w-8 lg:w-10" color="#22C55E" />
          ) : (
            <Sun size={24} className="md:w-8 lg:w-10" color="#22C55E" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
