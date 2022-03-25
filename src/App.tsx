import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bulma'
import './App.css'

import NetworkProvider from './providers/NetworkProvider'
import WalletProvider from './providers/WalletProvider'
import Layout from './components/Layout'
import Home from './pages/Home'
import Credits from './pages/Credits'
import Create from './pages/Create'

function App() {
  return (
    <div className="app">
      <NetworkProvider>
        <WalletProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/credits" element={<Credits />} />
                <Route path="/create" element={<Create />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </WalletProvider>
      </NetworkProvider>
    </div>
  )
}

export default App
