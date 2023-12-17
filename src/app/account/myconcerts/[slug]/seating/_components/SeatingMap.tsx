"use client";
import { FunctionComponent, SyntheticEvent, useEffect, useRef } from "react";
import { SeatingCanvas } from "../_classes/SeatingCanvas";
import styles from "../_styles/SeatingMap.module.css";

type Props = {
  editMode: boolean;
};

const SeatingMap: FunctionComponent<Props> = ({ editMode }) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  const init = useEffect(() => {
    if (canvas.current) {
      const map = new SeatingCanvas(canvas.current, "DEBUG");
    }
  }, []);

  const handleShapeDragStart = (e: any) => {
    const shapeType = e.currentTarget.dataset.shapetype;

    e.dataTransfer.setData("shapetype", shapeType);
  };

  return (
    <>
      <div className="border-2 shadow-sm w-full h-full overflow-hidden relative rounded-lg bg-white font-modern">
        <canvas
          ref={canvas}
          className="w-full h-full cursor-grab block"
        ></canvas>

        <section className="absolute top-0 left-0 right-0 bg-gray-200 pt-4 px-4 pb-1.5">
          <div className="flex items-center gap-x-2">
            <button
              className="bg-white rounded-full p-1"
              onClick={() => {
                history.back();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold">Seat Editor</h1>
          </div>

          <div className="flex items-center mt-4 h-16">
            <div
              draggable
              data-shapetype={"RECT"}
              className="flex flex-col items-center hover:bg-gray-400 py-2 px-2 rounded cursor-pointer"
              onDragStart={handleShapeDragStart}
            >
              <div className="h-7 w-7 bg-blue-300 shadow"></div>
              <p>Add Seat</p>
            </div>
            <div className="border-l-2 mx-2 border-gray-400 h-full"></div>
            <div
              draggable
              data-shapetype={"CIRC"}
              className="flex flex-col items-center hover:bg-gray-400 py-2 px-2 rounded cursor-pointer"
              onDragStart={handleShapeDragStart}
            >
              <div className="h-7 w-7 bg-purple-300 rounded-full shadow"></div>
              <p>Add Seat</p>
            </div>
          </div>
        </section>

        <p
          id="coords"
          className={
            editMode ? "absolute bottom-1 right-2 text-black" : "hidden"
          }
        ></p>

        <div className="absolute bg-gray-200 flex flex-col left-3 bottom-3 rounded w-max h-max cursor-pointer">
          <div id="zoom-in" className="hover:bg-gray-300 px-1 pt-2 rounded-t">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 pb-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>

          <div id="zoom-out" className="pb-2 px-1 rounded-b hover:bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 pt-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </div>
        </div>

        <section id="info" className={styles.info}>
          <button
            className="bg-gray-50 rounded-full p-1 absolute right-0 top-0 translate-x-2 -translate-y-2 shadow"
            onClick={(e) => {
              e.currentTarget.parentElement?.classList.remove(styles.open);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h1>Seat Information</h1>
        </section>
      </div>
    </>
  );
};

export default SeatingMap;
