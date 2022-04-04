import { shortString } from '.'
import { AddNotificationFunction } from '../providers/NotificationsProvider'

export function copy(
  str: string,
  addNotification: AddNotificationFunction
) {
  if (navigator.clipboard !== undefined) {
    navigator.clipboard.writeText(str).then(() => {
      addNotification("status", <span>
        {`COPIED: "${shortString(str, 6)}"`}
      </span>, "copy")
    })
      .catch((e: Error) => {
        addNotification("status", <span>
          {`COPIED: "${shortString(e.message, 6)}"`}
        </span>, "copy")
      });
  } else {
    // ideally won't be used
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', str)
      e.preventDefault()
      document.removeEventListener('copy', () => { })
    })
    document.execCommand('copy')
  }
}