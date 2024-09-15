import React from 'react'

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { About } from './pages/about'
import { UserInfo } from './pages/userinfo'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/userinfo" element={<UserInfo />} />
      </Routes>
    </Router>
  )
}

export default App
