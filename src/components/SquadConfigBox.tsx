import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Button from "../components/Button"
import ShortAddress from "../components/ShortAddress"
import useNetwork from '../hooks/useNetwork'
import useContractWritable from "../hooks/useContractWritable"
import { networks, NetworkName } from "../config"
import { shortAddress, timestampToTimeString, handleError } from "../lib"
import { SquadConfig } from "../hooks/useSquadConfigOf"
import ShellERC721Abi from "../abis/ShellERC721.json"
import SquadzEngineAbi from "../abis/SquadzEngine.json"

interface SquadConfigBoxProps {
  owner?: string;
  user?: string;
  squadConfig?: SquadConfig;
}

export default ({ owner, squadConfig, user }: SquadConfigBoxProps) => {
  const [editing, setEditing] = useState<boolean>(false)

  return (
    <>
      {editing ?
        <EditConfigForm owner={owner} squadConfig={squadConfig} user={user} setEditing={setEditing} />
        :
        <SquadConfigView owner={owner} squadConfig={squadConfig} user={user} setEditing={setEditing} />
      }
    </>
  )
}

interface SquadConfigSubProps extends SquadConfigBoxProps {
  setEditing: (editing: boolean) => void;
}

function SquadConfigView({ owner, squadConfig, user, setEditing }: SquadConfigSubProps) {
  console.log(owner, user)
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
              <span className="rounded-border">{shortAddress(squadConfig?.svgAddress)}</span>
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

function EditConfigForm({ owner, squadConfig, user, setEditing }: SquadConfigSubProps) {
  const [formOwner, setFormOwner] = useState<string>(owner ?? "")
  const [formExpiry, setFormExpiry] = useState<number>(squadConfig?.expiry ?? 0)
  const [formCooldown, setFormCooldown] = useState<number>(squadConfig?.cooldown ?? 0)
  const [formBonus, setFormBonus] = useState<number>(squadConfig?.bonus ?? 0)
  const [formMax, setFormMax] = useState<number>(squadConfig?.max ?? 0)
  const [formSvg, setFormSvg] = useState<string>(squadConfig?.svgAddress ?? "")
  const [newOwner, setNewOwner] = useState<boolean>(false)
  const [newConfig, setNewConfig] = useState<boolean>(false)

  const [network,] = useNetwork()
  const engine = useContractWritable(networks[network as NetworkName].engineAddress, SquadzEngineAbi)
  const { collectionAddress, forkNumber } = useParams()
  const collection = useContractWritable(collectionAddress ?? "", ShellERC721Abi)

  useEffect(() => {
    if (formOwner !== owner) {
      setNewOwner(true)
    } else {
      setNewOwner(false)
    }
  }, [formOwner])

  useEffect(() => {
    if (
      formExpiry !== squadConfig?.expiry ||
      formCooldown !== squadConfig?.cooldown ||
      formBonus !== squadConfig?.bonus ||
      formMax !== squadConfig?.max ||
      formSvg !== squadConfig?.svgAddress
    ) {
      setNewConfig(true)
    } else {
      setNewConfig(false)
    }
  }, [formExpiry, formCooldown, formBonus, formMax, formSvg])

  const handleSave = () => {
    if (
      collectionAddress !== undefined &&
      forkNumber !== undefined &&
      formOwner !== owner
    ) {
      if (typeof collection === "string") {
        handleError(collection)
        return
      }
      collection.setForkOwner(forkNumber, formOwner)
        .then(console.log)
        .catch((e: Error) => {
          handleError(e)
        })
    }
    if (
      collectionAddress !== undefined &&
      forkNumber !== undefined &&
      (
        formExpiry !== squadConfig?.expiry ||
        formCooldown !== squadConfig?.cooldown ||
        formBonus !== squadConfig?.bonus ||
        formMax !== squadConfig?.max ||
        formSvg !== squadConfig?.svgAddress
      )
    ) {
      if (typeof engine === "string") {
        handleError(engine)
        return
      }
      engine.setCollectionConfig(
        collectionAddress,
        parseInt(forkNumber),
        formExpiry,
        formCooldown,
        formBonus,
        formMax,
        formSvg
      )
        .then(console.log)
        .catch((e: Error) => {
          handleError(e)
        })
    }
  }

  return (
    <>
      <div className="block">
        <div className="level mb-3">
          <div className="level-left">
            <span className="level-item mr-1">{`Squad owner: `}</span>
            <span className="level-item">
              <input
                className="rounded-border"
                type="text"
                placeholder={formOwner ?? ""}
                style={{ width: 280 }}
                onChange={(e) => setFormOwner(e.target.value)}
              />
            </span>
          </div>
        </div>
        <div className="level mb-3">
          <div className="level-left">
            <span className="level-item mr-1">{`Memberships stay active for `}</span>
            <span className="level-item">
              <input
                className="rounded-border mr-1"
                type="text"
                placeholder={`${isNaN(formExpiry) ? "" : formExpiry}`}
                style={{ width: 100 }}
                onChange={(e) => setFormExpiry(parseInt(e.target.value))}
              /> seconds
            </span>
          </div>
        </div>
        <div className="level mb-3">
          <div className="level-left">
            <span className="level-item mr-1">{`Admins can mint every `}</span>
            <span className="level-item">
              <input
                className="rounded-border mr-1"
                type="text"
                placeholder={`${isNaN(formCooldown) ? "" : formCooldown}`}
                style={{ width: 100 }}
                onChange={(e) => setFormCooldown(parseInt(e.target.value))}
              /> seconds
            </span>
          </div>
        </div>
        <div className="level mb-3">
          <div className="level-left">
            <span className="level-item mr-1">{`Active members get `}</span>
            <span className="level-item">
              <input
                className="rounded-border mr-1"
                type="text"
                placeholder={`${isNaN(formBonus) ? "" : formBonus}`}
                style={{ width: 60 }}
                onChange={(e) => setFormBonus(parseInt(e.target.value))}
              /> bonus power
            </span>
          </div>
        </div>
        <div className="level mb-3">
          <div className="level-left">
            <span className="level-item mr-1">{`Members can hold `}</span>
            <span className="level-item">
              <input
                className="rounded-border mr-1"
                type="text"
                placeholder={`${isNaN(formMax) ? "" : formMax}`}
                style={{ width: 60 }}
                onChange={(e) => setFormMax(parseInt(e.target.value))}
              /> memberships max
            </span>
          </div>
        </div>
        <div className="level">
          <div className="level-left">
            <span className="level-item mr-1">{`Image generator: `}</span>
            <span className="level-item">
              <input
                className="rounded-border"
                type="text"
                placeholder={formSvg ?? ""}
                style={{ width: 280 }}
                onChange={(e) => setFormSvg(e.target.value)}
              />
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
          <div className="level-item">
            <Button
              text="Cancel"
              scale={1}
              widthPx={140}
              green
              callback={() => setEditing(false)}
            />
          </div>
          <div className="level-item">
            <Button
              text="Save"
              scale={1}
              widthPx={140}
              callback={handleSave}
            />
            {(newOwner || newConfig) &&
              <div className="is-size-7 has-text-black mt-6" style={{ position: "absolute" }}>
                {`(${(newOwner && newConfig) ? 2 : 1} tx)`}
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}