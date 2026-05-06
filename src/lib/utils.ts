import { composeRenderProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { millisecondsToMinutes, millisecondsToSeconds } from "date-fns";
import { secondsInMinute } from "date-fns/constants";

export function composeTailwindRenderProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string,
): string | ((v: T) => string) {
  return composeRenderProps(className, (className) => twMerge(tw, className));
}

export function formatDuration(ms: number) {
  if (isNaN(ms)) return "";

  const minutes = millisecondsToMinutes(ms);
  const seconds = millisecondsToSeconds(ms) - secondsInMinute * minutes;

  return (
    minutes +
    ":" +
    Intl.NumberFormat("en-IN", {
      minimumIntegerDigits: 2,
    }).format(seconds)
  );
}
