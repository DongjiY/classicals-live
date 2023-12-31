"use client";
import { Concert } from "@/types/concert";
import Link from "next/link";
import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import useWeeklyConcertData from "../_hooks/useWeeklyConcertData";
import {
  getEpochsForDayOfWeek,
  getStartOfWeekUnixTime,
  unixToDate,
  unixToTime,
} from "@/util/dateconverters";

const Calendar: FunctionComponent = () => {
  const { isLoading, data } = useWeeklyConcertData();
  const [day, setDay] = useState<number>();

  useEffect(() => {
    setDay(new Date().getDay());
  }, []);

  const getAllRowItemsForThisDay = (day: number): Array<ReactNode> => {
    if (isLoading || data.length === 0) return [];

    let res: Array<{ t: number; node: ReactNode }> = [];

    const SECS_IN_DAY = 86400;

    const start_buffer = day * SECS_IN_DAY;

    for (let i = 0; i < data.length; i++) {
      for (
        let j = 0;
        j < (data[i]?.additionalPerformanceTimes?.length || 0) + 1;
        j++
      ) {
        console.log(i, j);
        if (j === 0) {
          if (
            data[i].performanceTime > getStartOfWeekUnixTime() + start_buffer &&
            data[i].performanceTime <
              getStartOfWeekUnixTime() + start_buffer + SECS_IN_DAY
          ) {
            res.push({
              t: data[i].performanceTime,
              node: (
                <CalendarItem
                  concertId={data[i].id}
                  time={unixToTime(data[i].performanceTime)}
                  groupName={data[i].group.groupName}
                />
              ),
            });
          }
        } else {
          if (
            data[i].additionalPerformanceTimes[j - 1] >
              getStartOfWeekUnixTime() + start_buffer &&
            data[i].additionalPerformanceTimes[j - 1] <
              getStartOfWeekUnixTime() + start_buffer + SECS_IN_DAY
          ) {
            res.push({
              t: data[i].additionalPerformanceTimes[j - 1],
              node: (
                <CalendarItem
                  concertId={data[i].id}
                  time={unixToTime(data[i].additionalPerformanceTimes[j - 1])}
                  groupName={data[i].group.groupName}
                />
              ),
            });
          }
        }
      }
    }

    // tmp.map((item) => {
    //   const time = unixToTime(item.time);

    //   res.push(
    //     <CalendarItem concertId={item.id} time={time} groupName={item.group} />
    //   );
    // });

    res.sort((a, b) => {
      if (a.t > b.t) {
        return 1;
      } else if (a.t < b.t) {
        return -1;
      } else {
        return 0;
      }
    });

    return res.map((item) => item.node);
  };

  return (
    <>
      <h1 className="font-modern font-bold text-2xl dark:text-white mb-2">
        Concerts This Week
      </h1>
      <div className="max-h-[300px] rounded-lg overflow-auto font-modern dark:text-white">
        <div className="grid grid-cols-7 min-h-[300px] min-w-[1500px] dark:bg-gray-600 bg-gray-100 grid-rows-[50px_1fr] justify-items-stretch items-stretch rounded-b-lg">
          <div className="col-span-1 bg-gradient-to-b from-white to-gray-200 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center">
            <h3
              className={
                day === 0
                  ? "bg-indigo-500 rounded-full px-3 py-1 text-white"
                  : ""
              }
            >
              Sunday
            </h3>
          </div>
          <div className="col-span-1 flex items-center justify-center bg-gradient-to-b from-white to-gray-200 dark:from-slate-600 dark:to-slate-700">
            <h3
              className={
                day === 1
                  ? "bg-indigo-500 rounded-full px-3 py-1 text-white"
                  : ""
              }
            >
              Monday
            </h3>
          </div>
          <div className="col-span-1 flex items-center justify-center bg-gradient-to-b from-white to-gray-200 dark:from-slate-600 dark:to-slate-700">
            <h3
              className={
                day === 2
                  ? "bg-indigo-500 rounded-full px-3 py-1 text-white"
                  : ""
              }
            >
              Tuesday
            </h3>
          </div>
          <div className="col-span-1 flex items-center justify-center bg-gradient-to-b from-white to-gray-200 dark:from-slate-600 dark:to-slate-700">
            <h3
              className={
                day === 3
                  ? "bg-indigo-500 rounded-full px-3 py-1 text-white"
                  : ""
              }
            >
              Wednesday
            </h3>
          </div>
          <div className="col-span-1 flex items-center justify-center bg-gradient-to-b from-white to-gray-200 dark:from-slate-600 dark:to-slate-700">
            <h3
              className={
                day === 4
                  ? "bg-indigo-500 rounded-full px-3 py-1 text-white"
                  : ""
              }
            >
              Thursday
            </h3>
          </div>
          <div className="col-span-1 flex items-center justify-center bg-gradient-to-b from-white to-gray-200 dark:from-slate-600 dark:to-slate-700">
            <h3
              className={
                day === 5
                  ? "bg-indigo-500 rounded-full px-3 py-1 text-white"
                  : ""
              }
            >
              Friday
            </h3>
          </div>
          <div className="col-span-1 flex items-center justify-center bg-gradient-to-b from-white to-gray-200 dark:from-slate-600 dark:to-slate-700">
            <h3
              className={
                day === 6
                  ? "bg-indigo-500 rounded-full px-3 py-1 text-white"
                  : ""
              }
            >
              Saturday
            </h3>
          </div>

          <div
            id="Sunday"
            className="col-span-1 row-span-1 border-r-2 dark:border-slate-500"
          >
            <ul className="flex flex-col p-2 w-full gap-y-1">
              <LoadingItem isLoading={isLoading} />
              {getAllRowItemsForThisDay(0)}
            </ul>
          </div>
          <div
            id="Monday"
            className="col-span-1 row-span-1 border-r-2 dark:border-slate-500"
          >
            <ul className="flex flex-col p-2 w-full gap-y-1">
              <LoadingItem isLoading={isLoading} />
              {getAllRowItemsForThisDay(1)}
            </ul>
          </div>
          <div
            id="Tuesday"
            className="col-span-1 row-span-1 border-r-2 dark:border-slate-500"
          >
            <ul className="flex flex-col p-2 w-full gap-y-1">
              <LoadingItem isLoading={isLoading} />
              {getAllRowItemsForThisDay(2)}
            </ul>
          </div>
          <div
            id="Wednesday"
            className="col-span-1 row-span-1 border-r-2 dark:border-slate-500"
          >
            <ul className="flex flex-col p-2 w-full gap-y-1">
              <LoadingItem isLoading={isLoading} />
              {getAllRowItemsForThisDay(3)}
            </ul>
          </div>
          <div
            id="Thursday"
            className="col-span-1 row-span-1 border-r-2 dark:border-slate-500"
          >
            <ul className="flex flex-col p-2 w-full gap-y-1">
              <LoadingItem isLoading={isLoading} />
              {getAllRowItemsForThisDay(4)}
            </ul>
          </div>
          <div
            id="Friday"
            className="col-span-1 row-span-1 border-r-2 dark:border-slate-500"
          >
            <ul className="flex flex-col p-2 w-full gap-y-1">
              <LoadingItem isLoading={isLoading} />
              {getAllRowItemsForThisDay(5)}
            </ul>
          </div>
          <div id="Saturday" className="col-span-1">
            <ul className="flex flex-col p-2 w-full gap-y-1">
              <LoadingItem isLoading={isLoading} />
              {getAllRowItemsForThisDay(6)}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

type Props = {
  time: string;
  concertId: string;
  groupName: string;
};

const CalendarItem: FunctionComponent<Props> = ({
  concertId,
  time,
  groupName,
}) => {
  return (
    <li className="bg-red-800 p-2 rounded-lg border-2 border-red-300 flex flex-col text-white">
      <p>{time}</p>
      <small>{groupName}</small>
      <Link href={`/concert/${concertId}`} className="mt-1">
        <small>Learn More</small>
      </Link>
    </li>
  );
};

type Props2 = {
  isLoading: boolean;
};

const LoadingItem: FunctionComponent<Props2> = ({ isLoading }) => {
  return (
    <li
      className={
        isLoading
          ? "h-[100px] dark:bg-gray-500 bg-gray-200 rounded-lg animate-pulse"
          : "hidden"
      }
    ></li>
  );
};

export default Calendar;
