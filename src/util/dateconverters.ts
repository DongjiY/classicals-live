import { Concert } from "@/types/concert";

export const unixToDate = (
  unix: number,
  options?: {
    includeDay?: boolean;
    includeYr?: boolean;
    shortDays?: boolean;
  }
) => {
  const daysArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const daysArrShort = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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

  return `${
    options && options.includeDay
      ? (options.shortDays
          ? daysArrShort[date.getDay()]
          : daysArr[date.getDay()]) + " "
      : ""
  }${monthsArr[date.getMonth()]} ${date.getDate().toString().padStart(2, "0")}${
    options && options.includeYr ? ", " + date.getFullYear() : ""
  }`;
};

export const unixToDateShort = (unix: number) => {
  const date = new Date(unix * 1000);

  return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

export const unixToTime = (unix: number) => {
  const date = new Date(unix * 1000);

  const suffix = date.getHours() >= 12 ? "pm" : "am";

  return `${date.getHours() % 12 || 12}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}${suffix}`;
};

export const getEpochsForDayOfWeek = (
  day: number,
  epochArray: Array<{ id: string; time: number; group: string }>
): Array<{ id: string; time: number; group: string }> => {
  const desiredDayEpochs = epochArray.filter((epoch) => {
    const date = new Date(epoch.time * 1000); // Convert epoch to milliseconds for Date object
    const epochDay = date.getDay(); // Get the day of the week for the current epoch

    // Sunday is 0, Monday is 1, and so on
    return epochDay === day;
  });

  return desiredDayEpochs;
};

export function getStartOfWeekUnixTime() {
  const now = new Date();
  const day = now.getDay(); // 0 for Sunday, 1 for Monday, and so on
  const startOfWeek = new Date(now); // Clone the current date
  startOfWeek.setHours(0, 0, 0, 0); // Set time to the beginning of the day

  // Calculate the difference between the current day and Sunday (0)
  const diffDays = day === 0 ? 0 : day - 0;

  startOfWeek.setDate(startOfWeek.getDate() - diffDays); // Set the date to the start of the week

  return Math.floor(startOfWeek.getTime() / 1000); // Convert to Unix epoch time (in seconds)
}

export function getEndOfWeekUnixTime() {
  const now = new Date();
  const endOfWeek = new Date(now); // Clone the current date

  // Move to the end of the week
  endOfWeek.setHours(23, 59, 59, 999); // Set time to the end of the day
  endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay())); // Set to the end of the week

  return Math.floor(endOfWeek.getTime() / 1000); // Convert to Unix epoch time (in seconds)
}
