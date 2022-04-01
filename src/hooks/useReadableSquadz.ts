import { useContract } from 'wagmi'
import { JsonRpcProvider } from '@ethersproject/providers'

import useNetwork from './useNetwork'
import { NetworkName, networks } from '../config'
import env from '../env'
import SquadzEngineAbi from '../abis/SquadzEngine.json'

export default () => {
  const [network,] = useNetwork()
  const provider = new JsonRpcProvider(env.providers[networks[network as NetworkName].id as 80001])
  return useContract({
    addressOrName: networks[network as NetworkName].engineAddress,
    contractInterface: SquadzEngineAbi,
    signerOrProvider: provider
  })
}