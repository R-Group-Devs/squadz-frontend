import { useQuery } from 'react-query'
import { Contract } from '@ethersproject/contracts'

import useReadableSquadz from './useReadableSquadz'

export default (collectionAddress?: string, forkNumber?: number) => {
  const squadz = useReadableSquadz()
  return useQuery(
    ['squadConfigOf', collectionAddress, forkNumber],
    () => squadConfigOf(squadz, collectionAddress, forkNumber),
    {
      enabled: collectionAddress !== undefined &&
        forkNumber !== undefined
    }
  )
}

export interface SquadConfig {
  expiry: number;
  cooldown: number;
  bonus: number;
  max: number;
  svgAddress: string;
}

async function squadConfigOf(
  squadz: Contract,
  collectionAddress?: string,
  forkNumber?: number
): Promise<SquadConfig | undefined> {
  if (collectionAddress === undefined || forkNumber === undefined) return
  const res = await squadz.getCollectionConfig(collectionAddress, forkNumber)
  return {
    expiry: res.expiry.toNumber(),
    cooldown: res.cooldown.toNumber(),
    bonus: res.bonus.toNumber(),
    max: res.max.toNumber(),
    svgAddress: res.svgAddress
  }
}