import { useState, useEffect } from 'react'
import { useConnect, useAccount, useNetwork as useWalletNetwork } from 'wagmi'

import { shortAddress } from '../lib'
import MetaMaskSVG from '../assets/images/metamask-fox.svg'
import WalletConnectSVG from '../assets/images/walletconnect-logo.svg'
import WalletLinkLogo from '../assets/images/coinbase-wallet.png'
import Button from './Button'
import useNetwork from "../hooks/useNetwork";

const connectorImgs = [MetaMaskSVG, WalletConnectSVG, WalletLinkLogo]

const connectorAlts = [
  {
    text: "Install Metamask",
    url: "https://metamask.io/"
  },
  {
    text: "Find wallets that use WalletConnect",
    url: "https://walletconnect.com/"
  },
  {
    text: "Find wallets that use WalletLink",
    url: "https://walletlink.org/#/"
  }
]

export default () => {
  const [modalActive, setModalActive] = useState("")
  const [{ data }, connect] = useConnect()
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })
  const [{ data: { chain } }] = useWalletNetwork()
  const [network,] = useNetwork()
  const [mismatch, setMismatch] = useState<boolean>(false)

  useEffect(() => {
    if (chain !== undefined && chain.name !== network) {
      setMismatch(true)
    } else if (mismatch !== false) {
      setMismatch(false)
    }
  }, [chain, network])

  return (
    <div>
      {accountData?.connector?.ready ?
        <div className="row center">
          <span className="is-size-6 pr-2">{
            accountData.ens ?
              accountData.ens.name
              :
              shortAddress(accountData.address)
          }</span>
          <Button
            text="Disconnect"
            scale={1}
            widthPx={130}
            green
            callback={() => disconnect()}
          />
        </div>
        :
        <Button
          text="Connect"
          scale={1}
          widthPx={130}
          green
          callback={() => setModalActive("is-active")}
        />
      }
      {mismatch && chain !== undefined &&
        <div className="is-size-7 has-text-red" style={{ position: "absolute" }}>
          {`Mismatch: connected to ${chain.name}`}
        </div>
      }
      <div className={`modal ${modalActive}`}>
        <div className="modal-background" onClick={() => setModalActive("")} />
        <div className="modal-content has-background-white rounded-border green-border">
          <div className="box">
            {data.connectors.map((x, i) => (
              <section className="section" key={x.id} >
                {x.ready ?
                  <a
                    className="button is-ghost has-text-green"
                    onClick={() => {
                      connect(x).then((res) => {
                        if (res?.data !== undefined) setModalActive("")
                      })
                    }}
                  >
                    <img src={connectorImgs[i]} alt={x.name} width="80px" />
                    <h2 className="subtitle pl-5 has-text-green">
                      {x.name}
                    </h2>
                  </a>
                  :
                  <a
                    className="button is-ghost has-text-green"
                    target="_blank" href={connectorAlts[i].url}
                  >
                    <img src={connectorImgs[i]} alt={x.name} width="80px" />
                    <h2 className="subtitle pl-5 has-text-green">
                      {connectorAlts[i].text}
                    </h2>
                  </a>
                }
              </section>
            ))}
          </div>
        </div>
        <button className="modal-close is-large" onClick={() => setModalActive("")} />
      </div>
    </div>
  )
}