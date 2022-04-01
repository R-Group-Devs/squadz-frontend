import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bulma'
import './App.css'

import NetworkProvider from './providers/NetworkProvider'
import WalletProvider from './providers/WalletProvider'
import QueryProvider from './providers/QueryProvider'
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
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/credits" element={<Credits />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/squads/:address" element={<Squads />} />
                  <Route path="/squad/:collectionAddress/:forkNumber" element={<Squad />} />

                  <Route path="*" element={<FourOhFour />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </QueryProvider>
        </WalletProvider>
      </NetworkProvider>
    </div>
  )
}

export default App
