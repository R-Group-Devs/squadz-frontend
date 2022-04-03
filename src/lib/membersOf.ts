import { Contract } from '@ethersproject/contracts'

import { NetworkName } from '../config'
import { getGraphClient } from './graph'
import { onChainMemberInfoOf, MemberInfo } from '.'
import { MembersOfQuery } from './generated-graphql'

/*
 * Spec
 * This should return something like:
 * { admins: Member[], members: Member[] }, where
 * Member { power: number, active: boolean, expiry: number }
 */

export interface Member {
  address: string;
  info: MemberInfo;
}

export interface Members {
  admins: Member[];
  members: Member[];
  squad: MembersOfQuery;
}

export async function membersOf(
  network: NetworkName,
  squadz: Contract,
  forkId?: string
): Promise<Members | string> {
  if (forkId === undefined) return "undefined variable"
  const client = getGraphClient(network)
  const res = await client.membersOf({ forkId })

  const owners: string[] = []
  const members: Members = { admins: [], members: [], squad: res }
  const length = res.fork?.collection?.nftOwners?.length

  if (length !== undefined) {
    for (let i = 0; i < length; i++) {
      const nftOwner = res.fork?.collection?.nftOwners[i]
      if (nftOwner === undefined) continue

      const address = nftOwner.owner.address
      if (owners.includes(address)) continue

      owners.push(address)
      const info = await onChainMemberInfoOf(
        squadz,
        network,
        res.fork?.collection?.address,
        res.fork?.forkId,
        address
      )
      if (typeof info == "string") return info

      const member: Member = { address, info }
      info.active && info.admin ? members.admins.push(member) : members.members.push(member)
    }
  }
  return members
}