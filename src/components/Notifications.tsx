import { ReactElement, MouseEventHandler } from 'react'

import useNotifications from '../hooks/useNotifications'
import Notification from './Notification'

export default () => {
  const { notifications, removeNotification } = useNotifications()

  function closeFactory(type: "errors" | "warnings" | "status", key: string) {
    return () => {
      removeNotification(type, key)
    }
  }

  return (
    <div className="container pl-4 pb-3">
      <NotificationBlock
        notifications={notifications.errors}
        notificationType="errors"
        color="red"
        closeFactory={closeFactory}
      />
      <NotificationBlock
        notifications={notifications.warnings}
        notificationType="warnings"
        color="orange"
        closeFactory={closeFactory}
      />
      <NotificationBlock
        notifications={notifications.status}
        notificationType="status"
        color="green"
        closeFactory={closeFactory}
      />
    </div>
  )
}

interface NotificationBlockProps {
  notifications: { [key: string]: ReactElement };
  notificationType: "errors" | "warnings" | "status"
  color: "red" | "orange" | "green";
  closeFactory: (type: "errors" | "warnings" | "status", key: string) => MouseEventHandler;
}

function NotificationBlock({ notifications, notificationType, color, closeFactory }: NotificationBlockProps) {
  return (
    <div className="block is-fixed">
      {Object.keys(notifications).map((k) => {
        const element = notifications[k]
        return (
          <Notification key={k} color={color} close={closeFactory(notificationType, k)}>
            {element}
          </Notification>
        )
      })}
    </div>
  )
}