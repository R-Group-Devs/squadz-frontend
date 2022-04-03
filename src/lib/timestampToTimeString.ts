export function timestampToTimeString(timestamp?: number): string | undefined {
  if (timestamp === undefined) return
  const years = Math.floor(timestamp / (60 * 60 * 24 * 365))
  if (years > 0) timestamp -= years * 60 * 60 * 24 * 365
  const days = Math.floor(timestamp / (60 * 60 * 24))
  if (days > 0) timestamp -= days * 60 * 60 * 24
  const hours = Math.floor(timestamp / (60 * 60))
  if (hours > 0) timestamp -= hours * 60 * 60
  const minutes = Math.floor(timestamp / 60)
  if (minutes > 0) timestamp -= minutes * 60
  let resA: string[] = []
  if (years > 0) years === 1 ? resA.push(`1 year`) : resA.push(`${years} years`)
  if (days > 0) days === 1 ? resA.push(`1 day`) : resA.push(`${days} days`)
  if (hours > 0) hours === 1 ? resA.push(`1 hour`) : resA.push(`${hours} hours`)
  if (minutes > 0) minutes === 1 ? resA.push(`1 minute`) : resA.push(`${minutes} minutes`)
  if (years === 0 && days === 0 && hours === 0 && timestamp > 0)
    timestamp === 1 ? resA.push(`1 second`) : resA.push(`${timestamp} seconds`)
  if (resA.length === 0) return "0"
  return resA.join(', ')
}