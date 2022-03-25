import { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

export default ({ children }: { children: ReactElement }) => {
  const { pathname } = useLocation()
  const headerlessPaths = ["/"]
  const connectorlessPaths = ["/create"]
  const headerless = headerlessPaths.includes(pathname)
  const connectorless = connectorlessPaths.includes(pathname)

  return (
    <>
      <div id="top">
        {!headerless && <Header connector={!connectorless} />}
        {children}
      </div>
      <Footer />
    </>
  )
}