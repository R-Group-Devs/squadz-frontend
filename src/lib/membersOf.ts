import { NetworkName } from '../config'
import { getGraphClient } from './graph'

export default async (network: NetworkName, forkId?: string) => {
  if (forkId === undefined) return undefined
  const client = getGraphClient(network)
  console.log('membersOf', await client.membersOf({
    forkId
  }))
  return await client.membersOf({
    forkId
  })
}