import { useQuery } from 'react-query'

import useNetwork from "./useNetwork"
import squadsOf from "../lib/squadsOf"
import { NetworkName } from '../config'

export default (memberAddress?: string) => {
  const [network,] = useNetwork()
  if (memberAddress !== undefined) memberAddress = memberAddress.toLowerCase()

  return useQuery(
    ['squadsOf', network, memberAddress],
    () => squadsOf(network as NetworkName, memberAddress),
    { enabled: memberAddress !== undefined }
  )
}

