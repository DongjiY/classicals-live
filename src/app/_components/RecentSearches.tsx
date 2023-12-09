"use client";

import { FunctionComponent, useEffect, useRef, useState } from "react";
import useRecentSearchHistory from "../_hooks/useRecentSearchHistory";
import Link from "next/link";

const RecentSearches: FunctionComponent = () => {
  const ref = useRef(null);
  const firstEl = useRef(null);
  const lastEl = useRef(null);
  const [displayRightScroller, setDisplayRightScroller] =
    useState<boolean>(false);
  const [displayLeftScroller, setDisplayLeftScroller] =
    useState<boolean>(false);
  const { data } = useRecentSearchHistory();

  useEffect(() => {
    let options = {
      root: ref.current,
      threshold: 1.0,
      rootMargin: "10px",
    };

    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === firstEl.current) {
            setDisplayLeftScroller(false);
          } else if (entry.target === lastEl.current) {
            setDisplayRightScroller(false);
          }
        } else {
          if (entry.target === firstEl.current) {
            setDisplayLeftScroller(true);
          } else if (entry.target === lastEl.current) {
            setDisplayRightScroller(true);
          }
        }
      });
    }, options);

    if (firstEl.current) observer.observe(firstEl.current);
    if (lastEl.current) observer.observe(lastEl.current);
  });

  return (
    <div className={data.length <= 0 ? "hidden" : "block"}>
      <h1 className="font-modern font-bold text-2xl dark:text-white">
        Recent Searches
      </h1>

      <div className="relative">
        <div
          className={
            displayLeftScroller
              ? "hidden md:flex cursor-pointer hover:opacity-90 absolute top-0 left-0 bg-white rounded-full justify-center items-center p-1 border-2 shadow-lg !-translate-x-[55%] m-auto bottom-0 h-max dark:bg-gray-700 dark:border-gray-600"
              : "hidden"
          }
          onClick={() => {
            if (ref.current)
              (ref.current as HTMLElement).scrollBy({
                left: -300,
                behavior: "smooth",
              });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6 text-red-600 -translate-x-[2px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>

        <div
          className={
            displayRightScroller
              ? "hidden md:flex cursor-pointer hover:opacity-90 absolute top-0 right-0 bg-white rounded-full justify-center items-center p-1 border-2 shadow-lg !translate-x-[55%] m-auto bottom-0 h-max dark:bg-gray-700 dark:border-gray-600"
              : "hidden"
          }
          onClick={() => {
            if (ref.current)
              (ref.current as HTMLElement).scrollBy({
                left: 300,
                behavior: "smooth",
              });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6 text-red-600 translate-x-[2px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>

        <ul
          className="flex flex-nowrap md:overflow-x-hidden no-scrollbar overflow-auto gap-x-3 mt-2"
          ref={ref}
        >
          {data.map((item, index) => {
            if (index === 0) {
              return (
                <Link href={`/results?q=${item}`} key={index} ref={firstEl}>
                  <li className="max-w-[200px] min-w-[200px] h-[100px] border-2 dark:border-gray-600 dark:bg-gray-700/80 rounded-xl flex items-center p-2 hover:bg-red-600 group dark:hover:bg-red-700 duration-200">
                    <p className="font-modern font-semibold text-gray-600 group-hover:text-white dark:text-white text-xl whitespace-nowrap text-ellipsis max-w-[180px] min-w-[180px] overflow-x-hidden">
                      {item}
                    </p>
                  </li>
                </Link>
              );
            } else if (index === data.length - 1) {
              return (
                <Link href={`/results?q=${item}`} key={index} ref={lastEl}>
                  <li className="max-w-[200px] min-w-[200px] h-[100px] border-2 dark:border-gray-600 dark:bg-gray-700/80 rounded-xl flex items-center p-2 hover:bg-red-600 group dark:hover:bg-red-700 duration-200">
                    <p className="font-modern font-semibold text-gray-600 group-hover:text-white dark:text-white text-xl whitespace-nowrap text-ellipsis max-w-[180px] min-w-[180px] overflow-x-hidden">
                      {item}
                    </p>
                  </li>
                </Link>
              );
            } else {
              return (
                <Link href={`/results?q=${item}`} key={index}>
                  <li className="max-w-[200px] min-w-[200px] h-[100px] border-2 dark:border-gray-600 dark:bg-gray-700/80 rounded-xl flex items-center p-2 hover:bg-red-600 group dark:hover:bg-red-700 duration-200">
                    <p className="font-modern font-semibold text-gray-600 group-hover:text-white dark:text-white text-xl whitespace-nowrap text-ellipsis max-w-[180px] min-w-[180px] overflow-x-hidden">
                      {item}
                    </p>
                  </li>
                </Link>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default RecentSearches;
