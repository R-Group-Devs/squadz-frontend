import { useQuery } from 'react-query'

import useNetwork from "./useNetwork"
import membersOf from "../lib/membersOf"
import { NetworkName } from '../config'

export default (forkId?: string) => {
  const [network,] = useNetwork()

  return useQuery(
    ['membersOf', network, forkId],
    () => membersOf(network as NetworkName, forkId),
    { enabled: forkId !== undefined }
  )
}