import { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'

import Header from './Header'
import Notifications from './Notifications'
import Footer from './Footer'

const headerlessPaths = ["/"]
const connectorlessPaths = ["/create"]

export default ({ children }: { children: ReactElement }) => {
  const { pathname } = useLocation()
  const headerless = headerlessPaths.includes(pathname)
  const connectorless = connectorlessPaths.includes(pathname)

  return (
    <>
      <div id="top">
        {!headerless && <Header connector={!connectorless} />}
        <Notifications />
        {children}
      </div>
      <Footer />
    </>
  )
}