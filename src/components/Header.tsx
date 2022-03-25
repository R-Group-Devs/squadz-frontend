import { Link } from 'react-router-dom'

import Connector from './Connector'

const levelItemPadding = "p-3"

export default ({ connector }: { connector: boolean }) => {
  return (
    <nav className="level">
      <div className="level-left">
        <div className={`level-item ${levelItemPadding}`}>
          <Link to="/">
            <h3 className="title is-PicNic is-3 has-text-green">SQUADZ</h3>
          </Link>
        </div>
      </div>
      <div className="level-right">
        <div className={`level-item ${levelItemPadding}`}>
          {connector && <Connector />}
        </div>
      </div>
    </nav>
  )
}