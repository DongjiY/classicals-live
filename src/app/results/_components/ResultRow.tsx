import { Concert } from "@/types/concert";
import { FunctionComponent } from "react";

const ResultRow: FunctionComponent<Concert> = ({
  pieces,
  group,
  performanceTime,
  location,
  originalLink,
}) => {
  const unixToDate = (unix: number) => {
    const daysArr = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const monthsArr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const date = new Date(unix * 1000);

    return `${daysArr[date.getDay()]}, ${monthsArr[date.getMonth()]}. ${date
      .getDate()
      .toString()
      .padStart(2, "0")}`;
  };

  const unixToTime = (unix: number) => {
    const date = new Date(unix * 1000);

    const suffix = date.getHours() >= 12 ? "pm" : "am";

    return `${date.getHours() % 12 || 12}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}${suffix}`;
  };
  return (
    <li className="py-5 px-7 bg-white border-2 dark:border-gray-600 dark:bg-gray-700 rounded flex flex-wrap gap-y-2 justify-between items-baseline dark:text-gray-100">
      <a href={originalLink} className="w-full">
        <div className="flex justify-between w-full flex-wrap">
          <div className="flex flex-col">
            <p className="font-bold text-lg">{group.groupName}</p>
          </div>

          <div className="flex flex-col overflow-x-hidden">
            <div className="flex items-center gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 fill-blue-500"
              >
                <path
                  fillRule="evenodd"
                  d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="font-semibold">
                {unixToDate(performanceTime)} - {unixToTime(performanceTime)}
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 fill-red-500"
              >
                <path
                  fillRule="evenodd"
                  d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="font-semibold text-ellipsis">{location.name}</p>
            </div>
          </div>
        </div>

        <hr className="my-3 dark:border-gray-500 border-gray-200" />

        <ul className="w-full flex flex-col gap-y-1">
          {pieces.map((piece, index) => (
            <li className="flex justify-between" key={index}>
              <p className="whitespace-nowrap text-ellipsis overflow-hidden font-semibold">
                {piece.pieceName}
              </p>
              <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                {piece.composerName}
              </p>
            </li>
          ))}
        </ul>
      </a>
    </li>
  );
};

export default ResultRow;
