import { Link } from 'react-router-dom'

import Blob from "./Blob"
import Connector from "./Connector"

const levelItemPadding = "p-3"

export default ({ connector }: { connector: boolean }) => {
  return (
    <nav className="level">
      <div className="level-left">
        <div className={`level-item ${levelItemPadding}`}>
          <Link to="/">
            <Blob size={60} />
          </Link>
        </div>
      </div>
      <div className="level-right">
        <div className={`level-item ${levelItemPadding}`}>
          {connector && <Connector extraspace={false} />}
        </div>
      </div>
    </nav>
  )
}