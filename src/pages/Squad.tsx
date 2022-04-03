import { Suspense } from "react"
import { useParams } from "react-router-dom"
import { useAccount } from "wagmi"

import LoadingIndicator from "../components/LoadingIndicator"
import Expander from "../components/Expander"
import SquadConfigBox from "../components/SquadConfigBox"
import MintForm from "../components/MintForm"
import MemberCards from "../components/MemberCards"
import useNotifications from "../hooks/useNotifications"
import useMembersOf from "../hooks/useMembersOf"
import useMemberInfoOf from "../hooks/useMemberInfoOf"
import { makeForkId, shortString } from "../lib"
import useSquadConfigOf from "../hooks/useSquadConfigOf"

export default () => {
  const { collectionAddress, forkNumber } = useParams()
  let forkNumberInt: number | undefined
  if (forkNumber !== undefined) forkNumberInt = parseInt(forkNumber)

  return (
    <section className="section pt-3">
      <Suspense fallback={<LoadingIndicator />}>
        <Squad collectionAddress={collectionAddress} forkNumber={forkNumberInt} />
      </Suspense>
    </section>
  )
}

interface SquadProps {
  collectionAddress?: string;
  forkNumber?: number;
}

function Squad({ collectionAddress, forkNumber }: SquadProps) {
  const { data: squadConfig } = useSquadConfigOf(collectionAddress, forkNumber)
  const { data: members } = useMembersOf(makeForkId(collectionAddress, forkNumber))
  const [{ data: account },] = useAccount()
  const { data: memberInfo } = useMemberInfoOf(collectionAddress, forkNumber, account?.address)
  const { addNotification } = useNotifications()

  if (typeof (members) === "string") addNotification(
    "errors",
    <span>{`ERROR: ${shortString(members, 6)}`}</span>,
    "squad members"
  )

  if (typeof (memberInfo) === "string") addNotification(
    "errors",
    <span>{`ERROR: ${shortString(memberInfo, 6)}`}</span>,
    "squad member info"
  )

  if (typeof (members) === "string" || typeof (memberInfo) === "string")
    return (
      <section className="section pt-3 has-text-centered">
        <div className="hero">
          <div className="hero-body">
            <h1 className="is-PicNic is-1 has-text-pink">Error</h1>
          </div>
        </div>
      </section>
    )

  const isOwner = members?.squad.fork?.owner.address.toLowerCase() === account?.address.toLowerCase()
  const isActiveAdmin = memberInfo?.active && memberInfo?.admin

  return (
    <div>
      <h3 className={`title is-3 has-text-green`}>{members?.squad.fork?.collection.name}</h3>
      {collectionAddress !== undefined &&
        <h4 className="subtitle is-Karrik is-italic is-6 has-text-green">{collectionAddress}</h4>
      }
      <div className="block rounded-border green-border max-width">
        <Expander element={<span className={`subtitle is-5 has-text-green`}>Settings</span>} color="green">
          <SquadConfigBox owner={members?.squad.fork?.owner.address} squadConfig={squadConfig} user={account?.address} />
        </Expander>
      </div>
      <div className="block rounded-border pink-border">
        <div className="level mb-0">
          <div className="level-left">
            <div className="level-item">
              <h3 className={`subtitle is-4 has-text-pink`}>Admins</h3>
            </div>
          </div>
          {isOwner &&
            <MintForm
              collectionAddress={members?.squad.fork?.collection.address}
              forkNumber={members?.squad.fork?.forkId}
              owner={isOwner}
              admin={true}
              adminUser={isActiveAdmin}
            />
          }
        </div>
        {members?.admins !== undefined && members.admins.length > 0 &&
          <MemberCards
            members={members.admins}
            user={account?.address}
            collectionExpiry={squadConfig?.expiry ?? 0}
          />
        }
      </div>
      <div className="block rounded-border pink-border">
        <div className="level mb-0">
          <div className="level-left">
            <div className="level-item">
              <h3 className={`subtitle is-4 has-text-pink`}>Members</h3>
            </div>
          </div>
          {(isOwner || isActiveAdmin) &&
            <MintForm
              collectionAddress={members?.squad.fork?.collection.address}
              forkNumber={members?.squad.fork?.forkId}
              owner={isOwner}
              admin={false}
              adminUser={isActiveAdmin}
              cooldown={squadConfig?.cooldown}
              latestMintTime={memberInfo?.latestMintTime}
            />
          }
        </div>
        {members?.members !== undefined && members.members.length > 0 &&
          <MemberCards
            members={members.members}
            user={account?.address}
            collectionExpiry={squadConfig?.expiry ?? 0}
          />
        }
      </div>
    </div>
  )
}