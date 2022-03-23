import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bulma'
import './App.css'

import Home from './pages/Home'
import NetworkProvider from './providers/NetworkProvider'

function App() {

  return (
    <div className="app">
      <NetworkProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </NetworkProvider>
    </div>
  )
}

export default App
