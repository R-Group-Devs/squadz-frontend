import { useState, ReactElement } from 'react'
import { Link } from 'react-router-dom'

import config from '../config.json'
import Button from './Button'
import useNetwork from '../hooks/useNetwork'

export default () => {
  const [network, setNetwork] = useNetwork()
  const [dropdownActive, setDropdownActive] = useState<string>("")
  const classStyle = "is-Karrik has-text-black is-size-6"
  const [arrow, setArrow] = useState<ReactElement>(<span className={classStyle}>&#9650;</span>)
  const [address, setAddress] = useState<string>("")

  const toggleDropdown = () => {
    if (dropdownActive == "") {
      setDropdownActive("is-active")
      setArrow(<span className={classStyle}>&#9660;</span>)
    } else {
      setDropdownActive("")
      setArrow(<span className={classStyle}>&#9650;</span>)
    }
  }

  return (
    <div className="level centered">
      <div className="level-item pl-2 pr-2">
        <input
          className={`text ${classStyle}`}
          type="text"
          placeholder="address"
          style={{ width: 256, height: 25 }}
          onChange={(e) => { setAddress(e.currentTarget.value) }}
        />
      </div>
      <div className="level-item pl-2 pr-2">
        <div className={`dropdown ${dropdownActive}`}>
          <div className="dropdown-trigger">
            <span className={classStyle} onClick={toggleDropdown}>
              <span className="row space-between">
                <span className={classStyle}>{network}</span>
                {arrow}
              </span>
            </span>
          </div>
          <div className="dropdown-menu">
            <div className="dropdown-content has-text-left">
              {Object.keys(config.networks).map(name => {
                return (
                  <span
                    className={`dropdown-item ${classStyle}`}
                    key={name}
                    onClick={() => { setNetwork(name); toggleDropdown() }}
                  >
                    {name}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="level-item pl-2 pr-2">
        <Link to={`/squads/${address}`}>
          <Button text="View squads" scale={1} widthPx={160} />
        </Link>
      </div>
    </div>
  )
}