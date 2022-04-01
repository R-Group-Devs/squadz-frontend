import { ReactElement } from 'react'
import { Provider,  /* chain, */ defaultChains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
// import { WalletLinkConnector } from 'wagmi/connectors/walletLink'

// API key for Ethereum node
// Two popular services are Infura (infura.io) and Alchemy (alchemy.com)
import env from '../env'

// Chains for connectors to support
const chains = defaultChains

// Set up connectors
const connectors = ({ chainId }: { chainId?: number | undefined }) => {
  /*
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0]
  */
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      options: {
        infuraId: env.infuraId,
        qrcode: true,
      },
    }),
    /*
    new WalletLinkConnector({
      options: {
        appName: 'Squadz',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    })
    */
  ]
}

export default ({ children }: { children: ReactElement }) => (
  <Provider autoConnect connectors={connectors}>
    {children}
  </Provider>
)