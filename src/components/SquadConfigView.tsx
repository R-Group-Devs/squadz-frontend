import { SquadConfigBoxProps } from './SquadConfigBox'
import Button from "../components/Button"
import ShortAddress from "../components/ShortAddress"
import { shortAddress, timestampToTimeString } from "../lib"

export interface SquadConfigSubProps extends SquadConfigBoxProps {
  setEditing: (editing: boolean) => void;
}

export default ({ owner, squadConfig, user, setEditing }: SquadConfigSubProps) => {
  return (
    <>
      <div className="block">
        <div className="level mb-3">
          <div className="level-left">
            <span className="level-item mr-1">{`Squad owner: `}</span>
            <span className="level-item">
              <span className="rounded-border"><ShortAddress address={owner} userAddress={user} /></span>
            </span>
          </div>
        </div>
        <div className="level mb-3">
          <div className="level-left">
            <span className="level-item mr-1">{`Memberships stay active for `}</span>
            <span className="level-item">
              <span className="rounded-border">{timestampToTimeString(squadConfig?.expiry)}</span>
            </span>
          </div>
        </div>
        <div className="level mb-3">
          <div className="level-left">
            <span className="level-item mr-1">{`Admins can mint every `}</span>
            <span className="level-item">
              <span className="rounded-border">{timestampToTimeString(squadConfig?.cooldown)}</span>
            </span>
          </div>
        </div>
        <div className="level mb-3">
          <div className="level-left">
            <span className="level-item mr-1">{`Active members get `}</span>
            <span className="level-item">
              <span className="rounded-border mr-1">{squadConfig?.bonus}</span> bonus power
            </span>
          </div>
        </div>
        <div className="level mb-3">
          <div className="level-left">
            <span className="level-item mr-1">{`Members can hold `}</span>
            <span className="level-item">
              <span className="rounded-border mr-1">{squadConfig?.max}</span> memberships max
            </span>
          </div>
        </div>
        <div className="level">
          <div className="level-left">
            <span className="level-item mr-1">{`Image generator: `}</span>
            <span className="level-item">
              <span className="rounded-border"><ShortAddress address={squadConfig?.svgAddress} /></span>
            </span>
          </div>
        </div>
      </div>
      <div className="block has-text-grey is-size-7">
        Power = your total memberships (up to the max) + the bonus if you have an active membership
      </div>
      <div className="level">
        <div className="level-left" />
        <div className="level-right">
          {(owner !== undefined && owner.toLowerCase() === user?.toLowerCase()) &&
            <Button
              text="Edit"
              scale={1}
              widthPx={140}
              green
              callback={() => setEditing(true)}
            />
          }
        </div>
      </div>
    </>
  )
}