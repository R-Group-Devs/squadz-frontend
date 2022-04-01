export function makeForkId(collectionAddress?: string, forkNumber?: number): string | undefined {
  if (collectionAddress === undefined || forkNumber === undefined) return
  return `${collectionAddress.toLowerCase()}-fork-${forkNumber}`
}