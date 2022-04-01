import { shortAddress } from "../lib"

export default ({ address, userAddress }: { address?: string, userAddress?: string }) => {
  const loggedInUser = address?.toLowerCase() === userAddress?.toLowerCase()
  if (loggedInUser) {
    return <span>
      {shortAddress(address)}
      <span className="pl-2 has-text-green">&#10004;</span>
    </span>
  }
  return <span>{shortAddress(address)}</span>
}