import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { TransactionResponse } from "@ethersproject/providers"

import Button from '../components/Button'
import Connector from '../components/Connector'
import useNotifications from '../hooks/useNotifications'
import useContractWritable from '../hooks/useContractWritable'
import { shortString, resolveTx } from "../lib"
import { NetworkName, networks } from '../config'
import useNetwork from '../hooks/useNetwork'
import ShellFactoryAbi from '../abis/ShellFactory.json'

const labelClass = "label has-text-green is-size-5"
const fieldStyle = { width: "70%", marginLeft: "15%", marginRight: "15%" }
const inputClass = "is-size-6"

export default () => {
  const [{ data },] = useAccount()
  const [name, setName] = useState<string>("")
  const [symbol, setSymbol] = useState<string>("")
  const [owner, setOwner] = useState<string>(data?.address || "")
  const [network,] = useNetwork()
  const { addNotification } = useNotifications()
  const navigate = useNavigate()
  const factory = useContractWritable(networks[network as NetworkName].factoryAddress, ShellFactoryAbi)
  const width = "100%"

  useEffect(() => {
    if (owner === "" && data?.address !== undefined) setOwner(data.address)
  }, [data])

  const handleCreateCollection = () => {
    if (typeof factory === "string") {
      addNotification(
        "errors",
        <span>{`ERROR: ${factory}`}</span>,
        factory + "create form"
      )
      return
    }
    factory.createCollection(
      name,
      symbol,
      "erc721-prototype",
      networks[network as NetworkName].engineAddress,
      owner
    )
      .then((res: TransactionResponse) => {
        resolveTx(addNotification, res, network as NetworkName, () => navigate({ pathname: `/squads/${owner}` }))
      })
      .catch((e: Error) => addNotification(
        "errors",
        <span>{`ERROR: ${shortString(e.message, 6)}`}</span>,
        e.message + "create form"
      ))
  }

  return (
    <section className="section pt-3">
      <div className="container rounded-border green-border" style={{ maxWidth: 680 }}>
        <h3 className={`subtitle is-3 has-text-green has-text-centered mt-4`}>Create Squad</h3>
        <div className="block pb-2">
          <div className="field mb-5" style={fieldStyle}>
            <label className={labelClass} style={{ width: "100%" }}>Connection & Network</label>
            <Connector />
          </div>
          <div className="field mb-5" style={fieldStyle}>
            <label className={labelClass}>Name</label>
            <input
              className={inputClass}
              type="text"
              placeholder="alice's squad"
              onChange={(e) => { setName(e.target.value) }}
              style={{ width }}
            />
          </div>
          <div className="field mb-5" style={fieldStyle}>
            <label className={labelClass}>Symbol</label>
            <input
              className={inputClass}
              type="text"
              placeholder="ALICE"
              onChange={(e) => { setSymbol(e.target.value) }}
              style={{ width }}
            />
          </div>
          <div className="field" style={fieldStyle}>
            <label className={labelClass}>Owner</label>
            <input
              className={inputClass}
              type="text"
              placeholder={owner === "" ? "0x12345..." : owner}
              onChange={(e) => { setOwner(e.target.value) }}
              style={{ width }}
            />
          </div>
        </div>
        <div className="block pt-2 mb-5" style={fieldStyle}>
          <Button
            text="Create"
            scale={2}
            callback={handleCreateCollection}
          />
        </div>
      </div>
    </section>
  )
}