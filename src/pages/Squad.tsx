import { Suspense } from "react"
import { useParams } from "react-router-dom"

import LoadingIndicator from "../components/LoadingIndicator"
import useMembersOf from "../hooks/useMembersOf"

export default () => {
  const { forkId } = useParams()

  return (
    <section className="section pt-3">
      <Suspense fallback={<LoadingIndicator />}>
        <MemberList forkId={forkId} />
      </Suspense>
    </section>
  )
}

function MemberList({ forkId }: { forkId?: string }) {
  const { data: members } = useMembersOf(forkId)

  return (
    <div>
      {members?.fork?.collection?.nftOwners?.length}
    </div>
  )
}