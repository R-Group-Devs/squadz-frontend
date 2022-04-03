import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'

import { handleError } from '.'
import { networks, NetworkName } from '../config'
import env from '../env'
import ShellERC721Abi from '../abis/ShellERC721.json'

interface RawMemberInfo {
  latestTokenId: BigNumber;
  forkBalance: BigNumber;
  latestTokenTime: BigNumber;
  active: boolean;
  admin: boolean;
  power: BigNumber;
  latestMintTime: BigNumber;
}

export interface MemberInfo {
  active: boolean;
  admin: boolean;
  power: number;
  totalMemberships: number;
  latestTokenTime: number;
  uri: string;
  latestMintTime: number;
}

export async function onChainMemberInfoOf(
  squadzEngine: Contract,
  network: NetworkName,
  collectionAddress?: string,
  fork?: number,
  memberAddress?: string
): Promise<MemberInfo | undefined> {
  if (
    collectionAddress === undefined ||
    fork === undefined ||
    memberAddress === undefined
  ) return
  try {
    const rawMemberInfo: RawMemberInfo = await squadzEngine.getMemberInfo(collectionAddress, fork, memberAddress)

    const provider = new JsonRpcProvider(env.providers[networks[network as NetworkName].id as 80001])
    const collection = new Contract(collectionAddress, ShellERC721Abi, provider)
    let uri = ""
    if (!rawMemberInfo.latestTokenId.eq(0)) uri = await collection.tokenURI(rawMemberInfo.latestTokenId)

    return {
      active: rawMemberInfo.active,
      admin: rawMemberInfo.admin,
      totalMemberships: rawMemberInfo.forkBalance.toNumber(),
      power: rawMemberInfo.power.toNumber(),
      latestTokenTime: rawMemberInfo.latestTokenTime.toNumber(),
      uri,
      latestMintTime: rawMemberInfo.latestMintTime.toNumber()
    }
  } catch (e) {
    handleError(e)
  }
}