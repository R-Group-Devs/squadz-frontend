import { ContractInterface, Contract } from '@ethersproject/contracts'
import { useContract, useSigner } from 'wagmi'

export default (contractAddress: string, abi: ContractInterface): Contract | string => {
  const [{ data: signer },] = useSigner()
  return useContract({
    addressOrName: contractAddress,
    contractInterface: abi,
    signerOrProvider: signer
  })
}