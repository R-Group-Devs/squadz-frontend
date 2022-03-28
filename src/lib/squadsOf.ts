import { NetworkName, networks } from '../config'
import { getGraphClient } from './graph'

export default async (network: NetworkName, memberAddress?: string) => {
  if (memberAddress === undefined) return undefined
  const client = getGraphClient(network)
  const memberForksQuery = await client.memberForks({ memberAddress })
  const memberForks: string[] = []
  memberForksQuery.nftowners.forEach(nftOwner => {
    if (nftOwner?.nft?.fork?.id !== undefined) memberForks.push(nftOwner.nft.fork.id)
  })
  if (memberForks.length === 0) memberForks.push("")
  return await client.squadsOf({
    engineAddress: networks[network].engineAddress.toLowerCase(),
    memberAddress,
    memberForks
  })
}