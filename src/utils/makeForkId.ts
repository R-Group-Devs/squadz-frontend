export function makeForkId(collectionAddress: string, forkNumber: number): string {
  return `${collectionAddress.toLowerCase()}-fork-${forkNumber}`
}