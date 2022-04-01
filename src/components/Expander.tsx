import { ReactElement, useState } from 'react'

interface ExpanderProps {
  children: ReactElement;
  element: ReactElement;
  color?: "green" | "pink" | "black"
}

export default ({ children, element, color }: ExpanderProps) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  if (color === undefined) color = "black"

  function toggle() {
    if (expanded) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }

  return (
    <div>
      {expanded ?
        <>
          <a className={`has-text-${color}`} onClick={toggle}>
            &#9660;
            <span className="p-2">
              {element}
            </span>
          </a>
          <div className="block pt-5 pl-5 pr-5">
            {children}
          </div>
        </>
        :
        <>
          <a className={`has-text-${color}`} onClick={toggle}>
            &#9658;
            <span className="p-2">
              {element}
            </span>
          </a>
        </>
      }
    </div>
  )
}