import ShortAddress from "../components/ShortAddress"
import { Member, timestampToDate } from "../lib"
import SquadShield from "./SquadShield"

export default ({ members, user, collectionExpiry }: { members: Member[], user?: string, collectionExpiry: number }) => {
  function extractImageUri(tokenUri: string) {
    const [, jsonBase64] = tokenUri.split(",");
    const json = Buffer.from(jsonBase64, "base64").toString();
    return JSON.parse(json).image
  }

  // Note: this probably allows inserting arbitrary code... how do NFT exchanges deal with this?
  return (
    <div className="row">
      {members.map(m => {
        const expiry = timestampToDate(m.info.latestTokenTime + collectionExpiry)

        return (
          <div key={m.address} className="p-3 has-text-centered">
            {false && <div style={{ width: 225 }}>
              <SquadShield member={m.address} collection={m.address} tokenId={m.info.latestTokenId} />
            </div>}
            <img src={extractImageUri(m.info.uri)} alt="uri" style={{ width: 170 }} />
            <div><ShortAddress address={m.address} userAddress={user} /></div>
            <div>{m.info.power} power</div>
            {m.info.active && <div className="has-text-grey is-size-7">expires {expiry}</div>}
          </div>
        )
      })}
    </div>
  )
}