"use client";
import { FunctionComponent } from "react";
import useConcertData from "../_hooks/useConcertData";
import { unixToDate, unixToTime } from "@/util/dateconverters";

type Props = {
  id: string;
};
const ConcertInfo: FunctionComponent<Props> = ({ id }) => {
  const { isLoading, data } = useConcertData(id);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <img src="/assets/90-ring-with-bg.svg"></img>
      </div>
    );
  } else {
    return (
      <>
        <section className="bg-white w-full md:w-1/2 mx-auto px-4 pb-8 pt-2 font-dongji shadow dark:bg-gray-700 dark:text-white">
          <button
            className="w-max underline text-blue-400 flex items-center hover:text-blue-500 pb-4"
            onClick={() => {
              history.back();
            }}
          >
            &#8592;Back To Results
          </button>

          <div className="grid grid-cols-2 gap-y-3">
            <div className="col-span-2 flex items-baseline justify-between flex-wrap">
              <h1 className="text-2xl font-semibold">
                {data?.group.groupName.split("/")[0]}
              </h1>
              <h1>
                <span
                  className={
                    data?.group.groupName.split("/")[1]
                      ? "text-red-600 font-bold"
                      : "hidden"
                  }
                >
                  ft.&nbsp;
                </span>
                {data?.group.groupName.split("/")[1] ?? ""}
              </h1>
            </div>

            <h2 className="col-span-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 fill-red-500"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              {data?.location.name}
            </h2>
            <h2 className="text-lg mt-4">Performance Times</h2>
            <ul className="col-span-2 gap-y-1 flex flex-col">
              {[
                ...(data?.additionalPerformanceTimes ?? []),
                data?.performanceTime,
              ].map((item, index) => (
                <li
                  className="bg-gray-100 dark:bg-gray-500 rounded px-3 py-3 hover:border-l-4 hover:border-red-500 flex justify-between"
                  key={index}
                >
                  <p className="whitespace-nowrap overflow-auto">
                    {unixToDate(item!, {
                      includeYr: true,
                      includeDay: true,
                      shortDays: true,
                    })}{" "}
                    @ {unixToTime(item!)}
                  </p>
                  <a
                    href={data?.originalLink}
                    className="flex items-center justify-center gap-x-1 border-2 border-black px-1 hover:bg-black group duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 fill-orange-400 group-hover:fill-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13 3v1.27a.75.75 0 001.5 0V3h2.25A2.25 2.25 0 0119 5.25v2.628a.75.75 0 01-.5.707 1.5 1.5 0 000 2.83c.3.106.5.39.5.707v2.628A2.25 2.25 0 0116.75 17H14.5v-1.27a.75.75 0 00-1.5 0V17H3.25A2.25 2.25 0 011 14.75v-2.628c0-.318.2-.601.5-.707a1.5 1.5 0 000-2.83.75.75 0 01-.5-.707V5.25A2.25 2.25 0 013.25 3H13zm1.5 4.396a.75.75 0 00-1.5 0v1.042a.75.75 0 001.5 0V7.396zm0 4.167a.75.75 0 00-1.5 0v1.041a.75.75 0 001.5 0v-1.041zM6 10.75a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75zm0 2.5a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="group-hover:text-white text-black">RSVP</p>
                  </a>
                </li>
              ))}
            </ul>
            <h2 className="mt-4 text-lg">Concert Program</h2>
            <ul className="col-span-2">
              {data?.pieces.map((piece, index) => (
                <li
                  key={index}
                  className="flex flex-wrap flex-col md:flex-row justify-between border-b-2 py-4"
                >
                  <h3 className="text-md whitespace-nowrap">
                    {piece.pieceName}
                  </h3>
                  <h3 className="text-sm whitespace-nowrap">
                    {piece.composerName}
                  </h3>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* <section className="bg-white w-full md:w-1/2 mx-auto px-4 pb-8 pt-2 font-dongji mt-8 shadow">
          <h1>Comments</h1>
        </section> */}
      </>
    );
  }
};

export default ConcertInfo;
