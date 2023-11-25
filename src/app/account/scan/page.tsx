"use client";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import styles from "./_styles/scan.module.css";

const ScanTicketPage: NextPage = () => {
  const video = useRef<HTMLVideoElement | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const modal = useRef<HTMLDivElement | null>(null);

  const shouldScan = useRef<boolean>(true);

  const [error, setError] = useState<boolean>(false);

  const mediaConstraints = {
    audio: false,
    video: {
      facingMode: "environment",
    },
  };

  const tryValidateQRCode = async (url: string) => {
    fetch(url)
      .then((res) => {
        if (res.status === 200 && modal.current) {
          modal.current.classList.toggle(styles.closed);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleResetScan = () => {
    shouldScan.current = true;
    modal.current!.classList.toggle(styles.closed);
  };

  useEffect(() => {
    const canvasObj = canvas.current!.getContext("2d");

    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then((stream: MediaStream) => {
        // playback video on user screen
        if (video.current) {
          video.current.srcObject = stream;
          video.current.setAttribute("playsinline", "true");
          video.current.onloadedmetadata = () => {
            video.current!.play();
          };
          requestAnimationFrame(tick);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });

    const tick = () => {
      if (video.current && canvas.current) {
        if (video.current.readyState === video.current.HAVE_ENOUGH_DATA) {
          // canvas.current.hidden = false;

          canvas.current.height = video.current!.videoHeight;
          canvas.current.width = video.current!.videoWidth;

          if (shouldScan.current) {
            canvasObj?.drawImage(
              video.current,
              0,
              0,
              canvas.current.width,
              canvas.current.height
            );

            var imageData = canvasObj?.getImageData(
              0,
              0,
              canvas.current.width,
              canvas.current.height
            );
            var code = jsQR(
              imageData!.data,
              imageData!.width,
              imageData!.height,
              {
                inversionAttempts: "dontInvert",
              }
            );

            if (code) {
              shouldScan.current = false;
              tryValidateQRCode(code.data);
            }
          }
        }
        requestAnimationFrame(tick);
      }
    };
  }, []);

  return (
    <main className="overflow-hidden h-full flex flex-col items-center relative">
      <section className="h-[calc(100vh-4.25rem)] pb-8 px-4 pt-4">
        <canvas className="rounded-xl" ref={canvas} hidden></canvas>
        <video className="rounded-xl" ref={video}></video>
        <div
          className={
            error
              ? "bg-red-100 rounded-lg border-l-4 border-red-600 py-4 px-2 mb-2"
              : "hidden"
          }
        >
          <p>Please enable camera access to scan tickets!</p>
        </div>
        <div className="bg-gray-200 rounded-lg border-l-4 border-gray-500 py-4 px-2 mt-2">
          <p>Hold the QR code in the camera viewport</p>
        </div>
      </section>

      <div ref={modal} className={`${styles.modal} ${""}`}>
        <div className="w-full h-full flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-24 h-24 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-white font-modern font-bold text-2xl">
            Ticket Scan Success!
          </h1>
          <button
            onClick={handleResetScan}
            className="bg-gray-800 text-white px-3 py-2 rounded-lg mt-3"
          >
            Scan Again
          </button>
        </div>
      </div>
    </main>
  );
};

export default ScanTicketPage;
