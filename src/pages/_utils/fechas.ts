import { TimeRangePickerProps } from "antd"
import dayjs from "dayjs"

export function formatDateTimeToUTC(utcDate: Date) {
  return `${utcDate.getUTCFullYear()}-${String(
    utcDate.getUTCMonth() + 1
  ).padStart(2, "0")}-${String(utcDate.getUTCDate()).padStart(2, "0")} ${String(
    utcDate.getUTCHours()
  ).padStart(2, "0")}:${String(utcDate.getUTCMinutes()).padStart(
    2,
    "0"
  )}:${String(utcDate.getUTCSeconds()).padStart(2, "0")}`
}

export function startAndEndOfDays(dates: string[]) {
  const localDateStart = new Date(`${dates[0]}T00:00:00`)
  const localDateEnd = new Date(`${dates[1]}T23:59:59`)

  return [
    formatDateTimeToUTC(localDateStart),
    formatDateTimeToUTC(localDateEnd),
  ]
}

export const presetsRangePicker: TimeRangePickerProps["presets"] = [
  {
    label: "Última semana",
    value: [dayjs().add(-7, "d"), dayjs()],
  },
  {
    label: "Esta semana",
    value: [dayjs().startOf("week"), dayjs()],
  },
  {
    label: "Último mes",
    value: [dayjs().add(-1, "month"), dayjs()],
  },
  {
    label: "Este mes",
    value: [dayjs().startOf("month"), dayjs()],
  },
  {
    label: "Último año",
    value: [dayjs().add(-1, "year"), dayjs()],
  },
  {
    label: "Este año",
    value: [dayjs().startOf("year"), dayjs()],
  },
]
