import { Suspense, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'

import LoadingIndicator from '../components/LoadingIndicator'
import useSquadsOf from '../hooks/useSquadsOf'
import { shortAddress, timestampToDate } from '../lib'

export default () => {
  const { address } = useParams()

  return (
    <section className="section pt-3">
      <Suspense fallback={<LoadingIndicator />}>
        <Squads address={address} />
      </Suspense>
    </section>
  )
}

function Squads({ address }: { address?: string }) {
  const [{ data: account },] = useAccount()
  const navigate = useNavigate()
  const { data: squads } = useSquadsOf(address)
  if (address === "undefined" && account?.address !== undefined) {
    console.log('inside')
    navigate({ pathname: `/squads/${account.address}` })
  }
  let areOwnedForks = false
  if (squads?.ownedForks?.length !== undefined) {
    if (squads.ownedForks.length > 0) areOwnedForks = true
  }
  let areMemberForks = false
  if (squads?.memberForks?.length !== undefined) {
    if (squads.memberForks.length > 0) areMemberForks = true
  }
  const usedForkIds: string[] = []

  useEffect(() => { }, [account])

  return (
    <div>
      <h1 className={`title is-PicNic is-1 has-text-green`}>SQUADZ</h1>
      <h2 className="subtitle is-Karrik is-italic is-5 has-text-green">of {address}</h2>
      <div className="block">
        {areOwnedForks || areMemberForks ?
          <>
            {squads?.ownedForks.map(f => {
              usedForkIds.push(f.id)
              return <SquadCard
                key={f.collection.address}
                collectionAddress={f.collection.address}
                forkId={f.forkId}
                collectionName={f.collection.name}
                role="Owner"
                nftCount={f.collection.nftCount}
                updatedAt={f.collection.lastActivityAtTimestamp}
              />
            })}
            {squads?.memberForks.map(f => {
              if (usedForkIds.includes(f.id)) return
              const role = "Member"
              // TODO get data on lastTokenOf for these squads to check if admin
              return <SquadCard
                key={f.collection.address}
                collectionAddress={f.collection.address}
                forkId={f.forkId}
                collectionName={f.collection.name}
                role={role}
                nftCount={f.collection.nftCount}
                updatedAt={f.collection.lastActivityAtTimestamp}
              />
            })}
          </>
          :
          <div className="block">
            <h2 className="subtitle is-Karrik is-italic is-5 has-text-pink">(Ain't none)</h2>
          </div>
        }
      </div>
    </div>
  )
}

interface SquadCardProps {
  collectionAddress: string;
  forkId: number;
  collectionName: string;
  role?: string;
  nftCount: number;
  updatedAt: number;
}

function SquadCard({ collectionAddress, forkId, collectionName, role, nftCount, updatedAt }: SquadCardProps) {
  return (
    <div className="block rounded-border pink-border max-width" key={collectionAddress}>
      <Link to={`/squad/${collectionAddress}/${forkId}`}>
        <div className="is-Karrik is-size-4 has-text-pink">{collectionName}</div>
        {role !== undefined && <div className="is-size-5 is-italic has-text-pink">{role}</div>}
        <div className="block has-text-black">
          <div>Collection: {shortAddress(collectionAddress)}</div>
          <div>Memberships: {nftCount}</div>
          <div>Last action: {timestampToDate(updatedAt)}</div>
        </div>
      </Link>
    </div>
  )
}