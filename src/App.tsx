import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bulma'
import './App.css'

/* Polyfills */
import { Buffer } from 'buffer';

if (window.Buffer === undefined) {
  window.Buffer = Buffer;
}
/*  *  *  *  */

import NetworkProvider from './providers/NetworkProvider'
import WalletProvider from './providers/WalletProvider'
import QueryProvider from './providers/QueryProvider'
import NotificationsProvider from './providers/NotificationsProvider'
import Layout from './components/Layout'
import Home from './pages/Home'
import Credits from './pages/Credits'
import Create from './pages/Create'
import Squads from './pages/Squads'
import Squad from './pages/Squad'
import FourOhFour from './pages/404'

function App() {
  return (
    <div className="app">
      <NetworkProvider>
        <WalletProvider>
          <QueryProvider>
            <NotificationsProvider>
              <BrowserRouter>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/credits" element={<Credits />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/squads/:address" element={<Squads />} />
                    <Route path="/squad/:networkName/:collectionAddress/:forkNumber" element={<Squad />} />

                    <Route path="*" element={<FourOhFour />} />
                  </Routes>
                </Layout>
              </BrowserRouter>
            </NotificationsProvider>
          </QueryProvider>
        </WalletProvider>
      </NetworkProvider>
    </div>
  )
}

export default App
