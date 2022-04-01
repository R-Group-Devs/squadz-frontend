export function shortAddress(address?: string): string {
  if (address === undefined) return ""
  return address.slice(0, 6) + "..." + address.slice(address.length - 7, address.length - 1)
}