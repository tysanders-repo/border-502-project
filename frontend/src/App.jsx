import React from 'react'
import Navbar from './components/organisms/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { NewMemberForm } from './pages/NewMemberForm'
import { NewProjectForm } from './pages/NewProjectForm'
import { UserDetails } from './pages/UserDetails'
import { UsersList } from './pages/UsersList'
import { UserEdit } from './pages/UserEdit'
import { ProjectList } from './pages/ProjectList'
import { ProjectDetails } from './pages/ProjectDetails'
import { ProjectEdit } from './pages/ProjectEdit'

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
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/new-project" element={<NewProjectForm />} />
          <Route path="/projects/:id/edit" element={<ProjectEdit />} />
        </Routes>
      </Router>
    </LocalizationProvider>
  )
}

export default App
