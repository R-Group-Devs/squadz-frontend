import { useQuery } from 'react-query'

import useNetwork from "./useNetwork"
import useReadableSquadz from "../hooks/useReadableSquadz"
import { membersOf } from "../lib"
import { NetworkName } from '../config'

export default (forkId?: string) => {
  const [network,] = useNetwork()
  const squadz = useReadableSquadz()

  return useQuery(
    ['membersOf', network, forkId],
    () => membersOf(network as NetworkName, squadz, forkId),
    { enabled: forkId !== undefined }
  )
}