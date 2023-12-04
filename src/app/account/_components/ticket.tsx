//@ts-nocheck
"use client";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import * as qr from "@bitjson/qr-code";
import Link from "next/link";
import useInitialQRLink from "../_hooks/useInitialQRLink";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Ticket } from "@/types/Ticket";
import { unixToDateShort, unixToTime } from "@/util/dateconverters";

type Props = {
  ticket: Ticket;
};
const Ticket: FunctionComponent<Props> = ({ ticket }) => {
  const ref = useRef(null);
  const animatedOnceRef = useRef<boolean>(false);
  const [link, setLink] = useState<string>();
  const { initialLink, isLoading } = useInitialQRLink(ticket._id);

  useEffect(() => {
    qr.defineCustomElements(window);

    try {
      ref.current.addEventListener("codeRendered", () => {
        if (animatedOnceRef.current) return;
        ref.current.animateQRCode((targets, _x, _y, _count, entity) => ({
          targets,
          from: entity === "module" ? Math.random() * 200 : 200,
          duration: 500,
          easing: "cubic-bezier(.5,0,1,1)",
          web: { opacity: [0, 1], scale: [0.5, 1.1, 1.0] },
        }));
        animatedOnceRef.current = true;
      });
    } catch (err) {}
  }, [isLoading]);

  const generateTop = () => {
    const res = [];
    for (const attribute in ticket.ticketTop) {
      res.push(
        <div className="flex flex-col">
          <span className="text-sm">
            {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
          </span>
          <div className="font-semibold">{ticket.ticketTop[attribute]}</div>
        </div>
      );
    }
    return res;
  };

  const generateBottom = () => {
    const res = [];
    for (const attribute in ticket.ticketBottom.data) {
      res.push(
        <div className="flex flex-col">
          <span className="">
            {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
          </span>
          <div className="font-semibold">
            {ticket.ticketBottom.data[attribute]}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-md w-full h-full z-10 bg-gray-200 rounded-3xl">
      <div className="flex flex-col">
        <div className="bg-white relative rounded-3xl p-4 m-4">
          <div className="flex-none sm:flex">
            <div className="flex-auto justify-evenly">
              <div className="flex items-center justify-between">
                <div className="flex items-center my-1">
                  <h2 className="font-medium text-lg">{ticket.ticketTitle}</h2>
                </div>

                <CountdownCircleTimer
                  isPlaying
                  duration={60}
                  colors="#A30000"
                  size={30}
                  strokeWidth={4}
                  onComplete={() => {
                    // do your stuff here
                    fetch("https://api.classicals.live/tickets/validtoken", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        ticketId: ticket._id,
                      }),
                      credentials: "include",
                      mode: "cors",
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        setLink(data.qrLink);
                      });
                    return { shouldRepeat: true }; // repeat animation in 1.5 seconds
                  }}
                />
              </div>
              <div className="border-dashed border-b-2 my-5"></div>
              <div className="flex items-center">
                {isLoading ? (
                  <div className="mx-auto w-[250px] h-[250px] flex items-center justify-center">
                    <img src="/assets/90-ring-with-bg.svg"></img>
                  </div>
                ) : (
                  <qr-code
                    ref={ref}
                    contents={link ?? initialLink}
                    module-color="#7f1d1d"
                    position-ring-color="#000000"
                    position-center-color="#991b1b"
                    mask-x-to-y-ratio="1.2"
                    style={{
                      width: "250px",
                      height: "250px",
                      margin: "auto",
                    }}
                  >
                    <img src="/classicalsliveshortcircle.png" slot="icon"></img>
                  </qr-code>
                )}
              </div>
              <div className="border-dashed border-b-2 my-5 pt-5">
                <div className="absolute rounded-full w-5 h-5 bg-gray-200 -mt-2 -left-2"></div>
                <div className="absolute rounded-full w-5 h-5 bg-gray-200 -mt-2 -right-2"></div>
              </div>
              <div className="flex items-center mb-5 p-5 text-sm">
                {generateTop()}
              </div>
              <div className="flex items-center mb-4 px-5">
                <div className="flex flex-col text-sm">
                  <span className="">Date</span>
                  <div className="font-semibold">
                    {unixToDateShort(ticket.ticketTop.dateAndTimeInfo)}
                  </div>
                </div>
                <div className="flex flex-col mx-auto text-sm">
                  <span className="">Time</span>
                  <div className="font-semibold">
                    {unixToTime(ticket.ticketTop.dateAndTimeInfo)}
                  </div>
                </div>
              </div>
              <div className="border-dashed border-b-2 my-5 pt-5">
                <div className="absolute rounded-full w-5 h-5 bg-gray-200 -mt-2 -left-2"></div>
                <div className="absolute rounded-full w-5 h-5 bg-gray-200 -mt-2 -right-2"></div>
              </div>
              <div className="flex items-center px-5 pt-3 text-sm">
                {generateBottom()}
              </div>
              <br></br>
              <Link
                href="/"
                className="px-5 text-sm font-semibold text-blue-500 hover:underline w-max"
              >
                Concert Details
              </Link>
              <div className="flex flex-col py-5 justify-center text-sm">
                <h6 className="font-bold text-center">Order #: 0382716</h6>
                <div className="mx-auto bg-red-100 w-full px-4 rounded-md py-4 border-l-4 border-red-600 mt-3">
                  <p className="font-bold">
                    Tickets are non-transferrable! Please do not screenshot this
                    code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
