import { useContext } from 'react'
import { NetworkContext } from '../providers/NetworkProvider'

export default (): [string, (network: string) => void] => {
  const context = useContext(NetworkContext)
  return [context.network, context.setNetwork]
}