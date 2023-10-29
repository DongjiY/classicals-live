"use client";
import { FunctionComponent } from "react";
import useConcertSearchData from "../_hooks/useConcertSearchData";
import { useSearchParams } from "next/navigation";
import ResultRow from "./ResultRow";

const ResultsRowWrapper: FunctionComponent = () => {
  const searchParams = useSearchParams();

  const { concertData, isLoading } = useConcertSearchData(
    searchParams.get("q")
  );

  const generateRows = () => {
    if (isLoading) {
      return (
        <>
          <li className="w-full h-24 bg-white animate-pulse rounded dark:bg-gray-700"></li>
          <li className="w-full h-24 bg-white animate-pulse rounded dark:bg-gray-700"></li>
          <li className="w-full h-24 bg-white animate-pulse rounded dark:bg-gray-700"></li>
        </>
      );
    } else if (concertData === null || concertData.length <= 0) {
      return (
        <>
          <div>
            <p className="text-red-600 dark:text-red-500 font-modern text-lg font-bold">
              No Results Found...
            </p>
            <h1 className="text-xl dark:text-white">
              Please Try a Different Query
            </h1>
          </div>
        </>
      );
    } else {
      return concertData?.map((item, index) => (
        <ResultRow {...item} key={index} />
      ));
    }
  };
  return (
    <>
      <h1 className="mb-4 font-fancy font-bold text-2xl overflow-x-hidden text-ellipsis whitespace-nowrap dark:text-white">
        Results For:{" "}
        <span className="font-light font-modern tracking-wide text-[1.3rem]">
          {searchParams.get("q")}
        </span>
      </h1>
      <ul className="flex flex-col gap-y-3">{generateRows()}</ul>
    </>
  );
};

export default ResultsRowWrapper;
