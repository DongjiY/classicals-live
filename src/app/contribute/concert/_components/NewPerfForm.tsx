// @ts-nocheck
"use client";
import { useRouter } from "next/navigation";
import { FunctionComponent, SyntheticEvent, useState } from "react";

const NewPerfForm: FunctionComponent = () => {
  const router = useRouter();
  const [error, setError] = useState<Boolean>(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (
      // make sure either group or individual name is filled
      !e.currentTarget.groupName.value &&
      !e.currentTarget.individualName.value
    ) {
      setError(true);
    } else {
      const body = {
        pieceName: e.currentTarget.pieceName.value,
        composerName: e.currentTarget.composerName.value,
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
        performanceTime:
          new Date(
            `${e.currentTarget.date.value} ${e.currentTarget.time.value}`
          ).getTime() / 1000,
        location: {
          name: e.currentTarget.locationName.value,
        },
        originalLink: e.currentTarget.link.value,
      };

      console.log(body);
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

  return (
    <form
      className="mx-auto w-1/2 py-8 h-[70vh] dark:text-white"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center font-fancy text-3xl">Add a Performance</h1>

      <h2 className="font-modern text-lg mt-3">
        Tell us a little about the piece...
      </h2>
      <div className="grid grid-cols-2 grid-rows-1 py-4 gap-x-2 gap-y-2 font-modern">
        <div className="col-span-1 px-4">
          <p>
            Piece Name<span className="text-red-600">*</span>
          </p>
          <input
            type="text"
            name="pieceName"
            className="h-8 border-2 rounded-md w-full dark:text-black"
            required
          />
        </div>

        <div className="col-span-1 px-4">
          <p>
            Composer Full Name<span className="text-red-600">*</span>
          </p>
          <input
            type="text"
            name="composerName"
            className="h-8 border-2 rounded-md w-full dark:text-black"
            required
          />
        </div>
      </div>

      <h2 className="font-modern text-lg mt-3">
        Tell us a little about the performance...
      </h2>
      <div className="grid grid-cols-2 grid-rows-4 py-4 gap-x-2 gap-y-2 font-modern">
        <div className="col-span-1 px-4">
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

        <div className="col-span-1 px-4">
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

        <div className="col-span-1 px-4">
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

        <div className="col-span-1 px-4">
          <p>
            Performance Date & Time<span className="text-red-600">*</span>
          </p>
          <div className="flex items-center flex-wrap gap-x-1">
            <input
              type="date"
              name="date"
              className="h-8 border-2 rounded-md w-[45%] dark:text-black"
              required
            />
            <input
              type="time"
              name="time"
              className="h-8 border-2 rounded-md w-[45%] dark:text-black"
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
