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
      const map = new SeatingCanvas(
        canvas.current,
        editMode ? "DEBUG" : "PROD"
      );
    }
  }, []);

  return (
    <>
      <div className="border-2 shadow-sm w-full h-full overflow-hidden relative rounded-lg bg-white font-modern">
        <canvas
          ref={canvas}
          className="w-full h-full cursor-grab block"
        ></canvas>

        <EditMenu edit={editMode} />

        <DebugLabel edit={editMode} />

        <ZoomControls />

        <Popover />

        <ContextMenu edit={editMode} />
      </div>
    </>
  );
};

export default SeatingMap;

// define widgets
const Popover: FunctionComponent = () => {
  return (
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
  );
};

const ZoomControls: FunctionComponent = () => {
  return (
    <div className="absolute bg-gray-200 flex flex-col left-3 bottom-3 rounded w-max h-max cursor-pointer">
      <div className="zoom-in hover:bg-gray-300 px-1 pt-2 rounded-t">
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

      <div className="zoom-out pb-2 px-1 rounded-b hover:bg-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 pt-2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      </div>
    </div>
  );
};

const DebugLabel: FunctionComponent<{ edit: boolean }> = ({ edit }) => {
  return (
    <p
      id="coords"
      className={edit ? "absolute bottom-1 right-2 text-black" : "hidden"}
    ></p>
  );
};

const EditMenu: FunctionComponent<{ edit: boolean }> = ({ edit }) => {
  const handleShapeDragStart = (e: any) => {
    const shapeType = e.currentTarget.dataset.shapetype;

    e.dataTransfer.setData("shapetype", shapeType);
  };

  return (
    <section
      className={
        edit
          ? "absolute top-0 left-0 right-0 bg-gray-200 pt-4 px-4 pb-1.5"
          : "hidden"
      }
    >
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
  );
};

const ContextMenu: FunctionComponent<{ edit: boolean }> = ({ edit }) => {
  return (
    <div id="customcontextmenu" className={styles.contextmenu}>
      <ul
        className="py-1 bg-white rounded-lg cursor-pointer border-2 border-gray-300"
        onClick={(e) => {
          e.currentTarget.parentElement?.classList.remove(
            styles.contextmenuopen
          );
        }}
      >
        <li
          id="editseat"
          className={
            edit
              ? "flex items-center px-3 hover:bg-gray-300 py-2 gap-x-2"
              : "hidden"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
          </svg>

          <p>Edit Seat Information</p>
        </li>
        <li className="zoom-in flex items-center px-3 hover:bg-gray-300 py-2 gap-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M9 6a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5A.75.75 0 019 6z" />
            <path
              fillRule="evenodd"
              d="M2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9zm7-5.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11z"
              clipRule="evenodd"
            />
          </svg>

          <p>Zoom In</p>
        </li>
        <li className="zoom-out flex items-center px-3 hover:bg-gray-300 py-2 gap-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M6.75 8.25a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" />
            <path
              fillRule="evenodd"
              d="M9 2a7 7 0 104.391 12.452l3.329 3.328a.75.75 0 101.06-1.06l-3.328-3.329A7 7 0 009 2zM3.5 9a5.5 5.5 0 1111 0 5.5 5.5 0 01-11 0z"
              clipRule="evenodd"
            />
          </svg>

          <p>Zoom Out</p>
        </li>
      </ul>
    </div>
  );
};
