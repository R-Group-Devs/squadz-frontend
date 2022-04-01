import { useState, ReactElement } from 'react'

import { networks } from '../config'
import useNetwork from '../hooks/useNetwork'

export default () => {
  const [network, setNetwork] = useNetwork()
  const [dropdownActive, setDropdownActive] = useState<string>("")
  const classStyle = `is-Karrik has-text-black is-size-6`
  const [arrow, setArrow] = useState<ReactElement>(<span className={classStyle}>&#9650;</span>)

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
    <div className={`dropdown ${dropdownActive}`}>
      <div className="dropdown-trigger">
        <span onClick={toggleDropdown}>
          <div className="is-size-7 has-text-grey" style={{ position: "absolute", bottom: 20 }}>
            Network:
          </div>
          <span className="row space-between">
            <span className={classStyle}>{network}&nbsp;</span>
            {arrow}
          </span>
        </span>
      </div>
      <div className="dropdown-menu">
        <div className="dropdown-content has-text-left">
          {Object.keys(networks).map(name => {
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
  )
}