import { useEffect, useState } from "react"
import { TransactionResponse } from "@ethersproject/providers"

import useNetwork from "../hooks/useNetwork"
import useNotifications from "../hooks/useNotifications"
import { shortString, secondsToTime, resolveTx } from "../lib"
import useContractWritable from '../hooks/useContractWritable'
import { networks, NetworkName } from "../config"
import SquadzEngineAbi from "../abis/SquadzEngine.json"

interface MintFormProps {
  collectionAddress: string | undefined;
  forkNumber: number | undefined;
  owner: boolean;
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
  owner,
  admin,
  adminUser,
  cooldown,
  latestMintTime
}: MintFormProps) => {
  const [address, setAddress] = useState<string>()
  const [network,] = useNetwork()
  const engine = useContractWritable(networks[network as NetworkName].engineAddress, SquadzEngineAbi)
  const [cooldownLeft, setCooldownLeft] = useState<number>(0)
  const { addNotification } = useNotifications()
  const [rerender, setRerender] = useState<number>(0)

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
      addNotification(
        "errors",
        <span>{`ERROR: ${engine}`}</span>,
        engine + "mint form"
      )
      return
    }
    engine.mint(
      collectionAddress,
      forkNumber,
      address,
      admin
    )
      .then((res: TransactionResponse) =>
        resolveTx(addNotification, res, network as NetworkName), () => setRerender(rerender + 1))
      .catch((e: Error) => addNotification(
        "errors",
        <span>{`ERROR: ${shortString(e.message, 6)}`}</span>,
        e.message + "mint form"
      ))
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
      {(!owner && adminUser !== undefined && adminUser && cooldownLeft > 0) ?
        <div className="level-item">
          <a className="circle-button button-text disabled has-text-weight-bold">&#65291;</a>
          <div className="is-size-7 has-text-grey pl-1">({secondsToTime(cooldownLeft)})</div>
        </div>
        :
        <div className="level-item">
          <a className="circle-button button-text has-text-weight-bold" onClick={handleMint}>&#65291;</a>
        </div>
      }
    </div>
  )
}