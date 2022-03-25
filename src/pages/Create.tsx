import { useState } from 'react'
import { useAccount } from 'wagmi'

import Button from '../components/Button'
import Connector from '../components/Connector'
import useContractWritable from '../hooks/useContractWritable'
import { NetworkName, contractAddresses } from '../config'
import useNetwork from '../hooks/useNetwork'
import ShellFactoryAbi from '../abis/ShellFactory.json'

export default () => {
  const [{ data },] = useAccount()
  const [name, setName] = useState<string>("")
  const [symbol, setSymbol] = useState<string>("")
  const [owner, setOwner] = useState<string>(data?.address || "")
  const [network,] = useNetwork()
  const factory = useContractWritable(contractAddresses.ShellFactory[network as NetworkName], ShellFactoryAbi)
  const width = 280

  const handleCreateCollection = () => {
    if (typeof factory === "string") {
      console.warn("Contract problem", factory)
      return
    }
    factory.createCollection(
      name,
      symbol,
      "erc721-prototype",
      contractAddresses.SquadzEngine[network as NetworkName],
      owner
    )
      .then(console.log)
      .catch((e: Error) => {
        console.warn(e)
      })
  }

  return (
    <div className="section pt-3">
      <h3 className={`subtitle is-3 has-text-green`}>Create Squad</h3>
      <div className="block mb-5">
        <Connector />
      </div>
      <div className="block">
        <div className="field mb-5">
          <label className="label has-text-green is-size-5">Name</label>
          <input
            className="is-size-5"
            type="text"
            placeholder="alice's squad"
            onChange={(e) => { setName(e.target.value) }}
            style={{ width }}
          />
        </div>
        <div className="field mb-5">
          <label className="label has-text-green is-size-5">Symbol</label>
          <input
            className="is-size-5"
            type="text"
            placeholder="ALICE"
            onChange={(e) => { setSymbol(e.target.value) }}
            style={{ width }}
          />
        </div>
        <div className="field mb-5">
          <label className="label has-text-green is-size-5">Owner</label>
          <input
            className="is-size-5"
            type="text"
            placeholder={owner === "" ? "0x12345..." : owner}
            onChange={(e) => { setOwner(e.target.value) }}
            style={{ width }}
          />
        </div>
        <Button
          text="Create"
          scale={2}
          widthPx={width}
          callback={handleCreateCollection}
        />
      </div>
    </div>
  )
}