import { Link } from 'react-router-dom'

import blob from "../public/images/magicpattern-blob-1647906613950.png"
import Connector from './Connector'

const levelItemPadding = "pl-5 pr-5 pt-3 pb-3"

export default ({ connector }: { connector: boolean }) => {
  return (
    <nav className="level">
      <div className="level-left">
        <div className={`level-item ${levelItemPadding}`}>
          <Link to="/">
            <img className="mt-2" src={blob} alt="Gradient blob" width={60} height={60} />
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