import useNotifications from "../hooks/useNotifications"
import { shortAddress } from "../lib"
import CopyButton from "./CopyButton"

export default ({ address, userAddress }: { address?: string, userAddress?: string }) => {
  const { addNotification } = useNotifications()
  const loggedInUser = address?.toLowerCase() === userAddress?.toLowerCase()
  if (loggedInUser) {
    return <span>
      {shortAddress(address)}
      <span className="pl-2 has-text-green">&#10004;</span>
      <CopyButton str={address} addNotification={addNotification} />
    </span>
  }
  return <span>
    {shortAddress(address)}
    <CopyButton str={address} addNotification={addNotification} />
  </span>
}