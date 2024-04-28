import { format, parse } from "@formkit/tempo";

export class DateTimeUtils {
  //str like 2025-03-26T13:53:02.000Z
  static formatDateTimeForCard(date: string | Date): string {
    return format(date, { date: "full", time: "short" }, "fr")
  }

  //str like 2025-03-26T13:53:02.000Z
  static formatDateTimeForTable(date: string | Date): string {
    return format(date, { date: "short", time: "short" }, "fr")
  }

  //time like "13:52:32"
  static formatTime(timeStr: string) {
    return format(parse(timeStr, "hh:mm:ss"), { time: "short" }, "fr")
  }
}