import { Concert } from "@/types/concert";
import { unixToDateShort, unixToTime } from "@/util/dateconverters";
import Link from "next/link";
import { FunctionComponent } from "react";

const ResultRow: FunctionComponent<Concert> = ({
  id,
  pieces,
  group,
  performanceTime,
  additionalPerformanceTimes,
}) => {
  return (
    <li className="py-5 px-7 bg-white border-2 dark:border-gray-600 dark:bg-gray-700 rounded flex flex-wrap gap-y-2 justify-between items-baseline dark:text-gray-100 shadow">
      <Link className="w-full" href={`/concert/${id}`}>
        <div className="flex justify-between w-full flex-wrap">
          <div className="flex flex-col">
            <p className="font-bold text-lg">{group.groupName.split("/")[0]}</p>
          </div>

          <div className="flex flex-col overflow-x-hidden">
            <p>
              {group.groupName.split("/")[1] && (
                <span className="font-bold text-red-600">ft.&nbsp;</span>
              )}
              {group.groupName.split("/")[1] ?? ""}
            </p>
          </div>
        </div>

        <hr className="my-3 dark:border-gray-500 border-gray-200" />

        <ul className="w-full flex flex-col gap-y-1 overflow-x-auto">
          {pieces.map((piece, index) => (
            <li
              className="flex flex-wrap flex-col md:flex-row md:justify-between"
              key={index}
            >
              <p className="whitespace-nowrap font-semibold text-ellipsis">
                {piece.pieceName}
              </p>
              <p className="whitespace-nowrap">{piece.composerName}</p>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <hr className="my-3 dark:border-gray-500 border-gray-200" />
          <h2 className="text-red-600 dark:text-white font-bold">
            Performance Dates
          </h2>
        </div>
        <ul className="pt-2 gap-x-2 gap-y-2 max-w-full overflow-x-auto flex-wrap hidden md:flex">
          {[performanceTime, ...(additionalPerformanceTimes ?? [])].map(
            (item, index) => (
              <li
                className="bg-red-200 dark:bg-red-700 rounded px-3 py-3"
                key={index}
              >
                <p>{unixToDateShort(item)}</p>
                <p>{unixToTime(item)}</p>
              </li>
            )
          )}
        </ul>
      </Link>
    </li>
  );
};

export default ResultRow;
