import { EventType } from "./BackendEnums";

function escapeRegExp(str: string) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export function stringToRegExp(str: string) {
  str = escapeRegExp(str);
  return new RegExp(str, 'ig');
}

//removes trailing whitespaces between words, and at the beginning and end
export function normalizeString(str: string) {
  return str.trim().split(/ {1,}/).join(' ')
}


export function roundToFloat(num: number, nbOfFloatDigits: number) {
  const multiplicator = 10 ** nbOfFloatDigits
  return Math.round(num * multiplicator) / multiplicator
}

//COLOR FUNCTIONS

export function eventTypeBackgroundColor(type: number | string) {
  type = +type
  return (type === EventType.CONCERT
    ? "bg-blue-500"
    : type === EventType.THEATRE
      ? "bg-orange-500"
      : type === EventType.STANDUP
        ? "bg-red-500"
        : "")
}

export function cardBorderColor(str: string) {
  switch (str) {
    case 'warning':
    case 'pending':
    case 'not_commented':
      return "border-yellow-400"
      break;
    case 'ban':
    case 'refused':
      return "border-red-700"
      break;
    case 'validated':
    case 'commented':
      return "border-green-700"
      break;
    default:
      return "border-transparent"
  }
}