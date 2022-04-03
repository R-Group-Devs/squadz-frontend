import { TransactionResponse, TransactionReceipt } from "@ethersproject/providers"

import { networks, NetworkName } from "../config"

export function resolveTx(
  addNotification: Function,
  res: TransactionResponse,
  network: NetworkName,
  callback?: Function
) {
  addNotification(
    "status",
    <span>TX SUBMITTED:
      <a className="p-2 is-underlined" href={`${networks[network].blockchainExplorer}/tx/${res.hash}`} target="_blank">
        view on block explorer
      </a>
    </span>,
    res.hash
  )
  res.wait()
    .then((rec: TransactionReceipt) => {
      addNotification(
        "status",
        <span>TX RECEIVED:
          <a className="p-2 is-underlined" href={`${networks[network].blockchainExplorer}/tx/${rec.transactionHash}`} target="_blank">
            view on block explorer
          </a>
        </span>,
        res.hash + rec.blockHash
      )
      if (callback !== undefined) callback()
    })
}