import Link from "next/link";
import { FunctionComponent, useEffect, useRef } from "react";
import { useDailyConcertData } from "../_hooks/useDailyConcertData";
import { isUnixEpochInDay, unixToTime } from "@/util/dateconverters";
import generateUUID from "@/util/uuid";

type Props = {
  d: number | undefined;
  m: number | undefined;
  y: number | undefined;
};

const EventBottomBar: FunctionComponent<Props> = ({ d, m, y }) => {
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

  const draggableArea = useRef<HTMLDivElement>(null);
  const minH = 60;
  const maxH = window.innerHeight * 0.7;

  let startDragPos = 0;
  let lastStableH = minH;

  const handleDragStart = (e: TouchEvent) => {
    const currPos = e.touches.item(0)?.clientY ?? 0;
    if (draggableArea.current?.contains(e.target as Node) === true) {
      draggableArea.current.style.transitionDuration = "0ms";
      startDragPos = currPos;
    }
  };

  const handleDrag = (e: TouchEvent) => {
    const currPos = e.touches.item(0)?.clientY ?? 0;
    const distance = startDragPos - currPos;
    const newH = Math.max(minH, Math.min(maxH, lastStableH + distance));
    if (draggableArea.current?.contains(e.target as Node) === true) {
      draggableArea.current!.style.height = `${newH}px`;
    }
  };

  const handleDragEnd = () => {
    if (
      draggableArea.current &&
      draggableArea.current.clientHeight > (maxH - minH) * 0.8
    ) {
      draggableArea.current.style.transitionDuration = "800ms";
      draggableArea.current.style.height = `${maxH}px`;
      lastStableH = maxH;
    } else if (
      draggableArea.current &&
      draggableArea.current.clientHeight < (maxH - minH) * 0.5
    ) {
      draggableArea.current.style.transitionDuration = "800ms";
      draggableArea.current.style.height = `${minH}px`;
      lastStableH = minH;
    } else {
      lastStableH = draggableArea.current?.clientHeight ?? 0;
    }
  };

  const disableCtxtMenu = (e: any) => {
    e.preventDefault();
  };

  const disablePropagation = (e: any) => {
    e.nativeEvent.stopPropagation();
  };

  useEffect(() => {
    document.addEventListener("touchstart", handleDragStart);
    document.addEventListener("touchend", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("contextmenu", disableCtxtMenu);

    return () => {
      document.removeEventListener("touchmove", handleDrag);
      document.removeEventListener("touchstart", handleDragStart);
      document.removeEventListener("touchend", handleDragEnd);
      document.removeEventListener("contextmenu", disableCtxtMenu);
    };
  }, []);

  const { data, isLoading } = useDailyConcertData(d, m, y);

  if (d !== undefined && m !== undefined && y !== undefined) {
    return (
      <div
        ref={draggableArea}
        className="absolute bg-white z-[1000] bottom-0 w-full rounded-t-xl sm:hidden py-2 font-modern"
        style={{
          height: minH,
          boxShadow: "0rem -1px 7px #ccc",
        }}
      >
        <div className="h-[3px] bg-gray-300 w-1/2 mx-auto"></div>
        <h1 className="pt-6 px-6 text-2xl font-bold">
          Events On {MONTHS[m]} {d}
        </h1>
        <br></br>
        {data.length > 0 ? (
          <ul
            className="flex flex-col border-t-2 overflow-y-auto"
            style={{ maxHeight: maxH - 100 }}
            onTouchStart={disablePropagation}
            onTouchMove={disablePropagation}
            onTouchEnd={disablePropagation}
          >
            {data.map((concert) => {
              let nodes = [];
              if (isUnixEpochInDay(concert._source.performanceTime, d, m, y)) {
                nodes.push(
                  <li
                    className="border-b-2 py-2 px-2 cursor-pointer"
                    key={generateUUID()}
                  >
                    <Link href={`/concert/${concert._id}`}>
                      <div className="flex justify-between">
                        <p>{concert._source.group.groupName}</p>
                        <p className="font-bold">
                          {unixToTime(concert._source.performanceTime)}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              } else if (concert._source.additionalPerformanceTimes) {
                for (const altTime of concert._source
                  .additionalPerformanceTimes) {
                  if (isUnixEpochInDay(altTime, d, m, y)) {
                    nodes.push(
                      <li
                        className="border-b-2 py-2 px-2 cursor-pointer"
                        key={generateUUID()}
                      >
                        <Link href={`/concert/${concert._id}`}>
                          <div className="flex justify-between">
                            <p>{concert._source.group.groupName}</p>
                            <p className="font-bold">{unixToTime(altTime)}</p>
                          </div>
                        </Link>
                      </li>
                    );
                  }
                }
              }

              return nodes;
            })}
          </ul>
        ) : (
          <>
            <div className="w-min mx-auto text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="w-full text-center text-red-600 font-semibold">
              No Events Found
            </h2>
          </>
        )}
      </div>
    );
  }
};

export default EventBottomBar;
