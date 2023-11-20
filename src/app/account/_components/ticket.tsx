"use client";
import { FunctionComponent, useEffect, useState } from "react";
import * as qr from "@bitjson/qr-code";
import Link from "next/link";
import useInitialQRLink from "../_hooks/useInitialQRLink";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Ticket: FunctionComponent = () => {
  const [link, setLink] = useState<string>();

  useEffect(() => {
    qr.defineCustomElements(window);
  }, []);

  const { initialLink } = useInitialQRLink();

  return (
    <div className="max-w-md w-full h-full z-10 bg-red-900 rounded-3xl">
      <div className="flex flex-col">
        <div className="bg-white relative drop-shadow-2xl  rounded-3xl p-4 m-4">
          <div className="flex-none sm:flex">
            <div className=" relative h-32 w-32   sm:mb-0 mb-3 hidden">
              <a
                href="#"
                className="absolute -right-2 bottom-2   -ml-3  text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                </svg>
              </a>
            </div>
            <div className="flex-auto justify-evenly">
              <div className="flex items-center justify-between">
                <div className="flex items-center my-1">
                  <h2 className="font-medium text-lg">
                    Dallas Symphony Orchestra
                  </h2>
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
                        test: "data",
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
                {/* 
                    // @ts-ignore */}
                <qr-code
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
              </div>
              <div className="border-dashed border-b-2 my-5 pt-5">
                <div className="absolute rounded-full w-5 h-5 bg-red-900 -mt-2 -left-2"></div>
                <div className="absolute rounded-full w-5 h-5 bg-red-900 -mt-2 -right-2"></div>
              </div>
              <div className="flex items-center mb-5 p-5 text-sm">
                <div className="flex flex-col">
                  <span className="text-sm">Aisle</span>
                  <div className="font-semibold">3</div>
                </div>
                <div className="flex flex-col ml-auto">
                  <span className="text-sm">Section</span>
                  <div className="font-semibold">Orch Center</div>
                </div>
                <div className="flex flex-col ml-auto">
                  <span className="text-sm">Row</span>
                  <div className="font-semibold">E</div>
                </div>
                <div className="flex flex-col ml-auto">
                  <span className="text-sm">Seat</span>
                  <div className="font-semibold">10</div>
                </div>
              </div>
              <div className="flex items-center mb-4 px-5">
                <div className="flex flex-col text-sm">
                  <span className="">Date</span>
                  <div className="font-semibold">FRI Nov. 12</div>
                </div>
                <div className="flex flex-col mx-auto text-sm">
                  <span className="">Time</span>
                  <div className="font-semibold">11:30pm</div>
                </div>
              </div>
              <div className="border-dashed border-b-2 my-5 pt-5">
                <div className="absolute rounded-full w-5 h-5 bg-red-900 -mt-2 -left-2"></div>
                <div className="absolute rounded-full w-5 h-5 bg-red-900 -mt-2 -right-2"></div>
              </div>
              <div className="flex items-center px-5 pt-3 text-sm">
                <div className="flex flex-col">
                  <span className="">Attendee</span>
                  <div className="font-semibold">Dongji Yang</div>
                </div>
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
