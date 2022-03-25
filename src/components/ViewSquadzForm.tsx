import { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from './Button'
import NetworkDropdown from './NetworkDropdown'

export default () => {
  const [address, setAddress] = useState<string>("")

  return (
    <div className="level centered">
      <div className="level-item pl-2 pr-2">
        <input
          type="text"
          placeholder="address"
          style={{ width: 256, height: 25 }}
          onChange={(e) => { setAddress(e.currentTarget.value) }}
        />
      </div>
      <div className="level-item pl-2 pr-2">
        <NetworkDropdown />
      </div>
      <div className="level-item pl-2 pr-2">
        <Link to={`/squads/${address}`}>
          <Button text="View squads" scale={1} widthPx={170} />
        </Link>
      </div>
    </div>
  )
}