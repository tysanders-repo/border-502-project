import React from 'react'
import Navbar from './components/organisms/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { NewMemberForm } from './pages/NewMemberForm'
import { UserDetails } from './pages/UserDetails'
import { UsersList } from './pages/UsersList'
import { UserEdit } from './pages/UserEdit'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/users/:id/edit" element={<UserEdit />} />
          <Route path="/new-member" element={<NewMemberForm />} />
        </Routes>
      </Router>
    </LocalizationProvider>
  )
}

export default App
