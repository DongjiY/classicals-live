"use client";

import { FunctionComponent } from "react";
import useRecentSearchHistory from "../_hooks/useRecentSearchHistory";
import Link from "next/link";

const RecentSearches: FunctionComponent = () => {
  const { data } = useRecentSearchHistory();

  return (
    <div className={data.length <= 0 ? "hidden" : "block"}>
      <h1 className="font-modern font-bold text-2xl dark:text-white">
        Recent Searches
      </h1>
      <ul className="flex flex-nowrap overflow-x-scroll gap-x-3 mt-2">
        {data.toReversed().map((item, index) => {
          if (index < 10)
            // only show the last 10 searches
            return (
              <Link href={`/results?q=${item}`} key={index}>
                <li className="max-w-[200px] min-w-[200px] h-[100px] border-2 dark:border-gray-500 dark:bg-gray-600 rounded-xl flex items-center p-2 hover:bg-red-600 group dark:hover:bg-red-700 duration-200">
                  <p className="font-modern font-semibold text-gray-600 group-hover:text-white dark:text-white text-xl whitespace-nowrap text-ellipsis max-w-[180px] min-w-[180px] overflow-x-hidden">
                    {item}
                  </p>
                </li>
              </Link>
            );
        })}
      </ul>
    </div>
  );
};

export default RecentSearches;
