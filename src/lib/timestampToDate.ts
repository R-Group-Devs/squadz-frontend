const months = [
  "Jan",
  "Feb",
  "March",
  "Apil",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]

export function timestampToDate(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}