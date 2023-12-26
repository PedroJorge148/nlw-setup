import dayjs from "dayjs";

export function generateRangeDatesFromYearStart() {
  const startedDate = dayjs().startOf('year')
  const endDate = new Date()

  let dateRange = []
  let compareDate = startedDate

  while (compareDate.isBefore(endDate)) {
    dateRange.push(compareDate.toDate())
    compareDate = compareDate.add(1, 'day')
  }

  return dateRange
}