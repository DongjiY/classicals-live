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

export function getMonthStartEndTimestamps(
  month: number,
  year: number
): { start: number; end: number } {
  // Ensure month is between 0 and 11
  if (month < 0 || month > 11) {
    throw new Error("Invalid month. Month should be between 0 and 11.");
  }

  // Create a new Date object for the first day of the specified month
  const startDate = new Date(year, month, 1);

  // Calculate the last day of the month
  const lastDay = new Date(year, month + 1, 0).getDate();

  // Create a new Date object for the last day of the specified month
  const endDate = new Date(year, month, lastDay, 23, 59, 59, 999);

  // Get Unix timestamps
  const startTimestamp = Math.floor(startDate.getTime() / 1000);
  const endTimestamp = Math.floor(endDate.getTime() / 1000);

  return {
    start: startTimestamp,
    end: endTimestamp,
  };
}

export function isUnixEpochInDay(
  unixEpoch: number,
  day: number,
  month: number,
  year: number
): boolean {
  // Ensure month is between 0 and 11
  if (month < 0 || month > 11) {
    throw new Error("Invalid month. Month should be between 0 and 11.");
  }

  // Create a Date object from the Unix epoch timestamp
  const date = new Date(unixEpoch * 1000);

  // Check if the date matches the specified day, month, and year
  const isSameDay = date.getDate() === day;
  const isSameMonth = date.getMonth() === month; // Months are zero-based
  const isSameYear = date.getFullYear() === year;

  return isSameDay && isSameMonth && isSameYear;
}

export function getDayTimestamps(
  dayOfYear: number,
  month: number,
  year: number
): { start: number; end: number } {
  // Ensure month is between 0 and 11
  if (month < 0 || month > 11) {
    throw new Error("Invalid month. Month should be between 0 and 11.");
  }

  // Ensure the day of the year is valid
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  if (dayOfYear < 1 || dayOfYear > daysInMonth) {
    throw new Error("Invalid day of the year.");
  }

  // Create a new Date object for the specified day of the year
  const date = new Date(year, month, dayOfYear);

  // Set time to the beginning of the day (midnight)
  date.setHours(0, 0, 0, 0);

  // Create a new Date object for the end of the day (23:59:59:999)
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);

  // Get Unix timestamps
  const startTimestamp = Math.floor(date.getTime() / 1000);
  const endTimestamp = Math.floor(endDate.getTime() / 1000);

  return {
    start: startTimestamp,
    end: endTimestamp,
  };
}
