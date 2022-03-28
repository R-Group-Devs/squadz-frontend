import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'

import Button from '../components/Button'
import Connector from '../components/Connector'
import useContractWritable from '../hooks/useContractWritable'
import { NetworkName, networks } from '../config'
import useNetwork from '../hooks/useNetwork'
import ShellFactoryAbi from '../abis/ShellFactory.json'

const labelClass = "label has-text-green is-size-5"
const inputClass = "is-size-6"

export default () => {
  const [{ data },] = useAccount()
  const [name, setName] = useState<string>("")
  const [symbol, setSymbol] = useState<string>("")
  const [owner, setOwner] = useState<string>(data?.address || "")
  const [network,] = useNetwork()
  const factory = useContractWritable(networks[network as NetworkName].factoryAddress, ShellFactoryAbi)
  const width = 280

  useEffect(() => {
    if (owner === "" && data?.address !== undefined) setOwner(data.address)
  }, [data])

  const handleCreateCollection = () => {
    if (typeof factory === "string") {
      console.warn("Contract problem:", factory)
      return
    }
    factory.createCollection(
      name,
      symbol,
      "erc721-prototype",
      networks[network as NetworkName].engineAddress,
      owner
    )
      .then(console.log)
      .catch((e: Error) => {
        console.warn(e)
      })
  }

  return (
    <section className="section pt-3">
      <h3 className={`subtitle is-3 has-text-green`}>Create Squad</h3>
      <div className="block mb-5">
        <label className={labelClass}>Connection & Network</label>
        <Connector />
      </div>
      <div className="block pb-2">
        <div className="field mb-5">
          <label className={labelClass}>Name</label>
          <input
            className={inputClass}
            type="text"
            placeholder="alice's squad"
            onChange={(e) => { setName(e.target.value) }}
            style={{ width }}
          />
        </div>
        <div className="field mb-5">
          <label className={labelClass}>Symbol</label>
          <input
            className={inputClass}
            type="text"
            placeholder="ALICE"
            onChange={(e) => { setSymbol(e.target.value) }}
            style={{ width }}
          />
        </div>
        <div className="field">
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
      <div className="block">
        <Button
          text="Create"
          scale={2}
          widthPx={width}
          callback={handleCreateCollection}
        />
      </div>
    </section>
  )
}