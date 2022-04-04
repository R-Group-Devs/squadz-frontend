import { useState, createContext, ReactElement } from 'react'

export interface Notifications {
  warnings: { [key: string]: ReactElement };
  errors: { [key: string]: ReactElement };
  status: { [key: string]: ReactElement };
}

const emptyNotifs: Notifications = {
  errors: {},
  warnings: {},
  status: {}
}

export type AddNotificationFunction = (
  type: "errors" | "warnings" | "status",
  element: ReactElement,
  key: string
) => void

interface INotificationsContext {
  notifications: Notifications,
  addNotification: AddNotificationFunction,
  removeNotification: (type: "errors" | "warnings" | "status", key: string) => void
}

export const NotificationsContext = createContext<INotificationsContext>({
  notifications: emptyNotifs,
  addNotification: (type: "errors" | "warnings" | "status", element: ReactElement, key: string) => { },
  removeNotification: (type: "errors" | "warnings" | "status", key: string) => { }
})

export default ({ children }: { children: ReactElement }) => {
  const [notifications, setNotifications] = useState<Notifications>(emptyNotifs)

  function removeNotification(type: "errors" | "warnings" | "status", key: string) {
    const newNotifs = Object.assign({}, notifications)
    delete newNotifs[type][key]
    setNotifications(newNotifs)
  }

  function addNotification(type: "errors" | "warnings" | "status", element: ReactElement, key: string) {
    console.log('trying to add notification', type, element, key)
    const newNotifs = Object.assign({}, notifications)
    newNotifs[type][key] = element
    setNotifications(newNotifs)
    setTimeout(() => {
      removeNotification(type, key)
    }, 1000 * 10)
  }

  const value: INotificationsContext = {
    notifications,
    addNotification,
    removeNotification
  }

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}