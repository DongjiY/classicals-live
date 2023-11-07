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
