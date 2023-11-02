"use client";

import { useRouter } from "next/navigation";
import { FunctionComponent, SyntheticEvent } from "react";

const MAXLEN = 10;

const SearchBar: FunctionComponent = () => {
  const router = useRouter();

  const searchAction = (e: SyntheticEvent) => {
    e.preventDefault();

    // @ts-ignore
    const searchValue = e.currentTarget.searchInput.value;

    const sh = localStorage.getItem("search_history");
    if (sh === null) {
      localStorage.setItem("search_history", JSON.stringify([searchValue]));
    } else {
      if (JSON.parse(sh).length === MAXLEN) {
        const array_copy = JSON.parse(sh).slice(0, JSON.parse(sh).length - 1);
        localStorage.setItem(
          "search_history",
          JSON.stringify([searchValue, ...array_copy])
        );
      } else {
        localStorage.setItem(
          "search_history",
          JSON.stringify([searchValue, ...JSON.parse(sh)])
        );
      }
    }

    // @ts-ignore
    router.push(`/results?q=${searchValue}`);
  };

  return (
    <form onSubmit={searchAction}>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          name="searchInput"
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:text-black dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Composers, Pieces, and Performers..."
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full md:rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-800 dark:focus:ring-blue-800"
        >
          <span className="hidden md:block">Explore</span>
          <span className="md:hidden">Go</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
