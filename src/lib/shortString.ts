export function shortString(s: string, words: number): string {
  return s.split(" ").slice(0, words).join(" ")
}