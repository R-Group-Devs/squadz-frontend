import { Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'

import LoadingIndicator from '../components/LoadingIndicator'
import useSquadsOf from '../hooks/useSquadsOf'
import { makeForkId, shortAddress, timeSinceTimestamp } from '../utils'

export default () => {
  const { address } = useParams()

  return (
    <section className="section pt-3">
      <Suspense fallback={<LoadingIndicator />}>
        <SquadLists address={address} />
      </Suspense>
    </section>
  )
}

function SquadLists({ address }: { address?: string }) {
  const { data: squads } = useSquadsOf(address)
  const usedForkIds: string[] = []

  return (
    <div>
      <h1 className={`title is-PicNic is-1 has-text-green`} style={{ fontSize: "6rem" }}>SQUADZ</h1>
      <h2 className="subtitle is-Karrik is-italic is-5 has-text-green">of {address}</h2>
      <div className="block">
        {squads?.ownedForks.map(f => {
          usedForkIds.push(f.id)
          return <SquadCard
            key={f.collection.address}
            collectionAddress={f.collection.address}
            forkId={f.id}
            collectionName={f.collection.name}
            role="Owner"
            nftCount={f.collection.nftCount}
            updatedAt={f.collection.lastActivityAtTimestamp}
          />
        })}
        {squads?.memberForks.map(f => {
          if (usedForkIds.includes(f.id)) return (<></>)
          const role = "Member"
          // TODO get data on lastTokenOf for these squads to check if admin
          return <SquadCard
            key={f.collection.address}
            collectionAddress={f.collection.address}
            forkId={f.id}
            collectionName={f.collection.name}
            role={role}
            nftCount={f.collection.nftCount}
            updatedAt={f.collection.lastActivityAtTimestamp}
          />
        })}
      </div>
    </div>
  )
}

interface SquadCardProps {
  collectionAddress: string;
  forkId: string;
  collectionName: string;
  role?: string;
  nftCount: number;
  updatedAt: number;
}

function SquadCard({ collectionAddress, forkId, collectionName, role, nftCount, updatedAt }: SquadCardProps) {
  return (
    <div className="block" key={collectionAddress}>
      <Link to={`/squad/${forkId}`}>
        <div className="is-Karrik is-size-4 has-text-pink">"{collectionName}"</div>
        {role !== undefined && <div className="is-size-5 is-italic has-text-pink">{role}</div>}
      </Link>
      <div className="block">
        <div>Collection: {shortAddress(collectionAddress)}</div>
        <div>Memberships: {nftCount}</div>
        <div>Last action: {timeSinceTimestamp(updatedAt)}</div>
      </div>
    </div>
  )
}