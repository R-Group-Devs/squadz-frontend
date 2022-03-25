import React, { useState, createContext } from 'react'

import { networks } from '../config'

interface INetworkContext {
  network: string;
  setNetwork: (network: string) => void;
}

const defaultNetwork = Object.keys(networks)[0]
const defaultNetworkContext: INetworkContext = {
  network: defaultNetwork,
  setNetwork: (network: string) => { }
}

export const NetworkContext = createContext<INetworkContext>(defaultNetworkContext)

export default ({ children }: { children: React.ReactElement }) => {
  const [network, setNetwork] = useState<string>(Object.keys(networks)[0])

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  )
}