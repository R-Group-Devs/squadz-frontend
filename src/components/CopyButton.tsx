import { AddNotificationFunction } from "../providers/NotificationsProvider"
import { copy, shortAddress } from "../lib"

interface CopyButtonProps { str?: string, addNotification: AddNotificationFunction }

export default ({ str, addNotification }: CopyButtonProps) => {
  if (str === undefined) return <></>
  console.log(window.innerWidth, str.length)
  if (window.innerWidth < 600 && str.length > 20) {
    str = shortAddress(str)
  }
  return <span
    className="pl-1"
    onClick={() => copy(str as string, addNotification)}
    style={{ cursor: "pointer" }}
  >
    &#10064;
  </span>
}