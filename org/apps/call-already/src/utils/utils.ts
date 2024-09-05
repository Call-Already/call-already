import moment from "moment-timezone";
import { useMediaQuery } from "react-responsive";

export const env = process.env.NODE_ENV;

// Custom react hook, always starts with "use"
export function useIsMobile() {
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return isMobile;
}

export function generateGroupCode(length: number = 4): string {
  // Define the characters to choose from (uppercase letters and digits)
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    // Randomly select a character from the characters string
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}

// Takes dates and returns all UTC times by hour
export function getUniversalTimeInputs(dates: string[]) {
  // Create a UTC times array for all days
  const times = [];

  // For each date, add all the localized times
  for (var i = 0; i < dates.length; i++) {
    const currentDate = dates[i];
    var currTimeOfDay = moment(currentDate).tz("UTC").startOf("day");
    for (var j = 0; j < 24; j++) {
      times.push(currTimeOfDay.format());
      currTimeOfDay.add(1, "hour");
    }
  }

  return times;
}

// Takes times and timezone and returns all localized times by hour
export function getLocalizedTimeInputs(times: string[], timezone: string) {
  const localizedTimes = [];

  for (var i = 0; i < times.length; i++) {
    const time = times[i];
    const momentTime = moment(time);
    const convertedTime = momentTime.tz(timezone);
    localizedTimes.push(convertedTime.format());
  }

  return localizedTimes;
}

// Takes times and timezone and returns all localized times by hour formatted
export function getFormattedLocalTimes(times: string[], timezone: string) {
  const localizedTimes = getLocalizedTimeInputs(times, timezone);

  const formattedTimes = [];

  for (var i = 0; i < localizedTimes.length; i++) {
    const time = localizedTimes[i];
    formattedTimes.push(moment(time).tz(timezone).format('lll'))
  };

  return formattedTimes;
}

// Returns a list of formatted days
export function getFormattedDays(days: string[]) {
  const formattedDays = [];

  for (var i = 0; i < days.length; i++) {
    const time = days[i];
    formattedDays.push(moment(time).format('ll'));
  };

  return formattedDays;
}

// Takes a beginning and end date, returning an array
// of dates that fall within the range of the two.
export function getDatesInRange(pickedDays: any) {
  if (pickedDays.length === 0) {
    throw new Error("Date range must include at least one date");
  }

  // Only one day from datepicker, return it in UTC format
  if (pickedDays.length === 1) {
    return [moment(pickedDays[0]).tz("UTC").startOf("day").format()];
  }

  // Tranform first day into moment
  // Format it as a short date
  const firstDate = pickedDays[0];
  const simpleFirstDay = moment(firstDate).format("l");

  // Transform second day into moment
  // Format it as a short date
  const lateDate = pickedDays[1];
  const simpleLastDay = moment(lateDate).format("l");

  // Loop through the days until the first day
  // becomes the second day, adding them to a
  // date array in full UTC format.
  let simpleCurrentDay = simpleFirstDay;
  let utcCurrentDay = moment(simpleCurrentDay)
    .tz("UTC")
    .startOf("day")
    .format();
  const utcDatesToReturn = [utcCurrentDay];
  while (simpleCurrentDay !== simpleLastDay) {
    simpleCurrentDay = moment(simpleCurrentDay).add(1, "day").format("l");
    utcCurrentDay = moment(simpleCurrentDay).tz("UTC").startOf("day").format();
    utcDatesToReturn.push(utcCurrentDay);
  }

  // Return the UTC days array.
  return utcDatesToReturn;
}

export function isDaytimeHours(time: string): boolean {
  const isPM = time.includes("pm");

  const num = Number(time.substring(0, time.length - 2));

  if (isPM && num !== 12 && num > 8) {
    return false;
  } else if (!isPM && (num < 8 || num === 12)) {
    return false;
  }

  return true;
}
