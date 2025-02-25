import { default as dayjs } from "dayjs";
import {
  addDate,
  format,
  getDateDiff,
  getDatesBetweenTwoDates,
  getNextDate,
  isAfter,
  isBefore,
  isBeforeOrEqual,
  isBetweenDate,
  subtractDate,
} from "../plugins/day";
import type { Booking } from "~/types";

const convertHexToRGBA = (hexCode: string, opacity = 1): string => {
  if (hexCode) {
    let hex = hexCode.replace("#", "");

    if (hex.length === 3) {
      hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    if (opacity > 1 && opacity <= 100) {
      opacity = opacity / 100;
    }

    return `rgba(${r},${g},${b},${opacity})`;
  }

  return "";
};

const isDateAfter = (time1: Date, time2: Date): boolean => {
  return isAfter(time1, time2);
};

const isDateBefore = (time1: string | Date, time2: string | Date): boolean => {
  return isBefore(time1, time2);
};

const getDayDiff = (d1: string, d2: string): number => {
  return getDateDiff(d1, d2, "day");
};

const validateDateBetweenTwoDates = (
  fromDate: string,
  toDate: string,
  givenDate: string
): boolean => {
  return isBetweenDate(fromDate, toDate, givenDate);
};

const getMonthDiff = (d1: Date, d2: Date): number => {
  return getDateDiff(d1, d2, "month");
};

const isDateBeforeOrEqual = (
  time1: Date | string,
  time2: Date | string
): boolean => {
  return isBeforeOrEqual(time1, time2);
};

const addDays = (date: Date | string, quantity: number): Date => {
  return addDate(date, quantity, "day");
};

const substractDays = (date: Date | string, quantity: number): Date => {
  return subtractDate(date, quantity, "day");
};

const getNextMonth = (date: Date): Date => {
  return addDate(date, 1, "month");
};

const getNextDay = (date: Date, dayIndex: number): Date => {
  return getNextDate(date, dayIndex);
};

const sortDatesObj = (dates: Booking[]): Booking[] => {
  dates.map((d) => {
    return {
      ...d,
      checkInDate: format(d.checkInDate, "YYYY/MM/DD"),
    };
  });

  return dates
    .sort((a, b) => {
      const aa = a.checkInDate.split("/").reverse().join();
      const bb = b.checkInDate.split("/").reverse().join();

      return aa < bb ? -1 : aa > bb ? 1 : 0;
    })
    .map((d) => {
      return {
        ...d,
        checkInDate: format(d.checkInDate, "YYYY-MM-DD"),
      };
    });
};

const sortDates = (dates: string[]): string[] => {
  dates.map((d) => format(d, "YYYY/MM/DD"));

  return dates
    .sort((a, b) => {
      const aa = a.split("/").reverse().join();
      const bb = b.split("/").reverse().join();

      return aa < bb ? -1 : aa > bb ? 1 : 0;
    })
    .map((d) => format(d, "YYYY-MM-DD"));
};

const getDaysArray = (start: Date | string, end: Date | string): Date[] => {
  const d1 = dayjs(start).utc(true);
  const d2 = dayjs(end).utc(true);
  const lenghDifference: number = getDateDiff(d1.toDate(), d2.toDate(), "day");
  const arr = [];

  for (let index = 0; index < lenghDifference + 1; index++) {
    const day = d1.add(index, "day").toDate();

    arr.push(day);
  }

  return arr;
};

export {
  addDays,
  convertHexToRGBA,
  getDatesBetweenTwoDates,
  getDayDiff,
  getDaysArray,
  getMonthDiff,
  getNextDay,
  getNextMonth,
  isDateAfter,
  isDateBefore,
  isDateBeforeOrEqual,
  sortDates,
  sortDatesObj,
  substractDays,
  validateDateBetweenTwoDates,
};
