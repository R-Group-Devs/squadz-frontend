import { ContractInterface, Contract } from '@ethersproject/contracts'
import { useContract, useSigner } from 'wagmi'

export default (contractAddress: string, abi: ContractInterface): Contract | string => {
  const [{ data: signer },] = useSigner()
  const contract: Contract = useContract({
    addressOrName: contractAddress,
    contractInterface: abi,
    signerOrProvider: signer
  })
  return contract
}