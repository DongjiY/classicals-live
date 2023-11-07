// @ts-nocheck
"use client";
import { useRouter } from "next/navigation";
import { FunctionComponent, SyntheticEvent, useState } from "react";
import AutocompleteInputField from "./AutocompleteInputField";

const NewPerfForm: FunctionComponent = () => {
  const router = useRouter();
  const [error, setError] = useState<Boolean>(false);
  const [numPieces, setNumPieces] = useState<number>(1);
  const [numPerfs, setNumPerfs] = useState<number>(0);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (
      // make sure either group or individual name is filled
      !e.currentTarget.groupName.value &&
      !e.currentTarget.individualName.value
    ) {
      setError(true);
    } else {
      let pieces = [];
      let searchString = "";
      for (let i = 0; i < numPieces; i++) {
        pieces.push({
          pieceName: e.currentTarget[`pieceName-${i}`].value,
          composerName: e.currentTarget[`composerName-${i}`].value,
        });
        searchString = `${searchString} ${
          e.currentTarget[`pieceName-${i}`].value
        } ${e.currentTarget[`composerName-${i}`].value}`;
      }

      let allPerformanceTimes = [];
      for (let j = 1; j < numPerfs + 2; j++) {
        allPerformanceTimes.push(
          new Date(
            `${e.currentTarget[`performance-${j}-date`].value} ${
              e.currentTarget[`performance-${j}-time`].value
            }`
          ).getTime() / 1000
        );
      }
      allPerformanceTimes.sort();
      // console.log(allPerformanceTimes);

      const body = {
        searchString: searchString,
        pieces: pieces,
        group: {
          groupName:
            e.currentTarget.groupName.value &&
            e.currentTarget.individualName.value
              ? `${e.currentTarget.groupName.value}/${e.currentTarget.individualName.value}`
              : `${
                  e.currentTarget.groupName.value ||
                  e.currentTarget.individualName.value
                }`,
        },
        performanceTime: allPerformanceTimes[allPerformanceTimes.length - 1],
        additionalPerformanceTimes: allPerformanceTimes.slice(0, -1) || null,
        location: {
          name: e.currentTarget.locationName.value,
        },
        originalLink: e.currentTarget.link.value,
      };

      body.searchString = `${body.searchString} ${body.group.groupName}`;

      // console.log(body);

      fetch("https://api.classicals.live/concerts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            router.push("/contribute/concert/success");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const generatePieceRow = () => {
    let res = [];
    for (let i = 0; i < numPieces; i++) {
      res.push(
        <div className="flex items-center mb-2" key={i}>
          <div className="grow grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 py-4 gap-x-2 gap-y-2 font-modern">
            <div className="col-span-1 px-4">
              <p>
                Piece Name<span className="text-red-600">*</span>
              </p>
              <input
                type="text"
                name={`pieceName-${i}`}
                className="h-8 border-2 rounded-md w-full dark:text-black"
                required
              />
            </div>

            <div className="col-span-1 px-4">
              <p>
                Composer Full Name<span className="text-red-600">*</span>
              </p>
              <AutocompleteInputField i={i} />
            </div>
          </div>

          {i === numPieces - 1 ? (
            <button
              onClick={() => {
                setNumPieces(numPieces - 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mt-5 fill-red-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 mt-5"
            >
              <path
                fillRule="evenodd"
                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      );
    }

    return res;
  };

  const generatePerfInputs = () => {
    const TODAY = new Date();
    let res = [];
    for (let i = 0; i < numPerfs; i++) {
      res.push(
        <div className="w-full px-4">
          <hr></hr>
          <div className="grid grid-cols-12 grid-rows-1 gap-x-1 py-2">
            <p className="col-span-3 hidden md:block">Performance {i + 2}</p>
            <input
              type="date"
              name={`performance-${i + 2}-date`}
              className="col-span-5 md:col-span-4 rounded text-black"
              defaultValue={`${TODAY.toLocaleDateString("en-CA")}`}
              required
            />
            <input
              name={`performance-${i + 2}-time`}
              type="time"
              defaultValue={"19:00"}
              className="col-span-5 md:col-span-4 rounded text-black"
              required
            />

            <span className="col-span-2 md:col-span-1 flex flex-row-reverse">
              {i === numPerfs - 1 ? (
                <button
                  onClick={() => {
                    setNumPerfs(numPerfs - 1);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 fill-red-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
          </div>
        </div>
      );
    }

    return res;
  };

  return (
    <form
      className="mx-auto w-11/12 md:w-1/2 py-8 min-h-[70vh] dark:text-white"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center font-fancy text-3xl">Add a Performance</h1>

      <h2 className="font-modern text-lg mt-3">
        Tell us a little about the piece...
      </h2>
      {generatePieceRow()}
      <div className="w-full text-center">
        <button
          onClick={() => {
            setNumPieces(numPieces + 1);
          }}
          className="w-2/3 mx-auto bg-green-500 text-white py-1.5 rounded-lg hover:opacity-70 duration-200"
        >
          Add Piece
        </button>
      </div>

      <h2 className="font-modern text-lg mt-3">
        Tell us a little about the performance...
      </h2>
      <div className="grid grid-cols-2 grid-rows-6 grid-rows-md:grid-cols-2 md:grid-rows-4 py-4 gap-x-2 gap-y-2 font-modern">
        <div className="col-span-2 md:col-span-1 px-4">
          <p>Group Name</p>
          <input
            type="text"
            name="groupName"
            className={
              error
                ? "h-8 border-2 border-red-400 rounded-md w-full dark:text-black"
                : "h-8 border-2 rounded-md w-full dark:text-black"
            }
          />
        </div>

        <div className="col-span-2 md:col-span-1 px-4">
          <p>Individual Name</p>
          <input
            type="text"
            name="individualName"
            className={
              error
                ? "h-8 border-2 border-red-400 rounded-md w-full dark:text-black"
                : "h-8 border-2 rounded-md w-full dark:text-black"
            }
          />
        </div>

        <div
          className={
            error
              ? "col-span-2 bg-red-200 mx-4 px-3 py-2 border-l-4 border-red-600 text-black"
              : "col-span-2 bg-orange-200 mx-4 px-3 py-2 border-l-4 border-orange-400 text-black"
          }
        >
          <h2>Group Name OR Individual Name must be filled out.</h2>
        </div>

        <div className="col-span-2 md:col-span-1 px-4">
          <p>
            Venue Name<span className="text-red-600">*</span>
          </p>
          <input
            type="text"
            name="locationName"
            className="h-8 border-2 rounded-md w-full dark:text-black"
            required
          />
        </div>

        <div className="col-span-2 md:col-span-1 px-4">
          <p>
            Performance Date & Time<span className="text-red-600">*</span>
          </p>
          <div className="flex items-center flex-wrap gap-x-1">
            <input
              type="date"
              name="performance-1-date"
              className="h-8 border-2 rounded-md w-[49%] md:w-[45%] dark:text-black"
              defaultValue={new Date().toLocaleDateString("en-CA")}
              required
            />
            <input
              type="time"
              name="performance-1-time"
              className="h-8 border-2 rounded-md w-[49%] md:w-[45%] dark:text-black"
              defaultValue={"19:00"}
              required
            />
          </div>
        </div>

        <div className="col-span-2 px-4">
          <p>
            Source Link<span className="text-red-600">*</span>
          </p>
          <input
            type="url"
            name="link"
            className="h-8 border-2 rounded-md w-full dark:text-black"
            required
            placeholder="ex. https://your-site-here"
          />
        </div>
      </div>
      {generatePerfInputs()}
      <div className="w-full text-center pb-8 py-4">
        <input
          className="bg-blue-500 w-2/3 text-white py-1.5 rounded-lg hover:opacity-70 duration-200"
          onClick={() => {
            setNumPerfs(numPerfs + 1);
          }}
          type="button"
          value="Add Performance Time"
        ></input>
      </div>
      <div className="pr-4 flex justify-between">
        <p>
          <span className="text-red-600">*</span>=required field
        </p>
        <input
          type="submit"
          value="Submit"
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:opacity-80 duration-100 cursor-pointer"
        />
      </div>
    </form>
  );
};

export default NewPerfForm;
