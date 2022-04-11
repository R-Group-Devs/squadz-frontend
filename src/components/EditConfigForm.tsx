import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TransactionResponse } from "@ethersproject/providers"
import { MaxUint256 } from '@ethersproject/constants'

import Button from "../components/Button"
import { SquadConfigSubProps } from './SquadConfigView'
import useNetwork from '../hooks/useNetwork'
import useContractWritable from "../hooks/useContractWritable"
import useNotifications from '../hooks/useNotifications'
import { shortString, resolveTx } from '../lib'
import { networks, NetworkName } from "../config"
import ShellERC721Abi from "../abis/ShellERC721.json"
import SquadzEngineAbi from "../abis/SquadzEngine.json"

export default ({ owner, squadConfig, user, setEditing }: SquadConfigSubProps) => {
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

  const { addNotification } = useNotifications()

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
        addNotification(
          "errors",
          <span>{`ERROR: ${collection}`}</span>,
          collection + "edit config"
        )
        return
      }
      collection.setForkOwner(forkNumber, formOwner)
        .then((res: TransactionResponse) => {
          resolveTx(addNotification, res, network as NetworkName, () => {
            setEditing(false)
            setFormOwner("") // force rerender
          })
        })
        .catch((e: Error) => addNotification(
          "errors",
          <span>{`ERROR: ${shortString(e.message, 6)}`}</span>,
          e.message + "edit config"
        ))
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
        addNotification(
          "errors",
          <span>{`ERROR: ${engine}`}</span>,
          engine + "edit config"
        )
        return
      }

      engine.setCollectionConfig(
        collectionAddress,
        parseInt(forkNumber),
        formExpiry,
        // setting these to MaxUint256 is treated as 0 by the contract, since setting to 0 doesn't work
        formCooldown === 0 ? MaxUint256 : formCooldown,
        formBonus === 0 ? MaxUint256 : formBonus,
        formMax === 0 ? MaxUint256 : formMax,
        formSvg
      )
        .then((res: TransactionResponse) => {
          resolveTx(addNotification, res, network as NetworkName, () => {
            setEditing(false)
            setFormOwner("") // force rerender
          })
        })
        .catch((e: Error) => addNotification(
          "errors",
          <span>{`ERROR: ${shortString(e.message, 6)}`}</span>,
          e.message + "edit config"
        ))
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
          <div className="level-item">
            <Button
              text="Cancel"
              scale={1}
              widthPx={140}
              green
              callback={() => setEditing(false)}
            />
          </div>
        </div>
      </div>
    </>
  )
}