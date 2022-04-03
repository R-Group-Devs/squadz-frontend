import { useEffect, useState } from "react"

import useNetwork from "../hooks/useNetwork"
import { handleError, timestampToNumbers } from "../lib"
import useContractWritable from '../hooks/useContractWritable'
import { networks, NetworkName } from "../config"
import SquadzEngineAbi from "../abis/SquadzEngine.json"

interface MintFormProps {
  collectionAddress: string | undefined;
  forkNumber: number | undefined;
  admin: boolean;
  adminUser?: boolean;
  cooldown?: number;
  latestMintTime?: number;
}

function getTimeLeft(to: number): number {
  let newTimeLeft = to - Math.floor(Date.now() / 1000)
  if (newTimeLeft < 0) return 0
  return newTimeLeft
}

export default ({
  collectionAddress,
  forkNumber,
  admin,
  adminUser,
  cooldown,
  latestMintTime
}: MintFormProps) => {
  const [address, setAddress] = useState<string>()
  const [network,] = useNetwork()
  const engine = useContractWritable(networks[network as NetworkName].engineAddress, SquadzEngineAbi)
  const [cooldownLeft, setCooldownLeft] = useState<number>(0)

  useEffect(() => {
    if (cooldown !== undefined && latestMintTime !== undefined) {
      const timeLeft = getTimeLeft(latestMintTime + cooldown)
      if (timeLeft === 0) return
      setCooldownLeft(timeLeft)
      const interval = setInterval(() => {
        const timeLeft = getTimeLeft(latestMintTime + cooldown)
        setCooldownLeft(timeLeft)
        if (timeLeft === 0) clearInterval(interval)
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [])

  const handleMint = () => {
    if (typeof engine === "string") {
      handleError(engine)
      return
    }
    engine.mint(
      collectionAddress,
      forkNumber,
      address,
      admin
    )
      .then(console.log)
      .catch((e: Error) => {
        handleError(e)
      })
  }

  return (
    <div className="level-right">
      <div className="level-item p-2">
        <input
          type="text"
          placeholder={"address to mint to"}
          style={{ width: 256, height: 25 }}
          onChange={(e) => { setAddress(e.currentTarget.value) }}
        />
      </div>
      {(adminUser !== undefined && adminUser && cooldownLeft > 0) ?
        <div className="level-item">
          <a className="circle-button disabled has-text-weight-bold">&#65291;</a>
          <div className="is-size-7 has-text-grey pl-1">({timestampToNumbers(cooldownLeft)})</div>
        </div>
        :
        <div className="level-item">
          <a className="circle-button has-text-weight-bold" onClick={handleMint}>&#65291;</a>
        </div>
      }
    </div>
  )
}