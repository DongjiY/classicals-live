"use client";
import generateUUID from "@/util/uuid";
import Link from "next/link";
import {
  FunctionComponent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMonthlyConcertData } from "../_hooks/useMonthlyConcertData";
import { isUnixEpochInDay, unixToTime } from "@/util/dateconverters";

const FullCalendar: FunctionComponent = () => {
  const topSection = useRef<HTMLElement>(null);
  const [blocks, setBlocks] = useState<Array<Array<ReactElement>>>();
  const [percentHeight, setPercentHeight] = useState<number>();
  const [selectedM, setSelectedM] = useState<number>();
  const [selectedY, setSelectedY] = useState<number>();
  const [today, setToday] = useState<Date>();

  const { data, isLoading } = useMonthlyConcertData(selectedM, selectedY);

  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    setToday(new Date());

    if (selectedM === undefined || selectedY === undefined) {
      const d = new Date();
      setSelectedM(d.getMonth());
      setSelectedY(d.getFullYear());
    }

    if (selectedM !== undefined && selectedY !== undefined) {
      const { res, rows } = generateBlocks(selectedY, selectedM);

      setPercentHeight(100 / rows);
      setBlocks(res);
    }
  }, [selectedM, data]);

  const getCurrChips = (m: number, d: number, y: number): Array<any> => {
    let res: Array<any> = [];

    for (const concert of data) {
      if (isUnixEpochInDay(concert._source.performanceTime, d, m, y)) {
        res.push(
          <Link
            id={generateUUID()}
            href={`/concert/${concert._id}`}
            className="bg-purple-100 rounded m-0 p-0 pl-1 overflow-x-hidden w-full hidden md:block"
          >
            <p className="float-right mt-0 mb-0 ml-[4px] mr-[6px] text-right static block whitespace-nowrap text-ellipsis overflow-x-hidden p-0 font-bold">
              {unixToTime(concert._source.performanceTime)}
            </p>
            <p className="text-left static block h-[22px] whitespace-nowrap text-ellipsis overflow-x-hidden min-w-[0px] overflow-y-hidden">
              {concert._source.group.groupName}
            </p>
          </Link>
        );
      } else if (concert._source.additionalPerformanceTimes !== undefined) {
        for (const altTime of concert._source.additionalPerformanceTimes) {
          if (isUnixEpochInDay(altTime, d, m, y)) {
            res.push(
              <Link
                id={generateUUID()}
                href={`/concert/${concert._id}`}
                className="bg-purple-100 rounded m-0 p-0 pl-1 overflow-x-hidden w-full hidden md:block"
              >
                <p className="float-right mt-0 mb-0 ml-[4px] mr-[6px] text-right static block whitespace-nowrap text-ellipsis overflow-x-hidden p-0 font-bold">
                  {unixToTime(altTime)}
                </p>
                <p className="text-left static block h-[22px] whitespace-nowrap text-ellipsis overflow-x-hidden min-w-[0px] overflow-y-hidden">
                  {concert._source.group.groupName}
                </p>
              </Link>
            );
            break;
          }
        }
      }
    }

    return res;
  };

  const pastOrFutureBlock = (m: number, d: number, y: number) => {
    const t = new Date(y, m, d);
    return t.getDay() === 0 || t.getDay() === 6 ? (
      <div
        key={generateUUID()}
        className="basis-1/7 border-t-2 text-black/30 grow-0 overflow-y-auto relative bg-gray-100"
      >
        {d}
        <div>{getCurrChips(m, d, y)}</div>
      </div>
    ) : (
      <div
        key={generateUUID()}
        className="basis-1/7 border-t-2 text-black/30 grow-0 overflow-y-auto relative"
      >
        {d}
        <div>{getCurrChips(m, d, y)}</div>
      </div>
    );
  };

  const currBlock = (m: number, d: number, y: number, isToday: boolean) => {
    const t = new Date(y, m, d);
    const isWeekend = t.getDay() === 0 || t.getDay() === 6;

    if (isToday) {
      if (isWeekend) {
        return (
          <div
            key={generateUUID()}
            className="basis-1/7 border-t-2 border-red-600 grow-0 overflow-y-auto relative bg-gray-100"
          >
            <p className="font-bold text-red-600">{d}</p>
            <div className="gap-y-1 flex flex-col">{getCurrChips(m, d, y)}</div>
          </div>
        );
      } else {
        return (
          <div
            key={generateUUID()}
            className="basis-1/7 border-t-2 border-red-600 grow-0 overflow-y-auto relative"
          >
            <p className="font-bold text-red-600">{d}</p>
            <div className="gap-y-1 flex flex-col">{getCurrChips(m, d, y)}</div>
          </div>
        );
      }
    } else {
      if (isWeekend) {
        return (
          <div
            key={generateUUID()}
            className="basis-1/7 border-t-2 grow-0 overflow-y-auto relative bg-gray-100"
          >
            {d}
            <div className="gap-y-1 flex flex-col">{getCurrChips(m, d, y)}</div>
          </div>
        );
      } else {
        return (
          <div
            key={generateUUID()}
            className="basis-1/7 border-t-2 grow-0 overflow-y-auto relative"
          >
            {d}
            <div className="gap-y-1 flex flex-col">{getCurrChips(m, d, y)}</div>
          </div>
        );
      }
    }
  };

  const generateBlocks = (
    year: number,
    month: number
  ): {
    res: Array<Array<ReactElement>>;
    rows: number;
  } => {
    let res: Array<Array<ReactElement>> = [];
    const FIRSTOF_THISMONTH = new Date(year, month, 1);
    const LASTOF_THISMONTH = new Date(year, month + 1, 0);
    const DAYSIN_LASTMONTH = new Date(year, month, 0).getDate();

    let days = LASTOF_THISMONTH.getDate();
    let i = 0;
    while (days > 0) {
      let row: Array<ReactElement> = [];
      for (let j = 0; j < 7; j++) {
        if (i * 7 + j < FIRSTOF_THISMONTH.getDay()) {
          row.push(
            pastOrFutureBlock(
              (month - 1 + 12) % 12,
              DAYSIN_LASTMONTH - (FIRSTOF_THISMONTH.getDay() - (j + 1)),
              month === 0 ? year - 1 : year
            )
          );
        } else if (
          i * 7 + j - (FIRSTOF_THISMONTH.getDay() - 1) >
          LASTOF_THISMONTH.getDate()
        ) {
          row.push(
            pastOrFutureBlock(
              (month + 1) % 12,
              i * 7 +
                j -
                (FIRSTOF_THISMONTH.getDay() - 1) -
                LASTOF_THISMONTH.getDate(),
              month === 11 ? year + 1 : year
            )
          );
        } else {
          days--;
          if (
            today?.getFullYear() === selectedY &&
            today?.getMonth() === selectedM &&
            today?.getDate() === i * 7 + j - (FIRSTOF_THISMONTH.getDay() - 1)
          ) {
            row.push(
              currBlock(
                month,
                i * 7 + j - (FIRSTOF_THISMONTH.getDay() - 1),
                year,
                true
              )
            );
          } else {
            row.push(
              currBlock(
                month,
                i * 7 + j - (FIRSTOF_THISMONTH.getDay() - 1),
                year,
                false
              )
            );
          }
        }
      }

      res.push(row);
      i++;
    }

    return {
      res: res,
      rows: i,
    };
  };

  const prevMonth = () => {
    if (selectedM !== undefined && selectedY !== undefined) {
      const m = selectedM;
      if (m === 0) {
        setSelectedY(selectedY - 1);
      }
      setSelectedM((m - 1 + 12) % 12);
    }
  };

  const nextMonth = () => {
    if (selectedM !== undefined && selectedY !== undefined) {
      const m = selectedM;
      if (m === 11) {
        setSelectedY(selectedY + 1);
      }
      setSelectedM((m + 1) % 12);
    }
  };

  const currDate = () => {
    const d = new Date();
    setSelectedM(d.getMonth());
    setSelectedY(d.getFullYear());
  };

  return (
    <div className="font-modern w-full overflow-x-auto bg-offwhite md:bg-white mx-auto">
      <section ref={topSection}>
        <div className="flex justify-between items-end">
          <h1 className="text-2xl font-bold px-2 pt-2">
            {MONTHS[selectedM ?? 0]} {selectedY}
          </h1>
          <div className="text-red-600 flex items-center pr-4">
            <button
              className="hover:bg-gray-200 rounded"
              onClick={() => prevMonth()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              className="font-semibold hover:bg-gray-200 px-1 rounded"
              onClick={() => currDate()}
            >
              Today
            </button>
            <button
              onClick={() => nextMonth()}
              className="hover:bg-gray-200 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-nowrap flex-row w-full pt-4 px-2 gap-x-2">
          <div className="basis-1/7 text-xl">Sun</div>
          <div className="basis-1/7 text-xl">Mon</div>
          <div className="basis-1/7 text-xl">Tue</div>
          <div className="basis-1/7 text-xl">Wed</div>
          <div className="basis-1/7 text-xl">Thu</div>
          <div className="basis-1/7 text-xl">Fri</div>
          <div className="basis-1/7 text-xl">Sat</div>
        </div>
      </section>
      <div className="h-[calc(100vh-168px)]">
        {blocks &&
          blocks.map((children) => (
            <div
              className="flex flex-nowrap flex-row w-full px-2 gap-x-2"
              style={{ height: `${percentHeight}%` }}
              key={generateUUID()}
            >
              {children}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FullCalendar;
