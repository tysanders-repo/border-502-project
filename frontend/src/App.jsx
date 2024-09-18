import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { About } from './pages/about'
import { NewUserInfo } from './pages/NewUserInfo'
import { UserDetails } from './pages/UserDetails'
import { UsersList } from './pages/UsersList'
import { UserEdit } from './pages/UserEdit'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/users/:id/edit" element={<UserEdit />} />
        <Route path="/newuser" element={<NewUserInfo />} />
      </Routes>
    </Router>
  )
}

export default App
