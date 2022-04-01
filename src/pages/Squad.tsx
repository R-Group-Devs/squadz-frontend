import { Suspense, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAccount } from "wagmi"
import { Buffer } from 'buffer'

import Button from "../components/Button"
import LoadingIndicator from "../components/LoadingIndicator"
import Expander from "../components/Expander"
import ShortAddress from "../components/ShortAddress"
import useNetwork from "../hooks/useNetwork"
import useMembersOf from "../hooks/useMembersOf"
import useMemberInfoOf from "../hooks/useMemberInfoOf"
import { makeForkId, shortAddress, timestampToTimeString, handleError, Member, timestampToDate, timestampToNumbers } from "../lib"
import useSquadConfigOf, { SquadConfig } from "../hooks/useSquadConfigOf"
import useContractWritable from '../hooks/useContractWritable'
import { networks, NetworkName } from "../config"
import SquadzEngineAbi from "../abis/SquadzEngine.json"

export default () => {
  const { collectionAddress, forkNumber } = useParams()
  let forkNumberInt: number | undefined
  if (forkNumber !== undefined) forkNumberInt = parseInt(forkNumber)

  return (
    <section className="section pt-3">
      <Suspense fallback={<LoadingIndicator />}>
        <Squad collectionAddress={collectionAddress} forkNumber={forkNumberInt} />
      </Suspense>
    </section>
  )
}

interface SquadProps {
  collectionAddress?: string;
  forkNumber?: number;
}

function Squad({ collectionAddress, forkNumber }: SquadProps) {
  const { data: squadConfig } = useSquadConfigOf(collectionAddress, forkNumber)
  const { data: members } = useMembersOf(makeForkId(collectionAddress, forkNumber))
  const [{ data: account },] = useAccount()
  const { data: memberInfo } = useMemberInfoOf(collectionAddress, forkNumber, account?.address)

  const isOwner = members?.squad.fork?.owner.address.toLowerCase() === account?.address.toLowerCase()
  const isActiveAdmin = memberInfo?.active && memberInfo?.admin

  return (
    <div>
      <h3 className={`title is-3 has-text-green`}>{members?.squad.fork?.collection.name}</h3>
      {collectionAddress !== undefined &&
        <h4 className="subtitle is-Karrik is-italic is-6 has-text-green">{collectionAddress}</h4>
      }
      <div className="block rounded-border green-border max-width">
        <Expander element={<span className={`subtitle is-5 has-text-green`}>Settings</span>} color="green">
          <SquadConfigBox owner={members?.squad.fork?.owner.address} squadConfig={squadConfig} user={account?.address} />
        </Expander>
      </div>
      <div className="block rounded-border pink-border">
        <div className="level mb-0">
          <div className="level-left">
            <div className="level-item">
              <h3 className={`subtitle is-4 has-text-pink`}>Admins</h3>
            </div>
          </div>
          {isOwner &&
            <MintForm
              collectionAddress={members?.squad.fork?.collection.address}
              forkNumber={members?.squad.fork?.forkId}
              admin={true}
              adminUser={isActiveAdmin}
            />
          }
        </div>
        {members?.admins !== undefined && members.admins.length > 0 &&
          <MemberCards
            members={members.admins}
            user={account?.address}
            collectionExpiry={squadConfig?.expiry ?? 0}
          />
        }
      </div>
      <div className="block rounded-border pink-border">
        <div className="level mb-0">
          <div className="level-left">
            <div className="level-item">
              <h3 className={`subtitle is-4 has-text-pink`}>Members</h3>
            </div>
          </div>
          {(isOwner || isActiveAdmin) &&
            <MintForm
              collectionAddress={members?.squad.fork?.collection.address}
              forkNumber={members?.squad.fork?.forkId}
              admin={false}
              adminUser={isActiveAdmin}
              cooldown={squadConfig?.cooldown}
              latestMintTime={memberInfo?.latestMintTime}
            />
          }
        </div>
        {members?.members !== undefined && members.members.length > 0 &&
          <MemberCards
            members={members.members}
            user={account?.address}
            collectionExpiry={squadConfig?.expiry ?? 0}
          />
        }
      </div>
    </div>
  )
}

interface SquadConfigBoxProps {
  owner?: string,
  user?: string,
  squadConfig?: SquadConfig
}

function SquadConfigBox({ owner, squadConfig, user }: SquadConfigBoxProps) {
  return (
    <>
      <div className="block">
        <div className="mb-4">
          {`Squad owner: `}
          <span className="rounded-border">
            <ShortAddress address={owner} userAddress={user} />
          </span>
        </div>
        <div className="mb-4">
          {`Memberships stay active for `}
          <span className="rounded-border">{timestampToTimeString(squadConfig?.expiry)}</span>
        </div>
        <div className="mb-4">
          {`Admins can mint every `}
          <span className="rounded-border">{timestampToTimeString(squadConfig?.cooldown)}</span>
        </div>
        <div className="mb-4">
          {`Active members get `}
          <span className="rounded-border">{squadConfig?.bonus} bonus power</span>
        </div>
        <div className="mb-4">
          {`Members can hold `}
          <span className="rounded-border">{squadConfig?.max} memberships max</span>
        </div>
        <div>
          {`Image generator: `}
          <span className="rounded-border">{shortAddress(squadConfig?.svgAddress)}</span>
        </div>
      </div>
      <div className="block has-text-grey is-size-7">
        Power = your total memberships (up to the max) + the bonus if you have an active membership
      </div>
      <Button
        text="Edit"
        scale={1}
        widthPx={140}
        green
      />
    </>
  )
}

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

function MintForm({
  collectionAddress,
  forkNumber,
  admin,
  adminUser,
  cooldown,
  latestMintTime
}: MintFormProps) {
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
          className="mr-2"
        />
        {(adminUser !== undefined && adminUser && cooldownLeft > 0) ?
          <>
            <a className="circle-button disabled has-text-weight-bold">&#65291;</a>
            <div className="is-size-7 has-text-grey pl-1">({timestampToNumbers(cooldownLeft)})</div>
          </>
          :
          <a className="circle-button has-text-weight-bold" onClick={handleMint}>&#65291;</a>
        }
      </div>
    </div>
  )
}

function MemberCards({ members, user, collectionExpiry }: { members: Member[], user?: string, collectionExpiry: number }) {
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
            <img src={extractImageUri(m.info.uri)} alt="uri" style={{ width: "170px" }} />
            <div><ShortAddress address={m.address} userAddress={user} /></div>
            <div>{m.info.power} power</div>
            {m.info.active && <div className="has-text-grey is-size-7">expires {expiry}</div>}
          </div>
        )
      })}
    </div>
  )
}