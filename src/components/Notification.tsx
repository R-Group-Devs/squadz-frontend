import { ReactElement } from "react"

interface NotificationProps {
  children: ReactElement,
  color: string,
  close: React.MouseEventHandler
}

export default ({ children, color, close }: NotificationProps) => {
  return (
    <div className={`notification has-text-white is-${color}`}>
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
            {children}
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <a
              className="close"
              onClick={close}
            >X</a>
          </div>
        </div>
      </nav>
    </div>
  )
}