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
