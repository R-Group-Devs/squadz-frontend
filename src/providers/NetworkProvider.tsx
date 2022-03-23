import React, { useState, createContext, useEffect } from 'react'

import config from '../config.json'

interface INetworkContext {
  network: string;
  setNetwork: (network: string) => void;
}

const defaultNetwork = Object.keys(config.networks)[0]
const defaultNetworkContext: INetworkContext = {
  network: defaultNetwork,
  setNetwork: (network: string) => { }
}

export const NetworkContext = createContext<INetworkContext>(defaultNetworkContext)

export default ({ children }: { children: React.ReactElement }) => {
  const [network, setNetwork] = useState<string>("network")

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  )
}