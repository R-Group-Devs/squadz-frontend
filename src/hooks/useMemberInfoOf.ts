import { useQuery } from 'react-query'

import useNetwork from './useNetwork'
import { NetworkName } from '../config'
import useReadableSquadz from './useReadableSquadz'
import { onChainMemberInfoOf } from "../lib"

export default (collectionAddress?: string, fork?: number, memberAddress?: string) => {
  const [network,] = useNetwork()
  const squadz = useReadableSquadz()

  return useQuery(
    ['memberInfoOf', collectionAddress, fork, memberAddress],
    () => onChainMemberInfoOf(squadz, network as NetworkName, collectionAddress, fork, memberAddress),
    {
      enabled: collectionAddress !== undefined &&
        fork !== undefined &&
        memberAddress !== undefined
    }
  )
}